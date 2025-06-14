const redis = require('../utils/redisClient');

function setupFormSocket(io) {
  io.on('connection', (socket) => {
    let currentFormId = null;
    let currentUserId = null;

    socket.on('join_form', async ({ formId, userId }) => {
      currentFormId = formId;
      currentUserId = userId;

      socket.join(formId);
      await redis.sadd(`form:${formId}:users`, userId);
      const users = await redis.smembers(`form:${formId}:users`);
      io.to(formId).emit('user_presence', users);
    });

    socket.on('field_lock', async ({ fieldId }) => {
      if (!currentFormId || !currentUserId) return;

      const lockKey = `form:${currentFormId}:field:${fieldId}:lock`;
      const currentLock = await redis.get(lockKey);

      if (!currentLock) {
        await redis.set(lockKey, currentUserId, 'EX', 30); // Auto-expire after 30s
        io.to(currentFormId).emit('field_locked', { fieldId, userId: currentUserId });
      }
    });

    socket.on('field_unlock', async ({ fieldId }) => {
      if (!currentFormId || !currentUserId) return;

      const lockKey = `form:${currentFormId}:field:${fieldId}:lock`;
      const owner = await redis.get(lockKey);

      if (owner === currentUserId) {
        await redis.del(lockKey);
        io.to(currentFormId).emit('field_unlocked', { fieldId });
      }
    });

    socket.on('field_update', ({ formId, fieldId, value, userId }) => {
      io.to(formId).emit('field_updated', { fieldId, value, userId });
    });

    socket.on('disconnect', async () => {
      if (currentFormId && currentUserId) {
        await redis.srem(`form:${currentFormId}:users`, currentUserId);
        const users = await redis.smembers(`form:${currentFormId}:users`);
        io.to(currentFormId).emit('user_presence', users);
      }
    });
  });
}

module.exports = setupFormSocket;

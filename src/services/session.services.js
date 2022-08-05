import sessionRepository from '../repositories/session.repository.js';

async function createSession(uuid, userId) {
  await sessionRepository.create(uuid, userId);
}

export default { createSession };

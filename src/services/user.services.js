import userRepository from '../repositories/user.repository.js';

async function findUserByEmail(email) {
  return userRepository.findByEmail(email);
}

async function findUserBySession(session) {
  return userRepository.findBySession(session);
}

export default { findUserByEmail, findUserBySession };

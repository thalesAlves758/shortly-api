import userRepository from '../repositories/user.repository.js';

async function findUserByEmail(email) {
  return userRepository.findByEmail(email);
}

async function findUserBySession(session) {
  return userRepository.findBySession(session);
}

async function findUserUrls(userId) {
  return userRepository.findUserUrls(userId);
}

export default { findUserByEmail, findUserBySession, findUserUrls };

import userRepository from '../repositories/user.repository.js';

async function findUserByEmail(email) {
  return userRepository.findByEmail(email);
}

export default { findUserByEmail };

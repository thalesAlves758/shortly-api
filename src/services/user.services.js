import bcrypt from 'bcrypt';

import userRepository from '../repositories/user.repository.js';

async function findUserByEmail(email) {
  return userRepository.findByEmail(email);
}

async function createUser(name, email, password) {
  const saltRounds = 10;
  const hashedPassword = bcrypt.hashSync(password, saltRounds);

  await userRepository.create(name, email, hashedPassword);
}

export default { findUserByEmail, createUser };

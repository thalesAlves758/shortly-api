import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

import userRepository from '../repositories/user.repository.js';
import sessionServices from './session.services.js';
import tokenServices from './token.services.js';

async function signUp(name, email, password) {
  const saltRounds = 10;
  const hashedPassword = bcrypt.hashSync(password, saltRounds);

  await userRepository.create(name, email, hashedPassword);
}

async function signIn(email, password) {
  const user = await userRepository.findByEmail(email);

  if (user && bcrypt.compareSync(password, user.password)) {
    const session = uuid();

    await sessionServices.createSession(session, user.id);

    const token = tokenServices.generateToken({ session });

    return token;
  }

  return null;
}

export default { signUp, signIn };

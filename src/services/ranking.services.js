import userRepository from '../repositories/user.repository.js';

async function getRanking() {
  return userRepository.getUsersUrlsRanking();
}

export default { getRanking };

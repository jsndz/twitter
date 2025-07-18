import { UserRepository } from "../repository/index.js";

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async signup(data) {
    try {
      const user = await this.userRepository.create(data);
      const token = user.genJwt();
      return { user, token };
    } catch (error) {
      throw error;
    }
  }

  async getUserByEmail(email) {
    return await this.userRepository.findOneBy({ email });
  }

  async signin(data) {
    try {
      const user = await this.getUserByEmail(data.email);
      console.log(user);

      if (!user) {
        throw {
          message: "coulnt find user",
        };
      }
      if (!user.comparePasswords(data.password)) {
        throw {
          message: "wrong password",
        };
      }
      const token = user.genJwt();
      return { user, token };
    } catch (error) {
      throw error;
    }
  }
}

export default UserService;

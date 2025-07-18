import User from "../models/user.js";

import CrudRepository from "./crud-repository.js";

class UserRepository extends CrudRepository {
  constructor() {
    super(User);
  }

  async findOneBy(data) {
    return await User.findOne(data);
  }
}

export default UserRepository;

import jwt from "jsonwebtoken";
import UserRepository from "./user.repository.js";
import UserModel from "../User/user.model.js";
import bcrypt from "bcrypt";

export default class UserController {
  constructor() {
    this.userRepository = new UserRepository();
  }
  async signUp(req, res) {
    const { name, email, password, type } = req.body;
    const hashPassword = await bcrypt.hash(password, 12);
    const user = new UserModel(name, email, password, type);
    await this.userRepository.signUp(user);
    res.status(201).send(user);
  }

  async signIn(req, res, next) {
    try {
      const user = await this.userRepository.findByEmail(req.body.email);
      if (!user) {
        return res.status(400).send("Incorrect Credentials");
      } else {
        const result = await bcrypt.compare(req.body.password, user.password);
        if (!result) {
          return res.status(400).send("Incorrect Credentials");
        } else {
          // 1. Create token.
          const token = jwt.sign(
            {
              userID: result.id,
              email: result.email,
            },
            "AIb6d35fvJM4O9pXqXQNla2jBCH9kuLz",
            {
              expiresIn: "1h",
            }
          );

          // 2. Send token.
          return res.status(200).send(token);
        }
      }
    } catch (err) {
      console.log(err);
      return res.status(200).send("Something went wrong");
    }
  }
}

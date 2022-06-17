import mongoose from "mongoose";

export class UserDao {
  constructor() {
    const schema = new mongoose.Schema({
      email: { type: String, require: true },
      password: { type: String, require: true },
      id: { type: String, require: false },
    });
    const modelo = mongoose.model("users", schema);
    super(modelo);
  }

  async getByEmail(email){
    const element = await this.model.findOne({ email: email });
    return element;
  }
}

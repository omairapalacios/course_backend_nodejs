import mongoose from "mongoose";
import { MONGO_URL } from "../config";

export const URLMONGO = MONGO_URL;

export class MongoDAO {
  constructor(model) {
    mongoose.connect(URLMONGO);
    this.model = model;
  }
  async obtener(id) {
    const element = await this.model.findById(id);
    if (!element) throw { status: 404, error: `El producto ${id} no existe` };
    return element;
  }
  async obtenerTodos(){
    const docs = await this.model.find({});
    return docs.map((d) => d.toObject());
  }
  async guardar(elementoAGuardar) {
    const elementToSave = new this.model({
      ...elementoAGuardar,
    });
    await elementToSave.save();
    return elementToSave;
  }
  async eliminar(id){
    await this.model.findByIdAndDelete(id);
  }
  async modificar(id, modificacion) {
    await this.model.findByIdAndUpdate(id, modificacion);
    const p = await this.obtener(id);
    return p;
  }
}

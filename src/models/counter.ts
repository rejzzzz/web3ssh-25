import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICounter extends Document {
  _id: string;
  sequence_value: number;
}

export interface ICounterModel extends Model<ICounter> {
  getNextSequence(name: string): Promise<number>;
}

const counterSchema = new Schema<ICounter>({
  _id: { type: String, required: true },
  sequence_value: { type: Number, default: 0 },
});

// Static method to get next sequence number
counterSchema.statics.getNextSequence = async function (
  name: string,
): Promise<number> {
  const counter = await this.findByIdAndUpdate(
    name,
    { $inc: { sequence_value: 1 } },
    { new: true, upsert: true, setDefaultsOnInsert: true },
  );
  return counter.sequence_value;
};

const Counter: ICounterModel =
  (mongoose.models.Counter as unknown as ICounterModel) ||
  mongoose.model<ICounter, ICounterModel>('Counter', counterSchema);

export default Counter;

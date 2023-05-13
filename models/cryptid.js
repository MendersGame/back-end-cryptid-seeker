import mongoose from 'mongoose'

const Schema = mongoose.Schema

const cryptidSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    region: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
    cryptid: { type: Schema.Types.ObjectId, ref: 'Cryptid' }
  },
  { timestamps: true }
)
const Cryptid = mongoose.model('cryptid', cryptidSchema)

export { Cryptid }

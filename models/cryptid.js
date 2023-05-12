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
  },
  { timestamps: true }
)
const Cryptid = mongoose.model('cryptid', cryptidSchema)

export { Cryptid }

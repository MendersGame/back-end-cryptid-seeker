import mongoose from 'mongoose'

const Schema = mongoose.Schema

const commentSchema = new Schema(
  {
    text: {
      type: String,
      required: true
    },
    author: { type: Schema.Types.ObjectId, ref: 'Profile' }
  },
  { timestamps: true }
)

const sightingSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
    comments: [commentSchema],
    author: { type: Schema.Types.ObjectId, ref: 'Profile' },
    cryptid: { type: Schema.Types.ObjectId, ref: 'Cryptid' }
  },
  { timestamps: true }
)
const Sighting = mongoose.model('Sighting', sightingSchema)

export { Sighting }

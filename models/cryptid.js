import mongoose from 'mongoose'

const Schema = mongoose.Schema

const reviewSchema = new Schema(
  {
    text: { 
      type: String,
      required: true 
      },
    author: { type: Schema.Types.ObjectId, ref: "Profile" },
  },
  { timestamps: true }
);

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
    reviews:  [reviewSchema],
    sightings: [{ type: Schema.Types.ObjectId, ref: "Sighting" }]
  },
  { timestamps: true }
)

const Cryptid = mongoose.model("cryptid", cryptidSchema)

export { Cryptid }
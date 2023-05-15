import mongoose from "mongoose"

const Schema = mongoose.Schema

const memberSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    favCryptid: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
  },
);

const TeamMember = memberSchema.model("member", memberSchema)

export { TeamMember }
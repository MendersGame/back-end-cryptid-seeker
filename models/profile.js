import mongoose from 'mongoose'
import { Sighting } from './sighting'

const Schema = mongoose.Schema

const profileSchema = new Schema({
  name: String,
  photo: String,
  Sightings: [{ type: Schema.Types.ObjectId, ref: 'Sighting'}]
},{
  timestamps: true,
})

const Profile = mongoose.model('Profile', profileSchema)

export { Profile }

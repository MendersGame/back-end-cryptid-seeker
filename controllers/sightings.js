import { Profile } from "../models/profile.js"
import { Sighting } from "../models/sighting.js"

  async function create(req, res) {
    try {
      req.body.author = req.user.profile
      const sighting = await Sighting.create(req.body)
      const profile = await Profile.findByIdAndUpdate(
        req.user.profile,
        { $push: {sightings: sighting} },
        { new: true }
      )
      sighting.author = profile
      res.status(201).json(sighting)
    } catch (error) {
      console.log(error)
      res.status(500).json(error)
    }

  }


export { create }
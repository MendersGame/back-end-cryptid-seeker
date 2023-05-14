import { Profile } from "../models/profile.js"
import { Sighting } from "../models/sighting.js"
import { Cryptid } from "../models/cryptid.js"


async function create(req, res) {
  try {
    // Find the Cryptid that matches the name passed in the request body
    const cryptid = await Cryptid.findOne({ name: req.body.cryptid })

    // If no matching Cryptid is found, return an error response
    if (!cryptid) {
      return res.status(404).json({ message: 'Cryptid not found' })
    }
    // Update the request body with the ID of the Cryptid that was found and the ID of the user making the request
    req.body.cryptid = cryptid._id
    req.body.author = req.user.profile

     // Create a new Sighting using the updated request body
    const sighting = await Sighting.create(req.body)

    // Update the user's Profile by adding the newly created Sighting to the "sightings" array
    const profile = await Profile.findByIdAndUpdate(
      req.user.profile,
      { $push: { sightings: sighting } },
      { new: true }
    )
    // Update the Cryptid that was found by adding the newly created Sighting to the "sightings" array
    await Cryptid.findOneAndUpdate(
      {name: cryptid.name},
      { $push: { sightings: sighting } },
      { new: true }
    )
    console.log(cryptid.name)
    res.status(201).json(sighting)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}


async function index(req, res) {
  try {
    const sighting = await Sighting.find({})
    .populate('author')
    .sort({createdAt: 'desc'})
    res.status(200).json(sighting)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

async function show(req, res) {
  try {
    const sighting = await Sighting.findById(req.params.sightingId)
      .populate(['author', 'comments.author'])
    res.status(200).json(sighting)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

async function update(req, res) {
  try {
    const sighting = await Sighting.findByIdAndUpdate(
      req.params.sightingId, 
      req.body, 
      { new: true }
    ).populate('author')
    res.status(200).json(sighting)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

async function deleteSighting(req, res) {
  try {
    const sighting = await Sighting.findByIdAndDelete(req.params.sightingId)
    const profile = await Profile.findById(req.user.profile)
    profile.sightings.remove({_id: req.params.sightingId })
    await profile.save()
    res.status(200).json(sighting)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

async function createComment(req, res) {
  try {
    req.body.author = req.user.profile
    const sighting = await Sighting.findById(req.params.sightingId)
    sighting.comments.push(req.body)
    await sighting.save()
      //Find the New Comment
    const newComment = sighting.comments[sighting.comments.length-1]

    const profile = await Profile.findById(req.user.profile)
    newComment.author = profile
    
    res.status(201).json(newComment)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

export { 
  create,
  index,
  show,
  update,
  deleteSighting as delete,
  createComment,
}

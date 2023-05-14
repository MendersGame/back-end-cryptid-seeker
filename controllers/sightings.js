import { Profile } from "../models/profile.js";
import { Sighting } from "../models/sighting.js";
import { Cryptid } from "../models/cryptid.js";

async function create(req, res) {
  try {
    req.body.author = req.user.profile;
    req.body.cryptid = req.Cryptid._id
    const sighting = await Sighting.create(req.body);
    const profile = await Profile.findByIdAndUpdate(
      req.user.profile,
      { $push: { sightings: sighting } },
      { new: true }
    )
    const cryptid = await Cryptid.findByIdAndUpdate(
      req.Cryptid._id,
      { $push: { sightings: sighting} },
      { new: true }
    )

    sighting.author = profile
    sighting.cryptid = cryptid
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
    console.log(error);
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
    console.log(error);
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
    console.log(error);
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
    console.log(error);
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

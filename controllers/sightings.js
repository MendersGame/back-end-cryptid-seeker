import { Profile } from '../models/profile.js'
import { Sighting } from '../models/sighting.js'
import { Cryptid } from '../models/cryptid.js'

async function create(req, res) {
  try {
    const cryptid = await Cryptid.findOne({ name: req.body.cryptid })
    if (!cryptid) {
      return res.status(404).json({ message: 'Cryptid not found' })
    }
    req.body.cryptid = cryptid._id
    req.body.author = req.user.profile
    const sighting = await Sighting.create(req.body)
    const profile = await Profile.findByIdAndUpdate(
      req.user.profile,
      { $push: { sightings: sighting } },
      { new: true }
    )
    await Cryptid.findOneAndUpdate(
      {name: cryptid.name},
      { $push: { sightings: sighting } },
      { new: true }
    )
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
    const newComment = sighting.comments[sighting.comments.length-1]
    const profile = await Profile.findById(req.user.profile)
    newComment.author = profile
    res.status(201).json(newComment)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

async function updateComment(req, res) {
  try {
    const sighting = await Sighting.findById(req.params.sightingId)
    const comment = sighting.comments.id(req.params.commentId)
    comment.text = req.body.text
    await sighting.save()
    res.status(200).json(sighting)
  } catch (error) {
    console.log(error);
    res.status(500).json(error)
  }
}

async function deleteComment(req, res) {
  try {
    const sighting = await Sighting.findById(req.params.sightingId)
    sighting.comments.remove({ _id: req.params.commentId})
    await sighting.save()
    res.status(200).json(sighting)
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
  updateComment,
  deleteComment,
}

import { Cryptid } from '../models/cryptid.js'
import { Profile } from '../models/profile.js'

async function create(req, res) {
  try {
    req.body.author = req.user.profile
    const cryptid = await Cryptid.create(req.body)
    res.status(201).json(cryptid)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

async function index(req, res) {
  try {
    const cryptid = await Cryptid.find({})
    .sort({createdAt: 'desc'})
    res.status(200).json(cryptid)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

async function show(req, res) {
  try {
    const cryptid = await Cryptid.findById(req.params.cryptidId)
    .populate('reviews.author')
    res.status(200).json(cryptid)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

async function update(req, res) {
  try {
    const cryptid = await Cryptid.findByIdAndUpdate(
      req.params.cryptidId, 
      req.body, 
      { new: true }
    )
    res.status(200).json(cryptid)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

async function deleteCryptid(req, res) {
  try {
    const cryptid = await Cryptid.findByIdAndDelete(req.params.cryptidId)
    await cryptid.save()
    res.status(200).json(cryptid)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

async function createReview(req, res) {
  try {
    req.body.author = req.user.profile
    const cryptid = await Cryptid.findById(req.params.cryptidId)
    cryptid.reviews.push(req.body)
    await cryptid.save()
    const newReview = cryptid.reviews[cryptid.reviews.length-1]
    const profile = await Profile.findById(req.user.profile)
    newReview.author = profile
    res.status(201).json(newReview)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

async function updateReview(req, res) {
  try {
    const cryptid = await Cryptid.findById(req.params.cryptidId)
    const review = cryptid.reviews.id(req.params.reviewId)
    review.text = req.body.text
    await cryptid.save()
    res.status(200).json(cryptid)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

async function deleteReview(req, res) {
  try {
    const cryptid = await Cryptid.findById(req.params.cryptidId)
    cryptid.reviews.remove({ _id: req.params.reviewId })
    await cryptid.save()
    res.status(200).json(cryptid)
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
  deleteCryptid as delete,
  createReview,
  updateReview,
  deleteReview,
}

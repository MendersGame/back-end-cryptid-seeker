import { Profile } from "../models/profile.js";
import { Cryptid } from "../models/cryptid.js";

async function create(req, res) {
  try {
    req.body.author = req.user.profile;
    const cryptid = await Cryptid.create(req.body);
    const profile = await Profile.findByIdAndUpdate(
      req.user.profile,
      { $push: { cryptids: cryptid } },
      { new: true }
    )
    cryptid.author = profile
    res.status(201).json(cryptid)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

async function index(req, res) {
  try {
    const cryptid = await Cryptid.find({})
    .populate('author')
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
      .populate(['author'])
    res.status(200).json(cryptid)
  } catch (error) {
    console.log(error);
    res.status(500).json(error)
  }
}

async function update(req, res) {
  try {
    const cryptid = await Cryptid.findByIdAndUpdate(
      req.params.cryptidId, 
      req.body, 
      { new: true }
    ).populate('author')
    res.status(200).json(cryptid)
  } catch (error) {
    console.log(error);
    res.status(500).json(error)
  }
}

//todo come back later to impelement delete functionality
// async function deleteCryptid(req, res) {
//   try {
//     const cryptid = await Cryptid.findByIdAndDelete(req.params.cryptidId)
//     const profile = await Profile.findById(req.user.profile)
//     profile.cryptids.remove({_id: req.params.cryptidId })
//     await profile.save()
//     res.status(200).json(cryptid)
//   } catch (error) {
//     console.log(error);
//     res.status(500).json(error)
//   }
// }

export { 
  create,
  index,
  show,
  update,
  // deleteCryptid as delete,
}

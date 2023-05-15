import { TeamMember } from "../models/teamMember.js"

async function create(req, res) {
  try {
    req.body.author = req.user.profile;
    const teamMember = await TeamMember.create(req.body);
    res.status(201).json(teamMember)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

async function index(req, res) {
  try {
    const teamMember = await TeamMember.find({})
    .sort({createdAt: 'desc'})
    res.status(200).json(teamMember)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

async function update(req, res) {
  try {
    console.log(req.body);
    const teamMember = await TeamMember.findByIdAndUpdate(
      req.params.teamMemberId, 
      req.body, { new: true }
    )
    res.status(200).json(teamMember)
  } catch (error) {
    console.log(error);
    res.status(500).json(error)
  }
}

async function deleteMember(req, res) {
  try {
    const teamMember = await TeamMember.findByIdAndDelete(req.params.teamMemberId)
    await teamMember.save()
    res.status(200).json(teamMember)
  } catch (error) {
    console.log(error);
    res.status(500).json(error)
  }
}

export {
  create,
  index,
  update,
  deleteMember as delete,
}
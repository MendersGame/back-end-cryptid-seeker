import { TeamMember } from "../models/teamMember"

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

export {
  create,
  index,
  
}
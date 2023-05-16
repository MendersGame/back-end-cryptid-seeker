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
    const teamMember = await TeamMember.findByIdAndUpdate(
      req.params.teamMemberId, 
      req.body, 
      { new: true }
    )
    res.status(200).json(teamMember)
  } catch (error) {
    console.log(error);
    res.status(500).json(error)
  }
}

async function deleteMember(req, res) {
  try {
    const teamMember = await TeamMember.findById(req.params.teamMemberId);
    console.log('teamMember:', teamMember);
    
    // Save a copy of the teamMember before removal
    const deletedTeamMember = await teamMember.save();

    await teamMember.remove();
    console.log('Deleted teamMember:', deletedTeamMember);
    
    res.status(200).json(deletedTeamMember);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}


export {
  create,
  index,
  update,
  deleteMember as delete,
}
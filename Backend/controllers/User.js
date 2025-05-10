import Project from "../models/project.js";
import TeamMember from "../models/teamMember.js";

const fetchUsers=async(req,res)=>{
    try{
        const code = req.params.code;
        const currentID=req.user.id;

        const project = await Project.findOne({ projectCode: code });
        const teamMembers = await TeamMember.find({ _id: { $in: project.teamMembers } }).select("-password -teamLeader -teamCode"); 
        
        const users= teamMembers.filter((user)=>{
                return user.id!==currentID;
            }
        )
        
        res.status(200).json(users);
    }catch(error){
        console.error(error);
        res.status(500).json({message:"Internal server error"});
        }
}
export { fetchUsers };


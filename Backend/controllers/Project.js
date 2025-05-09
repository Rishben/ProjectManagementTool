import Project from "../models/project.js";

const ProjectDetails = async (req, res) => {
    const { code } = req.params;
    try {
        const project = await Project.findOne({ projectCode: code });
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }
        res.status(200).json(project);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export { ProjectDetails };
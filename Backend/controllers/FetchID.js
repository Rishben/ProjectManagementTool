const fetchID = async (req, res) => {
    try {
        const id = req.user.id;
        res.status(200).json({ id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export { fetchID };

const toolModel = require('../models/toolModel');

exports.getTools = async (req, res) => {
    try {
        const tools = await toolModel.getTools(req.query);

        if (tools.length === 0) {
            return res.status(404).json({ message: 'Aucune tâche trouvée' });
        }

        res.json(tools);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getTool = async (req, res) => {
    try {
        const tool = await toolModel.getTool(req);

        if (tool.length === 0) {
            return res.status(404).json({ message: 'Aucune tâche trouvée' });
        }

        res.json(tool);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
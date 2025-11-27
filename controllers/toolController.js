const toolModel = require('../models/toolModel');

exports.getTools = async (req, res) => {
    try {
        const tools = await toolModel.getTools(req.query);
        const totalTools = await toolModel.getCountTools();
        const filtersApplied = {};

        if (tools.length === 0) {
            return res.status(404).json({ message: 'Aucun outil trouvé' });
        }

        for(let key in req.query) {
            filtersApplied[key] = req.query[key];
        }

        res.json({
            data: tools,
            total: totalTools,
            filtered: tools.length,
            filters_applied: filtersApplied
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getTool = async (req, res) => {
    try {
        const tool = await toolModel.getTool(req);

        if (tool.length === 0) {
            return res.status(404).json({ message: 'Aucun outil trouvé' });
        }

        res.json({
            data: tool
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.getCountTools = async (req, res) => {
    try {
        const total = await toolModel.getCountTools();
        res.json({ total });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
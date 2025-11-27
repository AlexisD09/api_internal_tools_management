const toolModel = require('../models/toolModel');

exports.getTools = async (req, res) => {
    try {
        const tools = await toolModel.getTools(req.query);
        const totalTools = await toolModel.getCountTools();
        const filtersApplied = {};

        if (tools.length === 0) {
            return res.status(404).json({
                error: 'Tools not found',
                message: `No tools found.`,
            });
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
        res.status(500).json({
            error: "Internal Server Error",
            message: "Database connexion failed"
        });
    }
};

exports.getTool = async (req, res) => {
    try {
        const tool = await toolModel.getTool(req);

        if (tool.length === 0) {
            return res.status(404).json({
                error: 'Tool not found',
                message: `Tool with id ${req.params.id} does not exist`
            });
        }

        res.json({
            data: tool
        });
    } catch (error) {
        res.status(500).json({
            error: "Internal Server Error",
            message: "Database connexion failed"
        });
    }
}

exports.getCountTools = async (req, res) => {
    try {
        const total = await toolModel.getCountTools();
        res.json({ total });
    } catch (error) {
        res.status(500).json({
            error: "Internal Server Error",
            message: "Database connexion failed"
        });
    }
}
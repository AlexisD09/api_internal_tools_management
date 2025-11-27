const toolModel = require('../models/toolModel');
const { setErrorMessage } = require('../controllers/errorController');
const { getLast30DaysByToolId } = require('../models/usageModel');

exports.getTools = async (req, res) => {
    try {
        const tools = await toolModel.getTools(req.query);
        const totalTools = await toolModel.getCountTools();
        const filtersApplied = {};

        if (tools.length === 0) {
            return setErrorMessage(res, 404, 'Tools not found', `No tools found.`);
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
        return setErrorMessage(res, 500, "Internal Server Error", "Database connexion failed");
    }
};

exports.getTool = async (req, res) => {
    try {
        const tool = await toolModel.getTool(req);

        if (tool.length === 0) {
            return setErrorMessage(res, 404, 'Tool not found', `Tool with id ${req.params.id} does not exist`);
        }

        let metrics = await getLast30DaysByToolId(tool.id);
        metrics.avg_sessions_minutes = metrics.avg_sessions_minutes === null ? 0 : Math.round(metrics.avg_sessions_minutes);

        tool.usage_metrics = {
            last_30_days: {
                total_sessions: metrics.total_sessions,
                avg_sessions_minutes: metrics.avg_sessions_minutes
            }
        }

        res.json(tool);
    } catch (error) {
        return setErrorMessage(res, 500, 'Internal Server Error', `Database connexion failed`);
    }
}

exports.getCountTools = async (req, res) => {
    try {
        const total = await toolModel.getCountTools();
        res.json({ total });
    } catch (error) {
        return setErrorMessage(res, 500, 'Internal Server Error', `Database connexion failed`);
    }
}
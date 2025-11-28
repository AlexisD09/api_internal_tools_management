const ToolValidator = require('../validators/toolValidator');

async function validateTool(req, res, next) {
    try {
        const {name, monthly_cost, owner_department, website_url, category_id, vendor, description} = req.body;

        ToolValidator.validateToolName(name);
        ToolValidator.validateToolMonthlyCost(monthly_cost);
        ToolValidator.validateToolOwnerDepartment(owner_department);
        ToolValidator.validateToolWebsiteUrl(website_url);
        await ToolValidator.validateToolCategoryId(category_id);
        ToolValidator.validateToolVendor(vendor);
        ToolValidator.validateToolDescription(description);

        next();
    } catch (error) {
        res.status(400).json({
            error: "Validation failed",
            message: error.message
        });
    }
}

module.exports = validateTool;
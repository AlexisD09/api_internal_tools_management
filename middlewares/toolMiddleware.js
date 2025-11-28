const ToolValidator = require('../validators/toolValidator');

function validateTool(isUpdate = false) {
    return async (req, res, next) => {
        try {
            const {name, monthly_cost, owner_department, website_url, category_id, vendor, description, status} = req.body;

            ToolValidator.validateToolName(name, isUpdate);
            ToolValidator.validateToolMonthlyCost(monthly_cost, isUpdate);
            ToolValidator.validateToolOwnerDepartment(owner_department, isUpdate);
            ToolValidator.validateToolWebsiteUrl(website_url);
            await ToolValidator.validateToolCategoryId(category_id, isUpdate);
            ToolValidator.validateToolVendor(vendor, isUpdate);
            ToolValidator.validateToolDescription(description, isUpdate);

            if(isUpdate){
                ToolValidator.validateToolStatus(status);
            }

            next();
        } catch (error) {
            res.status(400).json({
                error: "Validation failed",
                message: error.message
            });
        }
    }
}

module.exports = validateTool;
const db = require("../config/database");

exports.getAnalyticDepartmentCosts = async (req) => {
    const allowedSort = ["total_cost", "department"];
    const allowedOrder = ["asc", "desc"];

    let sortBy = allowedSort.includes(req.query.sort_by) ? req.query.sort_by : "department";
    let order = allowedOrder.includes(req.query.order) ? req.query.order : "desc";

    const [rows] = await db.query(`
        SELECT 
            owner_department as department,
            SUM(monthly_cost) AS total_cost,
            COUNT(*) as tools_count,
            SUM(active_users_count) AS total_users
        FROM tools
        GROUP BY owner_department
        ORDER BY ${sortBy} ${order}
    `);

    return rows;
}
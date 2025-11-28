const db = require('../config/database');
const categoryModel = require('../models/categoryModel');

const allowedColumns = ['department', 'status', 'min_cost', 'max_cost', 'category'];

exports.getTools = async (filters) => {
    const conditions = [];
    const values = [];

    for (const key in filters) {
        const value = filters[key];
        if (!value || !allowedColumns.includes(key)) continue;

        switch (key) {
            case 'department':
                conditions.push('owner_department = ?');
                values.push(value);

                break;
            case 'min_cost':
                conditions.push('monthly_cost >= ?');
                values.push(value);

                break;
            case 'max_cost':
                conditions.push('monthly_cost <= ?');
                values.push(value);

                break;
            case 'category':
                const categoryId = await categoryModel.getCategoryIdByName(value);

                if (categoryId) {
                    conditions.push('category_id = ?');
                    values.push(categoryId);
                } else {
                    conditions.push('1 = 0');
                }

                break;
            default:
                conditions.push(`${key} = ?`);
                values.push(value);
        }
    }

    let sql = 'SELECT * FROM tools';
    if (conditions.length > 0) {
        sql += ' WHERE ' + conditions.join(' AND ');
    }

    const [rows] = await db.query(sql, values);

    return rows;
};

exports.getTool = async (req) => {
    const [[row]] = await db.query(
        'SELECT * FROM tools WHERE id = ?',
        [req.params.id]
    );

    return row;
};

exports.getCountTools = async () => {
    const [rows] = await db.query('SELECT COUNT(*) as total FROM tools');

    return rows[0].total;
}

exports.postTool = async ({ name, description, monthly_cost, owner_department, website_url, category_id, vendor }) => {
    const query = `
        INSERT INTO tools (name, description, vendor, website_url, category_id, monthly_cost, owner_department)
        VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

    const [insertResult] = await db.query(query, [
        name,
        description,
        vendor,
        website_url,
        category_id,
        monthly_cost,
        owner_department
    ]);

    const [[row]] = await db.query(`SELECT * FROM tools WHERE id = ?`, [insertResult.insertId]);

    return row;
}
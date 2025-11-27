const express = require('express');
const router = express.Router();
const db = require('../config/database');

router.get('/', async (req, res) => {
    const allowedColumns = ['id', 'department', 'status', 'min_cost', 'max_cost', 'category'];
    const filters = req.query;
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
                const [[categoryRow]] = await db.query(
                    'SELECT id FROM categories WHERE name = ?',
                    [value]
                );
                if (categoryRow) {
                    conditions.push('category_id = ?');
                    values.push(categoryRow.id);
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

    try {
        const [rows] = await db.query(sql, values);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Aucun outil trouvé' });
        }

        res.json({
            data: rows,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
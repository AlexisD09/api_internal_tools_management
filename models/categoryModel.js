const db = require('../config/database');

async function getCategoryIdByName(name) {
    const [[row]] = await db.query(
        'SELECT id FROM categories WHERE name = ?', [name]
    );
    return row ? row.id : null;
}

module.exports = { getCategoryIdByName };
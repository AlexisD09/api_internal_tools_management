const db = require('../config/database');

exports.getCategoryIdByName = async name => {
    const [[row]] = await db.query(
        'SELECT id FROM categories WHERE name = ?', [name]
    );
    return row ? row.id : null;
}
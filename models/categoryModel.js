const db = require('../config/database');

/**
 * Récupère le nom d'une catégorie grace à son ID
 * @param name Nom de la catégorie
 * @returns {Promise<*|null>}
 */
exports.getCategoryIdByName = async name => {
    const [[row]] = await db.query(
        'SELECT id FROM categories WHERE name = ?', [name]
    );
    return row ? row.id : null;
}
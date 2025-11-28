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

/**
 * Vérifie qu'un ID de catégorie existe bien
 * @param id ID à tester
 * @returns {Promise<*|null>}
 */
exports.idCategoryExist = async (id) => {
    const [[row]] = await db.query(
        'SELECT id FROM categories WHERE id = ?', [id]
    )

    return row ? row.id : null;
}
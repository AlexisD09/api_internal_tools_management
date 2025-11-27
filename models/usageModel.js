const db = require('../config/database');

/**
 * Récupère le nombre de session et le temps d'usage moyens d'un outil
 * @param id ID de l'outil
 * @returns {Promise<*>}
 */
exports.getLast30DaysByToolId = async id => {
    const [[row]] = await db.query(
        `SELECT 
            COUNT(*) AS total_sessions,
            AVG(usage_minutes) AS avg_sessions_minutes
            FROM usage_logs
            WHERE session_date >= CURDATE() - INTERVAL 30 DAY 
                AND tool_id = ?`, [id]
    );
    return row;
}
const db = require('../config/database');

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
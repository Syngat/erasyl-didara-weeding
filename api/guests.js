import { Pool } from "pg";

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

export default async function handler(req, res) {

    try {

        const result = await pool.query(`
            SELECT
                id,
                fullname,
                attendance,
                created_at
            FROM rsvp
            ORDER BY id DESC
        `);

        res.status(200).json(result.rows);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Database error"
        });

    }

}
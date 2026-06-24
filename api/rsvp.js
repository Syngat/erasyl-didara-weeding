import { Pool } from "pg";

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

export default async function handler(req, res) {

    if (req.method !== "POST") {
        return res.status(405).json({
            message: "Only POST allowed"
        });
    }

    try {

        const { fullname, attendance } = req.body;

        if (!fullname || attendance === undefined) {

            return res.status(400).json({
                message: "Заполните все поля"
            });

        }

        await pool.query(
            `
            INSERT INTO rsvp
            (fullname, attendance)
            VALUES ($1, $2)
            `,
            [
                fullname,
                attendance === "yes"
            ]
        );

        return res.status(200).json({
            message: "Спасибо! Ваш ответ сохранён."
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Ошибка сервера"
        });

    }

}
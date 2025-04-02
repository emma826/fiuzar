import { Client } from 'pg';

import { NextResponse } from 'next/server';

export async function GET() {
    const client = new Client({
        connectionString: process.env.DATABASE_URL, // Ensure this is set in your environment variables
        ssl: {
            rejectUnauthorized: false,
        },
    });

    try {
        await client.connect();
        const query = `
            CREATE TABLE IF NOT EXISTS blogs (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                meta_description VARCHAR(255),
                image VARCHAR(255) NOT NULL,
                url VARCHAR(255) UNIQUE NOT NULL,
                body TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                author VARCHAR(100),
                category VARCHAR(100),
                status VARCHAR(50) DEFAULT 'draft'
            );
        `;

        await client.query(query);
        console.log('Table "blogs" created successfully.');

        return NextResponse.json({ success: true, message: "Table created successfully" })
    } catch (error) {
        console.error('Error creating table:', error);

        return NextResponse.json({ success: false, error })
    } finally {
        await client.end();
    }
}
import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function POST(req: NextRequest) {
  try {
    const { name, email, field } = await req.json();

    if (!name || !email || !field) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

const db = await mysql.createConnection({
      host: process.env.DB_HOST!,
      user: process.env.DB_USER!,
      password: process.env.DB_PASSWORD!,
      database: process.env.DB_NAME!,
    });

    await db.execute(
      'INSERT INTO team_applications (name, email, field_of_study) VALUES (?, ?, ?)',
      [name, email, field]
    );

    await db.end();

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Application error:', err);
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
  try {
    const { locale, keyPath, value } = await req.json();

    if (!locale || !keyPath || typeof value !== 'string') {
      return NextResponse.json({ error: 'Missing parameters (locale, keyPath, value)' }, { status: 400 });
    }

    if (locale !== 'es' && locale !== 'en') {
      return NextResponse.json({ error: 'Invalid locale' }, { status: 400 });
    }

    const filePath = path.join(process.cwd(), 'messages', `${locale}.json`);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const messages = JSON.parse(fileContent);

    // Update nested key (e.g., 'landing.heroTitle1' or 'common.brand')
    const keys = keyPath.split('.');
    let current = messages;
    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) {
        current[keys[i]] = {};
      }
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;

    // Write back to file formatted
    fs.writeFileSync(filePath, JSON.stringify(messages, null, 2) + '\n', 'utf-8');

    return NextResponse.json({ success: true, locale, keyPath, value });
  } catch (error: any) {
    console.error('Error saving text edit to dictionary:', error);
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 });
  }
}

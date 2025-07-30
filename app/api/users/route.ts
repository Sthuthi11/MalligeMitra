// app/api/users/route.ts
import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { User } from '../../../types'; 

const usersFilePath = path.join(process.cwd(), 'data', 'users.json');

export async function GET(request: Request) {
  try {
    const fileContent = await fs.readFile(usersFilePath, 'utf-8');
    const users: User[] = JSON.parse(fileContent);

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('id');

    if (userId) {
      const user = users.find(u => u.id === userId);
      if (user) {
        return NextResponse.json(user, { status: 200 });
      }
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error('API Error (/api/users/route.ts):', error);
    return NextResponse.json({ message: 'Internal Server Error', error: (error as Error).message }, { status: 500 });
  }
}
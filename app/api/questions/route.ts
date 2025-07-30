import { NextResponse } from 'next/server';
import { Question } from '../../../types/forum';
import { v4 as uuidv4 } from 'uuid';
import { readForumData, writeForumData } from '../../../lib/forum-data'; // Import the new utility functions

export async function GET() {
    const data = await readForumData();
    // Sort questions by createdAt in descending order (most recent first)
    const sortedQuestions = data.questions.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return NextResponse.json(sortedQuestions);
}

export async function POST(request: Request) {
    const { title, content, authorId, authorUsername } = await request.json();

    if (!title || !content || !authorId || !authorUsername) {
        return NextResponse.json({ message: 'Missing required fields or authentication info.' }, { status: 400 });
    }

    const newQuestion: Question = {
        id: uuidv4(), // Generate a unique ID for the new question
        title,
        content,
        authorId,
        authorUsername,
        createdAt: new Date().toISOString(),
        answersCount: 0, // New questions start with 0 answers
    };

    const data = await readForumData();
    data.questions.push(newQuestion); // Add the new question to the questions array
    await writeForumData(data); // Write the updated data back to the file

    return NextResponse.json(newQuestion, { status: 201 });
}

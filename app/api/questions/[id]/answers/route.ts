import { NextResponse } from 'next/server';
import { Answer } from '../../../../../types/forum';
import { v4 as uuidv4 } from 'uuid';
import { readForumData, writeForumData } from '../../../../../lib/forum-data'; // Import the new utility functions

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const { id: questionId } = params;

    const data = await readForumData(); // Read all forum data from the JSON file
    
    const filteredAnswers = data.answers
        .filter((a: Answer) => a.questionId === questionId) // Filter for answers related to this question
        .sort((a: Answer, b: Answer) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()); // Sort by creation date

    return NextResponse.json(filteredAnswers);
}

export async function POST(request: Request, { params }: { params: { id: string } }) {
    const { id: questionId } = params;
    const { content, authorId, authorUsername } = await request.json();

    if (!content || !authorId || !authorUsername) {
        return NextResponse.json({ message: 'Missing required fields or authentication info.' }, { status: 400 });
    }

    const data = await readForumData(); // Read all forum data

    const question = data.questions.find(q => q.id === questionId);
    if (!question) {
        return NextResponse.json({ message: 'Question not found' }, { status: 404 });
    }

    const newAnswer: Answer = {
        id: uuidv4(), // Generate a unique ID for the new answer
        questionId,
        content,
        authorId,
        authorUsername,
        createdAt: new Date().toISOString(),
    };

    data.answers.push(newAnswer); // Add the new answer to the global answers array

    // Increment answersCount for the specific question and save it back
    const questionIndex = data.questions.findIndex(q => q.id === questionId);
    if (questionIndex !== -1) {
        data.questions[questionIndex].answersCount = (data.questions[questionIndex].answersCount || 0) + 1;
    }

    await writeForumData(data); // Write the updated data (with new answer and updated answersCount) back to the file

    return NextResponse.json(newAnswer, { status: 201 });
}
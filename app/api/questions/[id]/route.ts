import { NextResponse } from 'next/server';
import { readForumData, writeForumData } from '../../../../lib/forum-data'; // Import the new utility functions

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    const data = await readForumData(); // Read all forum data from the JSON file
    const question = data.questions.find(q => q.id === id); // Find the specific question by ID

    if (!question) {
        return NextResponse.json({ message: 'Question not found' }, { status: 404 });
    }

    return NextResponse.json(question);
}

// DELETE and PUT methods also use the shared utility:

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    const data = await readForumData();
    const initialLength = data.questions.length;
    data.questions = data.questions.filter(q => q.id !== id); // Filter out the question to delete

    if (data.questions.length === initialLength) {
        return NextResponse.json({ message: 'Question not found' }, { status: 404 });
    }

    // Also remove any answers associated with this question
    data.answers = data.answers.filter((a: any) => a.questionId !== id);

    await writeForumData(data); // Write the updated data back to the file

    return NextResponse.json({ message: 'Question deleted successfully' }, { status: 200 });
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    const { title, content } = await request.json(); // Assuming you can update title/content

    const data = await readForumData();
    const questionIndex = data.questions.findIndex(q => q.id === id);

    if (questionIndex === -1) {
        return NextResponse.json({ message: 'Question not found' }, { status: 404 });
    }

    // Update the question properties
    if (title) data.questions[questionIndex].title = title;
    if (content) data.questions[questionIndex].content = content;
    data.questions[questionIndex].createdAt = new Date().toISOString(); // Using createdAt here for simplicity, ideally add an 'updatedAt' field

    await writeForumData(data);

    return NextResponse.json(data.questions[questionIndex], { status: 200 });
}
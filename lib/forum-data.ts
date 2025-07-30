import fs from 'fs/promises';
import path from 'path';
import { Question } from '../types/forum'; 

const DATA_FILE_PATH = path.join(process.cwd(), 'data', 'forum-data.json');

// Interface for the overall data structure
interface ForumData {
    questions: Question[];
    answers: any[]; 
}

/**
 * Reads the forum data (questions and answers) from the JSON file.
 * If the file doesn't exist, it initializes it with empty data.
 * @returns Promise<ForumData> The parsed forum data.
 */
export async function readForumData(): Promise<ForumData> {
    try {
        const fileContents = await fs.readFile(DATA_FILE_PATH, 'utf-8');
        const data: ForumData = JSON.parse(fileContents);
        // Ensure data has 'questions' and 'answers' arrays
        if (!data.questions) data.questions = [];
        if (!data.answers) data.answers = [];
        return data;
    } catch (error: any) {
        if (error.code === 'ENOENT') {
            // File does not exist, initialize with empty data
            console.warn(`Forum data file not found at ${DATA_FILE_PATH}, creating a new one.`);
            const defaultData: ForumData = { questions: [], answers: [] };
            await fs.writeFile(DATA_FILE_PATH, JSON.stringify(defaultData, null, 2), 'utf-8');
            return defaultData;
        }
        console.error('Error reading or parsing forum data file:', error);
        // Fallback to empty data if there's a serious error
        return { questions: [], answers: [] };
    }
}

/**
 * Writes the forum data (questions and answers) to the JSON file.
 * @param data The ForumData object to write.
 * @returns Promise<void>
 */
export async function writeForumData(data: ForumData): Promise<void> {
    try {
        await fs.writeFile(DATA_FILE_PATH, JSON.stringify(data, null, 2), 'utf-8');
    } catch (error) {
        console.error('Error writing forum data file:', error);
    }
}

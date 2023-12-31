import path from 'path';
import matter from 'gray-matter';
import { promises as fs } from "fs";

const postsDirectory = path.join(process.cwd(), 'posts');

export const readFile = async (path: string) => {
    return await fs.readFile(path, 'utf8');
}

export async function getSortedPostsData() {
    // Get file names under /posts
    const fileNames = await fs.readdir(postsDirectory);
    const allPostsData = fileNames.map(async (fileName) => {
        // Remove ".md" from file name to get id
        const id = fileName.replace(/\.md$/, '');

        // Read markdown file as string
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = await readFile(fullPath);

        // Use gray-matter to parse the post metadata section
        const matterResult = matter(fileContents);

        // Combine the data with the id
        return {
            id,
            ...matterResult.data,
        };
    });
    // Sort posts by date
    return allPostsData.sort((a, b) => {
        if (a.date < b.date) {
            return 1;
        } else {
            return -1;
        }
    });
}

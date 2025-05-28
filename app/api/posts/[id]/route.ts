import {readFile} from "@/lib/util";
import path from "path";

export const GET = async (request : any, { params } : { params: any}) => {
    try {
        const fileData = await readFile(path.join(process.cwd(), 'posts', params.id));
        return new Response(JSON.stringify(fileData), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        return new Response("Not Found", { status: 404 });
    }
};


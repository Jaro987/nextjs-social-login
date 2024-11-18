import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";

const UPLOAD_DIR = path.resolve(process.env.ROOT_PATH ?? "", "public");


export const POST = async (req: NextRequest) => {
    try {
        const formData = await req.formData();
        const body = Object.fromEntries(formData);
        const file = (body.file as Blob) || null;

        if (file) {
            const buffer = Buffer.from(await file.arrayBuffer());

            if (!fs.existsSync(UPLOAD_DIR)) {
                fs.mkdirSync(UPLOAD_DIR, { recursive: true });
            }

            fs.writeFileSync(
                path.resolve(UPLOAD_DIR, (body.file as File).name),
                new Uint8Array(buffer)
            );

            return NextResponse.json({
                success: true,
                name: (body.file as File).name,
            });
        } else {
            return NextResponse.json({
                success: false,
                message: 'No file provided',
            });
        }
    } catch (error) {
        console.error('Error processing file upload:', error);
        return NextResponse.json({
            success: false,
            message: 'An error occurred during upload',
        });
    }
};

import { NextRequest, NextResponse } from 'next/server';
import { fileUploadSchema } from 'lib/validation';

// File upload configuration
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_FILE_TYPES = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain',
    'application/zip',
    'application/x-zip-compressed'
];

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const files = formData.getAll('files') as File[];

        if (!files || files.length === 0) {
            return NextResponse.json(
                { success: false, message: 'No files provided' },
                { status: 400 }
            );
        }

        const uploadedFiles: string[] = [];

        for (const file of files) {
            // Validate file size
            if (file.size > MAX_FILE_SIZE) {
                return NextResponse.json(
                    { success: false, message: `File ${file.name} exceeds 10MB limit` },
                    { status: 400 }
                );
            }

            // Validate file type
            if (!ALLOWED_FILE_TYPES.includes(file.type)) {
                return NextResponse.json(
                    { success: false, message: `File type ${file.type} not allowed` },
                    { status: 400 }
                );
            }

            // Validate with schema
            try {
                fileUploadSchema.parse({
                    fileName: file.name,
                    fileType: file.type,
                    fileSize: file.size,
                });
            } catch (error) {
                return NextResponse.json(
                    { success: false, message: 'Invalid file data' },
                    { status: 400 }
                );
            }

            // TODO: Upload to cloud storage (Cloudinary, AWS S3, etc.)
            // For now, we'll simulate file upload and return a placeholder URL
            const fileId = `file_${Date.now()}_${Math.random().toString(36).substring(7)}`;
            const fileUrl = `https://storage.web3ssh.dev/uploads/${fileId}_${file.name}`;

            // In a real implementation, you would:
            // 1. Upload file to cloud storage
            // 2. Get the actual URL
            // 3. Optionally save file metadata to database

            uploadedFiles.push(fileUrl);
        }

        return NextResponse.json({
            success: true,
            message: `${files.length} file(s) uploaded successfully`,
            files: uploadedFiles,
        });

    } catch (error) {
        console.error('File upload error:', error);
        return NextResponse.json(
            { success: false, message: 'Internal server error' },
            { status: 500 }
        );
    }
}

// Handle GET requests (not allowed for file upload)
export async function GET() {
    return NextResponse.json(
        { success: false, message: 'Method not allowed' },
        { status: 405 }
    );
}

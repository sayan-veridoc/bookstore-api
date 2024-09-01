import { Injectable, Inject } from '@nestjs/common';
import { app, storage } from 'firebase-admin';

@Injectable()
export class FirebaseService {
  private readonly storage: storage.Storage;

  constructor(@Inject('FIREBASE_APP') private readonly firebaseApp: app.App) {
    this.storage = this.firebaseApp.storage();
  }
  getStorageInstance(): storage.Storage {
    return this.storage;
  }

  async uploadFile(
    file: Express.Multer.File,
    destination: string,
  ): Promise<string> {
    const bucket = this.getStorageInstance().bucket();
    const fileUpload = bucket.file(destination);

    // Create a write stream for the file
    const blobStream = fileUpload.createWriteStream({
      resumable: false,
      contentType: file.mimetype,
    });

    return new Promise<string>((resolve, reject) => {
      blobStream.on('error', (err) => {
        console.error('Upload error:', err);
        reject('Upload failed');
      });

      blobStream.on('finish', async () => {
        try {
          // Generate a signed URL for the uploaded file
          const [signedUrl] = await fileUpload.getSignedUrl({
            version: 'v4',
            action: 'read',
            expires: Date.now() + 30 * 24 * 60 * 60 * 1000, // 30 days
          });

          resolve(signedUrl);
        } catch (error) {
          console.error('Signed URL generation error:', error);
          reject('Failed to generate signed URL');
        }
      });

      blobStream.end(file.buffer);
    });
  }
}

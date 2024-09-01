import { Module } from '@nestjs/common';
import { FirebaseService } from './firebase.service';
import * as admin from 'firebase-admin';
import { ConfigModule, ConfigService } from '@nestjs/config';

const firebaseProvider = {
  provide: 'FIREBASE_APP',
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    const firebaseConfig = {
      projectId: configService.getOrThrow<string>('PROJECT_ID'),
      privateKey: configService
        .getOrThrow<string>('PRIVATE_KEY')
        .replace(/\\n/g, '\n'),
      clientEmail: configService.getOrThrow<string>('CLIENT_EMAIL'),
    } as admin.ServiceAccount;

    return admin.initializeApp({
      credential: admin.credential.cert(firebaseConfig),
      // databaseURL: `https://${firebaseConfig.projectId}.firebaseio.com`,
      storageBucket: `${firebaseConfig.projectId}.appspot.com`,
    });
  },
};

@Module({
  imports: [ConfigModule],
  providers: [firebaseProvider, FirebaseService],
  exports: [FirebaseService],
})
export class FirebaseModule {}

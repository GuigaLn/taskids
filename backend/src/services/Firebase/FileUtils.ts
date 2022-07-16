import crypto from 'crypto';
import admin from 'firebase-admin';
import { v4 as uuidv4 } from 'uuid';

const serviceAccount = require('../../config/serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'gotask-f60a1.appspot.com'
});

const bucket = 'gotask-f60a1.appspot.com';

const bucketAdmin = admin.storage().bucket();

export const uploadImage = (Request: any, typeImagePath: string, cb: any) => {
 
  try {
    if(!Request.file) {
      cb(null);
    }

    const uuid = uuidv4();
    const image = Request.file;
    const fileHash = crypto.randomBytes(10).toString('hex');
    const imageName = `${fileHash}-${image.originalname}`;
    const file =  bucketAdmin.file(typeImagePath + imageName);
    const stream = file.createWriteStream({
      metadata: {
        metadata: {
          contentType: image.mimetype,
          firebaseStorageDownloadTokens: uuid
        }
      }
    });

    stream.on("error", (error) => {
      console.log(error)
      cb(null);
    });

    stream.on("finish", async () => {
      //tonar o arquivo publico
      await file.makePublic();

      //obter url
      const pathBucket = `${typeImagePath}${imageName}`;
      const url = `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${encodeURIComponent(pathBucket)}?alt=media&token=${uuid}`;

      cb({url, pathBucket});
    });

    stream.end(image.buffer);
  } catch(err) {
    cb(null);
  }
}

export const deleteImage = (url: any, cb: any) => {
  try {
    if(!url) {
      cb(null);
    }

    const baseUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/`;

    const urlDecode = decodeURIComponent(url);
    let path = urlDecode.replace(baseUrl,"");

    const indexOfEndPath = path.indexOf("?");
    
    path = path.substring(0,indexOfEndPath);

    const file =  bucketAdmin.file(path);
    file.delete();

    cb(true);

  } catch(err) {
    cb(null);
  }
}
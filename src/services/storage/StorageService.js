// eslint-disable-next-line import/no-extraneous-dependencies
const { Storage } = require('@google-cloud/storage');
// const path = require('path');

class StorageService {
  constructor(keyFileCredential, pesanService) {
    // Inisialisasi client Google Cloud Storage
    this.storage = new Storage({
      keyFilename: keyFileCredential, // hapus semua parameter storage ketika dideploy
      projectId: process.env.PROJECT_ID, // Ganti dengan ID proyek Google Cloud Anda
    });
    this.BUCKET_NAME = process.env.BUCKET_NAME;
    this.UPLOAD_PATH = 'uploads/';
    this._pesanService = pesanService;
  }

  writeFile(file, meta) {
    const bucket = this.storage.bucket(this.BUCKET_NAME);
    const filename = +new Date() + meta.filename;

    console.log(this.BUCKET_NAME);
    const fileStream = bucket.file(this.UPLOAD_PATH + filename).createWriteStream({
      resumable: false,
      metadata: {
        contentType: file.hapi.headers['content-type'],
      },
    });

    return new Promise((resolve, reject) => {
      fileStream.on('error', (error) => reject(error.message || 'Upload failed'));
      fileStream.on('finish', () => {
        const url = `https://storage.googleapis.com/${this.BUCKET_NAME}/${this.UPLOAD_PATH}${filename}`;
        resolve(url);
      });
      file.pipe(fileStream);
    });
  }

  async deleteFile(mitra_id) {
    const Url = await this._pesanService.getUrlByMitraId(mitra_id);
    console.log('ini url');
    console.log(Url);
    const imageUrl = await Url;
    const bucket = this.storage.bucket(this.BUCKET_NAME);
    const parsedUrl = new URL(imageUrl);
    const filePath = parsedUrl.pathname.replace(`/${this.BUCKET_NAME}/`, '');

    const file = bucket.file(filePath);

    return file.delete();
  }
}

module.exports = StorageService;

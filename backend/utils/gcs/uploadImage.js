// upload image helper
import gcs from "./gcs.js";

const bucket = gcs.bucket("appointment-node-gcs");

export default (file) =>
  new Promise((resolve, reject) => {
    // Pastikan objek file terdefinisi dan memiliki properti yang diperlukan
    if (!file || !file.originalname || !file.buffer) {
      reject("Invalid file object");
      return;
    }

    // Destructure objek file
    const { originalname, buffer } = file;

    // Inisialisasi objek file di GCS
    const blob = bucket.file(originalname.replace(/ /g, "_"));

    // Write to GCS menggunakan stream
    const blobStream = blob.createWriteStream({
      resumable: false,
    });

    // Event handler untuk penyelesaian penulisan stream
    blobStream
      .on("finish", () => {
        const format = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
        resolve(format);
      })
      .on("error", (err) => {
        console.error(`[uploadImage] Unable to upload image: ${err}`);
        reject(`[uploadImage] Unable to upload image: ${err}`);
      })
      .end(buffer);
  });

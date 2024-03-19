"use client";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { app, db } from "../config/Firebase";

export const UploadFile = (file) => {
  console.log("file upload file", file);
  const storage = getStorage(app);
  const filename = new Date().getTime() + file.name;
  const storageRef = ref(storage, filename);
  const uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // console.log("progress", progress);
        switch (snapshot.state) {
          case "paused":
            // console.log("Upload is paused");
            break;
          case "running":
            // console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {
        // Handle errors during the upload
        reject(error);
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            console.log(downloadURL);
            resolve(downloadURL); // Resolve the promise with the download URL
          })
          .catch((error) => {
            reject(error); // Reject the promise if there is an error getting the download URL
          });
      }
    );
  });
};

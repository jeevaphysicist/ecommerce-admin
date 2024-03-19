// getCroppedImg.js
export default function CropImage(imageUrl, croppedAreaPixels) {
    const img = new Image();
    img.src = imageUrl;
  
    const canvas = document.createElement("canvas");
    canvas.width = croppedAreaPixels.width;
    canvas.height = croppedAreaPixels.height;
  
    const ctx = canvas.getContext("2d");
    ctx.drawImage(
      img,
      croppedAreaPixels.x,
      croppedAreaPixels.y,
      croppedAreaPixels.width,
      croppedAreaPixels.height,
      0,
      0,
      croppedAreaPixels.width,
      croppedAreaPixels.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob((file) => {
        file.name = 'cropped.jpeg';
        resolve({ file: file, url: URL.createObjectURL(file) });
      }, 'image/jpeg');
    });
  }
  
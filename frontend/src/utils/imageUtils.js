// utils/imageUtils.js
export const resizeImageToMaxBytes = (base64Image, maxBytes) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = base64Image;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        let quality = 1;
  
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
  
        let newBase64Image = canvas.toDataURL("image/jpeg", quality);
        let byteLength = newBase64Image.length * 0.75;  // Base64 string length to byte length
  
        // 画質を下げるループ
        while (byteLength > maxBytes && quality > 0.1) {
          quality -= 0.1;
          newBase64Image = canvas.toDataURL("image/jpeg", quality);
          byteLength = newBase64Image.length * 0.75;
        }
  
        if (quality < 0.1) {
          reject("Couldn't reduce image size enough.");
        } else {
          resolve(newBase64Image);
        }
      };
      img.onerror = () => reject("Image loading failed");
    });
  };
  
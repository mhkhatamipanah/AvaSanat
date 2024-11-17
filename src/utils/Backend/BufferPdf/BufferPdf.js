export const handlePdfBuffer = async (pdfFile) => {
    try {
      if (!pdfFile) {
        throw new Error("No file provided");
      }
  
      // محدود کردن حجم فایل به 15 مگابایت
      const MAX_FILE_SIZE = 15 * 1024 * 1024; // 15 مگابایت
      if (pdfFile.size > MAX_FILE_SIZE) {
        throw new Error("File size exceeds the 15MB limit");
      }
  
      // تبدیل فایل PDF به ArrayBuffer
      const bufferData = await pdfFile.arrayBuffer();
      
      // تبدیل ArrayBuffer به Node.js Buffer
      const buffer = Buffer.from(bufferData);
  
      return buffer;
    } catch (error) {
      console.error("Error while buffering PDF file:", error.message);
      throw error;
    }
  };
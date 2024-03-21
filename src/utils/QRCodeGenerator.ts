import qr from 'qrcode';
import fs from 'fs';
import path from 'path';

// Function to generate QR code and save it to a file
export const generateQRCode = async (data: string, filePath: string): Promise<void> => {
  try {
    // Generate QR code as a data URI
    const qrCodeDataURI = await qr.toDataURL(data);

    // Convert data URI to buffer
    const buffer = Buffer.from(qrCodeDataURI.split(',')[1], 'base64');

    

    // Write buffer to file asynchronously
    await fs.promises.writeFile(filePath, buffer);

    console.log('QR code generated and saved successfully');
  } catch (error) {
    console.error('Error generating QR code:', error);
    throw new Error('Error generating QR code');
  }
};

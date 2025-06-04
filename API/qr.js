import { generateQRCode } from './Api.js';

function saveQRCodeData(text) {
  console.log('POSTing QR code text to server (simulated):', text);
  return Promise.resolve(true); 
}



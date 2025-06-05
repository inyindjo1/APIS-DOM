import { generateQRCode } from './Api.js';


function saveQRCodeData(text) {
  console.log('POSTing QR code text to server (simulated):', text);
  return Promise.resolve(true); 
}

function saveToHistory(text) {
  const history = JSON.parse(sessionStorage.getItem('qrHistory')) || [];
  const exists = history.find(item => item.text === text);
  if (!exists) {
    history.push({ text, date: new Date().toISOString() });
    if (history.length > 10) history.pop();
    sessionStorage.setItem('qrHistory', JSON.stringify(history));
  }
}

function getHistory() {
  return JSON.parse(sessionStorage.getItem('qrHistory')) || [];
}


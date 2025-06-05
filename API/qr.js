import { generateQRCode } from './Api.js';


function saveQRCodeData(text) {
  console.log('POSTing QR code text to server (simulated):', text);
  return Promise.resolve(true); 
}

function saveToHistory(text) {
  const history = JSON.parse(session.getItem('qrHistory')) || [];
  const exists = history.find(item => item.text === text);
  if (!exists) {
    history.push({ text, date: new Date().toString() });
    if (history.length > 10) history.pop();
    session.setItem('qrHistory', JSON.stringify(history));
  }
}

function getHistory() {
  return JSON.parse(session.getItem('qrHistory')) || [];
}

const generateBtn = document.getElementById('generateBtn');
const resetBtn = document.getElementById('resetBtn');
const qrTextInput = document.getElementById('qrText');
const qrImg = document.getElementById('qrcode');
const downloadLink = document.getElementById('downloadLink');
const historyList = document.getElementById('historyList');

function renderHistory() {
  const history = getHistory();
  historyList.innerHTML = '';
  if (history.length === 0) {
    historyList.innerHTML = '<li>No history yet</li>';
    return;
  }
  history.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.text} (saved ${new Date(item.date).toString()})`;
    li.addEventListener('click', () => {
      qrTextInput.value = item.text;
      generateBtn.click();
    });
    historyList.appendChild(li);
  });
}


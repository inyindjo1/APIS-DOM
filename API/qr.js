import { generateQRCode } from './Api.js';

const memoryHistory = [];

function saveQRCodeData(text) {
  console.log('POSTing QR code text to server (simulated):', text);
  return Promise.resolve(true); 
}

function saveToHistory(text) {
  const exists = memoryHistory.find(item => item.text === text);
  if (!exists) {
    memoryHistory.push({ text, date: new Date().toISOString() });
    if (memoryHistory.length > 10) memoryHistory.shift();
  }
}

function getHistory() {
  return memoryHistory;
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
    historyList.innerHTML = 'No history yet';
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

generateBtn.addEventListener('click', async () => {
  const input = qrTextInput.value.trim();

  if (!input) {
    alert("Please enter text or a URL.");
    qrImg.src = '';
    downloadLink.style.display = '';
    return;
  }

  const qrUrl = await generateQRCode(input);
  if (!qrUrl) {
    alert("Failed to generate QR code. Please try again.");
    return;
  }

  qrImg.src = qrUrl;
  qrImg.alt = "QR code generated successfully";

  qrImg.onload = () => {
    downloadLink.href = qrUrl;
    downloadLink.style.display = 'inline-block';
    downloadLink.download = 'qrcode.png';
  };

  
  setTimeout(async () => {
    const saved = await saveQRCodeData(input);
    if (saved) {
      saveToHistory(input);
      renderHistory();
    } else {
      console.warn('Simulated POST failed');
    }
  }, 2000); 
});

resetBtn.addEventListener('click', () => {
  qrTextInput.value = '';
  qrImg.src = '';
  qrImg.alt = '';
  downloadLink.style.display = '';
  historyList.innerHTML = 'No history yet';
});

renderHistory();


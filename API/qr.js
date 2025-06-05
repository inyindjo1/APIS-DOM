import { generateQRCode } from './Api.js';

const memoryHistory = [];

function saveQRCodeData(text) {
  console.log('[POST] Simulating server save for:', text);
  return Promise.resolve(true); 
}

function saveToHistory(text) {
  const exists = memoryHistory.find(item => item.text === text);
  if (!exists) {
    memoryHistory.push({ text, date: new Date().toISOString() });
    if (memoryHistory.length > 10) memoryHistory.shift();
    console.log('[History] Added new item:', text);
  } else {
    console.log('[History] Duplicate found, not adding:', text);
  }
}

function getHistory() {
  console.log('[History] Fetching current history:', memoryHistory);
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
    console.log('[Render] No history to display.');
    return;
  }
  console.log('[Render] Rendering history list...');
  history.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.text} (saved ${new Date(item.date).toString()})`;
    li.addEventListener('click', () => {
      qrTextInput.value = item.text;
      console.log('[History Item Click] Selected:', item.text);
      generateBtn.click();
    });
    historyList.appendChild(li);
  });
}

generateBtn.addEventListener('click', async () => {
  const input = qrTextInput.value.trim();
  console.log('[Generate] User input:', input);

  if (!input) {
    alert("Please enter text or a URL.");
    qrImg.src = '';
    downloadLink.style.display = '';
    console.warn('[Generate] No input provided.');
    return;
  }

  console.log('[Generate] Fetching QR code for:', input);
  const qrUrl = await generateQRCode(input);

  if (!qrUrl) {
    alert("Failed to generate QR code. Please try again.");
    console.error('[Generate] QR code generation failed.');
    return;
  }

  console.log('[Generate] QR code URL received:', qrUrl);
  qrImg.src = qrUrl;
  qrImg.alt = "QR code generated successfully";

  qrImg.onload = () => {
    console.log('[Generate] QR image loaded, preparing download link.');
    downloadLink.href = qrUrl;
    downloadLink.style.display = 'inline-block';
    downloadLink.download = 'qrcode.png';
  };

  setTimeout(async () => {
    console.log('[Save Delay] Waiting to save QR code to history...');
    const saved = await saveQRCodeData(input);
    if (saved) {
      console.log('[Save] QR code saved to server simulation. Updating history...');
      saveToHistory(input);
      renderHistory();
    } else {
      console.warn('[Save] Simulated POST failed');
    }
  }, 2000); 
});

resetBtn.addEventListener('click', () => {
  console.log('[Reset] Clearing input and QR display.');
  qrTextInput.value = '';
  qrImg.src = '';
  qrImg.alt = '';
  downloadLink.style.display = '';
  historyList.innerHTML = 'No history yet';
});

console.log('[Init] Initial rendering of history...');
renderHistory();

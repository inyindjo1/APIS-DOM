export async function generateQRCode(text) {
  const apiUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(text)}&size=200x200`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) Error ('Failed to fetch QR code');

    return apiUrl;
  } catch (error) {
    console.error('QR API error:', error);
    return null;
  }
}

export async function saveQRCodeData(text) {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ qrText: text, timestamp: new Date().toISOString() }),
    });

    if (!response.ok) throw new Error('Failed to save QR code data');

    return await response.json();
  } catch (error) {
    console.error('Save QR code error:', error);
    return null;
  }
}


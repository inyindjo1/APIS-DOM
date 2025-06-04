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



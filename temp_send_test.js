(async () => {
  try {
    const res = await fetch('http://localhost:3001/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: 'safalmahatara8848@gmail.com',
        subject: 'Test email from portfolio',
        html: '<p>This is a test email from your portfolio server.</p>'
      })
    });
    const text = await res.text();
    console.log('STATUS', res.status);
    console.log(text);
  } catch (e) {
    console.error('ERROR', e);
  }
})();

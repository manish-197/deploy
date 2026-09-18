async function checkLive() {
  try {
    const res = await fetch('https://arogyarakshak-ai.netlify.app/?t=' + Date.now(), {
      cache: 'no-store'
    });
    const html = await res.text();
    const match = html.match(/src="\/assets\/(index-[^"]+\.js)"/);
    if (!match) {
      console.log('No script tag found in HTML');
      return;
    }
    const scriptName = match[1];
    console.log('Live bundle on Netlify:', scriptName);

    // Fetch this bundle
    const bundleRes = await fetch(`https://arogyarakshak-ai.netlify.app/assets/${scriptName}`);
    const bundleText = await bundleRes.text();
    console.log('Contains localhost:5000?', bundleText.includes('localhost:5000'));
    console.log('Contains Render URL?', bundleText.includes('aroghyarakshak-ai.onrender.com'));
  } catch (err) {
    console.error('Check error:', err.message);
  }
}
checkLive();

const https = require('https');
const fs = require('fs');

const url = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=https://reda-website.vercel.app/&category=performance&category=accessibility&category=best-practices&category=seo';

https.get(url, (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    fs.writeFileSync('psi.json', data);
    console.log('Done writing psi.json');
  });
}).on('error', (err) => {
  console.log('Error: ' + err.message);
});

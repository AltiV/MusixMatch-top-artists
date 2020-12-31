// This file is used to create the .env file on Netlify's end

const fs = require('fs')
// Checking process.env variables on Netlify end
fs.writeFileSync(
  './.env',
  `REACT_APP_MUSIXMATCH_API_KEY = "${process.env.REACT_APP_MUSIXMATCH_API_KEY}"\n`
)

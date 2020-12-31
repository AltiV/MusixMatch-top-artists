const fs = require('fs')
// Checking process.env variables on Netlify end
fs.writeFileSync(
  './.env',
  `REACT_APP_MUSIXMATCH_API_KEY = "${process.env.REACT_APP_TEST}"\n`
)

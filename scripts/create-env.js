const fs = require('fs')
fs.writeFileSync('./.env', `REACT_APP_MUSIXMATCH_API_KEY=${process.env.REACT_APP_MUSIXMATCH_API_KEY}\n`)
# twatt-api

## REST API

List of user routes:

Route | HTTP | Description
------|------|------------
`/twatt/timeline` | GET | Get timeline
`/twatt/usertimeline` | GET | Get user timeline
`/twatt/search/:keyword` | GET | Get recent tweets update by keyword (search)
`/twatt/postStatus` | POST | Create a new twatt post

## Usage
With only npm:
```
npm install
npm start
npm run dev
```

Access from localhost via http://localhost:3000 or API via http://localhost:3000/twatt

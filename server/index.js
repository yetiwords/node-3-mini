const express = require('express');
const bodyParser = require('body-parser');
const mc = require( `./controllers/messages_controller` );
const session = require('express-session');
require('dotenv').config();
const { createInitialSession } = require('./middlewares/session');
const filter = require('./middlewares/filter');

const app = express();

app.use( bodyParser.json() );
app.use( express.static( `${__dirname}/../build` ) );
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 10000,
  }
}));
app.use(createInitialSession);

// Here's the answer from the mini. We chose to put the filter middleware inline in the route definitions below.
// app.use((req, res, next) => {
//   if (req.method === 'post' || req.method === 'put') {
//     filter(req, res, next);
//   } else {
//     next();
//   }
// });

const messagesBaseUrl = "/api/messages";
app.post( messagesBaseUrl, filter, mc.create );
app.get( messagesBaseUrl, mc.read );
app.put( `${messagesBaseUrl}`, filter, mc.update );
app.delete( `${messagesBaseUrl}`, mc.delete );
app.get(`${messagesBaseUrl}/history`, mc.history);

const port = process.env.PORT || 3000
app.listen( port, () => { console.log(`Server listening on port ${port}.`); } );
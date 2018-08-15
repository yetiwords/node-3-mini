const sessions = {};
let nextSessionId = 1;
module.exports = function(req, res, next) {
  function createSession() {
    const newSession = {};
    req.session = newSession;
    sessions[nextSessionId] = newSession;
    res.setHeader('set-cookie', 'sessionId=' + nextSessionId + '; path=/;');
    nextSessionId++;
  }
  
  if (req.headers.cookie) {
    const sessionId = req.headers.cookie.split('=')[1];
    // Look up session by cookie/session-id
    if (sessions[sessionId]) {
      req.session = sessions[sessionId];
      res.setHeader('set-cookie', 'sessionId=' + sessionId + '; path=/;');
    } else {
      createSession();
    }
  } else {
    createSession();
  }
  next();
};

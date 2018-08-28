const sessions = {};
let nextSessionId = 0;

module.exports = function( req, res, next ) { 
    function createSession() {
        nextSessionId++;
        const newSession = {};
        req.session = newSession;
        sessions[nextSessionId] = newSession;
        res.setHeader('set-cookie', 'sessionId=' + nextSessionId + '; path=/;') 
    }
    if( req.headers.cookie ) {
        const currentSessionId = req.headers.cookie.split('=')[1];
        if (sessions[currentSessionId]) {
            req.session = sessions[currentSessionId]
        } else {
            createSession();    
        }
    }   else {
        createSession();
    }
}
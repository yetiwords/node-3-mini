const notAllowed = ['poo', 'butt', 'aliswarningbutton', 'turd', 'tylerisawesome', 'atom', 'doodie pants'];

module.exports = function(req, res, next) {
  while ( notAllowed.find( word => req.body.text.includes(word) ) ) {
    const badWord = notAllowed.find( word => req.body.text.includes(word) );
    req.body.text = req.body.text.replace( badWord, '*'.repeat( badWord.length ) );
  }
  next();
}
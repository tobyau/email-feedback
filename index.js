const express = require('express'); // import express
const app = express(); // express() generates a new application
// route handlers will be associated with app

// app -> express app to register route handler
// get -> watch for incoming requests
// '/' -> watch for requests trying to access '/'
// req -> object representing request
// res -> obj representing outgoing response
app.get('/', (req, res) => {
  res.send({ hi: 'there'});
});


// heroku provide port ( process.env.PORT )
const PORT = process.env.PORT || 5000
app.listen(5000);

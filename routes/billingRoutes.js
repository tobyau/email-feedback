const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
  app.post('/api/stripe', requireLogin, async (req, res) => {
    // returns a promise
    const charge = await stripe.charges.create({
      amount: 500,
      currency: 'usd',
      description: '%5 for 5 credits',
      source: req.body.id
    });

    // set up initially by passport
    req.user.credits += 5;
    const user = await req.user.save();
    // send data back to db
    res.send(user);

  });
};

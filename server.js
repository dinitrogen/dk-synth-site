const config = require('./serverConfig');
const stripe = require('stripe')(config.secretKey);

const bodyParser = require('body-parser');
const express = require('express');
const app = express();
app.use(bodyParser.json());
// handle CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin",
        "http://localhost:4200");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// route for requests from Angular client
app.get('/api/message', (req, res) => {
    res.json({ message: 'The DK Synth server is running' });
});

app.post('/create-checkout-session', async (req, res) => {
    const session = await stripe.checkout.sessions.create({
        ui_mode: 'embedded',
        line_items: [
            {
                price: 'price_1PbprwABCYXXdeu57u7vTOOP',
                quantity: 1
            }
        ],
        mode: 'payment',
        return_url: 'http://localhost:4200/shop'
    });

    res.json({ id: session.id });
});

app.post('/api/payment', async (req, res) => {
    const paymentIntent = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: 'usd'
    })
    res.send({paymentIntent});
});

app.post('/api/paymentget', async (req, res) => {
    const paymentIntent = await stripe.paymentIntents.retrieve(req.body.paymentId);
    res.send({paymentIntent});
})


app.listen(3000, () => {
    console.log('Server listening on port 3000');
});

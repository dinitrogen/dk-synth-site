const config = require('./serverConfig');
const stripe = require('stripe')(config.secretKey);

const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const Product = require('./schema/Product')
mongoose.connect(`mongodb+srv://${config.mongooseClient}:${config.mongooseSecret}@cluster0.hxewfty.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,{dbName: 'dk_synth'});

const express = require('express');

const port = process.env.PORT || 8080;

const app = express();
app.use(bodyParser.json());


// handle CORS
// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin",
//         "http://localhost:4200");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

app.all('*', function (req, res, next) {
	res.set('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.get('/', (req, res) => {
    res.send('Hello from DK synth server!');
});

// route for requests from Angular client
app.get('/api/message', (req, res) => {
    res.json({ message: 'The DK Synth server is connected!' });
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
        return_url: ''
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
});

app.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (e) {
        res.status(500).json({error: e.message});
    }
}); 

app.listen(port, () => {
    console.log('Server listening on port ' + port);
});

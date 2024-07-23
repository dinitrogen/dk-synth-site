const config = require('./serverConfig');
const stripe = require('stripe')(config.secretKey);

const nodemailer = require('nodemailer');

const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const Product = require('./schema/Product')
mongoose.connect(`mongodb+srv://${config.mongooseClient}:${config.mongooseSecret}@cluster0.hxewfty.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,{dbName: 'dk_synth'});

const express = require('express');

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      type: "OAuth2",
      user: config.oauth.user,
      clientId: config.oauth.clientId,
      clientSecret: config.oauth.clientSecret,
      refreshToken: config.oauth.refreshToken,
      accessToken: config.oauth.accessToken,
      expires: 3599,
    },
});

function sendSignupMail(name, email) {
    transporter.sendMail({
        from: config.oauth.user, // sender address
        to: email, // list of receivers
        subject: `Hello ${name}!`, // Subject line
        text: "Thanks for signing up for our newsletter", // plain text body
        html: "<b>Thanks for signing up for the DK Synthesis newsletter</b>", // html body
    });
}

function sendContactMail(name, email, text) {
    const emailBody = `
        <div><b>From: </b><span>${name}</span></div>
        <div><b>Email: </b><span>${email}</span></div>
        <div><b>Message: </b><span>${text}</span></div>`
    
    transporter.sendMail({
        from: email, // sender address
        to: config.oauth.user, // list of receivers
        cc: email,
        subject: `Contact form submitted by ${name}!`, // Subject line
        text: "Contact form submitted", // plain text body
        html: emailBody, // html body
    });
}

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
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: req.body.amount,
            currency: 'usd'
        })
        res.send({paymentIntent});
    } catch (e) {
        res.status(500).json({error: e.message});
    }
});

app.post('/api/paymentget', async (req, res) => {
    try {
        const paymentIntent = await stripe.paymentIntents.retrieve(req.body.paymentId);
        res.send({paymentIntent});
    } catch (e) {
        res.status(500).json({error: e.message});
    }
});

app.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (e) {
        res.status(500).json({error: e.message});
    }
});

app.get('/product/:id', async (req, res) => {
    try {
        const product = await Product.findOne({'name': req.params.id});
        res.json(product);
    } catch (e) {
        res.status(500).json({error: e.message});
    }
});

app.post('/signup', async (req,res) => {
    try {
        await sendSignupMail(req.body.name, req.body.email);
        res.status(200).send({msg: "email sent"});
    } catch (e) {
        res.status(500).json({error: e.message});
    }
});

app.post('/contact', async (req, res) => {
    try {
        await sendContactMail(req.body.name, req.body.email, req.body.message);
        res.status(200).send({msg: "feedback sent"});
    } catch (e) {
        res.status(500).json({error: e.message});
    }
});

app.listen(port, () => {
    console.log('Server listening on port ' + port);
});

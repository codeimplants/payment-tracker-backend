const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;
const dbURI = `mongodb+srv://codeimplants:Code2022@paymenttracker.5hffast.mongodb.net/payment-tracker`;

const payment = require("./api/routes/payment");

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.json());
app.use(cookieParser());
app.use(cors());
dotenv.config()

mongoose.set('strictQuery', true);
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('DB connected'), app.listen(port, () => { console.log(`Running on port ${port}`); }))
    .catch((err) => console.log(err));

// Routes
app.use("/", payment);
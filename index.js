const express = require('express');
const app = express();

require('dotenv').config();

const listener = app.listen(process.env.PORT, process.env.HOST, () => {
    console.log(`Your app is listening on: ${listener.address().address}:${listener.address().port}`);
})
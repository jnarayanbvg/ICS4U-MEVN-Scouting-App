const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

const comps = require('./routes/api/comps');
app.use('/api/comps', comps);
const matches = require('./routes/api/matches');
app.use('/api/matches', matches);
const averages = require('./routes/api/averages');
app.use('/api/averages', averages);

// Handle production
if(process.env.NODE_ENV === 'production') {
    //Static folder
    app.use(express.static(__dirname + '/dist/'));

    //Handle single page applicaiton
    app.get(/.*/, (req, res) => res.sendFile(__dirname + '/dist/index.html'));
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on ${port}`));
const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const port = 8090;

app.get('/', function(req, res) {
    res.send('server is running');
})

app.get('/allContacts', function(req, res) {
    // res.send('ok');
    request('https://uinames.com/api/?ext&amount=100', function(err, response, body) {
        if (err) {
            console.log('error: ', err);
        }
        if (response) {
            let datas = JSON.parse(response.body);
            let contacts = datas.map(c  => {
                return c = {
                    name: c.name,
                    surname: c.surname,
                    phone: c.phone,
                    gender: c.gender,
                    region: c.region,
                    age: c.age,
                    email: c.email,
                    title: c.title
                }
            })
            res.json(contacts);
        }
    });
});

app.listen(port, function() {
    console.log('server is running on port ', port);
});


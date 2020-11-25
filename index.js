const express = require("express");
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
let usuario = {
 fullname:'',
 phone: ''
};
let response = {
 error: false,
 code: 200,
 msg: ''
};

app.get('/phone', function (req, res) {
    response = {
        error: false,
        code: 200,
        msg: JSON.parse(fs.readFileSync('phones.json'))
    };
    
    res.send(response);
});

app.post('/phone', function (req, res) {
    if(!req.body.fullname || !req.body.phone) {
        response = {
         error: true,
         code: 502,
         msg: 'Missing files'
        };
    } else {
        const file = JSON.parse(fs.readFileSync('./phones.json'));
        file.phones.push({
            fullname: req.body.fullname,
            phone: req.body.phone
        });
        fs.writeFileSync('./phones.json', JSON.stringify(file));

        response = {
            error: false,
            code: 200,
            msg: file
        };
    }
    res.send(response);
});

app.listen(3005, () => {
 console.log("El servidor está inicializado en el puerto 3005");
});
const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const consign = require('consign');

const app = express();

mongoose.connect('mongodb://localhost:2018/technoblog');

app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(require('method-override')());

app.use(morgan('dev'));

consign({cwd:'server/app'})
    .include('components')
    .into(app)

app.set('port', (process.env.PORT || 4030));

app.listen(app.get('port'), function(){
	console.log('Server started on port '+ app.get('port'));
});
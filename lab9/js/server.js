const express = require('express');
const app = express();
const port = 3000;

////
const database = require('./database');
const addCountry = require('./addCountry');
const getCountry = require('./getCountries');
const deleteCountry = require('./deleteCountry');
const editCountry = require('./editCountry');

////

app.set('views', '../views');
app.set('view engine', 'pug');

app.use(express.static('resources'));
app.use(express.urlencoded());

////

app.get('/', (request, response) => {
    getCountry.getCountries(request, response);
});

app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log('server is listening')
});


app.get('/add-country', (request, response) => {
    response.render('add_country');
});


app.post('/add-country-post', (request, response) => {
    addCountry.addCountry(request.body.countryName, request.body.countryYearCreating,
        request.body.countryCountPeople, request.body.countryCapital);
    response.redirect('/');
});

app.post('/delete-country', (request, response) => {
    deleteCountry.deleteCountry(request.body._id);
    response.redirect('/');
});

app.post('/delete-country-by-count-people', (request, response) => {
    console.log(request.body.countryCountPeople);
    deleteCountry.deleteCountryByGuarantee(request.body.countryCountPeople);
    response.redirect('/');
});

app.get('/countries-with-count-people', (request, response) => {
    response.render('country_table_with_count_people', {countries: {}});
});

app.get('/countries-with-count-people-get', (request, response) => {
    console.log("here");
    console.log(request.query.countryCountPeople);

    getCountry.getCountriesWithCountPeople(request, response, request.query.countryCountPeople);
});


app.get('/edit-country', (request, response) => {
    let SubjectModel = database.Country();
    //
    SubjectModel.findOne({_id: request.query._id}, function (err, country) {
        if (err) {
            throw err;
        }
        response.render('edit_country', {country: country});
    });
});

app.post('/edit-country-post', (request, response) => {
    editCountry.editCountry(request.body._id, request.body.countryName,
        request.body.countryYearCreating, request.body.countryCountPeople, request.body.countryCapital);
    response.redirect('/');
});
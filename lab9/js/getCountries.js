const database = require("./database");

exports.getCountries = function (request, response) {
    let CountryModel = database.Country();
    //
    CountryModel.find({}, null, function (err, countries) {
        if (err) {
            throw err;
        }
        response.render('index', {title: 'Hello!', countries: countries});
    });
};


exports.getCountriesWithCountPeople = function (request, response, countryCountPeople) {
    let SubjectModel = database.Country();
    SubjectModel.find({ countryCountPeople: countryCountPeople }, null, { sort: { subjectNumber: 1 } }, function (err, subjects) {
        if (err) {
            throw err;
        }
        response.render('country_table_with_count_people', { countries: subjects });
    });
};
const database = require('./database');

exports.addCountry = function (countryName, countryYearCreating, countryCountPeople, countryCapital) {
    let CountryModel = database.Country();

    let country = new CountryModel({
        countryName: countryName,
        countryYearCreating: countryYearCreating,
        countryCountPeople: countryCountPeople,
        countryCapital: countryCapital
    });

    country.save(function (err) {
        if (err) {
            throw err;
        }
        console.log("Объект сохранен: ", country);
    });
};
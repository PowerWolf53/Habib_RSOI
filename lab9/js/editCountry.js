const database = require('./database.js');

exports.editCountry = function (_id, countryName, countryYearCreating, countryCountPeople, countryCapital) {
    let CountryModel = database.Country();
    CountryModel.updateOne({ _id: _id }, {
        $set: {
            countryName: countryName,
            countryYearCreating: countryYearCreating,
            countryCountPeople: countryCountPeople,
            countryCapital: countryCapital
        }
    }, { upsert: true }, function (err) {
        if (err) {
            throw err;
        }
        console.log("Обновлен объект", _id);
    });
};
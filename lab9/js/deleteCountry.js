const database = require('./database');

exports.deleteCountry = function (countryId) {
    let CountryModel = database.Country();
    //
    CountryModel.deleteOne({_id: countryId}, function (err) {
        if (err) {
            throw err;
        }
        console.log("Флешка удалена", countryId);
    })
};

exports.deleteCountryByGuarantee = function (countPeople) {
    let CountryModel = database.Country();
    //
    CountryModel.deleteMany({countryCountPeople: countPeople}, function (err) {
        if (err) {
            throw err;
        }
        console.log("Флешки со сроком гарантии удалены", countPeople);
    })
};
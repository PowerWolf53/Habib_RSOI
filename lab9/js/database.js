const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const FlashSchema = new Schema({
//     flashMaker: String,
//     flashMemory: Number,
//     flashGuarantee: Number,
//     flashCount: Number
// });
//
// mongoose.connect("mongodb://localhost:27017/flashdb", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(r => console.log("connect to base successful!"));
//
// exports.Flash = function () {
//     return mongoose.model("Flash", FlashSchema);
// };

mongoose.connect("mongodb://localhost:27017/countrydb", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(r => console.log("connect to base successful!"));

const CountrySchema = new Schema({
    countryName: String,
    countryYearCreating: Number,
    countryCountPeople: Number,
    countryCapital: String
});

exports.Country = function () {
    return mongoose.model("Flash", CountrySchema);
};
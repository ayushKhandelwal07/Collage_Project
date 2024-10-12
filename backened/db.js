const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/healthyfy");
// Define schemas
const DoctorSchema = new mongoose.Schema({
    // Schema definition here
    username: String,
    password: String
});


const UserSchema = new mongoose.Schema({
    // Schema definition here
    email: String,
    firstname : String,
    lastname: String,
    gender : String,
    age : String,
    height : String,
    phone : String,
    password: String,
});


const Doctor = mongoose.model('Doctor', DoctorSchema);
const User = mongoose.model('User', UserSchema);

module.exports = {
    Doctor,
    User,
}

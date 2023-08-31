const mongoose = require('mongoose');

const connectDatabase = () => {
    console.log('Wait connecting to the database');

    mongoose.connect('mongodb+srv://root:88124927kaua@cluster0.hsmopc9.mongodb.net/', {useNewUrlParser : true, useUnifiedTopology : true}).then(() => console.log("MongoDB Atlas Connected")).catch((error) => console.log(error));
};

module.exports = connectDatabase;
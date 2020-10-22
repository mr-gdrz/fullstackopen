const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const URL = process.env.MONGOOSEDB_URI

console.log('connecting to ', URL)

mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(result => {
        console.log('connected to db')
    }).catch(error => {
        console.log('connetion failed due to ', error.message)
    })

const phonebookSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        required: true,
        unique: true
    },
    number: {
        type: String,
        minlength: 8,
        required: true
    }
})
phonebookSchema.plugin(uniqueValidator)
phonebookSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})


module.exports = mongoose.model('Person', phonebookSchema)
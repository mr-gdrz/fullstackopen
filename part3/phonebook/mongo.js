const mongoose = require('mongoose')
const paramCount = process.argv.length

if (paramCount < 3) {
    console.log('connection to mongo needs password like >> node mongo.js <pass>')
    process.exit(1)
}

const pass = process.argv[2]

const constrUrl = `mongodb+srv://phonebookdb:${pass}@cluster0.fuu8c.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(constrUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

////creating a schema
const phonebookschema = new mongoose.Schema(
    {
        id: Number,
        name: String,
        number: String
    }
)

/////creating a model
const Person = new mongoose.model('Person', phonebookschema)

if (paramCount == 5) {
    const myPerson = new Person({
        name: process.argv[3],
        number: process.argv[4]
    })

    myPerson.save().then(result => {
        console.log('person saved')
        mongoose.connection.close()
    })
}else{
    console.log('phonebook: ')
    Person.find({}).then(result => {
        result.forEach(person=> {
            console.log(person.name , person.number)
        })
        mongoose.connection.close()
    })
}

const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide password as an argument: node mango.js <password>')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://mrfullstack:${password}@cluster0.fuu8c.mongodb.net/note-app?retryWrites=true&w=majority`

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true})

const noteSchema = new mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
    content: 'continoues execution',
    date: new Date(),
    important: true,
})  
/*
note.save().then(result => {
    console.log('note saved')
    mongoose.connection.close()
})*/

Note.find({}).then(result => {
    result.forEach(note => {
      console.log(note)
    })
    mongoose.connection.close()
  })


require('dotenv').config()
const { json, response, request } = require('express')
const express = require('express')
const app = express()
const cors = require('cors')
const Note = require('./models/note')

app.use(express.static('build'))
app.use(cors())
app.use(express.json())


// const unknownEndpoint = (request, response) => {
//     response.status(404).send({ error: 'unknown endpoint' })
// }

//app.use(unknownEndpoint)

app.get('/api/notes', (request, response) => {
    Note.find({}).then(notes => {
        response.json(notes)
    })
})

app.post('/api/notes', (request, response, next) => {

    const body = request.body

    if (body.content === undefined) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    const note = new Note({
        content: body.content,
        important: body.important || false,
        date: new Date(),
    })
    console.log(note)
    note
        .save()
        .then(savedNote => savedNote.toJSON())
        .then(savedAndFormattedNote => {
            response.json(savedAndFormattedNote)
        })
        .catch(error => next(error))
})

app.get('/api/notes/:id', (request, response, next) => {
    Note.findById(request.params.id)
        .then(note => {
            if (note) {
                response.json(note)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
    /*{
        console.log(error)
        res.status(400).send({error : 'malformated id'})
    })*/
})

app.get('/', (request, response) => {
    response.send(`<h1>Hello world!</h1>`)
})

app.delete('/api/notes/:id', (request, response, next) => {
    Note.findByIdAndDelete(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformated id' })
    } if (error.name === 'ValidationError') {
        return response.status(400).send({ error: error.message })
    }

    next(error)
}

//Handler of requests with result of error
app.use(errorHandler)

const PORT = process.env.SERVER_PORT || process.env.PORT
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})
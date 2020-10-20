require('dotenv').config()
const { json, response, request } = require('express')
const express = require('express')
const app = express()
const cors = require('cors')
const Note = require('./models/note')

app.use(express.static('build'))
app.use(cors())
app.use(express.json())


const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

app.get('/api/notes', (req, res) => {
    Note.find({}).then(notes => {
        res.json(notes)
    })
})

app.post('/api/notes', (req, res) => {

    const body = req.body

    if (body.content === undefined) {
        return res.status(400).json({
            error: 'content missing'
        })
    }

    const note = new Note({
        content: body.content,
        important: body.important || false,
        date: new Date(),
    })

    note.save().then(savedNote => {
        res.json(savedNote)
    })
})

app.get('/api/notes/:id', (req, res, next) => {
    Note.findById(req.params.id)
        .then(note => {
            if (note) {
                res.json(note)
            } else {
                res.status(404).end()
            }
        })
        .catch(error => next(error))
    /*{
        console.log(error)
        res.status(400).send({error : 'malformated id'})
    })*/
})

app.get('/', (req, res) => {
    res.send(`<h1>Hello world!</h1>`)
})

app.delete('/api/notes/:id', (req, res) => {
    const id = Number(req.params.id)
    notes = notes.filter(f => f.id !== id)

    res.status(204).end()
})

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformated id' })
    }

    next(error)
}

//Handler of requests with result of error
app.use(errorHandler)

const PORT = process.env.SERVER_PORT
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})
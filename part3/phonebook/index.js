require('dotenv').config();
const { request, response } = require('express')
const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
const Person = require('./models/person')
app.use(cors())

app.use(express.static('build'))
app.use(express.json())



/*const requestLogger = (request, response, next) => {
    console.log('Method: ', request.method)
    console.log('Path: ', request.path)
    console.log('Body: ', request.body)
    console.log('---')
    next()
}*/

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

//app.use(requestLogger)
//app.use(morgan(':method :url :status :res[content-length] :response-time ms :res[content] - '))

morgan.token('content', (req) => {
    return JSON.stringify(req.body)
})

app.use(morgan(' :method  :url  :res[content-length]  :response-time ms :content'))


app.get('/', (request, response) => {
    response.send("<h2> Hello </h2>")
})

app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
        console.log(persons)
        res.json(persons)
    })
})

app.get('/info', (req, res) => {
    const len = Person.length
    const time = new Date()
    res.send("the number of person(s) is/are " + len + " </br> " + time)
})

// get a special id from persons
app.get('/api/persons/:id', (req, res,next) => {

    //const person = 
    Person.findById(req.params.id)
        .then(person => {
            if (!person) {
                res.status(404).end()
            } else {
                res.json(person)
            }
        })
        .catch(error => next(error))
})



//delete a special person from phonebook by DELETE method
app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
        }).catch(error => next(error))

})

//add to persons using POST method
app.post('/api/persons', (request, response) => {
    const body = request.body
    if (body.name === undefined) {
        return response.status(404).json({
            error: "name missing"
        })
    }

    if (body.number === undefined) {
        return response.status(404).json({
            error: "number missing"
        })
    }

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save()
        .then(savedPerson => {
            response.json(savedPerson)
        }).catch(error => {
            response.status(404).send({ error: error.message })
        })
})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body
    const person = {
        name: body.name,
        number: body.number
    }

    Person.findByIdAndUpdate(request.params.id, person, { new: true })
        .then(updatedPerson => {
            response.json(updatedPerson)
        }).catch(
            error => next(error)
        )
})
/*
const nextId = () => {
    return Math.floor(Math.random() * 1000)
}
*/


app.use(unknownEndpoint)

const errorHandler = (request, response, next) => {
    console.error(error.message)
    if (error.name === "CastError") {
        return response.status(400).send({error: "malformated id"})

    }
    next(error)
}

app.use(errorHandler)

const PORT = process.env.SERVER_PORT || process.env.PORT
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})

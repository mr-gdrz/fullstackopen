const { request, response } = require('express');
const express = require('express');
const app = express()
app.use(express.json())

let persons = [
    {
        id: 1,
        name: "Arto Halles",
        number: "064-5456852"
    },
    {
        id: 2,
        name: "Ada Lovelac",
        number: "4545-545"
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "236-979-0690"
    },
    {
        id: 4,
        name: "Marry Popendic",
        number: "236-978-2928"
    },
]

app.get('/', (request, response) => {
    response.send("<h2> Hello </h2>")
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (req, res) => {
    const len = persons.length
    const time = new Date()
    res.send("the number of person(s) is/are " + len + " </br> " + time)
})

// get a special id from persons
app.get('/api/persons/:id', (req, res) => {
    const personId = Number(req.params.id)
    const person = persons.filter(p => p.id === personId)
    if (person.length == 0) {
        res.status(404).send({ error: 'not found' })
    } else {
        res.json(person)
    }
})

//delete a special person from phonebook by DELETE method
app.delete('/api/persons/:id', (request, response) => {
    const personId = Number(request.params.id)
    persons = persons.filter(p => p.id !== personId)
    response.status(204).end()
})

//add to persons using POST method
app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(404).json({
            error: 'there is nothing to add'
        })
    }
    
    const isExist = persons.filter(p => p.name == body.name ||
        p.number == body.number)
    if(isExist.length>0)
    {
        return response.status(404).json({
            error: `this person name ${body.name} 
            or the number ${body.number } is already exist`
        })
    }


    const person = {
        id: nextId(),
        name: body.name,
        number: body.number
    }
    persons = persons.concat(person)
    response.json(person)

})

const nextId = () => {
    return Math.floor(Math.random() * 1000)
}

const PORT = 3001
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})

let express = require('express');
let app = express();
const bodyParser = require('body-parser');
let data = require('./employee.json');


// app.get('/workers', (req,res) => { // req means request, res means the response
//     res.send('Hello World')
// })

app.use(bodyParser.json())

//use this http method shows all workers "localhost:5000/workers"
app.get('/workers', (req, res) => {
    if (!data) {
        res.status(404).send('Could not find information')
    }
    res.send(data)
})


app.get('/workers/:id', (req, res) => {

    const findEmployee = data.workers.find(function (employee) {

        return parseInt(req.params.id) === employee.id
    })

    if (!findEmployee) {
        res.status(404).send('Could not find information')
    }
    res.send(findEmployee)
})

// Hard Challenge starts here 

//use this http method to create a new worker "localhost:5000/workers"
app.post('/workers', (req, res) => {

    const findEmployee = {
        name: req.body.name,
        id: data.workers.length + 1,
        salary: req.body.salary,
        department: req.body.department
    }

    if (!findEmployee) {
        res.status(404).send('Could not find information')
    }

    data.workers.push(findEmployee)

    res.send(findEmployee)

    return
})

//use this http method to change or update a worker to a New Worker "localhost:5000/workers/5"
app.put('/workers/:id', (req, res) => {

    const findEmployee = data.workers.findIndex((employee) => {
        return parseInt(req.params.id) === employee.id
    })
    if (findEmployee < 0) {
        res.status(404).send('Could not find information')
    }
    data.workers[findEmployee].name = req.body.name;
    data.workers[findEmployee].salary = req.body.salary;
    data.workers[findEmployee].department = req.body.department;
    res.send(data.workers[findEmployee])

    if (!findEmployee) {
        res.status(404).send('Could not find information')
    }
})

//use this http method to delete a worker "localhost:5000/workers/5"
app.delete('/workers/:id', (req, res) => {
    const findEmployee = data.workers.find(function (employee) {

        return parseInt(req.param.id) === employee.id

    })

    if (!findEmployee) {
        res.status(404).send('Could not find information')
    }

    const index = data.workers.indexOf(findEmployee)
    data.workers.splice(index, 1)

    res.json(findEmployee)

})


app.listen(5000)

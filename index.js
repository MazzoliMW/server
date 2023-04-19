const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var { nanoid } = require("nanoid");

const app = express();
const port = 3001;


app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let DATA = [
    { id: "todo-0", name: "Mangia", completed: true },
    { id: "todo-1", name: "Dormi", completed: false },
    { id: "todo-2", name: "Ripeti", completed: false }
  ];
  app.get('/todos', (req, res) => {
    console.log(res);
    res.status(200).json(DATA);
});
app.post('/todo/add', (req, res) => {
    let taskName = req.body.name;
    console.log(req.body.name);
    let id_add = Math.random();
    id_add = `todo-${nanoid()}`;
    DATA.push({id: id_add, name: taskName, completed: false});
    console.log(DATA);
    res.status(200).json(DATA);
});
app.post('/todo/delete', (req, res) => {
    let taskId = req.body.id;
    DATA = DATA.filter(elem => {
        if(elem.id!=taskId){
            return true;
        }else{
            return false;
        }
    });
    console.log(DATA);
    res.status(200).json(DATA);
});
app.post('/todo/edit', (req, res) => {
    let taskName = req.body.newName;
    let taskId = req.body.id;

    const aggNome = (obj) => {
        if(obj.id === taskId) {
            obj.name = taskName;
            return obj;
        }else{
            return obj;
        }
     };
    DATA = DATA.map(aggNome);
    console.log(DATA);
    res.status(200).json(DATA);
});
app.post('/todo/checkEdit', (req, res) => {
    let taskId = req.body.id;

    const aggCheck = (obj) => {
        if(obj.id === taskId) {
            obj.completed = !obj.completed;
            return obj;
        }else{
            return obj;
        }
     };
    DATA = DATA.map(aggCheck);
    console.log(DATA);
    res.status(200).json(DATA);
});

app.post('/todo/checkAll', (req, res) => {
    const aggAllCheck = (obj) => {
        obj.completed = true;
        return obj;
     };
    DATA = DATA.map(aggAllCheck);
    console.log(DATA);
    res.status(200).json(DATA);
});

app.post('/todo', (req, res) => {
    const dati = req.body.dati;
    console.log(dati);
    if(dati.id){
        DATA = DATA.map(elem=>{
            if(elem.id==dati.id){
                return dati;
            }else{
                return elem;
            }
        })
    }
    console.log(DATA);
    res.status(200).json(DATA);
});

app.get('/', (req, res) => {
    res.send('ciao');
});


app.listen(port, () => console.log(`Listening on port ${port}!`));
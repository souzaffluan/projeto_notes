const Router = require('express').Router;
const db = require('../db/connection');
const {ObjectId} = require('mongodb');


const router = Router();

//fomr criação de rotas
router.get('/', function(req, res){
    res.render('notes/create')
})

//envio da nota para o mongodb
router.post('/', function(req, res){
    const data = req.body;
    const title = data.title;
    const description = data.description;

    db.getDb()
    .collection('notes')
    .insertOne({ title: title, description: description })
    .then(result => {
        console.log("Documento inserido com sucesso:", result);
        res.redirect('/', 301);
    })
    .catch(error => {
        console.error("Erro ao inserir documento:", error);
        res.status(500).send("Erro ao inserir documento no banco de dados");
    });
});

//remover tarefa
router.post('/delete/', function(req, res){
    const data = req.body;
    const id = new ObjectId(data.id);

    db.getDb()
    .collection('notes')
    .deleteOne({_id: id});
    res.redirect(301, '/')
})

//view de detalhes da nota
router.get('/:id', async function(req, res) {
    const id = new ObjectId(req.params.id);

    const note = await db.getDb().collection('notes').findOne({_id: id});
    res.render('notes/detail', {note});
});

//view de edição de nota
router.get('/edit/:id', async function(req, res){
    const id = new ObjectId(req.params.id);

    const note = await db.getDb().collection('notes').findOne({_id: id});
    res.render('notes/edit', {note});
})

//edição de notas
router.post('/update', function (req, res){

    const data = req.body;
    const id = new ObjectId(data.id);
    const title = data.title;
    const description = data.description;

    db.getDb()
    .collection('notes')
    .updateOne({_id: id}, {$set: {title: title, description:description}});

    res.redirect('/');
})


module.exports = router;
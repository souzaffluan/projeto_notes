const bodyParser = require('body-parser');
const express = require('express');
const exphbs = require('express-handlebars');

const app = express();
const port = 8000;

//chamando conexão com o db
const db = require('./db/connection');
//template engine
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true}))

//importação de rotas
const notesRoutes = require('./routes/notes');

//rotas
app.get('/', function(req, res){
    (async()=>{
        const notes = await db.getDb().collection('notes').find({}).toArray();
        res.render('home', {notes});
    })()
    
})

app.use('/notes', notesRoutes);



db.initDb()
    .then(db => {
        console.log("O banco conectou com sucesso!");
        // Inicie o seu aplicativo aqui
        app.listen(port, () => {
            console.log(`Projeto rodando na porta: ${port}`);
        });
    })
    .catch(err => {
        console.error("Erro ao conectar ao banco de dados:", err);
    });
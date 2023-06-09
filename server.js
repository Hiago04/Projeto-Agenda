//começo
require('dotenv').config();
const express = require('express');
const app = express();

const mongoose = require('mongoose')
mongoose.connect(process.env.CONNECTIONSTRING, { 
    useNewUrlParser: true,
     useUnifiedTopology: true, useFindAndModify:false 
}) //retorna promise
    .then(() => {
        console.log('Conectei com a Base de dados');
        app.emit('pronto')
    })
    .catch(e => console.log("erro na conexão"));

const session = require('express-session')
const MongoStore = require('connect-mongo');
const flash = require('connect-flash')

const routes = require('./routes');
const path = require('path');
const helmet = require('helmet')
const { meuMiddlewareGlobal, checkCsrfError, csrfMiddleware } = require('./src/middlewares/middleware')
const csrf = require('csurf');

app.use(helmet())
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'public')));

const sessionOptions = session({
    secret: 'texto que ninguém vai saber',
    store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
    resave: false,
    saveUnitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 dias
        httpOnly: true
    },
    
})
app.use(sessionOptions)
app.use(flash())

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs')

app.use(csrf());
//nossos próprios middlewares
app.use(checkCsrfError);
app.use(csrfMiddleware);
app.use(meuMiddlewareGlobal);
app.use((req, res, next) => {
    res.setHeader(
        "Content-Security-Policy",
        "script-src 'self' https://cdn.jsdelivr.net"
    );
    next();
});
app.use(routes);

app.on('pronto', () => {
    app.listen(3000, () => {
        console.log('Acessar http://localhost:3000');
        console.log('Servidor executando na porta 3000');
    });
})

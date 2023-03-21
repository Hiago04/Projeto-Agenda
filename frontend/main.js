import 'core-js/stable';
import 'regenerator-runtime/runtime';

import Login from './assets/modules/Login'

const login = new Login('.form-login')
const cadastro = new Login('.form-cadastro')
login.init();
cadastro.init()

import Contato from './assets/modules/Contato'

const contato = new Contato('.form-contato')
contato.init()


// import './assets/css/style.css'; estou usando o bootstrap para estilizar
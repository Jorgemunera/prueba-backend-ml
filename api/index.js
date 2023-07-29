const express = require('express');
const cors = require('cors');
const {config} = require('./config/config');
const routerApi = require('./routes');
const { logErrors, errorHandler, boomErrorHandler, ormErrorHandler } = require('./middlewares/error.handler');

const app = express();

const port = config.port;

app.use(express.json())

const whiteList = [
    'http://localhost:3000',
    'http://localhost:8080',
    'http://myapp.com'
];

const options = {
    origin: (origin, callback) => {
        if(whiteList.includes(origin) || !origin){
            callback(null, true)
        } else {
            callback(new Error('no permitido'))
        }
    }
}

app.use(cors(options))

app.get('/api', (req, res) => {
    res.send('hola mundo')
})

routerApi(app);

app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Servidor corriendo en puerto ${port}`)
});

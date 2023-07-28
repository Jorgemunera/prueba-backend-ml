const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');

const app = express();

const port = 3000;

app.use(express.json())

const whiteList = [
    'http://localhost:8080',
    'http://myapp.com'
];

const options = {
    origin: (origin, callback) => {
        if(whiteList.includes(origin)){
            callback(null, true)
        } else {
            callback(new Error('no permitido'))
        }
    }
}

app.use(cors(options))

app.get('/', (req, res) => {
    res.send('hola mundo')
})

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Servidor corriendo en puerto ${port}`)
});

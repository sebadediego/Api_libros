const express =require('express');
const errorHeader = require('./middleware/errorheader');
const routerLibros = require('./router/libros');

const app = express();
const port = 3000;


app.use(express.json());




app.use('/libros', routerLibros);

app.use(errorHeader);

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
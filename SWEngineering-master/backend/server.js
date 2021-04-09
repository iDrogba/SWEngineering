/* (req, res)인 질의응답 형식을 거쳐야 해당 데이터를 받을 수 있다. */
/* 즉 인터넷 연결이 되있어야 해당 데이터를 받을 수 있다. */

import express from 'express';
import data from './data.js';


const app = express();

app.get('/api/products/:id', (req, res) => {
    const product = data.products.find((x) => x._id === req.params.id);
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  });

app.get('/api/products', (req, res) => {
    res.send(data.products);
});

app.get('/', (req, res) => {
    res.send('Server is ready');
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Serve at http://localhost:${port}`);
});
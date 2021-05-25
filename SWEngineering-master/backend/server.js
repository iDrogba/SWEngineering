/* (req, res)인 질의응답 형식을 거쳐야 해당 데이터를 받을 수 있다. */
/* 즉 인터넷 연결이 되있어야 해당 데이터를 받을 수 있다. */

import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import productRouter from './routers/productRouter.js';
import userRouter from './routers/userRouter.js';
import dotenv from 'dotenv';
import orderRouter from './routers/orderRouter.js';
import uploadRouter from './routers/uploadRouter.js';
import eventRouter from './routers/eventRouter.js';
import uploadRouter2 from './routers/uploadRouter2.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//mongodb cloud 랑 연결하였습니다. 아이디는 Admin 이고 비밀번호는 swe23
mongoose.connect(process.env.MONGODB_URL || 'mongodb+srv://Admin:swe23@cluster0.vxyem.mongodb.net/SWEngineering?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.use('/api/uploads', uploadRouter);
app.use('/api/uploads2', uploadRouter2);
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);
app.use('/api/events', eventRouter);



const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

const __dirname2 = path.resolve();
app.use('/uploads2', express.static(path.join(__dirname2, '/uploads2')));

app.use(express.static(path.join(__dirname, '/frontend/build')));
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/frontend/build/index.html'))
);
// app.get('/', (req, res) => {
//   res.send('Server is ready');
// });


app.use((err, req, res, next) =>{
  res.status(500).send({message: err.message });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Serve at http://localhost:${port}`);
});
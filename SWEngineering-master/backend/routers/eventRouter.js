import expressAsyncHandler from "express-async-handler";
import data from "../data.js";
import Event from "../models/eventModel.js";
import express from 'express';
import { isAdmin, isAuth } from '../utils.js'

const eventRouter = express.Router();

eventRouter.get(
    '/', 
    expressAsyncHandler(async(req, res) => {
        const name = req.query.name || '';
        const category = req.query.category || '';
        const order = req.query.order || '';
    const min =
      req.query.min && Number(req.query.min) !== 0 ? Number(req.query.min) : 0;
    const max =
      req.query.max && Number(req.query.max) !== 0 ? Number(req.query.max) : 0;
    const rating =
      req.query.rating && Number(req.query.rating) !== 0
        ? Number(req.query.rating)
        : 0;
        const nameFilter = name ? { name: {$regex:name, $options: 'i'} } : {};
        const categoryFilter = category ? { category } : {};
        const priceFilter = min && max ? { price: { $gte: min, $lte: max } } : {};
    const ratingFilter = rating ? { rating: { $gte: rating } } : {};
    const sortOrder =
      order === 'lowest'
        ? { price: 1 }
        : order === 'highest'
        ? { price: -1 }
        : order === 'toprated'
        ? { rating: -1 }
        : { _id: -1 };

        const events= await Event.find({
          ...nameFilter,
          ...categoryFilter,
          ...priceFilter,
          ...ratingFilter,
        })
        .sort(sortOrder);
        
        res.send(events);
    })
);

eventRouter.get(
  '/top-sellers', 
  expressAsyncHandler(async (req, res)=> {
    const topSellers = await Event.find({})
      .sort({'price':-1})
      .limit(3);
    res.send(topSellers);
  })
);

eventRouter.get(
  '/categories',
  expressAsyncHandler(async (req, res) => {
    const categories = await Event.find().distinct('category');
    res.send(categories);
  })
);

eventRouter.get(
    '/seed', 
    expressAsyncHandler(async(req, res) => {
        // await Event.remove({});
        const createdEvents = await Event.insertMany(data.events);
        res.send({ createdEvents });
    })
);

eventRouter.get(
    '/:id', 
    expressAsyncHandler(async(req, res) => {
        const event = await Event.findById(req.params.id);
        if(event){
            res.send(event);
        } else{
            res.status(404).send({ message: ' Event Not Found' });
        }
    })
);

eventRouter.post(
    '/',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
      const event = new Event({
        name: '제목',
        image: '이미지 링크를 올려주세요',
        price: 0,
        category: 'sample category',
        brand: 'sample brand',
        countInStock: 0,
        rating: 0,
        numReviews: 0,
        description: '상세 내용을 입력하세요',
      });
      const createdEvent = await event.save();
      res.send({ message: 'Event Created', event: createdEvent });
    })
  );
  eventRouter.put(
    '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
      const eventId = req.params.id;
      const event = await Event.findById(eventId);
      if (event) { //event 존재한다면 유저가 입력한 정보가 데이터베이스에 저장
        event.name = req.body.name;
        event.price = req.body.price;
        event.image = req.body.image;
        event.category = req.body.category;
        event.brand = req.body.brand;
        event.countInStock = req.body.countInStock;
        event.description = req.body.description;
        const updatedEvent = await event.save();
        res.send({ message: 'Event Updated', event: updatedEvent });
      } else { //if event does not exist.
        res.status(404).send({ message: 'Event Not Found' });
      }
    })
  );
  eventRouter.delete(
    '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
      const event = await Event.findById(req.params.id);
      if (event) {
        const deletEvent = await event.remove();
        res.send({ message: 'Event Deleted', event: deleteEvent });
      } else {
        res.status(404).send({ message: 'Event Not Found' });
      }
    })
  );

  eventRouter.post(
    '/:id/reviews',
    isAuth,
    expressAsyncHandler(async (req, res) => {
      const eventId = req.params.id;
      const event = await Event.findById(eventId);
      if (event) { //event 존재한다면 유저가 입력한 정보가 데이터베이스에 저장
        if (event.reviews.find((x) => x.name === req.user.name)) {
          return res
            .status(400)
            .send({ message: '이미 후기를 작성했습니다.' });
        }
        const review = {
          name: req.user.name, 
          rating: Number(req.body.rating), 
          comment: req.body.comment,
        };
        event.reviews.push(review);
        event.numReviews = event.reviews.length;
        event.rating = 
        event.reviews.reduce((a, c) => c.rating + a, 0) / 
        event.reviews.length;
        const updatedEvent = await event.save();
        res.status(201).send({ 
            message: '리뷰 작성 완료', 
            review: updatedEvent.reviews[updatedEvent.reviews.length - 1], 
          });
      } else { //if product does not exist.
        res.status(404).send({ message: '상품을 찾을 수 없습니다.' });
      }
    })
  );


export default eventRouter;
import expressAsyncHandler from "express-async-handler";
import data from "../data.js";
import Product from "../models/productModel.js";
import express from 'express';
import { isAdmin, isAuth } from '../utils.js'

const productRouter = express.Router();

productRouter.get(
    '/', 
    expressAsyncHandler(async(req, res) => {
      const pageSize = 3;
      const page = Number(req.query.pageNumber) || 1;
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
        const count = await Product.count({
          ...nameFilter,
          ...categoryFilter,
          ...priceFilter,
          ...ratingFilter,
        });
        const products= await Product.find({
          ...nameFilter,
          ...categoryFilter,
          ...priceFilter,
          ...ratingFilter,
        })
        .sort(sortOrder)
        .skip(pageSize * (page -1))
        .limit(pageSize);
      res.send({ products, page, pages: Math.ceil(count / pageSize) });
    })
);

productRouter.get(
  '/top-sellers', 
  expressAsyncHandler(async (req, res)=> {
    const topSellers = await Product.find({})
      .sort({'numReviews':-1})
      .limit(3);
    res.send(topSellers);
  })
);

productRouter.get(
  '/categories',
  expressAsyncHandler(async (req, res) => {
    const categories = await Product.find().distinct('category');
    res.send(categories);
  })
);

productRouter.get(
    '/seed', 
    expressAsyncHandler(async(req, res) => {
        // await Product.remove({});
        const createdProducts = await Product.insertMany(data.products);
        res.send({ createdProducts });
    })
);

productRouter.get(
    '/:id', 
    expressAsyncHandler(async(req, res) => {
        const product = await Product.findById(req.params.id);
        if(product){
            res.send(product);
        } else{
            res.status(404).send({ message: ' Product Not Found' });
        }
    })
);

productRouter.post(
    '/',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
      const product = new Product({
        name: 'sample name ' + Date.now(),
        image: 'https://cdn.pixabay.com/photo/2018/08/13/21/42/gedeckter-table-3604064_1280.jpg',
        price: 0,
        category: 'sample category',
        brand: 'sample brand',
        countInStock: 0,
        rating: 0,
        numReviews: 0,
        description: 'sample description',
      });
      const createdProduct = await product.save();
      res.send({ message: 'Product Created', product: createdProduct });
    })
  );
  productRouter.put(
    '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
      const productId = req.params.id;
      const product = await Product.findById(productId);
      if (product) { //product 존재한다면 유저가 입력한 정보가 데이터베이스에 저장
        product.name = req.body.name;
        product.price = req.body.price;
        product.image = req.body.image;
        product.category = req.body.category;
        product.brand = req.body.brand;
        product.countInStock = req.body.countInStock;
        product.description = req.body.description;
        const updatedProduct = await product.save();
        res.send({ message: 'Product Updated', product: updatedProduct });
      } else { //if product does not exist.
        res.status(404).send({ message: 'Product Not Found' });
      }
    })
  );
  productRouter.delete(
    '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
      const product = await Product.findById(req.params.id);
      if (product) {
        const deleteProduct = await product.remove();
        res.send({ message: 'Product Deleted', product: deleteProduct });
      } else {
        res.status(404).send({ message: 'Product Not Found' });
      }
    })
  );

  productRouter.post(
    '/:id/reviews',
    isAuth,
    expressAsyncHandler(async (req, res) => {
      const productId = req.params.id;
      const product = await Product.findById(productId);
      if (product) { //product 존재한다면 유저가 입력한 정보가 데이터베이스에 저장
        if (product.reviews.find((x) => x.name === req.user.name)) {
          return res
            .status(400)
            .send({ message: '이미 후기를 작성했습니다.' });
        }
        const review = {
          name: req.user.name, 
          rating: Number(req.body.rating), 
          comment: req.body.comment,
        };
        product.reviews.push(review);
        product.numReviews = product.reviews.length;
        product.rating = 
          product.reviews.reduce((a, c) => c.rating + a, 0) / 
          product.reviews.length;
        const updatedProduct = await product.save();
        res.status(201).send({ 
            message: '리뷰 작성 완료', 
            review: updatedProduct.reviews[updatedProduct.reviews.length - 1], 
          });
      } else { //if product does not exist.
        res.status(404).send({ message: '상품을 찾을 수 없습니다.' });
      }
    })
  );

export default productRouter;
import expressAsyncHandler from "express-async-handler";
import data from "../data.js";
import Product from "../models/productModel.js";
import express from 'express';
import { isAdmin, isAuth } from '../utils.js'

const productRouter = express.Router();

productRouter.get(
    '/', 
    expressAsyncHandler(async(req, res) => {
        const name = req.query.name || '';
        const nameFilter = name ? { name: {$regex:name, $options: 'i'} } : {};
        const products= await Product.find({
          ...nameFilter,
        });
        res.send(products);
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
export default productRouter;
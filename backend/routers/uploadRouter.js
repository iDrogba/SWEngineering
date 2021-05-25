import multer from 'multer';
import express from 'express';
import { isAuth } from '../utils.js';


// 새로운 상품 이미지 파일 upload 폴더에 저장
const uploadRouter = express.Router();

const storage = multer.diskStorage({
destination(req, file, cb){
        cb(null, 'uploads/');
    },
filename(req, file, cb) {
        cb(null, `${Date.now()}.jpg`);
    },//업로드되면 저장소 상에 날짜.jpg 형식으로 저장됨
});

const upload = multer({storage});


uploadRouter.post('/', isAuth, upload.single('image'), (req, res) => {
    res.send(`/${req.file.path}`);
  });
  
  export default uploadRouter;
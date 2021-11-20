import {Router} from "express";
const router = Router();

import {CommentPublication, DeleteCommentPublication, DeletePublication, getPublications, getPublicationUnique, LikePublication, postPublication,UnLikePublication, UpdatePublication} from "../controllers/Publication.controller";
import upload from "../libs/uploadImage";
import { TokenValidation } from "../libs/verifyToken";

router.get('/Publication',TokenValidation,getPublications )
router.post('/Publication' , TokenValidation, upload.single('image') , postPublication)
router.get('/Publication/:id', TokenValidation,getPublicationUnique)
router.put('/Publication/Update/:id', TokenValidation,UpdatePublication)
router.delete('/Publication/Delete', TokenValidation,DeletePublication)
router.post('/Publication/Like', TokenValidation,LikePublication)
router.delete('/Publication/UnLike', TokenValidation,UnLikePublication)
router.post('/Publication/Comment', TokenValidation,CommentPublication)
router.delete('/Publication/Delete/Comment', TokenValidation,DeleteCommentPublication)

export default router;
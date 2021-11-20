import { Router } from "express";
import {TokenValidation} from '../libs/verifyToken';
const router = Router();

import {Login, Register, UserFollow, UserGet, UserUnFollow} from "../controllers/User.controller";

router.post("/Register", Register);
router.post("/Login", Login);
router.get("/UserGet/:id",TokenValidation, UserGet);
router.post('/:id/Follow',TokenValidation, UserFollow);
router.post('/:id/UnFollow',TokenValidation, UserUnFollow);


export default router;

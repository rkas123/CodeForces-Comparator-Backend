import express from "express";
const router = express.Router();
import { fetchList, fetchListForBot } from "../controllers/clist.js";

router.get("/", fetchList);

//
router.get("/bot", fetchListForBot);
//

export default router;

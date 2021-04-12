import express from "express";
const router = express.Router();
import { fetchList } from "../controllers/clist.js";

router.get("/", fetchList);
export default router;

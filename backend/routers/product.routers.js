import express from "express";
import { deleteProduct, getProducts, postProducts, updateProduct } from "../controllers/product.controller.js";

const router = express.Router();


router.get("/getProducts", getProducts)

router.post("/postProduct", postProducts)

router.delete("/delete/:id", deleteProduct)

router.put("/update/:id", updateProduct)


export default router;



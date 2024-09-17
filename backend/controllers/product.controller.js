import product from "../models/productstore.js"
import mongoose from "mongoose";

export const getProducts = async (req,res)=>{
    
    try{
        const products = await product.find({})
        res.status(200).json({ success : true, data: products})
    }
    catch(error){
        res.status(500).json({ success: false, message: "server error" })
    }
}


export const postProducts = async(req,res)=>{
    const { name, price, image } = req.body 
    if(!name || !price || !image){
        return res.status(400).json({message: "please fill all the fields."})
    }
    const newproduct = await new product({"name": name, "price": price, "image": image})
    try{
        await newproduct.save();
        res.status(201).json({ success : true, data: newproduct})
    }
    catch(error){
        console.error("Erroe is created product:", error.message)
        res.status(500).json({ success : true, message: "server Error"})
    }
}


export const deleteProduct = async(req,res)=>{
    const id = req.params.id;
    try{
        const productDeleted = await product.findByIdAndDelete(id);
        res.status(200).json({ success: true, data: productDeleted, message: "product deleted.."})
    }
    catch(error){
        console.log("deleting product failed with error: ", error)
        res.status(500).json({ success: false , message: "error occured.." })
    }
}


export const updateProduct = async (req,res)=>{
    const { id } = req.params;
    const updatedProduct = req.body
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ success: false, message: "Invalid product id."})
    }
    try{
        const updateProduct = await product.findByIdAndUpdate({_id: id}, updatedProduct, {new: true});
        res.status(200).json({ success: true, data: updateProduct, message: "product updated"})
    }
    catch(error){
        res.status(500).json({message: "error in updating product: ", error})
    }
}
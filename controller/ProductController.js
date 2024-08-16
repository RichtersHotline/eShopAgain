import express from "express"
import bodyParser from "body-parser"
import {Product} from "../model/index.js"

const userRouter = express.Router()

userRouter.use(bodyParser.json())

userRouter.get("/products", (req, res) => {

    Product.fetchProducts(req, res)
    
    
    })
    userRouter.get("products/:id", (req, res) => {
    
        Product.fetchSingleProduct(req,res)
        
        
        })
    userRouter.post("/add", (req, res) => {
    
            Product.addProduct(req,res)
            
            
            }) 
    userRouter.patch("/products/:id", (req, res) => {
    
                Product.updateProduct(req,res)
                
                
                }) 
    userRouter.delete("/products/:id", (req, res) => {
    
                    Product.deleteProduct(req,res)
                    
                    
                    }) 
    
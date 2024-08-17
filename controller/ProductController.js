import express from "express"
import bodyParser from "body-parser"
import {Product} from "../model/index.js"
import {verifyAToken} from "../middleware/AuthenticateUser.js"

const ProductRouter = express.Router()

ProductRouter.use(bodyParser.json())

ProductRouter.get("/",  (req, res) => {

    Product.fetchProducts(req, res)
    
    
    })
    ProductRouter.get("/recent", (req, res) => {

        Product.RecentProducts(req, res)
        
        
        })
    ProductRouter.get("/:id",  (req, res) => {
    
        Product.fetchSingleProduct(req,res)
        
        
    })
    ProductRouter.post("/add", verifyAToken, (req, res) => {
    
            Product.addProduct(req,res)
            
            
            }) 
    ProductRouter.patch("/:id", verifyAToken, (req, res) => {
    
                Product.updateProduct(req,res)
                
                
                }) 
    ProductRouter.delete("/:id", verifyAToken, (req, res) => {
    
                    Product.deleteProduct(req,res)
                    
                    
                    }) 
    export {
       
        ProductRouter
 
    }
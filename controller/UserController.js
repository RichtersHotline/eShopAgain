import express from "express"
import bodyParser from "body-parser"
import {programUser} from "../model/index.js"
import {Product} from "../model/index.js"
const userRouter = express.Router()

userRouter.use(bodyParser.json())

userRouter.get("/", (req, res) => {

programUser.fetchUsers(req, res)


})
userRouter.get("/:id", (req, res) => {

    programUser.fetchSingleUser(req, res)
    
    
    })
userRouter.post("/register", (req, res) => {

        programUser.registerUser(req,res)
        
        
        }) 
userRouter.patch("/user/:id", (req, res) => {

            programUser.updateUser(req,res)
            
            
            }) 
userRouter.delete("/user/:id", (req, res) => {

                programUser.deleteUser(req,res)
                
                
                }) 
userRouter.post("/login", (req, res) => {

                    programUser.Login(req, res)
                    
                    
                    }) 
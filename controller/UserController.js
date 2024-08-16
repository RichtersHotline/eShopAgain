import express from "express"
import bodyParser from "body-parser"
import {programUser} from "../model/index.js"
import {Product} from "../model/index.js"
import {verifyAToken} from "../middleware/AuthenticateUser.js"

const userRouter = express.Router()

userRouter.use(bodyParser.json())

// THIS MUST BE / AND NOT THE ENDPOINT THIS IS NOT WHAT THE USER NEEDS TO ENTER BE AWARE
userRouter.get("/", (req, res) => {

programUser.fetchUsers(req, res)


})
userRouter.get("/:id", (req, res) => {

    programUser.fetchSingleUser(req, res)
    
    
    })
userRouter.post("/register",  (req, res) => {

        programUser.registerUser(req,res)
        
        
        }) 
userRouter.patch("/:id", verifyAToken, (req, res) => {

            programUser.updateUser(req,res)
            
            
            }) 
userRouter.delete("/:id", verifyAToken, (req, res) => {

                programUser.deleteUser(req,res)
                
                
                }) 
userRouter.post("/login", (req, res) => {

                    programUser.Login(req, res)
                    
                    
                    }) 

                    export {
     express,
     userRouter

                    }
import express from "express"
import bodyParser from "body-parser"
import {programUser} from "../model/index.js"
import {Product} from "../model/index.js"
const programUser = express.Router()

programUser.use(bodyParser.json())

programUser.get("/", (req, res) => {

programUser.fetchUsers(req, res)


})
programUser.get("/:id", (req, res) => {

    programUser.fetchSingleUser(req, res)
    
    
    })
programUser.post("/register", (req, res) => {

        programUser.registerUser(req,res)
        
        
        }) 
programUser.patch("/user/:id", (req, res) => {

            programUser.updateUser(req,res)
            
            
            }) 
programUser.delete("/user/:id", (req, res) => {

                programUser.deleteUser(req,res)
                
                
                }) 
programUser.post("/login", (req, res) => {

                    programUser.Login(req, res)
                    
                    
                    }) 

                    export {
     express,
     programUser

                    }
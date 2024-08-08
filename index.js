// 
import express from "express"
import path from "path"
import {connection as db } from "./config/Config.js"
//create express app
const app = express()
const port = +process.env.PORT || 4000
const router = express.Router()
// Middleware
app.use(router, 
express.static("./static"), 
express.json(),
express.urlencoded({
extended:true


}))

// Endpoint
router.get("^/$|/eShop", (req, res) => {
    
res.status(200).sendFile(path.resolve("./static/html/index.html"))   


})
router.get("/users", (req, res) => {

try {

    const strQry = `
    select firstName, lastName, age, emailAdd
    from Users;

    
    
    `
    db.query(strQry, (err, results) => {

if(err) throw new Error (`Unable to get users`)
  res.json({
status: res.statusCode,
results


    })

})
} catch (e) {

res.json ({
    status:404,
 Msg: e.message

})

}

})
router.get("/user/:id", (req, res) => {

try {

    
    const strQry = `
    select userID, firstName, lastName, age, emailAdd
    from Users
    where userID = ${req.params.id}; 
    
    
    `
    db.query(strQry, (err, results) => {

        if(err) throw new Error (`Unable to get users`)
            res.json({
          status: res.statusCode,
results          



            })
        })
    }catch(e) {

        res.json ({
            status:404,
         Msg: e.message
        
        })


    }
})

router.get("*", (req, res) => {

res.json({

status:404,
msg: "Page Not Found"

})



})
// router.get("/users/Single", (req, res) => {

//     try {
    
//         const strQrySingle = `
//         select firstName, lastName, age, emailAdd
//         from Users
//         where userID = 1;
//         ;
    
        
        
//         `
//         db.query(strQrySingle, (err, results) => {
    
//     if(err) throw new Error (`Unable to get users`)
//       res.json({
//     status: res.statusCode,
//     results
    
    
//         })
    
//     })
//     } catch (e) {
    
//     res.json ({
//         status:404,
//      Msg: e.message
    
//     })
    
//     }
    
//     })
app.listen(port, () => {

console.log(`Port is running at ${port}`);

})
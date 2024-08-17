// 
import {userRouter, express} from "./controller/UserController.js"
import {ProductRouter} from "./controller/ProductController.js"
import path from "path"//create express app
const app = express()
const port = +process.env.PORT || 4000// Middleware
// creating an express app
app.use((req, res, next) => {

res.header("Access-Control-Allow-Origin", "*");
next()

})
// THIS IS THE ACTUAL ENDPOINT THAT THE USER WILL NEED TO ENTER TO GET TO RELEVANT PAGES
app.use("/users", userRouter)
app.use("/products", ProductRouter)

app.use(
    
    express.static("./static"),
    express.json(),
    express.urlencoded({
        extended: true

    }))

app.get("^/$|/eShop", (req, res) => {

    res.status(200).sendFile(path.resolve("./static/HTML/index.html"))


})


app.get("*", (req, res) => {

    res.json({

        status: 404,
        msg: "Page Not Found"

    })



})
// app.get("/users/Single", (req, res) => {

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


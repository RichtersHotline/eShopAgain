// 
import {userRouter, express} from "./controller/UserController.js"
import {ProductRouter} from "./controller/ProductController.js"

import path from "path"
import { Product } from "./model/index.js"
//create express app
const app = express()
const port = +process.env.PORT || 4000
const router = express.Router()
// Middleware
app.use(router,
    "/users", userRouter,
    "/product", ProductRouter,
    express.static("./static"),
    express.json(),
    express.urlencoded({
        extended: true

    }))

router.get("^/$|/eShop", (req, res) => {

    res.status(200).sendFile(path.resolve("./static/html/index.html"))


})


router.get("*", (req, res) => {

    res.json({

        status: 404,
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
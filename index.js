// 
import express from "express"
import path from "path"
import {
    connection as db
} from "./config/Config.js"
import {
    createToken
} from "./middleware/AuthenticateUser.js"
import {
    hash, compare
} from "bcrypt"
import bodyParser from "body-parser"
import { create } from "domain"
//create express app
const app = express()
const port = +process.env.PORT || 4000
const router = express.Router()
// Middleware
app.use(router,
    express.static("./static"),
    express.json(),
    express.urlencoded({
        extended: true

    }))
router.use(bodyParser.json())

// Endpoint
router.get("^/$|/eShop", (req, res) => {

    res.status(200).sendFile(path.resolve("./static/html/index.html"))


})
router.get("/users", (req, res) => {

    try {

        const strQry = `
    select userID, firstName, lastName, age, emailAdd, UserRole, profileUrl
    from Users;

    
    
    `
        db.query(strQry, (err, results) => {
            // `Unable to get users`

            if (err) throw new Error("Users couldn't be retrieved")
            res.json({
                status: res.statusCode,
                results


            })

        })
    } catch (e) {

        res.json({
            status: 404,
            Msg: e.message

        })

    }

})
router.get("/users/:id", (req, res) => {

    try {


        const strQry = `
    select userID, firstName, lastName, age, emailAdd, UserRole, profileUrl
    from Users
    where userID = ${req.params.id}; 
    
    
    `
        db.query(strQry, (err, results) => {

            if (err) throw new Error(`Unable to get users`)
            res.json({
                status: res.statusCode,
                results



            })
        })
    } catch (e) {

        res.json({
            status: 404,
            Msg: e.message

        })


    }
})

router.get("/operatives", (req, res) => {
try {
const strQry = `
select * from TestTable;




`
db.query(strQry,(err, results) => {

if (err) throw new Error("Couldn't get operative database")
res.json({
status: res.statusCode,
results



})





})







} catch (e) {

    res.json({
    status:404,
    msg: e.message


    })





}






})
router.post("/opreg", async (req, res) => {
try {

    let data = req.body
    
    data.Mission = await hash(data.Mission, 10)
    let user = {
    Mission : data.Mission,
    Mask: data.Mask



    }



const strQry = `
insert into TestTable
Set ?;



`
db.query(strQry,[data], (err) => {
if(err) {
res.json({

    status: res.statusCode,
    msg: err.message




})




} else {

    const token = createToken(user) 
    res.json({
    token,
    msg: "You will be notified by phone when it is right."




    })







}








})




} catch (e) {
res.json({
status:404,
msg: "Operative could not be added for unknown reason."


})
}








})

// router.post("oplogin", (req, res) => {
// try {

// const { 
//     Operative, 
//     Mission


// } = req.body

// const strQry = `
// select OpID, Operative, Mask, Mission
// from TestTable
// where OpID = '${Mission}';



// `
// db.query(strQry, async(err, result) => {
//     if (err) throw new Error("Wrong info. You have 3 tries left before agents are dispatched to your location")
//         if(!result?.length) {
//         res.json({

//         status:404,
//         msg:"You're not in our database. How'd you get here?"



//         })





        
//     }else {

//     const isValidPass = await compare(Mission, result[0].Mission)
//     if (isValidPass) {
//         const token = createToken({
//         Mission,
//         Mask




//         })
//         res.json({




//         })









    







    
// })
// }catch(e) {






// }

// })


router.post("/register", async (req, res) => {
    try {
        let data = req.body
        // encrypts the users password to 12 random characters also known as salt (???)
        data.pwd = await hash(data.pwd, 12)
        //   Payload
        let user = {

            emailAdd: data.emailAdd,
            pwd: data.pwd

        }
        const strQry = `
 insert into Users
 SET ?;

`
        db.query(strQry, [data], (err) => {

            if (err) {
                res.json({
                    status: res.statusCode,
                    msg: err.message


                })



            } else {

                const token = createToken(user)
                res.json({
                    token,
                    msg: "Thank you for registering"


                })


            }
        })

    } catch (e) {
        // when a new user can't be added
        res.json({
            status: 404,
            msg: e.message

        })



    }

})
router.patch("/users/:id", async (req, res) => {
    try {

        let data = req.body
        if (data.pwd) {

            data.pwd = await hash(data.pwd, 12)

        }
        const strQry = `
    
    update Users
    set ?
    where userID = ${req.params.id};
    
    
    `
        db.query(strQry, [data], (err) => {
            if (err) throw new Error("unable to update user. Contact site Admin")
            res.json({

                status: res.statusCode,
                msg: "User record, Updated."


            })
        })
    } catch (e) {


        res.json({

            status: 400,
            msg: e.message


        })




    }

})









router.delete("/users/:id", (req, res) => {


    try {
        const strQry = ` 
delete from Users
where userID = ${req.params.id};

`
        db.query(strQry, (err) => {

            if (err) throw new Error("Cannot delete user, contact Site Admin if problem persists")
            res.json({

                status: res.statusCode,
                msg: "User's info was sucessfully removed."

            })


        })



    } catch (e) {

        res.json({

            status: 404,
            msg: e.message


        })

    }

})

router.post("/login", (req, res) => {
    try {

        const {
            emailAdd,
            pwd
        } = req.body
        const strQry = `
    
    select userID, firstName, lastName, age, emailAdd, pwd, UserRole, profileUrl
    from Users
    where emailAdd = '${emailAdd}';
    
    
    `
        db.query(strQry, async (err, result) => {
            if (err) throw new Error("Login couldn't happen. Check your details")
            if (!result?.length) {
                res.json({

                    status: 401,
                    msg: "Email Address not found. Unauthorised users will be prosecuted"


                })


            } else {

                const isValidPass = await compare(pwd, result[0].pwd)
                if (isValidPass) {

                    const token = createToken({
                        emailAdd,
                        pwd


                    })
                    res.json({
                        status: res.statusCode,
                        token,
                        result: result[0]




                    })

                } else {

                    res.json({

                        status: 401,
                        msg: "You might not be registered"


                    })


                }


            }
        })


    } catch (e) {

        res.json({
            status: 404,
            msg: e.message



        })

    }





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
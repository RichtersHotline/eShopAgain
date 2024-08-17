import {
    connection as db
} from "../Config/Config.js"
import {
    createToken
} from "../middleware/AuthenticateUser.js"
import {
    hash, compare
} from "bcrypt"

class Users {
fetchUsers(req, res) {
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
    


}
fetchSingleUser(req, res) {

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






}
async registerUser(req, res)  {
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



}
async updateUser(req, res) {

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





}
deleteUser(req, res) {
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




}
async Login(req, res) {
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






}



}

export {

    Users


}
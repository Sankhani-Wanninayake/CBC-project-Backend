import User from '../models/user.js';

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import dotenv from "dotenv";
dotenv.config();// load env file

export function createUser(req, res) {
    const newUserData = req.body;

    if (newUserData.type == "admin") {
        if (req.user == null) {
            res.json({
                message: "please login as administrator to create admin account"
            });
            return;
        }
    }

    if (req.user && req.user.type != "admin" && newUserData.type == "admin") {
        res.json({
            message: "you are not allowed to create an admin account"
        });
        return;
    }

    
    newUserData.password = bcrypt.hashSync(newUserData.password, 10);

    const user = new Users(newUserData);
    user.save()
        .then(() => {
            res.json({ message: "user created" });
        })
        .catch((e) => {
            console.log(e);
            res.status(500).json({ message: "user not created" });
        });
}



export function getUser(res, req) {


    Users.find().then(

        (Userlist) => {

            res.json({

                list: Userlist
            })
        }
    )
}

export function loginUser(req, res) {

    Users.find({ email: req.body.email }).then(
        (users) => {

            if (users.length == 0) {
                res.json({
                    message: "user not found"
                })
            } else {

                const user = users[0]

                const isPasswordCorrect = bcrypt.compareSync
                    (req.body.password, user.password)

                if (isPasswordCorrect) {



                    const token = jwt.sign({

                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        isBlocked: user.isBlocked,
                        type: user.type,
                        profilepic: user.profilepic
                    }, process.env.secret,)
                    
                    

                    res.json({
                        message: "User Logget in", token: token
                    }) 
                   

                   


                } else {
                    res.json({
                        message: "User are not logged in or incorrect Password"
                    })
                }


            }

        }
    )
}  
 
export function isAdmin(req, res) {
    if (req.user == null) {
      
        return false
    }

    if (req.user.type != "admin") {
       
        return false
    }

    return true


}
export function iscustomer(req, res) {
    if (req.user == null) {
        return false
    }

    if (req.user.type != "user") {
        return false
    }

    return true
}  
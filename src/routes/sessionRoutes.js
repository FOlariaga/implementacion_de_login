import {Router} from "express";
import UsersManager from "../dao/usersManager.js";

const usersManager = new UsersManager()
const router = Router()

router.post("/login" , async (req, res) => {
    try {
        const {email, password} = req.body

        const userSaved = await usersManager.getByEmail(email)

        if ( email !== userSaved.email || password !== userSaved.password) {
            return res.status(401).send({ payload: 'Datos de acceso no válidos' });
        }
        
        req.session.user = { firstName: userSaved.firstName, lastName: userSaved.lastName, email: userSaved.email, role: userSaved.role };

        res.redirect("/products")

    } catch (error) {
        console.log(error);
    }
})

router.post("/register" , async (req, res) => {
    try {
        
    } catch (error) {
        
    }
})

router.get("/private" , async (req, res) => {
    try {
        
    } catch (error) {
        
    }
})

router.get("/logout" , async (req, res) => {
    try {
        req.session.destroy((err) => {
            if (err) return res.status(500).send({ origin: config.SERVER, payload: 'Error al ejecutar logout', error: err });
            res.redirect('/login')
        })
    } catch (error) {
        
    }
})

export default router
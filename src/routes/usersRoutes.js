import { Router } from "express";
import config from "../config.js";
import UsersManager from "../dao/usersManager.js";

const usersManager = new UsersManager()
const router = Router()

router.get("/", async (req, res) => {
    try {
        const users = await usersManager.get()

        res.status(200).send({ origin: config.SERVER, payload: users })
    } catch (error) {
        res.status(500).send({ origin: config.SERVER, payload: null })
    }
})

router.get("/:pid", async (req, res) => {
    try {
        const pid = req.params.pid
        const user = await usersManager.getById(pid)

        res.status(200).send({ origin: config.SERVER, payload: user })
    } catch (error) {
        res.status(500).send({ origin: config.SERVER, payload: null })
    }
})

router.post("/", async (req, res) => {
    try {
        const user = await usersManager.add(req.body)

        console.log(user);
        console.log(user.exist);
        if (user.exist) {
           return  res.status(200).send({ origin: config.SERVER, payload: user.payload });
        }
        res.redirect("/login")

    } catch (error) {
        res.status(500).send({ origin: config.SERVER, payload: null })
    }
})

router.put("/:pid", async (req, res) => {
    try {
        const filter = { _id: req.params.pid };
        const update = req.body;
        const options = { new: true };
        const user = await usersManager.update(filter, update, options);

        res.status(200).send({ origin: config.SERVER, payload: user });
    } catch (error) {
        res.status(500).send({ origin: config.SERVER, payload: null })
    }
})

router.delete("/:uid", async (req, res) => {
    try {
        const uid = { _id: req.params.uid }
        await usersManager.delete(uid);
        console.log(`usuario eliminado de la base de datos`);

        res.status(200).send({ origin: config.SERVER, payload: "eliminado" });
    } catch (error) {
        res.status(500).send({ origin: config.SERVER, payload: null })
    }
})

export default router
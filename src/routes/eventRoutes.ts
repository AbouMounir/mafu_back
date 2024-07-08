import express, {Router} from "express";

const router: Router = express.Router();

router.get("/testEvent", (req, res) => {
    res.send({status: 200, message: "Test event received", data: {id:2,name: "test"}})
})

export {router as EventRouter}

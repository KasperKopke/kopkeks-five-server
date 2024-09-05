import express from 'express';
import { blink, turnOn, turnOff } from "../handlers/commands.handler.js";
// Setting Routes
const commandsRouter = express.Router();

commandsRouter.get('/commands/on', async (req, res) => {

    turnOn();
    return res.json({status: true});

});

commandsRouter.get('/commands/off', async (req, res) => {

    turnOff();
    return res.json({status: true});
    
});

commandsRouter.get('/commands/blink', async (req, res) => {

    if(req.query.delay) {
        blink(req.query.delay);
    } else {
        blink();
    }

    return res.json({status: true});
    
});

export default commandsRouter;
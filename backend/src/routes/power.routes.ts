import {Router} from "express";
import {getBestWindow, getPowerMix} from "../controllers/power.controller";

const router = Router();

router.get('/mix', getPowerMix)
router.get('/best-window', getBestWindow)

export default router
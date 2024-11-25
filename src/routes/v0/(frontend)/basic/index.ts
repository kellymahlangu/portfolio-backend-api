import { Router } from 'express';
import {prisma} from "../../../../utils/prisma.js";
import CacheUtil from "../../../../utils/cache.js";
import {aboutType, basicType} from "../../../../utils/fetch.js";
import {fetchInstance} from "../../../../server.js";

const router = Router();

// @ts-ignore
router.get('/', async (req, res) => {
    const cachedData = CacheUtil.get<basicType>('basic');

    if (cachedData) {
        return res.json({status: 'success', data: cachedData, code: 200});
    }

    const data = await fetchInstance.basic();
    if (data === null || data === undefined) {
        return res.json({status: 'error', data: null, code: 404});
    }
    CacheUtil.put('basic', data, 600000) // Cache for 1 hour
    return res.json({status: 'success', data: data, code: 200});
});

export default router;

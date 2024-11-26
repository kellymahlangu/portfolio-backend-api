import { Router } from 'express';
import CacheUtil from "../../../../utils/cache.js";
import {aboutType} from "../../../../utils/fetch.js";
import { Get } from "../../../../utils/fetch.js";
import {fetchInstance} from "../../../../server.js";

const router = Router();

// @ts-ignore
router.get('/', async (req, res) => {
    const cachedData = CacheUtil.get<aboutType>('about');

    if (cachedData) {
        return res.json({status: 'success', data: cachedData, code: 200});
    }

    const data = await fetchInstance.about();
    if (data === null || data === undefined) {
        return res.json({status: 'error', data: null, code: 404});
    }
    CacheUtil.put('about', data, 100000) // Cache for 10 mins
    return res.json({status: 'success', data: data, code: 200});
});

export default router;

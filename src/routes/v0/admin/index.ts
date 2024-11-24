import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
    res.send('Admin Data ');
});

export default router;

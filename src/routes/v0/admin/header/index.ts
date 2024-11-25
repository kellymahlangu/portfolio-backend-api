import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
    res.json(
        {
            logo: "https://cdn.yourportfolio.com/logo.png",
            title: "K-Mahlangu"
        }
    );
});

export default router;

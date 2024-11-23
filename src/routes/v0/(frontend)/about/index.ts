import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
    res.json(
        {
            photo: "https://cdn.yourportfolio.com/logo.png",
            description: {
                paragraph1: "",
                paragraph2: "",
                paragraph3: "",
            },
            cv: "https://cdn.yourportfolio.com/cv.pdf"
        }
    );
});

export default router;

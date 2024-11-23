import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
    res.json(
        {
            logo: "https://cdn.yourportfolio.com/logo.png",
            title: "K-Mahlangu",
            navigationLinks: [
                { name: "About", url: "/about" },
                { name: "Projects", url: "/projects" },
                { name: "Skills", url: "/skills" },
                { name: "Contact", url: "/contact" }
            ]
        }
    );
});

export default router;

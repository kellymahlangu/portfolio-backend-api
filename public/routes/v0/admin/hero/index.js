import { Router } from 'express';
const router = Router();
router.get('/', (req, res) => {
    res.json({
        name: "Kelly Mahlangu",
        specialization: "Frontend Developer",
        tagline: "Crafting beautiful, responsive web experiences.",
        ctaButtons: [
            { label: "View My Work", url: "/projects" },
            { label: "Contact Me", url: "/contact" },
            { label: "My CV", url: "api.portfoliopage.com/link-to-cv-file" }
        ]
    });
});
export default router;
//# sourceMappingURL=index.js.map
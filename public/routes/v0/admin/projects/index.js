import { Router } from 'express';
const router = Router();
router.get('/', (req, res) => {
    res.json({
        projects: [
            {
                id: 1,
                title: "Portfolio Website",
                thumbnail: "https://cdn.yourportfolio.com/projects/portfolio.jpg",
                summary: "A personal portfolio showcasing my work and skills.",
                techStack: ["React", "CSS", "Netlify"],
                links: {
                    demo: "https://portfolio.johndoe.com",
                    code: "https://github.com/johndoe/portfolio"
                }
            },
            {
                id: 2,
                title: "E-commerce Platform",
                thumbnail: "https://cdn.yourportfolio.com/projects/ecommerce.jpg",
                summary: "A scalable e-commerce solution with payment integration.",
                techStack: ["Node.js", "React", "Stripe"],
                links: {
                    demo: "https://ecommerce.johndoe.com",
                    code: "https://github.com/johndoe/ecommerce"
                }
            }
        ]
    });
});
export default router;
//# sourceMappingURL=index.js.map
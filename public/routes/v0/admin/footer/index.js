import { Router } from 'express';
const router = Router();
router.get('/', (req, res) => {
    res.json({
        socialMedia: [
            { platform: "LinkedIn", url: "https://linkedin.com/in/johndoe" },
            { platform: "GitHub", url: "https://github.com/johndoe" },
            { platform: "Twitter", url: "https://twitter.com/johndoe" }
        ],
        "quickLinks": [
            { name: "Privacy Policy", url: "/privacy-policy" },
            { name: "Terms of Service", url: "/terms-of-service" }
        ]
    });
});
export default router;
//# sourceMappingURL=index.js.map
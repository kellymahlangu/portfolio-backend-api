import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
    res.json(
        {
            experience: [
                {
                    company: "TechCorp",
                    role: "Frontend Developer",
                    dates: "Jan 2020 - Present",
                    achievements: [
                        "Developed a component library used across company products.",
                        "Improved website performance by 35%."
                    ]
                },
                {
                    company: "Design Studio",
                    role: "Web Designer",
                    dates: "Jun 2018 - Dec 2019",
                    achievements: [
                        "Redesigned client websites with a 50% increase in user engagement.",
                        "Created over 20 unique landing pages for clients."
                    ]
                }
            ]
        }

    );
});

export default router;

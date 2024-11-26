import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.json({
    categories: [
      {
        name: "Frontend",
        skills: [
          { name: "HTML", icon: "icon.svg", level: 0 },
          { name: "CSS", icon: "icon.svg", level: 0 },
          { name: "JavaScript", icon: "icon.svg", level: 0 },
          { name: "React", icon: "icon.svg", level: 0 },
          { name: "Vue", icon: "icon.svg", level: 0 },
        ],
      },
      {
        name: "Backend",
        skills: [
          { name: "Node.js", icon: "icon.svg", level: 0 },
          { name: "Express", icon: "icon.svg", level: 0 },
          { name: "MongoDB", icon: "icon.svg", level: 0 },
        ],
      },
      {
        name: "Tools",
        skills: [
          { name: "Git", icon: "icon.svg" },
          { name: "Figma", icon: "icon.svg" },
          { name: "Webpack", icon: "icon.svg" },
        ],
      },
    ],
  });
});

export default router;

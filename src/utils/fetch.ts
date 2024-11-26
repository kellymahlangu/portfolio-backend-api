import { levels } from "better-auth";
import { prisma } from "./prisma.js";

export type basicType = {
  email: string;
  firstName: string;
  lastName: string;
  contact: string;
  occupation: string;
  slogan: string;
  title: string;
  logo: string;
  img: string;
};
export type aboutType = {
  photo: string;
  description: {
    paragraph1: string;
    paragraph2: string;
    paragraph3: string;
  };
  cv: string;
};
export type skill = {
  name: string;
  icon: string;
  level: number;
};
export type category = {
  name: string;
  icon: string;
  skills: skill[];
};
export class Get {
  async basic(): Promise<basicType | null> {
    try {
      const basicRecord = await prisma.basic.findFirst();

      if (!basicRecord) {
        return null;
      }

      return {
        firstName: basicRecord.firstName,
        lastName: basicRecord.lastName,
        email: basicRecord.email,
        contact: basicRecord.contact,
        img: basicRecord.mainImg,
        logo: basicRecord.logo,
        occupation: basicRecord.occupation,
        slogan: basicRecord.slogan,
        title: basicRecord.title,
      };
    } catch (error) {
      console.error("Error fetching basic data:", error);
      return null;
    }
  }

  async about(): Promise<aboutType | null> {
    try {
      const aboutRecord = await prisma.about.findFirst();

      if (!aboutRecord) {
        return null;
      }

      return {
        photo: aboutRecord.img,
        description: {
          paragraph1: aboutRecord.text1,
          paragraph2: aboutRecord.text2,
          paragraph3: aboutRecord.text3,
        },
        cv: aboutRecord.cv,
      };
    } catch (error) {
      console.error("Error fetching about data:", error);
      return null;
    }
  }

  async skills(): Promise<category[] | null> {
    try {
      const categories = await prisma.category.findMany({
        include: {
          Skills: true,
        },
      });

      if (!categories.length) {
        return null;
      }

      const data: category[] = categories.map((category) => ({
        name: category.name,
        icon: category.icon,
        skills: category.Skills.map((skill) => ({
          name: skill.name,
          icon: skill.icon,
          level: skill.level,
        })),
      }));

      return data;
    } catch (error) {
      console.error("Error fetching skill data:", error);
      return null;
    }
  }
}

import {prisma} from "./prisma.js";

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
}
export type aboutType = {
    photo: string,
    description: {
        paragraph1: string,
        paragraph2: string,
        paragraph3: string
    },
    cv: string
}
export type skill = {
    name: string,
    icon: string,
    level: number
}
export type category = {
    name: string,
    skills: skill[],
}
export type skillType = {
    categories: category[]
}

export class Get {
    async basic(): Promise<basicType | null> {
        const basic = await prisma.basic.findFirst();
        if (!basic) {
            return null
        }
        return {
            firstName: basic.firstName,
            lastName: basic.lastName,
            email: basic.email,
            contact: basic.contact,
            img: basic.mainImg,
            logo: basic.logo,
            occupation: basic.occupation,
            slogan: basic.slogan,
            title: basic.title,
        };
    }

    async about(): Promise<aboutType | null> {
        const about = await prisma.about.findFirst();
        if (!about) {
            return null;
        }
        return {
            photo: about.img,
            description: {
                paragraph1: about.text1,
                paragraph2: about.text2,
                paragraph3: about.text3,
            },
            cv: about.cv,
        };
    }

    async skills(): Promise<skillType | null> {
        return null
    }
}




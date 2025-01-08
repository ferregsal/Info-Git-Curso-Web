export type Char = {
    isAlive: boolean;
    message: string;
    name: string;
    family: string;
    age: number;
    category: string;
    reignYears?: number;
    weapon?: string;
    skillLevel?: number;
    adviseTo?: Char;
    serveLevel?: number;
    servesTo?: Char;
};

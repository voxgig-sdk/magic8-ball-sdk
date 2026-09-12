export interface Biased {
    calculation: any[];
    comparative: number;
    locale?: string;
    lucky?: boolean;
    negative: any[];
    positive: any[];
    question: string;
    score: number;
    tokens: any[];
    words: any[];
}
export interface BiasedLoadMatch {
    locale?: string;
    lucky?: boolean;
    question: string;
}
export interface BiasedCreateData {
    calculation: any[];
    comparative: number;
    locale?: string;
    lucky?: boolean;
    negative: any[];
    positive: any[];
    question: string;
    score: number;
    tokens: any[];
    words: any[];
}
export interface Category {
    locale: string;
    negative: any[];
    neutral: any[];
    positive: any[];
}
export interface CategoryListMatch {
    locale?: string;
}
export interface CategoryFortune {
    category: string;
    locale: string;
    reading: string;
}
export interface CategoryFortuneLoadMatch {
    category: string;
    locale?: string;
}
export interface RandomFortune {
}

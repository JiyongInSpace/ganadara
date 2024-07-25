import { LEVELS } from "./enums";

export interface IChapter {
    levels: LEVELS;
    name: string;
    id: number;
    groupSize: number;
    isLocked: boolean;
    state: string;
    totalProblems: number;
    solvedProblems: number;
}
// generate a random number between X and Y
const random = (min: number, max: number): number => Math.floor(Math.random() * (max - min) + min);

export const numberHelpers = {
    random
}
export const delay = (ms: number = 100) => new Promise((res) => setTimeout(res, ms));

export const randomInt = (min: number = 100, max: number = 300) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

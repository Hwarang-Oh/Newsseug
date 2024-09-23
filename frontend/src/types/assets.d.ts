declare module '*.svg' {
  const content: any;
  export default content;
}

declare module '*.png' {
  const content: any;
  export default content;
}

declare module '*.ttf' {
  const content: string;
  export default content;
}

declare module '@woowa-babble/random-nickname' {
  export function getRandomNickname(type: string): string;
}

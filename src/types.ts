export type srCoupon = {
  p: HTMLParagraphElement;
  a: HTMLAnchorElement;
};

export type ssCoupon = {};

export type URLpattern = {
  pattern: (url: URL) => boolean;
  store: string;
  targetFrame: string;
};

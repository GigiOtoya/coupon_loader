export type SRCoupon = {
  p: HTMLParagraphElement;
  a: HTMLAnchorElement;
};

export type SSCoupon = {};

export type URLpattern = {
  pattern: (url: URL) => boolean;
  store: string;
  targetFrame: string;
};

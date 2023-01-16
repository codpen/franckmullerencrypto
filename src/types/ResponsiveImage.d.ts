export default interface ResponsiveImage {
  src: string;
  srcSet: string;
  placeholder: string;
  images: {
    height: number;
    width: number;
    path: string;
  }[];
  height: number;
  width: number;
  toString: () => void;
}

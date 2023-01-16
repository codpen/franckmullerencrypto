declare module 'svgs/*' {
  const path: string;
  const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;

  export { ReactComponent };
  export default path;
}

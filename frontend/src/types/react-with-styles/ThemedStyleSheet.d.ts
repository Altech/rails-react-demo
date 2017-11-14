declare module "react-with-styles/lib/ThemedStyleSheet" {
  interface ThemedStyleSheet {
    registerTheme(theme: { [key: string]: any }): void;
    registerInterface(interfaceToRegister: any): void;
    create(makeFromTheme: any): () => any;
    get(): { [key: string]: any };
    resolveNoRTL(...styles: any[]): any;
    resolve(...styles: any[]): any;
    flush(): void;
  }
  var _: ThemedStyleSheet;
  export default _;
}

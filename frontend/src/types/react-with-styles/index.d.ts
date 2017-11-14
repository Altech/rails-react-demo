declare module "react-with-styles" {
  import * as React from "react";
  import ThemedStyleSheet from "react-with-styles/lib/ThemedStyleSheet";

  type Diff<T extends string, U extends string> = ({ [P in T]: P } &
    { [P in U]: never } & { [x: string]: never })[T];
  type Omit<T, K extends keyof T> = Pick<T, Diff<keyof T, K>>;

  type InjectedProps<Style> = {
    styles: {
      [key in keyof Style]: {
        _definition: React.CSSProperties;
        _len: number;
        _name: string;
      }
    };
  };

  interface InferableComponentEnhancer<Style> {
    <P extends InjectedProps<Style>>(
      component: React.ComponentType<P>
    ): React.ComponentClass<Omit<P, keyof InjectedProps<Style>>>;
  }

  export interface WithStylesOption {
    stylesPropName?: string;
    themePropName?: string;
    flushBefore?: boolean;
    pureComponent?: boolean;
  }

  export function withStyles<Style, T>(
    styleFn: (theme: T) => Style,
    opts?: WithStylesOption
  ): InferableComponentEnhancer<Style>;

  export const css: typeof ThemedStyleSheet.resolve;
}

import ThemedStyleSheet from "react-with-styles/lib/ThemedStyleSheet";
import aphroditeInterface from "react-with-styles-interface-aphrodite/no-important";
import {
  css,
  withStyles as _withStyles,
  WithStylesOption
} from "react-with-styles";

import * as theme from "./cssVariables";

ThemedStyleSheet.registerTheme(theme);
ThemedStyleSheet.registerInterface(aphroditeInterface);

export function withStyles<Style>(
  styleFn: (_theme: typeof theme) => Style,
  opts?: WithStylesOption
) {
  return _withStyles(styleFn, opts);
}

export { css, ThemedStyleSheet };

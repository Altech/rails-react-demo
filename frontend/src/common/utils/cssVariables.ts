// NOTE(miyashiro): IntelliSense で値が表示できるメリットがあるので、固定値は enum で設定する

export enum colors {
  // wantedly color palette
  gray1 = "#9DA0A4",
  gray2 = "#6A6E71",
  gray3 = "#45494B",
  gray4 = "#24282A",
  gray5 = "#36393A",
  lightgray1 = "#EBEDEF",
  lightgray2 = "#D7DBDF",
  lightergray1 = "#f5f5f5",
  lightergray2 = "#f9f9f9",
  lightergray3 = "#f0f0f0",
  slateGray = "#45494b",
  blue1 = "#00A4BB",
  blue2 = "#006F8E",
  red1 = "#FF3333",
  red2 = "#F55B3E",
  red3 = "#c12626",
  green1 = "#6CC644",
  yellow1 = "#FED100",
  yellow2 = "#FFE675",
  lightyellow1 = "#F7F5DF",
  bluegray1 = "#E8EFF0",
  lightred1 = "#FCC",
  lightred2 = "#FEE",

  layoutLightBorder = "#e3e3e3",
  buttonNewLightgray = "#f5f5f5",
  buttonNewLightgrayBorder = "#ddd",
  buttonNewBlueBorder = "#1e7785",
  buttonNewGreenBorder = "#4f8338",
  buttonNewRed = "#e04747",
  buttonNewRedBorder = "#a33f3f",
  buttonNewYellowBorder = "#d4b318",

  facebookLoginButton = "#4060a0",
  facebookLoginButtonBorder = "#303d57",

  linkedinLoginButton = "#0077b5",
  linkedinLoginButtonBorder = "#303d57",

  selectedBlue = "#56b5c2",
  lightTextGray = "#ccc",
  footerBgColor = "#f0f4f5",

  gradationBlue = "linear-gradient(to right, #1b85dc, #08b0cb)",

  //iOS color
  grayTextColor = "#656f72",
  green2 = "#89d169",
  wtdBlueColor = "#19adc2",
  highlightedBackgroundColor = "#e8f7f9"
}

export const rootWrapper = {
  width: 890,
  margin: "auto",
  padding: "0 2.5em",
  color: colors.gray4
};

export const simpleHeader = {
  margin: 0,
  padding: "0.5em 0",
  borderBottom: `1px solid ${colors.layoutLightBorder}`
};

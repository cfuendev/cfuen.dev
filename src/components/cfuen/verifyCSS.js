const validCSSMeasureUnits = [
  "px",
  "in",
  "cm",
  "mm",
  "pt",
  "pc",
  "%",
  "em",
  "rem",
  "vw",
  "vh",
  "vmin",
  "vmax",
  "fr",
  "ch",
  "dvh",
  "dvw",
  "dvmin",
  "dvmax",
];

const otherCSSValues = ["none", "auto"];

const validCSSBgPositionUnits = ["cover", "contain"];

const isValidCSSMeasureUnit = (CSSPropUnit) => {
  if (!otherCSSValues.includes(CSSPropUnit)) {
    if (!validCSSMeasureUnits.includes(CSSPropUnit)) {
      throw Error(
        `Flora CSSError: Using invalid CSS measurement unit '${CSSPropUnit}'`
      );
    }
  }
};

const propertyIsValidCssSize = (CSSProp) => {
  const match = CSSProp.match(/(\d+)([a-zA-Z]+)/);
  if (match)
    if (isNaN(parseFloat(match[1]))) {
      throw Error(
        `Flora CSSError: Using invalid CSS size number '${match[1]}'`
      );
    }
  isValidCSSMeasureUnit(match[2]);
};

const propertyUsesValidAspectRatioSyntax = (CSSProp) => {
  const match = CSSProp.match(/(\d+)\/(\d+)/);
  if (match) {
    if (isNaN(parseFloat(match[1]))) {
      throw Error(
        `Flora CSSError: Using invalid number '${match[1]}' on Aspect Ratio '${CSSProp}'`
      );
    }
    if (isNaN(parseFloat(match[2]))) {
      throw Error(
        `Flora CSSError: Using invalid number '${match[2]}' on Aspect Ratio '${CSSProp}'`
      );
    }
  } else {
    throw Error(
      `Flora CSSError: Using invalid aspect ratio syntax '${CSSProp}'`
    );
  }
};

const propertyUsesValidBgPositionValue = (CSSProp) => {
  if (!otherCSSValues.includes(CSSPropUnit)) {
    if (!validCSSBgPositionUnits.includes(CSSPropUnit)) {
      throw Error(
        `Flora CSSError: Using invalid CSS background position value '${CSSPropUnit}'`
      );
    }
  }
};

export {
  isValidCSSMeasureUnit,
  propertyIsValidCssSize,
  propertyUsesValidAspectRatioSyntax,
  propertyUsesValidBgPositionValue
};

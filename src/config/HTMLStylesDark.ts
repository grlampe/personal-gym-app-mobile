import { I18nManager, TextStyle } from "react-native";

const commonStyle: TextStyle = {
    textAlign: I18nManager.isRTL ? "right" : "left",
    color: 'white'
}

const commonFontSize: TextStyle = {
    fontSize: 16,
    ...commonStyle
}

const headingStyle: TextStyle = {
    fontSize: 18,
    fontWeight: 'bold',
    ...commonStyle
}

const divStyle: TextStyle = {
    marginBottom: 30,
    textAlign: I18nManager.isRTL ? "right" : "left"
}

export const HTMLStylesDark: Record<string, TextStyle> = {
    p: commonFontSize,
    a: {
        textDecorationLine: 'underline',
        ...commonStyle
    },
    div: divStyle,
    ol: commonFontSize,
    li: commonFontSize,
    ul: commonFontSize,
    h1: headingStyle,
    h2: headingStyle,
    h3: headingStyle,
    h4: headingStyle,
    h5: headingStyle,
    h6: headingStyle
}

import {I18nManager} from "react-native";

export const HTMLStyles = {

	p: {fontSize: 16, textAlign: I18nManager.isRTL ? "right" : "left"},

    a: {textDecorationLine: 'underline', textAlign: I18nManager.isRTL ? "right" : "left"},

    div: {marginBottom: 30, textAlign: I18nManager.isRTL ? "right" : "left"},

    ol: {fontSize: 16, textAlign: I18nManager.isRTL ? "right" : "left"},

    li: {fontSize: 16, textAlign: I18nManager.isRTL ? "right" : "left"},

    ul: {fontSize: 16, textAlign: I18nManager.isRTL ? "right" : "left"},

    h1: {fontSize: 18, fontWeight: 'bold', textAlign: I18nManager.isRTL ? "right" : "left"},

    h2: {fontSize: 18, fontWeight: 'bold', textAlign: I18nManager.isRTL ? "right" : "left"},

    h3: {fontSize: 18, fontWeight: 'bold', textAlign: I18nManager.isRTL ? "right" : "left"},

    h4: {fontSize: 18, fontWeight: 'bold', textAlign: I18nManager.isRTL ? "right" : "left"},

    h5: {fontSize: 18, fontWeight: 'bold', textAlign: I18nManager.isRTL ? "right" : "left"},

    h6: {fontSize: 18, fontWeight: 'bold', textAlign: I18nManager.isRTL ? "right" : "left"}


}
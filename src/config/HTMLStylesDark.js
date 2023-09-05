import {I18nManager} from "react-native";

export const HTMLStylesDark = {

	p: {fontSize: 16, textAlign: I18nManager.isRTL ? "right" : "left", color: 'white'},

    a: {textDecorationLine: 'underline', textAlign: I18nManager.isRTL ? "right" : "left", color: 'white'},

    div: {marginBottom: 30, textAlign: I18nManager.isRTL ? "right" : "left"},

    ol: {fontSize: 16, color: 'white', textAlign: I18nManager.isRTL ? "right" : "left"},

    li: {fontSize: 16, color: 'white', textAlign: I18nManager.isRTL ? "right" : "left"},

    ul: {fontSize: 16, color: 'white', textAlign: I18nManager.isRTL ? "right" : "left"},

    h1: {fontSize: 18, fontWeight: 'bold', textAlign: I18nManager.isRTL ? "right" : "left", color: 'white'},

    h2: {fontSize: 18, fontWeight: 'bold', textAlign: I18nManager.isRTL ? "right" : "left", color: 'white'},

    h3: {fontSize: 18, fontWeight: 'bold', textAlign: I18nManager.isRTL ? "right" : "left", color: 'white'},

    h4: {fontSize: 18, fontWeight: 'bold', textAlign: I18nManager.isRTL ? "right" : "left", color: 'white'},

    h5: {fontSize: 18, fontWeight: 'bold', textAlign: I18nManager.isRTL ? "right" : "left", color: 'white'},

    h6: {fontSize: 18, fontWeight: 'bold', textAlign: I18nManager.isRTL ? "right" : "left", color: 'white'}


}
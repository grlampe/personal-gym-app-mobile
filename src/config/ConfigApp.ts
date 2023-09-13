// ConfigApp.ts

type ConfigAppType = {
    URL: string;
    DEFAULTLANG: string;
    THEMEMODE: "light" | "dark";
    SHOWADS: boolean;
    ANDROID_BANNER_ID: string;
    IOS_BANNER_ID: string;
    ONESIGNAL_APP_ID: string;
};

const ConfigApp: ConfigAppType = {
    URL: "https://wicombit.com/demo/gofit/",
    DEFAULTLANG: "en",
    THEMEMODE: "light",
    SHOWADS: false,
    ANDROID_BANNER_ID: "ca-app-pub-3940256099942544/6300978111",
    IOS_BANNER_ID: "ca-app-pub-3940256099942544/6300978111",
    ONESIGNAL_APP_ID: "",
};

export default ConfigApp;

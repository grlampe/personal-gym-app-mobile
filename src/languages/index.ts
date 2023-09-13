import en from './en.json';

export interface Language {
  texts: { [key: string]: string };
  label: string;
  value: string;
}

const Languages: { [key: string]: Language } = {
  en: { texts: en, label: "English", value: "en" },
};

export default Languages;

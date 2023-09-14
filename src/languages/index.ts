import en from './en.json';
import br from './br.json';

export interface Language {
  texts: { [key: string]: string };
  label: string;
  value: string;
}

const Languages: { [key: string]: Language } = {
  en: { texts: en, label: "English", value: "en" },
  br: { texts: br, label: "Português (BR)", value: "br" },
};

export default Languages;

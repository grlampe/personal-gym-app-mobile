import { useContext } from "react";
import PreferencesContext from '../context/pref.context';

const usePreferences = () => useContext(PreferencesContext);

export default usePreferences;

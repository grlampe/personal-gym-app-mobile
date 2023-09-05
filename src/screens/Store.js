import React from 'react';
import { ScrollView, View, SafeAreaView } from 'react-native';
import Styles from '../config/Styles';
import Languages from '../languages';
import LanguageContext from '../languages/LanguageContext';
import FeaturedProducts from '../components/FeaturedProducts';
import Heading from '../components/Heading';
import LatestProducts from '../components/LatestProducts';
import ProductTypes from '../components/ProductTypes';

export default function Store(props) {

  const contextState = React.useContext(LanguageContext);
  const language = contextState.language;
  const Strings = Languages[language].texts;
  
  const onChangeScreen = (screen) => {
    props.navigation.navigate(screen);
  };

 return (

  <ScrollView
  showsHorizontalScrollIndicator={false}
  showsVerticalScrollIndicator={false}
>
    
<SafeAreaView>

    <View style={Styles.StoreScreen}>

    <Heading title={Strings.ST69}/>
    <FeaturedProducts/>

    <Heading title={Strings.ST71} button={() => onChangeScreen('types')}/>
    <ProductTypes/>

    <Heading title={Strings.ST70} button={() => onChangeScreen('products')}/>
    <LatestProducts/>

    </View>
    </SafeAreaView>
    </ScrollView>

      );

}



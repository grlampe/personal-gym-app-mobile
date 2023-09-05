import React from 'react';
import { ScrollView, View, SafeAreaView } from 'react-native';
import Styles from '../config/Styles';
import Languages from '../languages';
import LanguageContext from '../languages/LanguageContext';
import Heading from '../components/Heading';
import FeaturedPosts from '../components/FeaturedPosts';
import PostTags from '../components/PostTags';
import LatestPosts from '../components/LatestPosts';

export default function Blog(props) {

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

    <View style={Styles.HomeScreen}>

    <FeaturedPosts/>

    <Heading title={Strings.ST72} button={() => onChangeScreen('tags')}/>
    <PostTags/>

    <Heading title={Strings.ST73} button={() => onChangeScreen('posts')}/>
    <LatestPosts/>

    </View>
    </SafeAreaView>
    </ScrollView>

      );

}



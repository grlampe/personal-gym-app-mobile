import React, { useState, useEffect } from 'react';
import { ScrollView, View} from 'react-native';
import { map } from 'lodash';
import Loading from './InnerLoading';
import { getProductTypes } from "../config/DataApp";
import { Chip } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export default function ProductTypes() {

  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    getProductTypes().then((response) => {
        setItems(response);
        setIsLoaded(true);
    });
  }, []);

  if (!isLoaded) {
    return (
      <Loading/>
      );
  }

  if (isLoaded) {
    return (
      <View style={{marginVertical: 10}}>
      <ScrollView
          style={{width: '100%'}}
          contentContainerStyle={{ flexGrow: 1, paddingRight: 20 }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
        {map(items, (item, index) => (
        <RenderItem key={index} item={item} />

          ))}
      </ScrollView>
      </View>
      );
  }

}

function RenderItem(props) {

    const navigation = useNavigation();

    const onChangeScreen = (id, title) => {
    navigation.navigate('singletype', {
      id: id,
      title: title
    });    
  };

    const { item } = props;
    const { id, title } = item;

      return (
          
    <View style={{marginLeft: 15}}>
        <Chip icon="tag" mode="outlined" onPress={() => onChangeScreen(id, title)}>{item.title}</Chip>
    </View>

      )

}
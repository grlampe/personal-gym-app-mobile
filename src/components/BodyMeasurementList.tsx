import React, { useEffect } from 'react';
import { View, I18nManager } from 'react-native';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { map } from 'lodash';
import Styles from '../config/Styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Empty from './Empty';
import { BodyMeasurement, useBodyMeasurementRepository } from '../repositories/useBodyMeasurementRepository';
import { DateUtils } from '../utils/date';

interface BodyMeasurementListProps {
  userId: string;
}

export default function BodyMeasurementList(props: BodyMeasurementListProps) {
  const { userId } = props;
  const { bodyMeasurement, setBodyMeasurement, searchBodyMeasurementByUserId } = useBodyMeasurementRepository();
  const rightIcon = I18nManager.isRTL ? 'chevron-left' : 'chevron-right';
  const navigation = useNavigation<any>();

  useEffect(() => {
    searchBodyMeasurementByUserId(userId).then((response: BodyMeasurement[]) => {
      setBodyMeasurement(response);
    })
  }, []);

  const onChangeScreen = (bodyMeasurement: BodyMeasurement) => {
    navigation.navigate('bodyMeasurementDetails', { bodyMeasurementParam: bodyMeasurement });
  };

  if (bodyMeasurement.length === 0){
    return (
      <View style={{ marginVertical: 10, marginBottom: 40 }}>
        <Empty />
      </View>
    )
  } else {
    return (
      <View style={{ marginVertical: 10, marginBottom: 40 }}>
        {map(bodyMeasurement, (item) => (
          <TouchableOpacity
            key={item.id}
            activeOpacity={1}
            onPress={() => onChangeScreen(item)}
          >
            <View style={Styles.DayList}>
              <Text style={Styles.DayListText}>{item.description} - {DateUtils.formatDateWithoutTime(item.createdAt)}</Text>
              <Icon name={rightIcon} style={Styles.DayListIcon} />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );
  }
}

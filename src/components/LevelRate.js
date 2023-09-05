import React, { PureComponent } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ColorsApp from '../config/ColorsApp';

export default class LevelRate extends PureComponent{

	render () {

	const {rate, iconsize} = this.props;
    const Color = ColorsApp.PRIMARY;
    const NoColor = "rgba(255,255,255,0.5)";
    const Size = iconsize ? iconsize : 18;
    const IconName = "lightning-bolt";

    if(rate === 1){

		return(
            <>
            <Icon name={IconName} color={Color} size={Size}></Icon>
            <Icon name={IconName} color={NoColor} size={Size}></Icon>
            <Icon name={IconName} color={NoColor} size={Size}></Icon>
            </>
        );

    }else if(rate === 2){

        return(
            <>
            <Icon name={IconName} color={Color} size={Size}></Icon>
            <Icon name={IconName} color={Color} size={Size}></Icon>
            <Icon name={IconName} color={NoColor} size={Size}></Icon>
            </>
        );

    }else if(rate >= 3){

        return(
            <>
            <Icon name={IconName} color={Color} size={Size}></Icon>
            <Icon name={IconName} color={Color} size={Size}></Icon>
            <Icon name={IconName} color={Color} size={Size}></Icon>
            </>
        );


    }else{

        return null;

    }

	}
}

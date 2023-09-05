import React, { PureComponent } from 'react';
import { View, I18nManager } from 'react-native';
import Styles from '../config/Styles';
import { Grid, Col } from 'react-native-easy-grid';
import ColorsApp from '../config/ColorsApp';
import { Text, IconButton } from 'react-native-paper';

export default class HeadingPage extends PureComponent{

	render () {

	const {title, subtitle, button} = this.props;

		return(

			<View style={{paddingHorizontal: 20}}>
			<Grid style={{alignItems: 'center'}}>
		      <Col size={80} style={{alignItems: 'flex-start'}}>
				<Text style={Styles.headingSubTitle}>{subtitle}</Text>
				<Text style={Styles.headingTitle}>{title}</Text>
		      </Col>
		      {button ?
		      <Col size={20} style={{alignItems: 'flex-end'}}>
		      	<IconButton icon={I18nManager.isRTL ? "chevron-left" : "chevron-right"} color={ColorsApp.PRIMARY} size={25} onPress={button}/>
		      </Col>
		       : null}
			</Grid>
			</View>

			);
	}
}

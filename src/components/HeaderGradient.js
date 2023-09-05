import React from 'react';
import { Animated, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function HeaderGradient(props){

        const {opacity} = props;

		return(
            <Animated.View style={{
                ...StyleSheet.absoluteFillObject,
                opacity: opacity
              }}>
                <LinearGradient
                  colors={['black', 'transparent']}
                  style={[StyleSheet.absoluteFill, {height: 80, alignContent:'center', justifyContent:'center', alignItems:'center'}]}
                >
                </LinearGradient>
              </Animated.View>
			);
}
import React from 'react';
import { Dimensions, Image } from 'react-native';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export function checkParams(param: any): any {
	return !param ? 'any' : param;
};

interface Node {
    name: string;
    attribs: {
        src: string;
    };
}

export function renderImage(
    node: Node, 
    index: number, 
    siblings: Node[], 
    parent: Node,
    defaultRenderer: (node: Node, parent: Node) => JSX.Element | null
): JSX.Element | null {
    if (node.name == 'img') {
        const a = node.attribs;
        return ( 
            <Image 
                key={index} 
                style={{width: screenWidth * 0.85, height: 150}} 
                resizeMode={"contain"} 
                source={{uri: a.src}}
            /> 
        );
    }
    return null;
}

import React from 'react';
import {View, Text} from 'react-native';
import {CubeNavigationHorizontal} from 'react-native-3dcube-navigation';

const CubeAnimation = () => {
  return (
    <CubeNavigationHorizontal expandView={true}>
      <View
        style={{
          width: '90%',
          height: 200,
          marginHorizontal: '5%',
          borderRadius: 10,
          backgroundColor: 'red',
        }}>
        <Text
          style={{
            color: '#fff',
            fontSize: 20,
            fontWeight: '500',
          }}>
          Horizontal Page 1
        </Text>
      </View>
      <View
        style={{
          width: '90%',
          height: 200,
          marginHorizontal: '5%',
          borderRadius: 10,
          backgroundColor: 'green',
        }}>
        <Text
          style={{
            color: '#fff',
            fontSize: 20,
            fontWeight: '500',
          }}>
          Horizontal Page 2
        </Text>
      </View>
      <View
        style={{
          width: '90%',
          height: 200,
          marginHorizontal: '5%',
          borderRadius: 10,
          backgroundColor: 'blue',
        }}>
        <Text
          style={{
            color: '#fff',
            fontSize: 20,
            fontWeight: '500',
          }}>
          Horizontal Page 3
        </Text>
      </View>
    </CubeNavigationHorizontal>
  );
};

export default CubeAnimation;

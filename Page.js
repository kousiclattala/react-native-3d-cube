import React from 'react';
import {View, Text, StyleSheet, Dimensions, Platform} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

const PESPECTIVE = Platform.OS === 'ios' ? 2.38 : 1.7;
const TR_POSITION = Platform.OS === 'ios' ? 2 : 1.5;

const Page = ({data, item, index, translateX}) => {
  const pageOffset = SCREEN_WIDTH * index;

  var fullWidth = (data.length - 1) * SCREEN_WIDTH;

  _getTransformsFor = i => {
    let scrollX = translateX.value;
    let pageX = -SCREEN_WIDTH * index;
    let loopVariable = (variable, sign = 1) =>
      variable + Math.sign(sign) * (fullWidth + SCREEN_WIDTH);
    let padInput = variables => {
      //   if (!this.props.loop) return variables;
      const returnedVariables = [...variables];
      returnedVariables.unshift(
        ...variables.map(variable => loopVariable(variable, -1)),
      );
      returnedVariables.push(
        ...variables.map(variable => loopVariable(variable, 1)),
      );
      return returnedVariables;
    };
    let padOutput = variables => {
      //   if (!this.props.loop) return variables;
      const returnedVariables = [...variables];
      returnedVariables.unshift(...variables);
      returnedVariables.push(...variables);
      return returnedVariables;
    };

    let transX = interpolate(
      translateX.value,
      padInput([pageX - SCREEN_WIDTH, pageX, pageX + SCREEN_WIDTH]),
      padOutput([
        (-SCREEN_WIDTH - 1) / TR_POSITION,
        0,
        (SCREEN_WIDTH + 1) / TR_POSITION,
      ]),
      Extrapolate.CLAMP,
    );

    let rotateY = interpolate(
      translateX.value,
      padInput([pageX - SCREEN_WIDTH, pageX, pageX + SCREEN_WIDTH]),
      padOutput([-60, 0, 60]),
      Extrapolate.CLAMP,
    );

    let translateXAfterRotate = interpolate(
      translateX.value,
      padInput([
        pageX - SCREEN_WIDTH,
        pageX - SCREEN_WIDTH + 0.1,
        pageX,
        pageX + SCREEN_WIDTH - 0.1,
        pageX + SCREEN_WIDTH,
      ]),
      padOutput([
        -SCREEN_WIDTH - 1,
        (-SCREEN_WIDTH - 1) / PESPECTIVE,
        0,
        (SCREEN_WIDTH + 1) / PESPECTIVE,
        +SCREEN_WIDTH + 1,
      ]),
    );

    let opacity = interpolate(
      translateX.value,
      padInput([
        pageX - SCREEN_WIDTH,
        pageX - SCREEN_WIDTH + 10,
        pageX,
        pageX + SCREEN_WIDTH - 250,
        pageX + SCREEN_WIDTH,
      ]),
      padOutput([0, 0.6, 1, 0.6, 0]),
    );

    return {
      transform: [
        {perspective: SCREEN_WIDTH},
        {translateX: transX},
        {rotateY: `${rotateY}deg`},
        {translateX: translateXAfterRotate},
      ],
      opacity: opacity,
    };
  };

  const rStyle = useAnimatedStyle(() => {
    // const perspective = 100;

    // console.log(-(translateX.value / (index + 1)), -SCREEN_WIDTH * (index + 1));

    // const rotateY = interpolate(
    //   translateX.value,
    //   [0, -(translateX.value / (index + 1)), -SCREEN_WIDTH * (index + 1)],
    //   [0, 3, 0],
    // );

    // // const perspectiveAfterRotate = interpolate(rotateY, [0]);

    // return {
    //   transform: [
    //     {
    //       translateX: translateX.value + pageOffset,
    //     },
    //     {
    //       rotateY: `-${rotateY}deg`,
    //     },
    //     {perspective},
    //   ],
    // };

    let pageX = -SCREEN_WIDTH * index;

    let transX = interpolate(
      translateX.value,
      [pageX - SCREEN_WIDTH, pageX, pageX + SCREEN_WIDTH],
      [(-SCREEN_WIDTH - 1) / TR_POSITION, 1, (SCREEN_WIDTH + 1) / TR_POSITION],
      Extrapolate.CLAMP,
    );

    // console.log(transX);

    let rotateY = interpolate(
      translateX.value,
      [pageX - SCREEN_WIDTH, pageX, pageX + SCREEN_WIDTH],
      [-60, 0, 60],
      Extrapolate.CLAMP,
    );

    let translateXAfterRotate = interpolate(
      translateX.value,
      [
        pageX - SCREEN_WIDTH,
        pageX - SCREEN_WIDTH + 0.1,
        pageX,
        pageX + SCREEN_WIDTH - 0.1,
        pageX + SCREEN_WIDTH,
      ],
      [
        -SCREEN_WIDTH - 1,
        (-SCREEN_WIDTH - 1) / PESPECTIVE,
        0,
        (SCREEN_WIDTH + 1) / PESPECTIVE,
        +SCREEN_WIDTH + 1,
      ],
    );

    let opacity = interpolate(
      translateX.value,
      [
        pageX - SCREEN_WIDTH,
        pageX - SCREEN_WIDTH + 10,
        pageX,
        pageX + SCREEN_WIDTH - 250,
        pageX + SCREEN_WIDTH,
      ],
      [0, 0.6, 1, 0.6, 0],
    );

    return {
      transform: [
        {perspective: SCREEN_WIDTH},
        {translateX: transX},
        {rotateY: `${rotateY}deg`},
        {translateX: translateXAfterRotate},
      ],
      opacity: opacity,
    };
  });

  return (
    <Animated.View
      style={[
        {
          ...StyleSheet.absoluteFillObject,
          backgroundColor: `rgba(32,194,238, 0.${index + 2})`,
        },
        rStyle,
      ]}></Animated.View>
  );
};

export default Page;

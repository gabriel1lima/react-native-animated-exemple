import React, { Component, useState } from 'react';
import { Animated, View, Text, StatusBar, StyleSheet, Dimensions } from 'react-native';
import { PanGestureHandler, State, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import Badge from '../Badge';
import styles from './style';

export default function Basket(props) {

  // const window = Dimensions.get('window').height;
  // let height = -Math.abs((77 * window) / 100);

  // height = -430

  // console.tron.log(window)
  // console.tron.log(height)

  const [visible, setVisible] = useState(false);

  const translateY = new Animated.Value(0);

  const animatedEvent = Animated.event(
    [
      {
        nativeEvent: {
          translationY: translateY,
        },
      },
    ],
    { useNativeDriver: true },
  );

  let offset = 0;

  function opacity(inputRange, outputRange) {
    return translateY.interpolate({
      inputRange,
      outputRange,
      extrapolate: 'clamp',
    }) 
  }

  function transformY(inputRange, outputRange) {
    return translateY.interpolate({
      inputRange,
      outputRange,
      extrapolate: 'clamp',
    })
  }

  function onHandlerStateChanged(event) {
    setVisible(true)

    if (event.nativeEvent.oldState === State.ACTIVE) {
      let opened = false;
      const { translationY } = event.nativeEvent;

      offset += translationY;

      if (translationY <= -10) {
        opened = true;
      } else {
        translateY.setValue(offset);
        translateY.setOffset(0);
        offset = 0;
      }
      
      Animated.timing(translateY, {
        toValue: opened ? -430 : 0,
        duration: Math.abs(translationY) <= 100.00 ? Math.abs(translationY)+250.00 : Math.abs(translationY),
        useNativeDriver: true,
      }).start(() => {
        setVisible(opened)
        offset = opened ? -430 : 0
        translateY.setOffset(offset);
        translateY.setValue(0);
      });
      
    }
  }

  return (
    <>

      <StatusBar barStyle="light-content" backgroundColor="#9a0001" />

      { 
        visible &&
        <Animated.View 
          style={[ StyleSheet.absoluteFill, { backgroundColor: "rgba(0,0,0,.7)", opacity: opacity([-430, 0], [1, 0]) } ]}
        />
      }

      <View style={[styles.sheet]}>
        <PanGestureHandler
          onGestureEvent={animatedEvent}
          onHandlerStateChange={onHandlerStateChanged}
        >
          <Animated.View 
            style={[ styles.popup, { transform: [{ translateY: transformY([-430 ,0], [-430, 0]) }] } ]}
          >

            <Animated.View
              style={{width: '100%', height: '12.5%', backgroundColor: '#d3222a', opacity: opacity([-430, 0], [0, 1]), transform: [{ translateY: transformY([-430, 0], [-75, 0]) }] }}
            >
              <View style={{width: 40, height: 5, backgroundColor: 'rgba(255,255,255,.8)', marginTop: 10, borderRadius: 2.5, alignSelf: 'center'}}></View>

              <View style={{marginHorizontal: 15, marginTop: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                
                <View style={{position: 'absolute', left: 0}}>
                  <Icon name="shopping-bag" size={23} color="#FFF" />

                  <Badge quant={4} />
                </View>
                
                
                <Text style={{fontWeight: 'bold', color: 'white'}}>{props.nome}</Text>
                <Text style={{fontWeight: 'bold', color: 'white', position: 'absolute', right: 0}}>R$ 22,00</Text>
              </View>
            </Animated.View>

            <Animated.View
              style={{width: '100%', height: 300, backgroundColor: '#d8d8d8', alignItems: 'center', opacity: opacity([-430, 0], [1, 0]), transform: [{ translateY: transformY([-430, 0], [-75, 0]) }] }}
            >
              <Text>OPA</Text>
            </Animated.View>

          </Animated.View>
        </PanGestureHandler>
      </View>
      
    </>
  );
}


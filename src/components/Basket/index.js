import React, { Component, useState } from 'react';
import { Animated, View, Text, StatusBar, StyleSheet } from 'react-native';
import { PanGestureHandler, State, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import styles from './style';

export default function Basket(props) {
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
        duration: Math.abs(translationY) <= 100.00 ? Math.abs(translationY)+150.00 : Math.abs(translationY),
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

      <StatusBar barStyle="light-content" backgroundColor="rgba(0, 0, 0, 0.6)" />        

      { 

        visible &&
        <Animated.View 
          style={
            [
              StyleSheet.absoluteFill, 
              { 
                backgroundColor: "rgba(0,0,0,.7)", 
                opacity: translateY.interpolate({
                  inputRange: [-430, 0],
                  outputRange: [1, 0]
                }), 
              },
            ]
          }
        />
      }

      <View style={[styles.sheet]}>
        <PanGestureHandler
          onGestureEvent={animatedEvent}
          onHandlerStateChange={onHandlerStateChanged}
        >
          <Animated.View 
            style={[
              styles.popup,
              { transform: [{
                  translateY: translateY.interpolate({
                    inputRange: [-430 ,0],
                    outputRange: [-430, 0],
                    extrapolate: 'clamp',
                  }),
                }],
              }, 
            ]}
          >

            <View style={{width: '100%', height: '12.5%', backgroundColor: '#d3222a'}}>
              <View style={{width: 40, height: 5, backgroundColor: 'rgba(255,255,255,.8)', marginTop: 10, borderRadius: 2.5, alignSelf: 'center'}}></View>

              <View style={{marginHorizontal: 15, marginTop: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                
                <View style={{position: 'absolute', left: 0}}>
                  <Icon name="shopping-bag" size={23} color="#FFF" />
                  <View style={{width: 15, height: 15, backgroundColor: 'white', borderRadius: 7.5, position: 'absolute', right: -6, top: -4, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{color: '#d3222a', fontSize: 10, fontWeight: 'bold'}}>1</Text>
                  </View>
                </View>
                
                
                <Text style={{fontWeight: 'bold', color: 'white'}}>{props.nome}</Text>
                <Text style={{fontWeight: 'bold', color: 'white', position: 'absolute', right: 0}}>R$ 22,00</Text>
              </View>
            </View>
            
          </Animated.View>
        </PanGestureHandler>
      </View>
      
    </>
  );
}


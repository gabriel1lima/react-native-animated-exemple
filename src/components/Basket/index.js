import React, { Component } from 'react';
import { Animated, View, Text, StatusBar, StyleSheet } from 'react-native';
import { PanGestureHandler, State, TouchableOpacity } from 'react-native-gesture-handler';
import styles from './style';

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

export default class Basket extends Component {

  onHandlerStateChanged(event) {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      let opened = false;
      const { translationY } = event.nativeEvent;

      offset += translationY;

      if (translationY >= 100) {
        console.tron.log("OPA")
        opened = true;
      } else {
        translateY.setValue(offset);
        translateY.setOffset(0);
        offset = 0;
      } 

    
      Animated.timing(translateY, {
        toValue: opened ? 430 : 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        offset = opened ? 430 : 0
        translateY.setOffset(offset);
        translateY.setValue(0);
      });
    }
  }

  toggleVisible() {

    Animated.timing(translateY, {
      toValue: 430,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      offset = 430;
      translateY.setOffset(offset);
      translateY.setValue(0);
    });
  }

  render() {


    return (
      <>
        <StatusBar barStyle="light-content" backgroundColor="rgba(0, 0, 0, 0.6)" />        

        {
          <Animated.View 
            style={
              [
                StyleSheet.absoluteFill, 
                { 
                  backgroundColor: "rgba(0,0,0,.7)", 
                  opacity: translateY.interpolate({
                    inputRange: [0, 430],
                    outputRange: [1, 0]
                  }), 
                },
              ]
            }
          />
        }

        <PanGestureHandler
          onGestureEvent={animatedEvent}
          onHandlerStateChange={(event) => this.onHandlerStateChanged(event)}
        >
          <Animated.View 
            style={[
              styles.content,
              { transform: [{
                  translateY: translateY.interpolate({
                    inputRange: [0, 430],
                    outputRange: [0, 430],
                    extrapolate: 'clamp',
                  }),
                }],
              }, 
            ]}
          >

            <TouchableOpacity onPress={() => this.toggleVisible()}>
              <Text>Baixar</Text>
            </TouchableOpacity>
            
          </Animated.View>
        </PanGestureHandler>
        
      </>
    );
  }
}


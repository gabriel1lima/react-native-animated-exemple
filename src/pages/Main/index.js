import React, { Component } from 'react';
import { View, StyleSheet, Text, Animated, Dimensions } from 'react-native';
import { PanGestureHandler, State, TouchableOpacity } from 'react-native-gesture-handler';
import { Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Button, Icon, Title } from 'native-base';

import Basket from '../../components/Basket'

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
let opened = false;

export default class Main extends Component {
  state = {
    opened: false,
  }

  onHandlerStateChanged(event) {
    this.setState({opened: true})

    if (event.nativeEvent.oldState === State.ACTIVE) {
      opened = false;
      const { translationY } = event.nativeEvent;

      offset += translationY;

      if (translationY <= -10) {
        opened = true;
      } else {
        translateY.setValue(offset);
        translateY.setOffset(0);
        offset = 0;
      }
      
      this.setState({opened})
   
      Animated.timing(translateY, {
        toValue: opened ? -430 : 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        offset = opened ? -430 : 0
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
      <Container>
        <Header>
          <Left>
            <Button transparent>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Header</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name='menu' />
            </Button>
          </Right>
        </Header>

        <Content>
          <List>
            <ListItem avatar>
              <Left>
                <Thumbnail source={{ uri: 'https://randomuser.me/api/portraits/men/81.jpg' }} />
              </Left>
              <Body>
                <Text>Kumar Pratik</Text>
                <Text note>Doing what you like will always keep you happy . .</Text>
              </Body>
              <Right>
                <Text note>3:43 pm</Text>
              </Right>
            </ListItem>
            <ListItem avatar>
              <Left>
                <Thumbnail source={{ uri: 'https://randomuser.me/api/portraits/men/81.jpg' }} />
              </Left>
              <Body>
                <Text>Kumar Pratik</Text>
                <Text note>Doing what you like will always keep you happy . .</Text>
              </Body>
              <Right>
                <Text note>3:43 pm</Text>
              </Right>
            </ListItem>
            <ListItem avatar>
              <Left>
                <Thumbnail source={{ uri: 'https://randomuser.me/api/portraits/men/81.jpg' }} />
              </Left>
              <Body>
                <Text>Kumar Pratik</Text>
                <Text note>Doing what you like will always keep you happy . .</Text>
              </Body>
              <Right>
                <Text note>3:43 pm</Text>
              </Right>
            </ListItem>
            <ListItem avatar>
              <Left>
                <Thumbnail source={{ uri: 'https://randomuser.me/api/portraits/men/82.jpg' }} />
              </Left>
              <Body>
                <Text>Kumar Pratik</Text>
                <Text note>Doing what you like will always keep you happy . .</Text>
              </Body>
              <Right>
                <Text note>3:43 pm</Text>
              </Right>
            </ListItem>
            <ListItem avatar>
              <Left>
                <Thumbnail source={{ uri: 'https://randomuser.me/api/portraits/men/83.jpg' }} />
              </Left>
              <Body>
                <Text>Kumar Pratik</Text>
                <Text note>Doing what you like will always keep you happy . .</Text>
              </Body>
              <Right>
                <Text note>3:43 pm</Text>
              </Right>
            </ListItem>
            <ListItem avatar>
              <Left>
                <Thumbnail source={{ uri: 'https://randomuser.me/api/portraits/men/81.jpg' }} />
              </Left>
              <Body>
                <Text>Kumar Pratik</Text>
                <Text note>Doing what you like will always keep you happy . .</Text>
              </Body>
              <Right>
                <Text note>3:43 pm</Text>
              </Right>
            </ListItem>
            <ListItem avatar>
              <Left>
                <Thumbnail source={{ uri: 'https://randomuser.me/api/portraits/men/84.jpg' }} />
              </Left>
              <Body>
                <Text>Kumar Pratik</Text>
                <Text note>Doing what you like will always keep you happy . .</Text>
              </Body>
              <Right>
                <Text note>3:43 pm</Text>
              </Right>
            </ListItem>
            <ListItem avatar>
              <Left>
                <Thumbnail source={{ uri: 'https://randomuser.me/api/portraits/men/81.jpg' }} />
              </Left>
              <Body>
                <Text>Kumar Pratik</Text>
                <Text note>Doing what you like will always keep you happy . .</Text>
              </Body>
              <Right>
                <Text note>3:43 pm</Text>
              </Right>
            </ListItem>
            <ListItem avatar>
              <Left>
                <Thumbnail source={{ uri: 'https://randomuser.me/api/portraits/men/85.jpg' }} />
              </Left>
              <Body>
                <Text>Kumar Pratik</Text>
                <Text note>Doing what you like will always keep you happy . .</Text>
              </Body>
              <Right>
                <Text note>3:43 pm</Text>
              </Right>
            </ListItem>
          </List>
        </Content>

        {this.state.opened && <Animated.View 
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
        />}

        
          <View style={[styles.sheet]}>
            <PanGestureHandler
              onGestureEvent={animatedEvent}
              onHandlerStateChange={(event) => this.onHandlerStateChanged(event)}
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

                <View style={{width: 40, height: 5, backgroundColor: 'rgba(0,0,0,.2)', marginTop: 10, borderRadius: 2.5}}></View>

                
                
              </Animated.View>
            </PanGestureHandler>
          </View>
      
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  sheet: {
    position: "absolute",
    left: 0,
    right: 0,
    height: "100%",
    justifyContent: "flex-end",
  },
  popup: {
    backgroundColor: "#FFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    minHeight: '80%',
    top: '70%',
    alignItems: "center",
    // justifyContent: "center",

    // borderWidth: 2,
    // borderColor: 'red',

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 10.00,

    elevation: 10,
  },





  content: {
    position: 'absolute',
    // bottom: 0,
    width: '100%',
    // top: 50,
    height: '80%',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    
    borderWidth: 2,
    borderColor: 'red',

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 10.00,

    elevation: 10,
  },
});


import {
  StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
  content: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '80%',
    alignItems: 'center',
    // borderWidth: 2,
    // borderColor: 'red',
    backgroundColor: '#FFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,

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

export default styles;
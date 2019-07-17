import {
  StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
  sheet: {
    position: "absolute",
    left: 0,
    right: 0,
    height: "100%",
    justifyContent: "flex-end",
  },
  popup: {
    backgroundColor: "#FFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '90%',
    top: '80%',
    overflow: 'hidden',
    // alignItems: "center",
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
});

export default styles;
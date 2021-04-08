import React from "react";
import { StyleSheet, TextInput, View, Image } from "react-native";

class Input extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.textinputcontainer}>
        <Image source={this.props.mysource} style={{ height: 30, width: 30 }} />
        <TextInput
          autoCapitalize="none"
          placeholder={this.props.nom}
          style={styles.textinputcontent}
          onChangeText={this.props.ChangeText}
        />
      </View>
    );
  }
}

export default Input;
const styles = StyleSheet.create({
  textinputcontainer: {
    backgroundColor: "white",
    borderRadius: 30,
    height: 50,
    width: 300,
    paddingLeft: 20,
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#F6A924",
    borderWidth: 1,
  },
  textinputcontent: {
    fontSize: 20,
    paddingLeft: 30,
  },
});

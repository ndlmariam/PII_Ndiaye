import { View, StyleSheet, Platform, Alert } from "react-native";
import React from "react";
import WebView from "react-native-webview";
var PdfReader = ({ url: uri }) => (
  <WebView style={{ flex: 1 }} source={{ uri }} />
);

export default class PdfReaderAccordsScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.container}>
        <PdfReader url={this.props.route.params.uri} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ecf0f1",
  },
});

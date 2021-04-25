import { View, StyleSheet } from "react-native";
import React from "react";
import PDFReader from "rn-pdf-reader-js";

export default class PdfReaderScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.container}>
        <PDFReader
          source={{
            uri: this.props.route.params.uri,
          }}
        />
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

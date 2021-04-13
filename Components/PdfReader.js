import { View, StyleSheet } from "react-native";
import React from "react";
import WebView from "react-native-webview";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

const PdfReader = ({ url: uri }) => (
  <WebView style={{ flex: 1 }} source={{ uri }} />
);

export default class PdfReaderScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  onShare = async () => {
    const { uri: localUri } = await FileSystem.downloadAsync(
      this.state.uri,
      FileSystem.documentDirectory + "bulletin.pdf"
    ).catch((error) => {
      console.error(error);
    });
    await Sharing.shareAsync(localUri).catch((err) =>
      console.log("Sharing::error", err)
    );
  };
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
    //paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1",
  },
});

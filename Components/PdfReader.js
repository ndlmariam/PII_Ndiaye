import { View, StyleSheet } from "react-native";
import React from "react";
import WebView from "react-native-webview";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

const PdfReader = ({ url: uri }) => (
  <WebView style={{ flex: 1 }} source={{ uri }} />
);

export default class PdfReaderScreen extends React.Component {
  onShare = async () => {
    const { uri: localUri } = await FileSystem.downloadAsync(
      "https://firebasestorage.googleapis.com/v0/b/cfdttest-cc48d.appspot.com/o/bulletin.pdf?alt=media&token=6639eff7-c419-4a32-be46-b2de01e3371c",
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
        <PdfReader url="https://firebasestorage.googleapis.com/v0/b/cfdttest-cc48d.appspot.com/o/bulletin.pdf?alt=media&token=6639eff7-c419-4a32-be46-b2de01e3371c" />
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

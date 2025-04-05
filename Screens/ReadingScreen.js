import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class ReadingScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      hasCameraPermissions: null,
      scanned: false,
      scannedBookId: '',
      scannedStudentId: '',
      buttonState: 'normal',
    };
  }

  getCameraPermissions = async (id) => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    this.setState({
      hasCameraPermissions: status === 'granted',
      buttonState: id,
      scanned: false,
    });
  };

  handleBarCodeScanned = async ({ type, data }) => {
    const { buttonState } = this.state;

    if (buttonState === 'bookId') {
      this.setState({
        scanned: true,
        buttonState: 'normal',
        scannedBookId: data,
      });
    } else if (buttonState === 'studentId') {
      this.setState({
        scanned: true,
        buttonState: 'normal',
        scannedStudentId: data,
      });
    }
  };

  render() {
    const { hasCameraPermissions, scanned, buttonState, scannedBookId, scannedStudentId } = this.state;

    if ((buttonState === 'bookId' || buttonState === 'studentId') && hasCameraPermissions) {
      return (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      );
    } else if (buttonState === 'normal') {
      return (
        <View style={styles.container}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={styles.displayText}>Library App Scanner</Text>

            <TextInput
              style={styles.inputBox}
              placeholder="Book ID"
              value={scannedBookId}
              editable={false}
            />
            <TouchableOpacity
              style={styles.scanButton}
              onPress={() => this.getCameraPermissions('bookId')}
            >
              <Text style={styles.buttonText}>Scan Book ID</Text>
            </TouchableOpacity>

            <TextInput
              style={styles.inputBox}
              placeholder="Student ID"
              value={scannedStudentId}
              editable={false}
            />
            <TouchableOpacity
              style={styles.scanButton}
              onPress={() => this.getCameraPermissions('studentId')}
            >
              <Text style={styles.buttonText}>Scan Student ID</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  displayText: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  inputBox: {
    width: 200,
    height: 40,
    borderWidth: 1.5,
    fontSize: 18,
    padding: 8,
    margin: 10,
  },
  scanButton: {
    backgroundColor: '#66BB6A',
    padding: 10,
    margin: 10,
    width: 150,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
  },
});

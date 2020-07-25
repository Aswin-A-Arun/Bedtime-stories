import React from 'react';
import {Text,View,StyleSheet,TouchableOpacity,Image,TextInput} from 'react-native';
import {BarCodeScanner} from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions';
export default class ReadingScreen extends React.Component{
    constructor(){
        super();
        this.state={
            hasCameraPermissions:null,
            scanned:false,
            scannedBookId:'',
            scannedStudentId:'',
            buttonState:'normal'

        }
    }
    getCameraPermissions=async (id)=>{
        const {status}=await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
            hasCameraPermissions:status=='granted',
            buttonState:id,
            scanned:false, 
        })
    }
    handleBarCodeScanned=async ({type,data})=>{
        const buttonState=this.state.buttonState;
        if(buttonState=='bookId'){
            this.setState({
                scanned:true,
                buttonState:'normal',
                scannedBookId:data,
            })
        }
        else if(buttonState=='studentId'){
            this.setState({
                scanned:true,
                buttonState:'normal',
                scannedStudentId:data,
            })
        }
        
    }
    render(){
        const hasCameraPermissions=this.state.hasCameraPermissions;
        const scanned=this.state.scanned;
        const buttonState=this.state.buttonState;
        if(buttonState=='bookId'||buttonState=='studentId'&&hasCameraPermissions){
            return(
                <BarCodeScanner onBarCodeScanned={scanned?undefined:this.handleBarCodeScanned} 
                style={StyleSheet.absoluteFillObject}></BarCodeScanner>
                
            )
        }
        else if(buttonState=='normal'){
            return(
                
                <View style={styles.container}>
                    <View>
                    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <Text>Dummy Text</Text>
                    </View>
                   
                    </View>
                    <View >
                       
                       
                     
                 
                    </View>
                    
                </View>
            )
        }
        
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    displayText:{
      fontSize: 15,
      textDecorationLine: 'underline'
    },
    scanButton:{
      backgroundColor: '#2196F3',
      padding: 10,
      margin: 10
    },
    buttonText:{
      fontSize: 15,
      textAlign: 'center',
      marginTop: 10
    },
    
    inputBox:{
      width: 200,
      height: 40,
      borderWidth: 1.5,
      borderRightWidth: 0,
      fontSize: 20
    },
    scanButton:{
      backgroundColor: '#66BB6A',
      width: 50,
      borderWidth: 1.5,
      borderLeftWidth: 0
    }
  });
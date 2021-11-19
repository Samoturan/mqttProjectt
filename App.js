import React, { Component} from 'react'
import { Text, View, ScrollView, StyleSheet, SafeAreaView, Image } from 'react-native'
import * as Mqtt from 'react-native-native-mqtt'

export default class App extends Component {
  constructor(props){
    super(props)
    this.state={
      deviceId:'',
      tankLevel:'',
      mixerLevel:'',
      newData:[],
      flow:'',
      electricPhase:'',
      emergentStopTank:'',
      emergentStopMixer:'',
      pumpOilEntry:'',
      pumpMixerEntrry: '', 
      engineMixer: '', 
      enginePumpUpdown: '', 
      maxLimitMixerTankLevel: '', 
      maxLimitTankLevel: '', 
      valfWater: '', 
      valfChemical: '', 
      valfChemicalTransfer:'', 
      valfEmulsionMeasure: '', 
      valfWaterClean: '', 
      valveError: '',
      deneme:false,
    }
  }
  componentDidMount(){
    this.mqttFunction()
  }
  mqttFunction = () => {
    this.client= new Mqtt.Client('ws://8thsense.io:1884')

    this.client.connect({
      clientId: '18',
      username: "eight",
      password: "eight"
    },err=>{err ? console.log("Connect Error:",err):false});

    this.client.on(Mqtt.Event.Connect, () =>{
      console.log('Connected')
      this.client.subscribe(["go/18"],[0])
    })

    this.client.on(Mqtt.Event.Error, (error) =>{
      console.log('Mqtt Error: ',error)
    })

    this.client.on(Mqtt.Event.Disconnect, (couse) =>{
      console.log('Disconnect: ',couse)
      this.setState({deneme:true})
      this.denemeFunction()
    })

    this.client.on(Mqtt.Event.Message,(topic,message)=>{
      this.state.newData=JSON.parse(message.toString())
      console.log('New data: ',JSON.parse(message.toString()))
      this.setState({
        deviceId:this.state.newData.deviceId,
        tankLevel:this.state.newData.reading.tankLevel,
        mixerLevel:this.state.newData.reading.mixerLevel,
        flow:this.state.newData.reading.flow,
        electricPhase:this.state.newData.reading.electricPhase,
        emergentStopTank:this.state.newData.reading.emergentStopTank,
        emergentStopMixer:this.state.newData.reading.emergentStopMixer,
        pumpOilEntry:this.state.newData.reading.pumpOilEntry,
        pumpMixerEntrry:this.state.newData.reading.pumpMixerEntrry,
        engineMixer:this.state.newData.reading.engineMixer,
        enginePumpUpdown:this.state.newData.reading.enginePumpUpdown,
        maxLimitMixerTankLevel:this.state.newData.reading.maxLimitMixerTankLevel,
        maxLimitTankLevel:this.state.newData.reading.maxLimitTankLevel,
        valfWater:this.state.newData.reading.valfWater,
        valfChemical:this.state.newData.reading.valfChemical,
        valfChemicalTransfer:this.state.newData.reading.valfChemicalTransfer,
        valfEmulsionMeasure:this.state.newData.reading.valfEmulsionMeasure,
        valfWaterClean:this.state.newData.reading.valfWaterClean,
        valveError:this.state.newData.reading.valveError,
      })
    })
  }
  denemeFunction=()=>{
    this.state.deneme ? this.mqttFunction():this.setState({deneme:false});
  }
  render() {
    return (
      <SafeAreaView style={{backgroundColor:'goldenrod', paddingTop:15}}>
        <View style={styles.header}>
          <Text style={{fontSize:20,color:'black'}}>Cihaz-1</Text>
          <Text style={{fontSize:17,color:'black'}}>Tank-1</Text>
        </View>
        
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.box}>
              <Text style={{fontSize:17,color:'black',padding:2,fontWeight:'bold'}}>Tank Level</Text>
              <Text style={{color:'black'}}>{this.state.tankLevel}</Text>
            </View>
            <View style={styles.box}>
              <Text style={{fontSize:17,color:'black',padding:2,fontWeight:'bold'}}>Mixer Level</Text>
              <Text style={{color:'black'}}>{this.state.mixerLevel}</Text>
            </View>
            <View style={styles.box}>
              <Text style={{fontSize:17,color:'black',padding:2,fontWeight:'bold'}}>Flow</Text>
              <Text style={{color:'black'}}>{this.state.flow}</Text>
            </View>
            <View style={styles.box1}>
              <Text style={{fontSize:13,color:'black',padding:1,fontWeight:'bold'}}>Electric Phase</Text>
              {
                this.state.electricPhase ? <Image source={require('./red.png')}/>:<Image source={require('./green.png')}/>
              }
            </View>
            <View style={styles.box1}>
              <Text style={{fontSize:13,color:'black',padding:1,fontWeight:'bold'}}>Emergent Stop Tank</Text>
              {
                this.state.emergentStopTank ? <Image source={require('./green.png')}/>:<Image source={require('./red.png')}/>
              }
            </View>
            <View style={styles.box1}>
              <Text style={{fontSize:13,color:'black',padding:1,fontWeight:'bold'}}>Emergent Stop Mixer</Text>
              {
                this.state.emergentStopMixer ? <Image source={require('./red.png')}/>:<Image source={require('./green.png')}/>
              }
            </View>
            <View style={styles.box1}>
              <Text style={{fontSize:13,color:'black',padding:1,fontWeight:'bold'}}>Pump Oil Entrry</Text>
              {
                this.state.pumpOilEntry ? <Image source={require('./red.png')}/>:<Image source={require('./green.png')}/>
              }
            </View>
            <View style={styles.box1}>
              <Text style={{fontSize:13,color:'black',padding:1,fontWeight:'bold'}}>Pump Mixer Entrry</Text>
              {
                this.state.pumpMixerEntrry ? <Image source={require('./red.png')}/>:<Image source={require('./green.png')}/>
              }
            </View>
            <View style={styles.box1}>
              <Text style={{fontSize:13,color:'black',padding:1,fontWeight:'bold'}}>Engine Mixer</Text>
              {
                this.state.engineMixer ?<Image source={require('./red.png')}/>:<Image source={require('./green.png')}/>
              }
            </View>
            <View style={styles.box1}>
              <Text style={{fontSize:13,color:'black',padding:1,fontWeight:'bold'}}>Engine Pump Up Down</Text>
              {
                this.state.enginePumpUpdown ? <Image source={require('./red.png')}/>:<Image source={require('./green.png')}/>
              }
            </View>
            <View style={styles.box1}>
              <Text style={{fontSize:13,color:'black',padding:1,fontWeight:'bold'}}>Max Limit Mixer Tank Level</Text>
              {
                this.state.maxLimitMixerTankLevel ? <Image source={require('./red.png')}/>:<Image source={require('./green.png')}/>
              }
            </View>
            <View style={styles.box1}>
              <Text style={{fontSize:13,color:'black',padding:1,fontWeight:'bold'}}>Max Limit Tank Level</Text>
              {
                this.state.maxLimitTankLevel ? <Image source={require('./red.png')}/>:<Image source={require('./green.png')}/>
              }
            </View>
            <View style={styles.box1}>
              <Text style={{fontSize:13,color:'black',padding:1,fontWeight:'bold'}}>Valf Water</Text>
              {
                this.state.valfWater ? <Image source={require('./red.png')}/>:<Image source={require('./green.png')}/>
              }
            </View>
            <View style={styles.box1}>
              <Text style={{fontSize:13,color:'black',padding:1,fontWeight:'bold'}}>Valf Chemical</Text>
              {
                this.state.valfChemical ? <Image source={require('./red.png')}/>:<Image source={require('./green.png')}/>
              }
            </View>
            <View style={styles.box1}>
              <Text style={{fontSize:13,color:'black',padding:1,fontWeight:'bold'}}>Valf Chemical Transfer</Text>
              {
                this.state.valfChemicalTransfer ? <Image source={require('./red.png')}/>:<Image source={require('./green.png')}/>
              }
            </View>
            <View style={styles.box1}>
              <Text style={{fontSize:13,color:'black',padding:1,fontWeight:'bold'}}>Valf Emulsion Measure</Text>
              {
                this.state.valfEmulsionMeasure ? <Image source={require('./red.png')}/>:<Image source={require('./green.png')}/>
              }
            </View>
            <View style={styles.box1}>
              <Text style={{fontSize:13,color:'black',padding:1,fontWeight:'bold'}}>Valf Water Clean</Text>
              {
                this.state.valfWaterClean ? <Image source={require('./red.png')}/>:<Image source={require('./green.png')}/>
              }
            </View>
            <View style={styles.boxValve}>
              <Text style={{fontSize:17,color:'black',padding:2,fontWeight:'bold'}}>Valve Error</Text>
              <Text style={{color:'black'}}>{this.state.valveError}</Text>
              <Text>String Value</Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    padding:5,
    flexWrap:'wrap',
    backgroundColor:'white',
    flexDirection: 'row',
    justifyContent:'center',
  },
  box: {
    width:105,
    height:85,
    padding:1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal:10,
    marginVertical:10,
    backgroundColor:'khaki',
    borderRadius:5,
    shadowColor:'black',
    shadowOpacity: 0.34,
    shadowRadius:5,
    shadowOffset:{
      width:0,
      height:2,
    },
    elevation:7,
  },
  box1: {
    width:170,
    height:40,
    padding:1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal:10,
    marginVertical:10,
    backgroundColor:'lemonchiffon',
    borderRadius:5,
    shadowColor:'black',
    shadowOpacity: 0.34,
    shadowRadius:5,
    shadowOffset:{
      width:0,
      height:2,
    },
    elevation:7,
  },
  boxValve:{
    width:360,
    height:120,
    padding:1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal:10,
    marginVertical:10,
    backgroundColor:'lemonchiffon',
    borderRadius:5,
    shadowColor:'black',
    shadowOpacity: 0.34,
    shadowRadius:5,
    shadowOffset:{
      width:0,
      height:2,
    },
    elevation:7,
  },
  header:{
    justifyContent:'center',
    alignItems:'center',
  }
});

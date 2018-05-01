import React, {Component} from 'react';
import {Drawer, Icon, Button, Container, Header, Body, Left, Right, Title, Content, Card } from 'native-base';
import { View, Text } from 'native-base';
import SideBar from './sidebar';
import {StatusBar, Dimensions} from 'react-native';
import { MapView, Marker,Location, Permissions } from 'expo';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height-135;


class MapView2 extends Component{
  state = {
    mapRegion: null,
    hasLocationPermissions: false,
    locationResult: null,
    ubicarposicion: true,
    markers: [{
        title: 'hello1',
        coordinates: {
            latitude:18.0241876,
            longitude:-92.898832
        },
      },
      {
        title: 'hello2',
        coordinates: {
            latitude:18.0238005,
            longitude:-92.8981547
        },  
      },
      {
        title: 'hello3',
        coordinates: {
            latitude:18.0234166,
            longitude:-92.8983834
        },  
      },
      {
        title: 'hello4',
        coordinates: {
            latitude:18.0235072,
            longitude:-92.8994764
        },  
      }]
  };

    constructor(props) {
        super(props);
        console.log("props", props);
        
      }

      componentDidMount() {
        this._getLocationAsync();
      }
    
      _handleMapRegionChange = mapRegion => {
        console.log(mapRegion);
        //this.setState({ mapRegion });
      };
    
      _getLocationAsync = async () => {
       let { status } = await Permissions.askAsync(Permissions.LOCATION);
       if (status !== 'granted') {
         this.setState({
           locationResult: 'Permission to access location was denied',
         });
       } else {
         this.setState({ hasLocationPermissions: true });
       }
    if(this.state.ubicarposicion){
      let location = await Location.getCurrentPositionAsync({});
       this.setState({ locationResult: JSON.stringify(location) });
       
       // Center the map on the location we just fetched.
        this.setState({
          mapRegion: { 
              latitude: location.coords.latitude, 
              longitude: location.coords.longitude, 
              latitudeDelta: 0.006, 
              longitudeDelta: 0.006 
            },
          ubicarposicion: false
        });
    }
       
      };

    closeDrawer = () => {
        this.drawer._root.close();
      };
      openDrawer = () => {
        this.drawer._root.open();
      };

      onRegionChange(region) {
        console.log("Region", region);
        this.setState({ mapstate:region });
      }

      showMap(){
        if(this.state.mapRegion){
          return(
            <MapView
        style={{ flex: 1}}
        region={this.state.mapRegion}
        onRegionChange={this._handleMapRegionChange}
        showsUserLocation={true}
        showsMyLocationButton={true}
        >
        {this.state.markers.map(marker => (
            <MapView.Marker 
            key={marker.title}
            coordinate={marker.coordinates}
            title={marker.title}
            />
        ))}
       
      </MapView>
          );
        }
      }

      // <View style={{flex:0, height:windowHeight-135,zIndex: 0}}>
      //     {this.showMap()}
      // </View>

    render(){
        return(
          <Drawer
          ref={ref => {
            this.drawer = ref;
          }}
          content={<SideBar />}
          onClose={() => this.closeDrawer()}>
              
        <Container style={{ marginTop: StatusBar.currentHeight }}>
          <Header>
          <Left>
          <Button transparent onPress={this.openDrawer}>
                    <Icon name={"menu"} />
                  </Button>
          </Left>
            <Body>
              <Title>Mapa</Title>
            </Body>
            <Right>
        </Right>
          </Header>
          <Content style={{ }}>
           <View style={{ height:windowHeight}}>
           {this.showMap()}
       </View>
      
      <View style={{  position: 'absolute',flexDirection:"column"}}>
      <Card>
      <Text>Loading2</Text>
      </Card>
      </View>
      <View style={{ flex:5, }}>
      </View>
      <View style={{ alignSelf:'flex-end', position: 'absolute',flexDirection:"column"}}>
      <Card>
      <Text>Loading4</Text>
      </Card>
      </View>
      
          </Content>
        </Container>
      </Drawer>
        );
    }
}

export default MapView2;
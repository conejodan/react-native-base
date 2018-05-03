import React, {Component} from 'react';
import {Drawer, Icon, Button, Container, Header, Body, Left, Right, Title, Content, Card } from 'native-base';
import { View, Text } from 'native-base';
import SideBar from './sidebar';
import {StatusBar, Dimensions} from 'react-native';
import { MapView, Marker,Polygon,Location, Permissions } from 'expo';
import {computeDistanceBetween, computeArea, LatLng} from 'spherical-geometry-js'

const windowWidth = Dimensions.get('window').width;
const windowHeight = (Dimensions.get('window').height/2)-80;

const GEOLOCATION_OPTIONS = { enableHighAccuracy: true, timeInterval: 3000 };

class MapView2 extends Component{
  state = {
    mapRegion: null,
    hasLocationPermissions: false,
    locationResult: null,
    ubicarposicion: true,
    markers: [
      // {
      //   title: 'hello1',
      //   coordinates: {
      //       latitude:17.9939823,
      //       longitude:-92.934135
      //   }
      // },
      // {
      //   title: 'hello2',
      //   coordinates: {
      //       latitude:17.989731,
      //       longitude:-92.9321741
      //   }  
      // },
      // {
      //   title: 'hello3',
      //   coordinates: {
      //       latitude:17.9921249,
      //       longitude:-92.9391312
      //   }  
      // }
      // ,{
      //   title: 'hello4',
      //   coordinates: {
      //       latitude:17.9920885,
      //       longitude:-92.9350539
      //   }  
      // }
    ]
  };

    constructor(props) {
        super(props);
        console.log("props", props);
        
      }

      calculateArea(){
        if(this.state.markers.length < 4){
          return "Faltan " + (4 - this.state.markers.length) + " puntos"
        }
        if(this.state.markers.length > 4){
          return "Hay mas de 4 puntos"
        }
        console.log("Calculate Area");
        var result = 0;
        var last_distance = 0;
        for (var i = 0; i < this.state.markers.length-1; i++) { 
          var distance = 0;
          distance = this.getDistance(this.state.markers[i].coordinates,this.state.markers[i+1].coordinates);
          console.log("distance", distance);
          console.log("last_distance", last_distance);
          if(last_distance == 0){
            last_distance = distance;
          }else{
            console.log("result", result);
            result += ((distance * last_distance)/2);
            last_distance = 0;
          }
        }
        
        console.log(result);
        return result;
      }

      calculatePerimeter(){
        //console.log("calculatePerimeter");
        var result = 0;
        for (var i = 0; i < this.state.markers.length-1; i++) { 
          result += this.getDistance(this.state.markers[i].coordinates,this.state.markers[i+1].coordinates);
        }
        //console.log(result.toFixed(2));
        return result.toFixed(2);
      }

      rad(x){
        return x * Math.PI / 180;
        //return x * (Math.PI / 180);
      }

      getDistance(p1, p2) {
        var R = 6378137; // Earth’s mean radius in meter
        //var R = 6371; // Earth’s mean radius in meter
        var dLat = this.rad(p2.latitude - p1.latitude);
        var dLong = this.rad(p2.longitude - p1.longitude);
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(this.rad(p1.latitude)) * Math.cos(this.rad(p2.latitude)) *
          Math.sin(dLong / 2) * Math.sin(dLong / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        console.log("Distancia: ", d);
        return d; // returns the distance in meter
      };

      componentDidMount() {
        this._getLocationAsync();
        Location.watchPositionAsync(GEOLOCATION_OPTIONS, this.locationChanged);
      }

      locationChanged = (location) => {
        console.log("LocationChanged");
        this.setState({
          locationResult: JSON.stringify(location),
          mapNow: { 
              latitude: location.coords.latitude, 
              longitude: location.coords.longitude
            }
        });
      }
    
      _handleMapRegionChange = mapRegion => {
        console.log(mapRegion);
        this.setState({
          // mapNow:{
          //       latitude:mapRegion.latitude,
          //       longitude:mapRegion.longitude,
          //   },
            mapRegion: { 
              latitude:mapRegion.latitude,
              longitude:mapRegion.longitude,
              latitudeDelta: mapRegion.latitudeDelta, 
              longitudeDelta: mapRegion.longitudeDelta
            }
          }
        );
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
       let location = await Location.getCurrentPositionAsync({});
       console.log("Location>>",location)
       //this.setState({  });
       this.setState({
        locationResult: JSON.stringify(location),
        mapNow: { 
            latitude: location.coords.latitude, 
            longitude: location.coords.longitude
          }
      });
    if(this.state.ubicarposicion){
      
       
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

      showMap(){
        if(this.state.mapRegion){
          var polygon = this.state.markers.map((marker)=>{
            var {latitude, longitude} = marker.coordinates;
            return {latitude:latitude,longitude:longitude};
          });
          return(
            <MapView
        style={{ flex: 1}}
        region={this.state.mapRegion}
        onRegionChangeComplete={this._handleMapRegionChange}
        showsUserLocation={true}
        showsMyLocationButton={true}
        >
        <MapView.Polygon coordinates={polygon} />
        <MapView.Marker color={"blue"}
            coordinate={this.state.mapNow}
            title={"Punto"}
            />
        {this.state.markers.map(marker => (
            <MapView.Marker color={"green"}
            key={marker.title}
            coordinate={marker.coordinates}
            title={marker.title}
            />
            
        ))}
       
      </MapView>
          );
        }
      }

      onPressButton(){
        console.log("Presionando Boton");
        this.setState({
          markers:this.state.markers.concat(
          {
            title: 'hello'+this.state.mapNow.latitude,
            coordinates: {
                latitude:this.state.mapNow.latitude,
                longitude:this.state.mapNow.longitude
            } 
          }
        )});
      }

      onDeleteMarkers(){
        console.log("DeleteMarkers");
        this.setState({
          markers:[]
      });
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
      
      <View>
        <Card>
          <Text>Perimetro: {this.calculatePerimeter()} metros</Text>
        </Card>
      </View>
      <View>
        <Card>
          <Text>Area: {this.calculateArea()}</Text>
        </Card>
      </View>
      <View>
        <Card>
        <Button block onPress={this.onDeleteMarkers.bind(this)} style={{flex:1}}>
          <Text>Eliminar puntos</Text>
        </Button>
          <Button block onPress={this.onPressButton.bind(this)} style={{flex:1}}>
          <Text>Agregar Punto</Text>
        </Button>
        </Card>
      </View>
      
          </Content>
        </Container>
      </Drawer>
        );
    }
}

export default MapView2;
import React, {Component} from 'react';
import {Drawer, Icon, Button, Container, Header, Body, Left, Right, Title, Content, Card } from 'native-base';
import { View, Text } from 'native-base';
import SideBar from './sidebar';
import {StatusBar, Dimensions} from 'react-native';
import { MapView, Marker,Location, Permissions } from 'expo';

const windowWidth = Dimensions.get('window').width;
const windowHeight = (Dimensions.get('window').height/2)-80;


class MapView2 extends Component{
  state = {
    mapRegion: null,
    hasLocationPermissions: false,
    locationResult: null,
    ubicarposicion: true,
    markers: [{
        title: 'hello1',
        coordinates: {
            latitude:17.992612,
            longitude:-92.9340187
        }
      },
      {
        title: 'hello2',
        coordinates: {
            latitude:17.9913084,
            longitude:-92.9329137
        }  
      },
      {
        title: 'hello3',
        coordinates: {
            latitude:17.9912344,
            longitude:-92.9348368
        }  
      }
      // ,{
      //   title: 'hello4',
      //   coordinates: {
      //       latitude:18.0235072,
      //       longitude:-92.8994764
      //   }  
      // }
    ]
  };

    constructor(props) {
        super(props);
        console.log("props", props);
        
      }
      
      polygonArea(points) 
        { 
          console.log("Puntos ", points);
          var area = 0;         // Accumulates area in the loop
          var j = points.length-1;  // The last vertex is the 'previous' one to the first

          for (var i=0; i<points.length; i++)
            { 
              var pointJ = points[j].coordinates;
              var pointI = points[i].coordinates;
              console.log("Punto J: ", pointJ);
              console.log("Punto I: ", pointI);
              console.log("Area" + area );
              //console.log("Area1: " + pointJ.latitude+ "," +pointI.latitude );
              //console.log("Area2: " + pointJ.longitude +","+pointI.longitude);
              console.log("Area1: " + pointI.latitude+ "," +pointI.longitude );
              console.log("Area2: " + pointJ.latitude +","+pointJ.longitude)
              area = area +  (pointJ.latitude*pointI.latitude) + (pointJ.longitude*pointI.longitude); 
              j = i;  //j is previous vertex to i
            }
          return (area/2).toFixed(2);
        }


      calculateArea(){
        console.log("Calculate Area");
        var result = this.polygonArea(this.state.markers);
        console.log("Calculo Area: " + result);
        return "Area";
      }

      calculatePerimeter(){
        var result = 0;
        for (var i = 0; i < this.state.markers.length-1; i++) { 
          result += this.getDistance(this.state.markers[i].coordinates,this.state.markers[i+1].coordinates);
        }
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
      
          </Content>
        </Container>
      </Drawer>
        );
    }
}

export default MapView2;
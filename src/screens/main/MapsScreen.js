import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Alert,
  Text,
  WebView
} from 'react-native';
import MapView, { Marker, Polygon, Polyline, Circle, Callout, Overlay } from 'react-native-maps';
import axios from 'axios';
import MapViewDirections from 'react-native-maps-directions';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;


class MapsScreen extends React.Component {
    state = {
        region: {
            latitude: 40.192952,
            longitude: 29.077177,
            latitudeDelta: 0.01,
            longitudeDelta: 0.05,
        },
        yerler: [],
        showMarkers: false
    };

  bursa = {
    longitude: 29.060965,
    latitude: 40.188526
  }
  ankara = {
    longitude: 32.859741,
    latitude: 39.933365
  }

  componentWillMount() {
    axios.get('http://www.bursa.com.tr/mobil_json.php').then((response) => { console.log(response); this.setState({ yerler: response.data }); });
  }

  markerTasindi(id, coordinate) {
    console.log(id);
    console.log(coordinate);
  }

  markerEkle(coordinate) {
    const yerler2 = [...this.state.yerler];
    console.log(coordinate);

    yerler2.push({
      id: -1,
      baslik: 'Yeni Nokta',
      icerik: 'Yeni ekledik',
      image: '',
      koordinat: `${coordinate.latitude},${coordinate.longitude}`,
      cat_name: 'Yeni'
    });

    //console.log(yerler2);

    this.setState({ yerler: yerler2 });
  }

  renderMarkers() {
    if (this.state.showMarkers) {
      return (this.state.yerler.map((yer) => {
        const loc = yer.koordinat.split(',');

        if (loc.length === 2) {
          return (<Marker
                key={yer.id}
                title={yer.baslik}
                description={yer.icerik}
                draggable
                coordinate={{
                  latitude: +loc[0],
                  longitude: +loc[1],
                }}
                onPress={() => { Alert.alert(yer.baslik, yer.icerik); }}
                onDragEnd={(o) => { this.markerTasindi(yer.id, o.nativeEvent.coordinate); }}
          >
          {/* <Callout>
            <View style={{ height: 300, width: 300 }}>
              <WebView 
                style={{ flex: 1 }} 
                originWhitelist={['*']}
                source={{ html: yer.icerik }} 
              />
            </View>
          </Callout> */}
          </Marker>);
        }
      }));
    }
  }

  render() {

    return (
      <View style={styles.container}>
          <MapView
            mapType={'hybrid'}
            style={styles.map}

            initialRegion={this.state.region}

            zoomEnabled
            zoomControlEnabled
            minZoomLevel={0}
            maxZoomLevel={20}

            showsCompass
            showsTraffic
            showsBuildings


            showsUserLocation
            showsMyLocationButton
            followsUserLocation

            camera={{
              center: {
                latitude: 40.192952,
                longitude: 29.077177
              },
              altitude: 20000,
              zoom: 12,
              pitch: 1,
              heading: 1
            }}

            onLongPress={(o) => this.markerEkle(o.nativeEvent.coordinate)}
          >
            { this.renderMarkers() }
            {/* <Polygon 
              coordinates={[
                {
                  latitude: 40.240030,
                  longitude: 29.013669
                },
                {
                  latitude: 40.181300,
                  longitude: 29.016414
                },
                {
                  latitude: 40.154015,
                  longitude: 29.167410
                },
                {
                  latitude: 40.223255,
                  longitude: 29.156429
                },
                {
                  latitude: 40.353151,
                  longitude: 29.181137
                }
              ]}
              fillColor="rgba(0,200,0,0.5)"
              strokeColor="rgba(0,0,0,0.5)"
              strokeWidth={2}
              tappable
              onPress={() => { Alert.alert('React Native', 'Polygon Clicked !'); }}
            /> */}
            {/* <Polyline 
              coordinates={[
                {
                  latitude: 40.240030,
                  longitude: 29.013669
                },
                {
                  latitude: 40.181300,
                  longitude: 29.016414
                },
                {
                  latitude: 40.154015,
                  longitude: 29.167410
                },
                {
                  latitude: 40.223255,
                  longitude: 29.156429
                },
                {
                  latitude: 40.353151,
                  longitude: 29.181137
                }
              ]}
              strokeColor="red"
              strokeWidth={12}
              lineJoin="miter"
              lineCap="square"
              geodesic
              tappable
              onPress={() => { Alert.alert('React Native', 'Polygon Clicked !'); }}
            /> */}
          {/* <Circle
            center={{
              latitude: 40.353151,
              longitude: 29.181137
            }}
            radius={500.123}
            fillColor="rgba(0,200,0,0.5)"
            strokeColor="rgba(0,0,0,0.5)"
            strokeWidth={2}
          /> */}
          {/* <Overlay 
            image={'https://www.bursa.bel.tr/dosyalar/image/1A.jpg'}
            bounds={
              [
                [40.240030, 29.013669],
                [40.181300, 30.016414]
              ]
            }
          /> */}

          <Marker coordinate={this.bursa} />
          <Marker coordinate={this.ankara} />

          <MapViewDirections 
            origin={this.bursa}
            destination={this.ankara}
            apikey="AIzaSyBisMLEHeioOQwng25NIpH3wxg-Sw1Hgo0"
            strokeWidth={5}
            strokeColor="red"
          />

          </MapView>
      </View>
    );
  }
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
  map: {
    flex: 1
  },
});

export default MapsScreen;

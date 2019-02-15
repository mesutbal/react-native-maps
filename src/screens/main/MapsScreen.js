import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;

const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class MapsScreen extends React.Component {
    state = {
        region: {
            latitude: 40.192952,
            longitude: 29.077177,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
        },
    };

  render() {
    return (
      <View style={styles.container}>
          <MapView
            provider={this.props.provider}
            style={styles.map}
            scrollEnabled={false}
            zoomEnabled
            pitchEnabled={false}
            rotateEnabled={false}
            initialRegion={this.state.region}
          >
            <Marker
              title="Bursa Büyükşehir Belediyesi"
              description="Hoş Geldiniz"
              coordinate={this.state.region}
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

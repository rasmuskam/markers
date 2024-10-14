import { StyleSheet, SafeAreaView, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import MapView, { Marker } from 'react-native-maps'
import Constants from 'expo-constants'
import * as Location from 'expo-location'

export default function Map() {

    const [markers, setMarkers] = useState([])
    const showMarker = (e) => {
        const coords = e.nativeEvent.coordinate
        setMarkers((prevMarkers) =>[...prevMarkers, coords])
        console.log(coords)
    }

    const [location, setLocation] = useState({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421  

    })
    useEffect(() => {
        (async()=> {
            getUserPosition()
        })()
    }, [])

    const getUserPosition = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync()

        try {
            if(status !== 'granted') {
                console.log("Geolocation not granted")
                return
            }

            const position = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.High})
            setLocation({...location, "latitude":position.coords.latitude,"longitude":position.coords.longitude})
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <SafeAreaView style={styles.container}>
    <MapView 
    style={styles.map}
    region={location}
    mapType='satellite'
    onLongPress={showMarker}
    >  
    {}

{markers.map((marker,index)=> (
    <Marker 
    key={index}
    coordinate={marker}
    />
))}
    
    </MapView>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ff0',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: Platform.OS === 'android' ? Constants.statusBarHeight: 0,
    },
    map: {
      height: '100%',
      width: '100%'
    },
  });
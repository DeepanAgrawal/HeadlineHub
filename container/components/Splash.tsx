import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {HH_LOGO} from '../constants';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={require(HH_LOGO)} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    resizeMode: 'center',
    height: 150,
  },
});

export default SplashScreen;

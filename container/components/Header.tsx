import React from 'react';
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Separator from './Separator';

const Header = ({refreshList = () => {}}) => {
  return (
    <View>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/images/hh_logo.webp')}
            style={styles.image}
          />
        </View>
        <TouchableOpacity
          style={styles.refreshContainer}
          onPress={() => refreshList()}>
          <Image
            source={require('../assets/images/refresh.webp')}
            style={styles.refreshIcon}
          />
        </TouchableOpacity>
      </View>
      <Separator />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    padding: 16,
  },
  logoContainer: {
    flex: 3,
    alignContent: 'flex-start',
  },
  image: {
    width: 111,
    height: 30,
  },
  refreshContainer: {
    alignContent: 'flex-end',
  },
  refreshIcon: {
    resizeMode: 'center',
    height: 28,
    width: 28,
  },
});

export default Header;

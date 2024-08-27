import React from 'react';
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Separator from './Separator';
import {HH_LOGO, REFRESH_ICON} from '../constants';

const Header = ({refreshList = () => {}}) => {
  return (
    <View>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image source={require(HH_LOGO)} style={styles.image} />
        </View>
        <TouchableOpacity
          style={styles.refreshContainer}
          onPress={() => refreshList()}>
          <Image source={require(REFRESH_ICON)} style={styles.refreshIcon} />
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

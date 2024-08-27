import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {convertTo12HourFormat} from '../helper';
import {Article} from '../types';
import {HH_LOGO, PINNED_ICON, PINNED_ON_TOP} from '../constants';

interface NewsCardProps {
  data: NewsCardData | Article;
}

interface NewsCardData {
  item: Article;
}

const NewsCard = (props: NewsCardProps) => {
  const data = props.data.item ?? props.data;
  return (
    <View style={styles.container}>
      {data.isPinned ? (
        <View style={styles.pinnedContainer}>
          <Image source={PINNED_ICON} style={styles.pinIcon} />
          <Text style={styles.pinnedText}>{PINNED_ON_TOP}</Text>
        </View>
      ) : null}

      <View style={styles.containerHeader}>
        <View style={styles.logoTextContainer}>
          <Image
            source={data.urlToImage ? {uri: data.urlToImage} : HH_LOGO}
            style={styles.logo}
          />
          <Text style={styles.sourceName}>{data.source.name}</Text>
        </View>
        <View>
          <Text style={styles.time}>
            {convertTo12HourFormat(data.publishedAt)}
          </Text>
        </View>
      </View>
      <View style={styles.subContainer}>
        <View style={styles.newsTextContainer}>
          <Text style={styles.newsText} numberOfLines={3}>
            {data.title}
          </Text>
        </View>
        <View style={styles.authorImageContainer}>
          <Image
            source={data.urlToImage ? {uri: data.urlToImage} : HH_LOGO}
            style={styles.authorImage}
          />
        </View>
      </View>
      <View style={styles.authorTextContainer}>
        <Text style={styles.authorText}>{data.author}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
  },
  pinnedContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    paddingVertical: 8,
  },
  pinIcon: {
    resizeMode: 'center',
    width: 10,
    height: 16,
  },
  pinnedText: {
    marginLeft: 5,
    fontFamily: 'Satoshi',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
  },
  containerHeader: {
    flexDirection: 'row',
  },
  logoTextContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  logo: {
    resizeMode: 'center',
    height: 20,
    width: 20,
  },
  sourceName: {
    marginLeft: 10,
    fontFamily: 'Satoshi',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 18,
    textAlign: 'center',
    color: '#808080',
  },
  time: {
    fontFamily: 'Satoshi',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
    textAlign: 'center',
    color: '#000000',
  },
  subContainer: {
    flexDirection: 'row',
    marginTop: 16,
  },
  newsTextContainer: {
    flex: 3,
  },
  newsText: {
    fontFamily: 'Satoshi',
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 24,
    color: '#000000',
  },
  authorImageContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  authorImage: {
    resizeMode: 'cover',
    height: 77,
    width: 77,
    borderRadius: 13,
    backgroundColor: 'aliceblue',
  },
  authorTextContainer: {
    alignSelf: 'flex-start',
    marginTop: 6,
  },
  authorText: {
    fontFamily: 'Satoshi',
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 16,
    textAlign: 'left',
    color: '#818181',
  },
});

export default NewsCard;

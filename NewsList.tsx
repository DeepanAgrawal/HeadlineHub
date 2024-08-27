import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import NewsCard from './NewsCard';
import {retrieveData, storeData} from '../Storage';
import Separator from './Separator';
import {Article} from '../types';
import {DELETE, DELETE_ICON, NEWS_KEY, PIN, PIN_ICON} from '../constants';

interface NewsListProps {
  newsList?: Array<Article>;
  deleteItem?: (data: Article) => void;
  pinItem?: (data: Article) => void;
}

const NewsList = ({
  newsList = [],
  deleteItem = () => {},
  pinItem = () => {},
}: NewsListProps) => {
  const updateDisplayStatus = () => {
    const data = retrieveData(NEWS_KEY);
    if (data) {
      const updatedData = data.map((article: Article) => {
        const isSelected = newsList.find(
          selected => selected.id === article.id,
        );
        if (isSelected) {
          article.isDisplayed = true;
        }
        return article;
      });
      storeData(NEWS_KEY, updatedData);
    }
  };
  updateDisplayStatus();
  return (
    <View style={styles.container}>
      <SwipeListView
        data={newsList}
        renderItem={data => (
          <>
            <NewsCard data={data} />
            <Separator />
          </>
        )}
        renderHiddenItem={data => (
          <View style={styles.hiddenItemContainer}>
            <TouchableOpacity
              style={[styles.hiddenItemButton]}
              onPress={() => {
                deleteItem(data.item);
              }}>
              <Image source={DELETE_ICON} style={styles.icon} />
              <Text style={styles.hiddenItemText}>{DELETE}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.hiddenItemButton}
              onPress={() => {
                pinItem(data.item);
              }}>
              <Image source={PIN_ICON} style={styles.icon} />
              <Text style={styles.hiddenItemText}>{PIN}</Text>
            </TouchableOpacity>
          </View>
        )}
        rightOpenValue={-100}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  renderItemContainer: {
    marginVertical: 10,
  },
  listCard: {
    backgroundColor: '#F8F7F1',
    borderWidth: 1,
    borderRadius: 8,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  listCardTextOne: {
    color: '#000000',
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  hiddenItemContainer: {
    width: '25%',
    flex: 1,
    marginVertical: 16,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#4BBDFC',
    alignSelf: 'flex-end',
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  hiddenItemButton: {
    flex: 1,
    width: '100%',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hiddenItemText: {
    color: '#FFFFFF',
    height: 20,
  },
  icon: {
    height: 26,
    width: 26,
  },
});
export default NewsList;

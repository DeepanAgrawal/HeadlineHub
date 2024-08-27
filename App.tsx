import React, {useEffect, useRef, useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';

import SplashScreen from './container/components/Splash';
import {getData} from './container/api';
import {GET_TOP_HEADLINES} from './container/apiConstants';
import NewsList from './container/components/NewsList';
import {retrieveData, storeData} from './container/Storage';
import Header from './container/components/Header';
import NewsCard from './container/components/NewsCard';
import Separator from './container/components/Separator';

function App(): React.JSX.Element {
  const [showSplash, setShowSplash] = useState(true);
  const [newsArticleData, setNewsArticleData] = useState([]);
  const [pinnedNewsArticle, setPinnedNewsArticle] = useState([]);
  const localRandomData = useRef([]);
  const pageNumber = useRef(1);
  const intervalRef = useRef(null);

  useEffect(() => {
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getFirst10 = data => {
    return data.slice(0, 10);
  };

  const setArticleToStorage = data => {
    data.forEach((article, index) => {
      article.id = index;
      article.isDisplayed = false;
    });
    storeData('news', data);
    return data;
  };

  const fetchAndPushRandomArticles = () => {
    const localData = retrieveData('news');
    const filteredList = localData.filter(item => !item.isDisplayed);

    // Shuffle the filtered list
    for (let i = filteredList.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [filteredList[i], filteredList[j]] = [filteredList[j], filteredList[i]];
    }

    if (localRandomData.current.length === 50 * pageNumber.current) {
      pageNumber.current = pageNumber.current + 1;
      localRandomData.current = [];

      setNewsArticleData([]);
      reset();
      clearInterval(intervalRef.current);
    }
    // Return the first 'count' elements
    const randomArticles = filteredList.slice(0, 5);
    setNewsArticleData([...randomArticles, ...localRandomData.current]);
    localRandomData.current = [...randomArticles, ...localRandomData.current];
  };

  const getRandomArticles = () => {
    intervalRef.current = setInterval(() => {
      fetchAndPushRandomArticles();
    }, 10000);
  };

  const showAlert = () => {
    Alert.alert(
      'Alert Title', // Title of the alert
      'Oops!! Something went wrong. Please try again later', // Message in the alert
      [
        {
          text: 'OK',
          onPress: () => console.log('OK Pressed'),
        },
      ],
      {cancelable: false}, // If false, clicking outside of the alert will not dismiss it
    );
  };

  const reset = () => {
    const loadData = async () => {
      try {
        const result = await getData(GET_TOP_HEADLINES, {
          q: 'bitcoin',
          pageSize: 50,
          page: pageNumber.current,
        });
        setShowSplash(false);
        const newsArticles = setArticleToStorage(result.articles);
        const first10Article = getFirst10(newsArticles);
        setNewsArticleData(first10Article);
        localRandomData.current = first10Article;
        getRandomArticles();
      } catch (e) {
        const localNewsArticles = retrieveData('news');
        if (localNewsArticles && localNewsArticles.length > 0) {
          setShowSplash(false);
          const first10Article = getFirst10(localNewsArticles);
          setNewsArticleData(first10Article);
          localRandomData.current = first10Article;
          getRandomArticles();
        } else {
          showAlert();
        }
      }
    };

    loadData();
  };

  const deleteItem = article => {
    localRandomData.current = localRandomData.current.filter(
      item => item.id !== article.id,
    );
    setNewsArticleData(localRandomData.current);
  };

  const onPressDelete = (article: any) => {
    deleteItem(article);
  };

  const onPressPinItem = (article: any) => {
    const localData = pinnedNewsArticle;
    article.isPinned = true;
    localData.push(article);
    setPinnedNewsArticle(localData);
    deleteItem(article);
    console.log('TESTING', pinnedNewsArticle);
  };

  const onPressRefresh = () => {
    fetchAndPushRandomArticles();
    clearInterval(intervalRef.current);
  };

  return (
    <View style={styles.Container}>
      {showSplash ? (
        <SplashScreen />
      ) : (
        <>
          <Header refreshList={() => onPressRefresh()} />
          {pinnedNewsArticle.length > 0
            ? pinnedNewsArticle.map((article, index) => {
                return (
                  <View style={{width: '100%'}}>
                    <NewsCard data={article} key={index} />
                    <Separator />
                  </View>
                );
              })
            : null}
          <NewsList
            newsList={newsArticleData}
            deleteItem={data => onPressDelete(data)}
            pinItem={data => onPressPinItem(data)}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

export default App;

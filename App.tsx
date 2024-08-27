import React, {useEffect, useRef, useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';

import SplashScreen from './container/components/Splash';
import {getData} from './container/api';
import {
  ERROR_MESSAGE,
  ERROR_TITLE,
  GET_TOP_HEADLINES,
  NEWS_KEY,
  OK_BTN,
} from './container/constants';
import NewsList from './container/components/NewsList';
import {retrieveData, storeData} from './container/Storage';
import Header from './container/components/Header';
import NewsCard from './container/components/NewsCard';
import Separator from './container/components/Separator';
import {Article} from './container/types';

function App(): React.JSX.Element {
  const [showSplash, setShowSplash] = useState(true);
  const [newsArticleData, setNewsArticleData] = useState<Array<Article>>([]);
  const [pinnedNewsArticle, setPinnedNewsArticle] = useState<Array<Article>>(
    [],
  );
  const localRandomData = useRef<Array<Article>>([]);
  const pageNumber = useRef<number>(1);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getFirst10 = (data: Array<Article>) => {
    return data.slice(0, 10);
  };

  const setArticleToStorage = (data: Array<Article>) => {
    data.forEach((article: Article, index: number) => {
      article.id = index;
      article.isDisplayed = false;
    });
    storeData(NEWS_KEY, data);
    return data;
  };

  const fetchAndPushRandomArticles = () => {
    const localData = retrieveData(NEWS_KEY);
    const filteredList = localData.filter((item: Article) => !item.isDisplayed);

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
      intervalRef.current = null;
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
      ERROR_TITLE,
      ERROR_MESSAGE,
      [
        {
          text: OK_BTN,
          onPress: () => {},
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
        const articlesList = result.articles;
        const newsArticles = setArticleToStorage(articlesList);
        const first10Article = getFirst10(newsArticles);
        setNewsArticleData(first10Article);
        localRandomData.current = first10Article;
        getRandomArticles();
      } catch (e) {
        const localNewsArticles = retrieveData(NEWS_KEY);
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

  const deleteItem = (article: Article) => {
    localRandomData.current = localRandomData.current.filter(
      item => item.id !== article.id,
    );
    setNewsArticleData(localRandomData.current);
  };

  const onPressDelete = (article: any) => {
    deleteItem(article);
  };

  const onPressPinItem = (article: Article) => {
    const localData = pinnedNewsArticle;
    article.isPinned = true;
    localData.push(article);
    setPinnedNewsArticle(localData);
    deleteItem(article);
  };

  const onPressRefresh = () => {
    fetchAndPushRandomArticles();
    clearInterval(intervalRef.current);
    intervalRef.current = null;
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
                  <View style={styles.PinnedNewsContainer}>
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
  PinnedNewsContainer: {
    width: '100%',
  },
});

export default App;

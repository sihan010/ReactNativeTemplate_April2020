import React from 'react';
import {View, SafeAreaView, Text, Image, StyleSheet} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const IntroSlider = props => {
  const slides = [
    {
      key: 'stock',
      title: 'View Stock',
      text: '在庫のあるすべての製品をご覧ください。',
      image: require('../../../assets/stock.png'),
      backgroundColor: '#DC7633',
    },
    {
      key: 'checklist',
      title: 'Manage Stock',
      text: 'すべての在庫製品を管理します。',
      image: require('../../../assets/checklist.png'),
      backgroundColor: '#F1C40F',
    },
    {
      key: 'gps',
      title: 'Access Anywhere',
      text: 'どこからでも製品を管理できます。',
      image: require('../../../assets/gps.png'),
      backgroundColor: '#1ABC9C',
    },
  ];

  const renderButton = icon => {
    return (
      <View
        styles={{
          width: 40,
          height: 40,
          backgroundColor: '#000000',
          borderRadius: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Icon name={icon} color="#ffffff" size={34} />
      </View>
    );
  };

  const renderItem = item => {
    let details = item.item;
    return (
      <SafeAreaView
        style={{
          ...styles.container,
          flex: 1,
          backgroundColor: details.backgroundColor,
        }}>
        <View style={{...styles.container, flex: 2}}>
          <Text style={styles.title}>{details.title}</Text>
        </View>
        <View style={{...styles.container, flex: 4}}>
          <Image
            resizeMode="contain"
            source={details.image}
            style={styles.image}
          />
        </View>
        <View style={{...styles.container, flex: 2}}>
          <Text style={styles.details}>{details.text}</Text>
        </View>
      </SafeAreaView>
    );
  };

  return (
    <AppIntroSlider
      showSkipButton
      showPrevButton
      renderItem={renderItem}
      renderDoneButton={() => renderButton('check')}
      renderNextButton={() => renderButton('chevron-right')}
      renderPrevButton={() => renderButton('chevron-left')}
      renderSkipButton={() => renderButton('close')}
      slides={slides}
      onDone={props.onDone}
      onSkip={props.onSkip}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontFamily: 'Spectral-Regular',
  },
  details: {
    fontSize: 16,
    paddingVertical: 10,
  },
  image: {
    height: 300,
    width: 300,
  },
});

export default IntroSlider;

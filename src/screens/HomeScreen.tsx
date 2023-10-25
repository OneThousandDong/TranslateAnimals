import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Animated,
  Dimensions,
  ImageBackground,
  ScrollView,
  TouchableWithoutFeedback,
  Button,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import LottieView from 'lottie-react-native';
import {Afl} from '../constants/Fonts';
import Svgs from '../constants/Svgs';
import {AnimalsEng, AnimalsVi} from './Data/AnimalsData';
import Modal from 'react-native-modal';
import useStorageStore from '../store/useStorageStore';
import ProgressBar from './Progress';
import {Animal} from '../model/Country';

const HomeScreen = ({route, navigation}) => {
  const {width, height} = Dimensions.get('window');
  const {
    languageState,
    setLanguageState,
    timeSuggest,
    resultApp,
    setResultApp,
  } = useStorageStore();
  // const animationRef = useRef<LottieView>(null);
  const [valueJSX1, setValueJSX1] = useState<Animal>();
  const [valueJSX3, setValueJSX3] = useState<Animal>();
  const [valueJSX2, setValueJSX2] = useState(
    <Svgs.React height={50} width={50} />,
  );
  const [value1, setValue1] = useState(false);
  const [value3, setValue3] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isLottieVisible, setLottieVisible] = useState(false);
  const animatedValue1 = useRef(new Animated.Value(0)).current;
  const animatedValue3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (value1) {
      Animated.spring(animatedValue1, {
        toValue: 1,
        friction: 2,
        tension: 10,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(animatedValue1, {
        toValue: 0,
        friction: 2,
        tension: 10,
        useNativeDriver: true,
      }).start();
    }

    if (value3) {
      Animated.spring(animatedValue3, {
        toValue: 1,
        friction: 2,
        tension: 10,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(animatedValue3, {
        toValue: 0,
        friction: 2,
        tension: 10,
        useNativeDriver: true,
      }).start();
    }
  }, [value1, animatedValue1, animatedValue3, value3]);

  const delay = ms => new Promise(res => setTimeout(res, ms));

  const handleTabPress = (tab: any) => {
    if (tab == 'tab1') {
      setValueJSX1({} as Animal);
      setValue1(false);
      setValueJSX2(<Svgs.React height={50} width={50} />);
      return;
    } else if (tab == 'tab3') {
      setValueJSX3({} as Animal);
      setValue3(false);
      setValueJSX2(<Svgs.React height={50} width={50} />);
      return;
    } else if (tab == 'tab2') {
      if (value1 && value3) {
        const resultValue2 = valueJSX1?.name + valueJSX3?.name;
        if (AnimalsEng.filter(i => i.result == resultValue2).length > 0) {
          const result = AnimalsEng.find(i => i.result == resultValue2)?.result;
          if (resultApp.filter(i => i == result).length > 0) {
            // animationRef?.current?.play();
            setLottieVisible(true);
            setModalVisible(true);
            timeLottie();
            setResultApp(resultApp.filter(i => i !== result));
          }
          setValueJSX2(AnimalsEng.find(i => i.result == resultValue2)?.uri);
        } else {
          startAnimation();
          console.log('Kong cos');
        }
      }
    }
  };

  const checkContainValue = (item: Animal, index: number) => {
    const resultValue2 =
      index == 1 ? item?.name + valueJSX3?.name : valueJSX1?.name + item?.name;
    if (AnimalsEng.filter(i => i.result == resultValue2).length > 0) {
      const result = AnimalsEng.find(i => i.result == resultValue2)?.result;
      if (resultApp.filter(i => i == result).length == 0) {
        setValueJSX2(AnimalsEng.find(i => i.result == resultValue2)?.uri);
      }
    }
  };

  const generateRandomColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return `#${randomColor}`;
  };
  const timeLottie = async () => {
    await delay(3000);
    setLottieVisible(false);
    setValueJSX1({} as Animal);
    setValueJSX2(<Svgs.React height={50} width={50} />);
    setValueJSX3({} as Animal);
    setValue1(false);
    setValue3(false);
  };

  const animation = new Animated.Value(0);

  const xInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const yInterpolate = animation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['0deg', '0deg', '180deg'],
  });

  const animatedStyles = {
    transform: [{rotateX: xInterpolate}, {rotateY: yInterpolate}],
  };

  const startAnimation = () => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      animation.setValue(0);
    });
  };

  const renderItem = () => {
    const columns = [];
    for (let i = 0; i < AnimalsEng.length; i += 2) {
      const columnItems = AnimalsEng.slice(i, i + 2);
      const column = (
        <View key={i} style={styles.row}>
          {columnItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                if (!value1) {
                  setValueJSX1(item.uri);
                  setValue1(true);
                  return;
                }
                if (!value3) {
                  setValueJSX3(item.uri);
                  setValue3(true);
                  return;
                }
              }}>
              <View className="m-4">
                <View className="rounded-xl">
                  <View
                    className="border-2"
                    style={{
                      // backgroundColor: generateRandomColor(),
                      height: width / 6,
                      width: width / 6,
                      justifyContent: 'center',
                      borderRadius: width / 6 / 2,
                    }}>
                    <View className="rounded-xl flex flex-row justify-center">
                      {item.uri}
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      );
      columns.push(column);
    }
    return columns;
  };

  return (
    <>
      <Text>{timeSuggest}</Text>
      <View style={styles.container} className="bg-gray-400">
        <FlatList
          numColumns={4}
          contentContainerStyle={{margin: 5}}
          data={AnimalsEng}
          initialNumToRender={AnimalsEng.length}
          keyExtractor={(item, index) => item.name}
          renderItem={item => (
            <TouchableOpacity
              onPress={async () => {
                if (!value1) {
                  setValueJSX1(item.item);
                  setValue1(true);
                  if (value3) {
                    await delay(200);
                    checkContainValue(item.item, 1);
                  }
                  return;
                }
                if (!value3) {
                  setValueJSX3(item.item);
                  setValue3(true);
                  if (value1) {
                    await delay(200);
                    checkContainValue(item.item, 3);
                  }
                  return;
                }
              }}>
              <View style={{width: width / 4.1, height: 200, borderWidth: 1}}>
                {item.item.uri}
              </View>
            </TouchableOpacity>
          )}
          ListHeaderComponent={
            <View>
              <View className="flex flex-row justify-between">
                <Svgs.MenuSVG height={20} width={20} />
                <TouchableOpacity
                  onPress={() => {
                    if (languageState == 'ENG') {
                      setLanguageState('VI');
                    } else {
                      setLanguageState('ENG');
                    }
                  }}>
                  <View>
                    {languageState == 'ENG' ? (
                      <Text
                        style={{fontFamily: Afl}}
                        className="text-xs text-cyan-50">
                        ENG
                      </Text>
                    ) : (
                      <Text
                        style={{fontFamily: Afl}}
                        className="text-xs text-cyan-50">
                        VI
                      </Text>
                    )}
                  </View>
                </TouchableOpacity>
              </View>
              <View className="flex flex-row justify-center items-center m-8">
                <ProgressBar />
              </View>
              <Text>Đã mở (10)</Text>
            </View>
          }
          ListFooterComponent={
            <View>
              <Text>Chưa mở (20)</Text>
              <View
                style={{
                  height: Dimensions.get('window').height,

                  width: Dimensions.get('window').width,
                  marginBottom: 10,
                  flexDirection: 'row',
                }}>
                {renderItem()}
              </View>
            </View>
          }
          onEndReachedThreshold={0.2}
        />
        <Modal
          animationIn="zoomIn"
          animationInTiming={600}
          animationOut="zoomOut"
          animationOutTiming={1000}
          backdropOpacity={0}
          onModalShow={() => {
            setTimeout(() => setModalVisible(false), 2000);
          }}
          isVisible={isModalVisible}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View style={{width: width / 3, height: width / 3}}>
              <View
                className="flex-1 justify-center items-center bg-cyan-400 border-2"
                style={{borderRadius: width / 3 / 2}}>
                {valueJSX2}
              </View>
            </View>
          </View>
        </Modal>
        <View style={styles.tabBar}>
          <TouchableOpacity
            activeOpacity={1}
            style={{width: width / 5, height: width / 5}}
            onPress={() => handleTabPress('tab1')}>
            <View
              className="flex-1 justify-center items-center bg-amber-200 border-2"
              style={{borderRadius: width / 5 / 2}}>
              <Animated.View style={{transform: [{scale: animatedValue1}]}}>
                {valueJSX1?.uri}
              </Animated.View>
            </View>
          </TouchableOpacity>
          <View className="w-8 h-3 " />
          <TouchableOpacity
            style={{width: width / 3.5, height: width / 3.5}}
            onPress={() => {
              handleTabPress('tab2');
            }}>
            <View
              className="flex-1 justify-center items-center bg-cyan-400 border-2"
              style={{borderRadius: width / 3.5 / 2}}>
              <Animated.View style={[animatedStyles]}>
                {valueJSX2}
              </Animated.View>
            </View>
          </TouchableOpacity>
          <View className="w-8 h-3 " />
          <TouchableOpacity
            activeOpacity={1}
            style={{width: width / 5, height: width / 5}}
            onPress={() => handleTabPress('tab3')}>
            <View
              className="flex-1 justify-center items-center bg-cyan-400 border-2"
              style={{borderRadius: width / 5 / 2}}>
              <Animated.View style={{transform: [{scale: animatedValue3}]}}>
                {valueJSX3?.uri}
              </Animated.View>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {isLottieVisible ? (
        <LottieView
          style={
            {
              // width: 400,
              // height: 500,
              // position: 'absolute',
              // backgroundColor: 'red'
            }
          }
          // loop={true}
          autoPlay
          // ref={animationRef}
          source={require('../assets/lottie/congrac.json')}
        />
      ) : null}
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  tabBar: {
    position: 'absolute',
    bottom: 20,
    left: 5,
    right: 5,
    // height: 150,
    flexDirection: 'row',
    // backgroundColor: 'lightgray',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabItem2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // width: 50,
    // height: 100,
    backgroundColor: '#9AEBA3',
    borderRadius: 25,
  },
  tabText: {
    // fontSize: 16,
    // fontWeight: 'bold',
  },
  // row: {
  //   flexDirection: 'row',
  //   // justifyContent: 'space-between',
  // },
  row: {
    // flex: 1,
    // justifyContent: 'space-around',
  },
  progressBG: {
    // width: '50%',
    // height: 15,
    // backgroundColor: '#C4CDD5',
    // marginHorizontal: 10,
    // borderRadius: 10,
    // justifyContent: 'center',
  },

  progress: {
    width: '50%',
    backgroundColor: '#F0EF6C',
    borderRadius: 10,
  },
});

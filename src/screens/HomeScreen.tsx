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

const HomeScreen = ({route, navigation}) => {
  const {width, height} = Dimensions.get('window');
  const {languageState, setLanguageState, timeSuggest} = useStorageStore();
  const animationRef = useRef<LottieView>(null);
  const [valueJSX1, setValueJSX1] = useState(<></>);
  const [valueJSX3, setValueJSX3] = useState(<></>);
  const [valueJSX2, setValueJSX2] = useState(<></>);
  const [value1, setValue1] = useState(false);
  const [value3, setValue3] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isLottieVisible, setLottieVisible] = useState(false);

  const [showView, setShowView] = useState(false);
  const opacityValue = useState(new Animated.Value(0))[0];

  useEffect(() => {
    if (value1) {
      Animated.timing(opacityValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(opacityValue, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }
  }, [value1, opacityValue]);

  const delay = ms => new Promise(res => setTimeout(res, ms));

  const handleTabPress = (tab: any) => {
    console.log('====================================');
    console.log('Hii');
    console.log('====================================');
    if (tab == 'tab1') {
      setValueJSX1(<></>);
      setValue1(false);
      setValueJSX2(<></>);
      return;
    } else if (tab == 'tab3') {
      setValueJSX3(<></>);
      setValue3(false);
      setValueJSX2(<></>);
      return;
    } else if (tab == 'tab2') {
      setLottieVisible(true);
      setValueJSX2(<Svgs.HorseSVG height={100} width={100} />);
      animationRef?.current?.play();
      setModalVisible(true);
    }
  };

  const generateRandomColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return `#${randomColor}`;
  };
  const timeLottie = async () => {
    await delay(3000);
    setLottieVisible(false);
    setValueJSX1(<></>);
    setValueJSX2(<></>);
    setValueJSX3(<></>);
    setValue1(false);
    setValue3(false);
  };

  return (
    <>
      <Text>{timeSuggest}</Text>
      <View style={styles.container} className="bg-gray-400">
        <View>
          <FlatList
            numColumns={4}
            contentContainerStyle={{margin: 5}}
            data={AnimalsEng}
            initialNumToRender={AnimalsEng.length}
            keyExtractor={(item, index) => item.name}
            renderItem={item => (
              <TouchableOpacity
                onPress={() => {
                  console.log('====================================');
                  console.log(value1);
                  console.log(value3);
                  console.log('====================================');
                  if (!value1) {
                    setValueJSX1(item.item.uri);
                    setValue1(true);
                    return;
                  }
                  if (!value3) {
                    setValueJSX3(item.item.uri);
                    setValue3(true);
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
              </View>
            }
            ListFooterComponent={
              <View
                style={{
                  height: Dimensions.get('window').height,
                  width: Dimensions.get('window').width,
                  marginBottom: 10,
                }}
              />
            }
            onEndReachedThreshold={0.2}
          />
        </View>
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
                 <Animated.View
                    style={{
                      opacity: opacityValue,
                    }}
              >
                {valueJSX1}
              </Animated.View>
            </View>
          </TouchableOpacity>
          <View className="w-8 h-3 " />
          <TouchableOpacity
            style={{width: width / 3.5, height: width / 3.5}}
            onPress={() => {
              handleTabPress('tab2');
              timeLottie();
            }}>
            <View
              className="flex-1 justify-center items-center bg-cyan-400 border-2"
              style={{borderRadius: width / 3.5 / 2}}>
              {valueJSX2}
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
              {valueJSX3}
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {isLottieVisible ? (
        <LottieView
          style={{
            // width: 400,
            // height: 500,
            // position: 'absolute',
            // backgroundColor: 'red'
          }}
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

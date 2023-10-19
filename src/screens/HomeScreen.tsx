import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
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

const HomeScreen = ({route, navigation}) => {
  const {width, height} = Dimensions.get('window');
  const [languageState, setLanguageState] = useState('ENG');
  const animationRef = useRef<LottieView>(null);
  const [valueJSX1, setValueJSX1] = useState(<></>);
  const [valueJSX3, setValueJSX3] = useState(<></>);
  const [valueJSX2, setValueJSX2] = useState(<></>);
  const [value1, setValue1] = useState(false);
  const [value3, setValue3] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    animationRef.current?.play();
  }, []);

  const handleTabPress = (tab: any) => {
    if (tab == 'tab1') {
      setValueJSX1(<></>);
      setValue1(false);
      setValueJSX2(<></>);
    } else if (tab == 'tab3') {
      setValueJSX3(<></>);
      setValue3(false);
      setValueJSX2(<></>);
    } else if (tab == 'tab2') {
      setValueJSX2(<Svgs.HorseSVG height={100} width={100} />);
      animationRef.current.play();
      setModalVisible(true);
    }
  };

  const generateRandomColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return `#${randomColor}`;
  };

  const renderItem = () => {
    const columns = [];
    for (let i = 0; i < AnimalsEng.length; i += 4) {
      const columnItems = AnimalsEng.slice(i, i + 4);
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

  const ModalPopup = ({visible}) => {
    const scaleValue = React.useRef(new Animated.Value(0)).current;
    const [showModal, setShowModal] = useState(visible);
    useEffect(() => {
      toggleModal();
    }, [visible]);

    const toggleModal = () => {
      if (visible) {
        setShowModal(true);
        Animated.spring(scaleValue, {
          toValue: 0.9,
          tension: 50,
          friction: 2,
          useNativeDriver: true,
        }).start();
      } else {
        scaleValue.setValue(0);
      }
      setTimeout(() => {
        Animated.spring(scaleValue, {
          toValue: 1,
          useNativeDriver: true,
        }).start(() => {
          setShowModal(false);
        });
      }, 3000);
    };

    return (
      <Modal transparent visible={showModal}>
        <View className="rounded-md" style={styles.modalContainer}>
          <Animated.View
            style={{transform: [{scale: scaleValue}], width: width / 3, height: width / 3 }}>
            <View
              className="flex-1 justify-center items-center bg-cyan-400 border-2"
              style={{borderRadius: width / 3 / 2}}>
              {valueJSX2}
            </View>
          </Animated.View>
        </View>
      </Modal>
    );
  };

  return (
    <>
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          style={styles.contentContainer}>
          <View className="bg-gray-400" style={styles.container}>
            <View className="m-4">
              {/*<Svgs.MenuSVG height={20} width={20} />*/}
            </View>
            <View style={{position: 'absolute', right: 0, margin: 10}}>
              <TouchableOpacity
                onPress={() => {
                  if (languageState == 'ENG') {
                    setLanguageState('VI');
                  } else {
                    setLanguageState('ENG');
                  }
                }}>
                <View className="items-center justify-center">
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
            {renderItem()}
            <LottieView
              style={{
                width: 400,
                height: 400,
                position: 'absolute',
                top: height / 8,
                bottom: 0,
                zIndex: 1,
              }}
              loop={false}
              ref={animationRef}
              source={require('../assets/lottie/firework.json')}
            />
            <ModalPopup visible={modalVisible} />
          </View>
        </ScrollView>
        <View style={styles.tabBar}>
          <TouchableOpacity
            activeOpacity={1}
            style={{width: width / 5, height: width / 5}}
            onPress={() => handleTabPress('tab1')}>
            <View
              className="flex-1 justify-center items-center bg-amber-200 border-2"
              style={{borderRadius: width / 5 / 2}}>
              {valueJSX1}
            </View>
          </TouchableOpacity>
          <View className="w-8 h-3 " />
          <TouchableOpacity
            style={{width: width / 3.5, height: width / 3.5}}
            onPress={() => handleTabPress('tab2')}>
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
  row: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modal: {
    width: Dimensions.get('window').width,
    height: '75%',
    // backgroundColor: 'rgba(0,0,0,0.5)',
    // borderRadius: 20,
  },
});

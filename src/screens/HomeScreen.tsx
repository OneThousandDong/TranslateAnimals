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
} from "react-native";
import React, {useEffect, useRef, useState} from "react";
import LottieView from "lottie-react-native";
import {Afl} from "../constants/Fonts";
import Svgs from "../constants/Svgs";
import {AnimalsEng, AnimalsVi} from "./Data/AnimalsData";
import Modal from "react-native-modal";
const TimeCount = 2;
import * as Progress from "react-native-progress";
import useStorageStore from "../store/useStorageStore";
const HomeScreen = ({route, navigation}) => {
  const {width, height} = Dimensions.get("window");
  const {languageState, setLanguageState, timeSuggest} =
    useStorageStore();
  const setTimeSuggest = useStorageStore((state) => state.setTimeSuggest);
  const animationRef = useRef<LottieView>(null);
  const [valueJSX1, setValueJSX1] = useState(<></>);
  const [valueJSX3, setValueJSX3] = useState(<></>);
  const [valueJSX2, setValueJSX2] = useState(<></>);
  const [value1, setValue1] = useState(false);
  const [value3, setValue3] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const progressAnimation = useRef(new Animated.Value(0)).current;
  const [progress, setProgress] = useState(TimeCount);
  const [progressQ, setProgressQ] = useState(0);
  const [timeSg, setTimeSg] = useState(timeSuggest);

  const animateProgress = () => {
    Animated.timing(progressAnimation, {
      toValue: progress,
      duration: progress == 5 ? 0 : 1000,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    animateProgress();
    return () => {};
  }, [progress]);

  const handleTabPress = (tab: any) => {
    if (tab == "tab1") {
      setValueJSX1(<></>);
      setValue1(false);
      setValueJSX2(<></>);
      return;
    } else if (tab == "tab3") {
      setValueJSX3(<></>);
      setValue3(false);
      setValueJSX2(<></>);
      return;
    } else if (tab == "tab2") {
      setValueJSX2(<Svgs.HorseSVG height={100} width={100} />);
      animationRef.current.play();
      setModalVisible(true);
    }
  };

  const generateRandomColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return `#${randomColor}`;
  };

  const [timer, setTimer] = useState<number>(TimeCount);
  const formatSecondToMinutes = (second_num: number) => {
    if (second_num) {
      const minutes = Math.floor(second_num / 60);
      const sec = second_num % 60;
      return `${minutes < 10 ? "0" + minutes : minutes}:${
        sec < 10 ? "0" + sec : sec
      }`;
    } else {
      return "00:00";
    }
  };

  const startInterval = () => {
    setTimer(prv => {
      if (prv === 0) {
        setTimer(TimeCount);
        setProgress(TimeCount);
        // setTimeSuggest(timeSuggest + 1);
        setTimeSg(timeSg + 1);
        return;
      } else {
        setProgress(prv - 1);
        return prv - 1;
      }
    });
  };
  useEffect(() => {
    if (timer == TimeCount) {
      setTimeSuggest(timeSuggest + 1);
    }
  }, [timer]);
  useEffect(() => {
    setInterval(startInterval, 1000);
  }, []);

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
                      justifyContent: "center",
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
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          style={styles.contentContainer}>
          <View className="flex flex-row justify-between">
            <Svgs.MenuSVG height={20} width={20} />
            <TouchableOpacity
              onPress={() => {
                if (languageState == "ENG") {
                  setLanguageState("VI");
                } else {
                  setLanguageState("ENG");
                }
              }}>
              <View>
                {languageState == "ENG" ? (
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
            <View className="mx-2">
              <View>
                <Text>NHMQ</Text>
              </View>
              <View className="justify-center items-center">
                <Progress.Bar
                  borderRadius={8}
                  progress={progressQ}
                  width={width / 2.5}
                  height={12}
                  useNativeDriver={true}
                />
                <View className="absolute">
                  <Text>0/100</Text>
                </View>
              </View>
            </View>
            <View className="mx-2 ">
              <View>
                <Text>Nguyen huu minh quang</Text>
              </View>
              <View className="justify-center items-center">
                <Progress.Bar
                  borderRadius={8}
                  progress={progress / 3 / 100}
                  width={width / 2.5}
                  height={12}
                  useNativeDriver={true}
                />
                <View className="absolute">
                  <Text>{formatSecondToMinutes(timer)}</Text>
                </View>
              </View>
            </View>
          </View>
          <View className="bg-gray-400" style={styles.container}>
            {renderItem()}
            <LottieView
              style={{
                width: 400,
                height: 400,
                position: "absolute",
                top: height / 8,
                bottom: 0,
                zIndex: 1,
              }}
              loop={false}
              ref={animationRef}
              source={require("../assets/lottie/firework.json")}
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
                  justifyContent: "center",
                  alignItems: "center",
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
          </View>
        </ScrollView>
        {/*<View style={styles.tabBar}>*/}
        {/*  <TouchableOpacity*/}
        {/*    activeOpacity={1}*/}
        {/*    style={{width: width / 5, height: width / 5}}*/}
        {/*    onPress={() => handleTabPress('tab1')}>*/}
        {/*    <View*/}
        {/*      className="flex-1 justify-center items-center bg-amber-200 border-2"*/}
        {/*      style={{borderRadius: width / 5 / 2}}>*/}
        {/*      {valueJSX1}*/}
        {/*    </View>*/}
        {/*  </TouchableOpacity>*/}
        {/*  <View className="w-8 h-3 " />*/}
        {/*  <TouchableOpacity*/}
        {/*    style={{width: width / 3.5, height: width / 3.5}}*/}
        {/*    onPress={() => handleTabPress('tab2')}>*/}
        {/*    <View*/}
        {/*      className="flex-1 justify-center items-center bg-cyan-400 border-2"*/}
        {/*      style={{borderRadius: width / 3.5 / 2}}>*/}
        {/*      {valueJSX2}*/}
        {/*    </View>*/}
        {/*  </TouchableOpacity>*/}
        {/*  <View className="w-8 h-3 " />*/}
        {/*  <TouchableOpacity*/}
        {/*    activeOpacity={1}*/}
        {/*    style={{width: width / 5, height: width / 5}}*/}
        {/*    onPress={() => handleTabPress('tab3')}>*/}
        {/*    <View*/}
        {/*      className="flex-1 justify-center items-center bg-cyan-400 border-2"*/}
        {/*      style={{borderRadius: width / 5 / 2}}>*/}
        {/*      {valueJSX3}*/}
        {/*    </View>*/}
        {/*  </TouchableOpacity>*/}
        {/*</View>*/}
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
    position: "absolute",
    bottom: 20,
    left: 5,
    right: 5,
    // height: 150,
    flexDirection: "row",
    // backgroundColor: 'lightgray',
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  tabItem2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // width: 50,
    // height: 100,
    backgroundColor: "#9AEBA3",
    borderRadius: 25,
  },
  tabText: {
    // fontSize: 16,
    // fontWeight: 'bold',
  },
  row: {
    flexDirection: "row",
    // justifyContent: 'space-between',
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
    width: "50%",
    backgroundColor: "#F0EF6C",
    borderRadius: 10,
  },
});

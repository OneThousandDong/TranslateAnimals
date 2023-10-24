import {StyleSheet, View, Text, Dimensions, Animated} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import useStorageStore from '../store/useStorageStore';
const TimeCount = 10;
const ProgressBar = () => {
  const {width} = Dimensions.get('window');
  const {timeSuggest} = useStorageStore();
  const setTimeSuggest = useStorageStore(state => state.setTimeSuggest);
  const [progress, setProgress] = useState(TimeCount);
  const [timeSg, setTimeSg] = useState(timeSuggest);
  const [timer, setTimer] = useState<number>(TimeCount);
  const [progressQ, setProgressQ] = useState(0);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const animatedValueProgress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (timer == 0) {
      setTimeSuggest(timeSuggest + 1);
      setTimer(10 + 1);
    }
  }, [timer]);

  useEffect(() => {
    const interval = setInterval(startInterval, 1000);
    return () => clearInterval(interval);
  }, []);

  const startInterval = () => {
    setTimer(prv => {
      if (prv === 0) {
        // setTimer(TimeCount);
        setProgress(TimeCount);
        setTimeSg(timeSg + 1);
        return;
      } else {
        setProgress(prv - 1);
        return prv - 1;
      }
    });
  };
  
  const formatSecondToMinutes = (second_num: number) => {
    if (second_num) {
      const minutes = Math.floor(second_num / 60);
      const sec = second_num % 60;
      return `${minutes < 10 ? '0' + minutes : minutes}:${
        sec < 10 ? '0' + sec : sec
      }`;
    } else {
      return '00:00';
    }
  };

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: progress / 10,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [animatedValue, progress]);

  const interpolatedWidth = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
    extrapolate: 'clamp',
  });

  useEffect(() => {
    Animated.timing(animatedValueProgress, {
      toValue: progressQ / 100,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [animatedValueProgress, progressQ]);

  const interpolatedWidthProgress = animatedValueProgress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
    extrapolate: 'clamp',
  });

  return (
    <>
      <View className="mx-2">
        <View className="justify-center items-center">
          <Text>NHMQ</Text>
        </View>
        <View className="justify-center items-center">
          <View style={[styles.container, {width: width / 2.4, height: 12}]}>
            <Animated.View
              style={[styles.progressBar, {width: interpolatedWidthProgress}]}
            />
          </View>
          <View className="absolute">
            <Text>0/100</Text>
          </View>
        </View>
      </View>
      <View className="mx-2">
        <View className="justify-center items-center">
          <Text>Nguyen huu minh quang</Text>
        </View>
        <View className="justify-center items-center">
          <View style={[styles.container, {width: width / 2.4, height: 12}]}>
            <Animated.View
              style={[styles.progressBar, {width: interpolatedWidth}]}
            />
          </View>
          <View className="absolute">
            <Text>{formatSecondToMinutes(timer)}</Text>
          </View>
        </View>
      </View>
    </>
  );
};

export default React.memo(ProgressBar);

const styles = StyleSheet.create({
  progress: {
    width: '50%',
    backgroundColor: '#00AB55',
    borderRadius: 10,
  },
  container: {
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBar: {
    backgroundColor: '#2196F3',
    height: '100%',
  },
});

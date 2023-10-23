import {StyleSheet, View, Text, Dimensions} from 'react-native';
import React, {useState, useEffect} from 'react';
import useStorageStore from '../store/useStorageStore';
import * as Progress from 'react-native-progress';
const TimeCount = 10;
const ProgressBar = () => {
  const {width} = Dimensions.get('window');
  const {timeSuggest} = useStorageStore();
  const setTimeSuggest = useStorageStore(state => state.setTimeSuggest);
  const [progress, setProgress] = useState(TimeCount);
  const [timeSg, setTimeSg] = useState(timeSuggest);
  const [timer, setTimer] = useState<number>(TimeCount);
  const [progressQ, setProgressQ] = useState(0);

  useEffect(() => {
    if (timer == TimeCount) {
      setTimeSuggest(timeSuggest + 1);
    }
  }, [timer]);

  useEffect(() => {
    setInterval(startInterval, 1000);
  }, []);

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

  const startInterval = () => {
    setTimer(prv => {
      if (prv === 0) {
        setTimer(TimeCount);
        setProgress(TimeCount);
        setTimeSg(timeSg + 1);
        return;
      } else {
        setProgress(prv - 1);
        return prv - 1;
      }
    });
  };

  return (
    <>
      <View className="mx-2">
        <View className="justify-center items-center">
          <Text>NHMQ</Text>
        </View>
        <View style={styles.progressBG} className="justify-center items-center">
          <Progress.Bar
            borderRadius={8}
            progress={progressQ}
            width={width / 2.4}
            height={12}
            useNativeDriver={true}
          />
          <View className="absolute">
            <Text>0/100</Text>
          </View>
        </View>
      </View>
      <View className="mx-2">
        <View className="justify-center items-center">
          <Text>Nguyen huu minh quang</Text>
        </View>
        <View style={styles.progressBG} className="justify-center items-center">
          <Progress.Bar
            borderRadius={8}
            progress={progress / 3 / 100}
            width={width / 2.4}
            height={12}
            useNativeDriver={true}
          />
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressBG: {
    width: '90%',
    height: 15,
    backgroundColor: '#C4CDD5',
    marginHorizontal: 10,
    borderRadius: 10,
    justifyContent: 'center',
  },

  progress: {
    width: '50%',
    backgroundColor: '#00AB55',
    borderRadius: 10,
  },
});

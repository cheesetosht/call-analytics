/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {
  BackHandler,
  PermissionsAndroid,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';

import CallLogs from 'react-native-call-log';
import Header from './src/components/header';
import StatCard from './src/components/stat-card';
import useTheme from './src/hooks/useTheme';

const App = () => {
  const {isDarkMode, Foreground, Background, accent} = useTheme();

  const [today_logs, setTodayLogs] = useState([]);
  const [yesterday_logs, setYesterdayLogs] = useState([]);

  const fetchCallLogs = async (minTimestamp: number, maxTimestamp: number) => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
        {
          title: 'Allow access to call logs?',
          message:
            'The app will need permission to access your call logs in order to work',
          buttonPositive: 'Allow',
          buttonNegative: 'Deny',
          buttonNeutral: 'Ask me later',
        },
      );

      if (!granted) {
        ToastAndroid.show('Call log permission denied', ToastAndroid.SHORT);
        return BackHandler.exitApp();
      }

      if (granted) {
        const filter = {
          // types: ['INCOMING', 'OUTGOING', 'MISSED'],
          minTimestamp,
          maxTimestamp,
        };

        const logs = await CallLogs.load(-1, filter);

        return logs;
      }
    } catch (err) {
      ToastAndroid.show('An error occured', ToastAndroid.SHORT);
    }
  };

  const getToday = () => {
    const start = new Date();
    start.setHours(6, 0, 0, 0);

    const end = new Date();
    end.setDate(start.getDate() + 1);
    end.setHours(6, 0, 0, 0);

    return [start.getTime(), end.getTime()];
  };
  const getYesterday = () => {
    const start = new Date();
    start.setDate(start.getDate() - 1);
    start.setHours(6, 0, 0, 0);

    const end = new Date();
    end.setHours(6, 0, 0, 0);

    return [start.getTime(), end.getTime()];
  };

  useEffect(() => {
    // console.log('<START>', start.toDateString(), start.toTimeString());
    // console.log('<END>', end.toDateString(), end.toTimeString());

    fetchCallLogs(getToday()[0], getToday()[1]).then(r => setTodayLogs(r));
    fetchCallLogs(getYesterday()[0], getYesterday()[1]).then(r =>
      setYesterdayLogs(r),
    );
  }, []);

  const getData = (logs: any) => [
    {
      label: 'minutes',
      value: (logs.reduce((p: any, c: any) => p + c.duration, 0) / 60).toFixed(
        2,
      ),
    },
    {
      label: 'calls',
      value: logs.length,
    },
  ];

  return (
    <SafeAreaView style={{backgroundColor: Background[100], flex: 1}}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={accent}
      />
      <Header />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{
          padding: 12,
        }}>
        <Text
          style={{
            fontSize: 14,
            fontWeight: '600',
            color: Foreground[200],
          }}>
          Today
        </Text>
        <View
          style={{
            flexDirection: 'row',
            flex: 2,
            width: '100%',
            paddingVertical: 12,
          }}>
          {getData(today_logs).map((itr, i) => (
            <View
              key={i}
              style={[
                i % 2 !== 0 ? {paddingEnd: 8} : null,
                {
                  paddingStart: i % 2 === 0 ? 0 : 8,
                  paddingEnd: i % 2 === 0 ? 8 : 0,
                  flexBasis: '50%',
                },
              ]}>
              <StatCard key={i} {...itr} />
            </View>
          ))}
        </View>
        <Text
          style={{
            fontSize: 14,
            fontWeight: '600',
            color: Foreground[200],
          }}>
          Yesterday
        </Text>
        <View
          style={{
            flexDirection: 'row',
            flex: 2,
            width: '100%',
            paddingVertical: 12,
          }}>
          {getData(yesterday_logs).map((itr, i) => (
            <View
              key={i}
              style={[
                i % 2 !== 0 ? {paddingEnd: 8} : null,
                {
                  paddingStart: i % 2 === 0 ? 0 : 8,
                  paddingEnd: i % 2 === 0 ? 8 : 0,
                  flexBasis: '50%',
                },
              ]}>
              <StatCard key={i} {...itr} />
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;

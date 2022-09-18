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
import StatCard from './src/components/stat-card';
import useTheme from './src/hooks/useTheme';

const App = () => {
  const {isDarkMode, foreground, background} = useTheme();

  const [call_logs, setCallLogs] = useState([]);

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
        CallLogs.load(-1, filter).then((c: any) => setCallLogs(c));
      }
    } catch (err) {
      ToastAndroid.show('An error occured', ToastAndroid.SHORT);
    }
  };

  useEffect(() => {
    const start = new Date();
    start.setHours(6, 0, 0, 0);

    const end = new Date();
    end.setDate(start.getDate() + 1);
    end.setHours(6, 0, 0, 0);

    // console.log('<START>', start.toDateString(), start.toTimeString());
    // console.log('<END>', end.toDateString(), end.toTimeString());

    fetchCallLogs(start.getTime(), end.getTime());
  }, []);

  const data = [
    {
      label: 'minutes',
      value: (call_logs.reduce((p, c: any) => p + c.duration, 0) / 60).toFixed(
        2,
      ),
    },
    {
      label: 'calls',
      value: call_logs.length,
    },
  ];

  return (
    <SafeAreaView style={{backgroundColor: background[100], flex: 1}}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={background[200]}
      />
      {/* ----- Header ----- */}
      <View
        style={{
          backgroundColor: background[200],
          padding: 16,
        }}>
        <Text
          style={{
            color: foreground[100],
            fontWeight: '700',
            fontSize: 24,
          }}>
          Call Analyzer
        </Text>
      </View>
      {/* ----- Body ----- */}
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{
          padding: 12,
        }}>
        <Text style={{fontSize: 18, fontWeight: '600', color: foreground[100]}}>
          Today
        </Text>
        <View
          style={{
            flexDirection: 'row',
            flex: 2,
            width: '100%',
            paddingVertical: 12,
          }}>
          {data.map((itr, i) => (
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

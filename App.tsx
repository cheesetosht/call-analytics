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
  PermissionsAndroid,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import CallLogs from 'react-native-call-log';
import StatCard from './src/components/stat-card';
import useTheme from './src/hooks/useTheme';

const App = () => {
  const {isDarkMode, foreground, background} = useTheme();

  const [call_logs, setCallLogs] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
          {
            title: 'Call Log Example',
            message: 'Access your call logs',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          const filter = {
            maxTimestamp: new Date().getTime(),
            minTimestamp: new Date().getTime() - 24 * 60 * 60 * 1000,
            // types: ['INCOMING', 'OUTGOING', 'MISSED'],
          };
          CallLogs.load(-1, filter).then((c: any) => setCallLogs(c));
        } else {
          console.log('Call Log permission denied');
        }
      } catch (e) {
        console.log(e);
      }
    })();
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
          Last 24 hours{' '}
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

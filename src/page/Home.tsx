import React from 'react';
import {Button, Text, View} from 'react-native';
import {ApiClient} from '../api/ApiClient.ts';

export function Home() {
  const [testMessage, setTestMessage] = React.useState<string>('');
  const apiTest = async (appId: string): Promise<void> => {
    console.log(`apiTest: ${appId}`);
    const ret = await ApiClient.requestGet(`/app/${appId}`);
    setTestMessage(ret.message);
  };

  return (
    <View>
      <Button
        title="버튼"
        onPress={() => {
          apiTest('테스트');
        }}
      />
      <Text>{testMessage}</Text>
    </View>
  );
}

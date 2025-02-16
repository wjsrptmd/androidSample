import React from 'react';
import {SafeAreaView} from 'react-native';
import {Home} from './src/page/Home.tsx';

function App(): React.JSX.Element {
  return (
    <SafeAreaView>
      <Home />
    </SafeAreaView>
  );
}

export default App;

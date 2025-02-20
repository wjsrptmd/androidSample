import React, {JSX, useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {ApiClient} from '../api/ApiClient.ts';
import {UIComponent} from "../model/UiComponent.ts";

// 컴포넌트 매핑 객체
const componentMap: {[key: string]: React.FC<any>} = {
  View: ({children, style}): JSX.Element => (
    <View style={style}>{children}</View>
  ),
  Text: ({value, style}): JSX.Element => <Text style={style}>{value}</Text>,
  Button: ({text, action}): JSX.Element => (
    <Button title={text} onPress={() => handleAction(action)} />
  ),
};

const handleAction = (action: string) => {
  if (action === 'handleClick') {
    Alert.alert('Button Clicked!');
  }
};

const renderComponent = (ui: UIComponent): JSX.Element | null => {
  console.log(ui);
  const Component: React.FC<any> | null = componentMap[ui.component];
  if (!Component) {
    return null;
  }

  const children = ui.children?.map((child, index) => (
    <React.Fragment key={index}>{renderComponent(child)}</React.Fragment>
  ));

  return <Component {...ui.props}>{children}</Component>;
};

// Server-Driven UI 메인 컴포넌트
export const ServerDrivenUI: React.FC = () => {
  const [uiConfig, setUiConfig] = useState<UIComponent | null>(null);
  const [loading, setLoading] = useState(true);

  const initUi = async (appId: string) => {
    const ret: UIComponent = await ApiClient.requestGet(`/app/ui/${appId}`);
    setUiConfig(ret);
    setLoading(false);
  };

  useEffect(() => {
    initUi('안녕하세요. 감사해요. 잘있어요. 다시만나요!.');
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }
  if (!uiConfig) {
    return <Text>Failed to load UI</Text>;
  }

  return renderComponent(uiConfig);
};

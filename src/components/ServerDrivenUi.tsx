import React, {JSX, useCallback, useEffect, useState} from 'react';
import {FunctionMap} from '@app_model/model/Common.ts';
import {AppModel} from '@app_model/model/AppModel.ts';
import {ActivityIndicator} from 'react-native';
import {ApiClient} from '@api/ApiClient.ts';
import {Renderer} from "@components/Renderer.tsx";

// Server-Driven UI 메인 컴포넌트
export const ServerDrivenUI: React.FC = () => {
  const [uiCmp, setUiCmp] = useState<JSX.Element | null>(null);
  const [loading, setLoading] = useState(true);

  const testFunc = () => {
    console.log('테스트 입니다. !!!!');
  };

  const funcMap: FunctionMap = {};
  funcMap.testFunc = {
    func: testFunc,
    args: [],
  };

  const initUi = async (appId: number) => {
    const ret: AppModel = await ApiClient.requestGet(`/app/${appId}`);
    console.log(ret);

    if (ret.error) {
      // throw ret.error;
    } else {
      const component: React.JSX.Element = (
        <Renderer appModel={ret} funcMap={funcMap} valueMap={{}} />
      );
      setUiCmp(component);
    }
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    initUi(1);
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return uiCmp;
};

import React from 'react';
import {AppToolBarCmp} from '@components/AppToolBarCmp.tsx';
import {AppModel} from '@app_model/model/AppModel.ts';
import {View} from 'react-native';
import {ValueMap, FunctionMap} from '@app_model/model/Common.ts';

export interface RenderProps {
  appModel: AppModel;
  valueMap: ValueMap;
  funcMap: FunctionMap;
}

export const Renderer: React.FC<RenderProps> = (renderProps: RenderProps) => {
  const appModel: AppModel = renderProps.appModel;
  const valueMap: ValueMap = renderProps.valueMap;
  const funcMap: FunctionMap = renderProps.funcMap;

  return (
    <View>{appModel.appToolbar && <AppToolBarCmp appToolbar={appModel.appToolbar} valueMap={valueMap} funcMap={funcMap} />}</View>
  );
};

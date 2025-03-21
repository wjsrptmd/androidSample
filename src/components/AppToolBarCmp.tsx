import React, {JSX} from 'react';
import {AppToolbar, ToolbarItem} from '@app_model/model/AppToolbar.ts';
import {handleAction} from '@app_model/model/Action.ts';
import {ActiveStatus} from '@app_model/model/ActiveStatus.ts';
import {
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
    Button,
    Image,
} from 'react-native';
import {FunctionMap, ValueMap} from '@app_model/model/Common.ts';

const toolbarStyle = StyleSheet.create({
    toolbar: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    left: {
        flex: 1, // 왼쪽 정렬
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    center: {
        flex: 1, // 중앙 정렬
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderStyle: 'solid',
    },
    right: {
        flex: 1, // 오른쪽 정렬
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
});

interface AppToolBarProps {
    appToolbar: AppToolbar;
    valueMap: ValueMap;
    funcMap: FunctionMap;
}

export const AppToolBarCmp: React.FC<AppToolBarProps> = (
    appToolBarProps: AppToolBarProps,
) => {
    const valueMap = appToolBarProps.valueMap;
    const funcMap = appToolBarProps.funcMap;

    const {activeStatus, toolbarItems} = appToolBarProps.appToolbar;
    if (activeStatus === ActiveStatus.inactive) {
        return null;
    }

    const alignValue = (
        position: 'left' | 'center' | 'right',
    ): 'flex-start' | 'flex-end' | 'center' => {
        if (position === 'left') {
            return 'flex-start';
        } else if (position === 'right') {
            return 'flex-end';
        } else {
            return 'center';
        }
    };

    const getComponent = (item: ToolbarItem): JSX.Element | null => {
        const type = item.content.type;
        if (type === 'icon') {
            return (<Image style={{alignSelf: alignValue(item.position)}} src={item.content.value}/>);
        } else if (type === 'text') {
            return (<Text style={{alignSelf: alignValue(item.position)}}> {item.content.value}  </Text>);
        } else {
            return null;
        }
    };

    const component = (item: ToolbarItem, key: number): JSX.Element | null => {
        const cpm = getComponent(item);
        if (!cpm) {
            return null;
        }

        if (item.action) {
            return (<TouchableOpacity key={key} onPress={() => handleAction(item.action, funcMap)}>{cpm}</TouchableOpacity>);
        } else {
            return cpm;
        }
    };

    return (
        <View style={toolbarStyle.toolbar}>
            {toolbarItems?.map((item: ToolbarItem, index: number) => component(item, index),)}
        </View>);
};

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

    const {style, toolbarItems, activeStatus} = appToolBarProps.appToolbar;
    if (activeStatus === ActiveStatus.inactive) {
        return null;
    }

    const leftItems: ToolbarItem[] = toolbarItems ? toolbarItems.filter((item: ToolbarItem) => item.position === 'left') : [];
    const centerItems: ToolbarItem[] = toolbarItems ? toolbarItems.filter((item: ToolbarItem) => item.position === 'center') : [];
    const rightItems: ToolbarItem[] = toolbarItems ? toolbarItems.filter((item: ToolbarItem) => item.position === 'right') : [];

    const getComponent = (item: ToolbarItem): JSX.Element | null => {
        const type = item.content.type;
        if (type === 'icon') {
            return (<Image src={item.content.value} style={item.style} />);
        } else if (type === 'text') {
            return (<Text style={item.style}>{item.content.value}</Text>);
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
        <View style={style}>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start'}}>
                {leftItems?.map((item: ToolbarItem, index: number) => component(item, index),)}
            </View>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                {centerItems?.map((item: ToolbarItem, index: number) => component(item, index),)}
            </View>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
                {rightItems?.map((item: ToolbarItem, index: number) => component(item, index),)}
            </View>
        </View>);
};

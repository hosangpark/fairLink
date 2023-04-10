import React from 'react';
import {View} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { CustomSelectBoxType } from './componentsType';
import { StyleSheet ,Image} from 'react-native';
import { colors, fontStyle } from '../style/style';

export const CustomSelectBox = ({
    strOptionList,
    objOptionList,
    strSetOption,
    objSetOption,
    selOption,
    defaultText,
    style,
    buttonStyle,
    buttonTextStyle,
    rowStyle,
    rowTextStyle
}:CustomSelectBoxType) =>{
    const citiesDropdownRef = React.useRef<any>();
    return(
        <View style={{flexDirection:'row',...style}}>
            {strOptionList &&
                <SelectDropdown
                    ref={citiesDropdownRef}
                    data={strOptionList}
                    onSelect={(selectedItem:string, index) => {
                        if(strSetOption)strSetOption(selectedItem);
                    }}
                    defaultButtonText={defaultText}
                    buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem;
                    }}
                    rowTextForSelection={(item, index) => {
                    return item;
                    }}
                    buttonStyle={buttonStyle}
                    buttonTextStyle={buttonTextStyle}
                    rowStyle={rowStyle}
                    rowTextStyle={rowTextStyle}
                    dropdownIconPosition={'right'}
                    renderDropdownIcon={isOpened => {
                        return <Image source={require('../assets/img/ic_dropdown.png')} style={{width:25, height:20,marginRight:10}} />
                    }}
               />
            }
        </View>
    )
}

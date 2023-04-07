import React from 'react';
import {View} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { CustomSelectBoxType } from './componentsType';
import { StyleSheet ,Image} from 'react-native';
import { colors } from '../style/style';

export const CustomSelectBox = ({
    strOptionList,
    objOptionList,
    strSetOption,
    objSetOption,
    selOption,
}:CustomSelectBoxType) =>{
    const citiesDropdownRef = React.useRef<any>();

    const selectBoxStyle = StyleSheet.create({
        btnStyle : {
            backgroundColor:colors.WHITE_COLOR,
            borderRadius:4,
            borderWidth:1,
            borderColor:colors.BORDER_GRAY_COLOR1,
            flex:1,
            alignItems:'center',
        },
        btnTextStyle : {
            color:colors.FONT_COLOR_BLACK,
            textAlign:'left',
        },
        rowStyle: {backgroundColor:colors.WHITE_COLOR, borderBottomColor:colors.BORDER_GRAY_COLOR},
        rowTextStyle: {color:colors.FONT_COLOR_BLACK, textAlign: 'left'},
    })

    return(
        <View style={{flexDirection:'row'}}>
            {strOptionList &&
                <SelectDropdown
                    ref={citiesDropdownRef}
                    data={strOptionList}
                    onSelect={(selectedItem, index) => {
                    console.log(selectedItem, index);
                    }}
                    defaultButtonText={'Select city'}
                    buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem;
                    }}
                    rowTextForSelection={(item, index) => {
                    return item;
                    }}
                    buttonStyle={selectBoxStyle.btnStyle}
                    buttonTextStyle={selectBoxStyle.btnTextStyle}
                    rowStyle={selectBoxStyle.rowStyle}
                    rowTextStyle={selectBoxStyle.rowTextStyle}
                    dropdownIconPosition={'right'}
                    renderDropdownIcon={isOpened => {
                        return <Image source={require('../assets/img/ic_dropdown.png')} style={{width:25, height:20,marginRight:10}} />
                    }}
               />
            }
        </View>
    )
}

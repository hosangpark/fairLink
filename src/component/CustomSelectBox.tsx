import React from 'react';
import {View,Text} from 'react-native';
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
    type,
    defaultText,
    style,
    buttonStyle,
    buttonTextStyle,
    rowStyle,
    rowTextStyle,
    title,
    essential,
    isDisable,
    labelFooter,
}:CustomSelectBoxType) =>{

    const citiesDropdownRef = React.useRef<any>();
    const [objList, setObjList] = React.useState<string[]>([]);


    React.useEffect(()=>{
        if(objOptionList){
            let tempArray:string[] = [];
            objOptionList.map((item,index) => {
                tempArray.push(item.name);
            });
            setObjList([...tempArray]);
        }
    },[])


    return(
        <View style={{flex:1}}>
            {title &&
                <Text style={[fontStyle.f_semibold,{fontSize:16,color:colors.FONT_COLOR_BLACK,marginBottom:5}]}>{title} <Text style={{color:colors.ORANGE_COLOR}}>{essential && '*'}</Text></Text>
            }
            <View style={{flexDirection:'row',...style}}>
                {strOptionList &&
                    <SelectDropdown
                        ref={citiesDropdownRef}
                        data={strOptionList}
                        onSelect={(selectedItem:string, index) => {
                            if(strSetOption){
                                if(type){
                                    strSetOption(selectedItem,type);
                                }   
                                else{
                                    strSetOption(selectedItem);
                                }
                            }
                        }}
                        defaultButtonText={labelFooter ? defaultText+labelFooter : defaultText}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            if(selOption && selOption !== ''){
                                if(labelFooter){
                                    return String(selOption)+labelFooter;
                                }
                                return String(selOption)
                            }
                            else{
                                if(labelFooter){
                                    return defaultText+labelFooter;
                                }
                                return defaultText;
                            }
                        }}
                        rowTextForSelection={(item, index) => {
                        return item;
                        }}
                        buttonStyle={{...buttonStyle,backgroundColor:isDisable ? colors.BORDER_GRAY_COLOR1 : colors.WHITE_COLOR}}
                        buttonTextStyle={buttonTextStyle}
                        rowStyle={rowStyle}
                        rowTextStyle={rowTextStyle}
                        dropdownIconPosition={'right'}
                        renderDropdownIcon={isOpened => {
                            return <Image source={require('../assets/img/ic_dropdown.png')} style={{width:25, height:20,marginRight:10}} />
                        }}
                        disabled={isDisable}
                    />
                }
                {(objOptionList && objList.length > 0) &&
                    
                    <SelectDropdown
                        ref={citiesDropdownRef}
                        data={objList}
                        onSelect={(objItem:string, index) => {
                            if(objSetOption){
                                let tempIdx = objOptionList?.filter((el)=>el.name === objItem)[0].key;

                                if(tempIdx){
                                    if(type){
                                        objSetOption(tempIdx,type);
                                    }
                                    else{
                                        objSetOption(tempIdx);
                                    }
                                }
                            }
                        }}
                        defaultButtonText={labelFooter ? defaultText+labelFooter : defaultText}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            if(selOption && selOption !== ''){
                                if(labelFooter){
                                    return String(selOption)+labelFooter;
                                }
                                return String(selOption)
                            }
                            else{
                                if(labelFooter){
                                    return String(defaultText)+labelFooter;
                                }
                                return defaultText;
                            }
                        }}
                        rowTextForSelection={(item, index) => {
                        return item;
                        }}
                        buttonStyle={{...buttonStyle,backgroundColor:isDisable ? colors.BORDER_GRAY_COLOR1 : colors.WHITE_COLOR}}
                        buttonTextStyle={buttonTextStyle}
                        rowStyle={rowStyle}
                        rowTextStyle={rowTextStyle}
                        dropdownIconPosition={'right'}
                        renderDropdownIcon={isOpened => {
                            return <Image source={require('../assets/img/ic_dropdown.png')} style={{width:25, height:20,marginRight:10}} />
                        }}
                        disabled={isDisable}
                    />
                }

            </View>
        </View>
    )
}

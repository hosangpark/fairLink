import React from 'react';
import {View,Text} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { CustomSelectBoxType } from './componentsType';
import { StyleSheet ,Image} from 'react-native';
import { colors, fontStyle } from '../style/style';

export const CustomSelectBox = ({
    containerStyle = {flex:1}, // container style
    style, //스타일
    strOptionList, //string 형태 배열
    objOptionList, //object 형태 배열 [{key:...,name:...}...]
    strSetOption, //string 형태 배열 셋팅
    objSetOption, //object 형태 배열 셋팅
    selOption, //선택한 옵션
    type, //object 형태 배열일때 사용. (설정할 state의 객체 key값 - objOption의 key값이 들어감)
    defaultText, //선택하지 않았을때 텍스트
    buttonStyle,
    buttonTextStyle,
    rowStyle,
    rowTextStyle,
    title,//제목
    essential, //필수여부
    isDisable, //selectbox 비활성화 true일때 비활성화
    labelFooter, //name 꼬릿말
    selIndex,
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
        <View style={{...containerStyle}}>
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
                                if(type && (selIndex || selIndex === 0)) { //array로 관리되는 object 변경시 selIndex 사용
                                    strSetOption(selectedItem,type,selIndex)
                                }   
                                else if(type){
                                    strSetOption(selectedItem,type);
                                }
                                else{
                                    strSetOption(selectedItem);
                                }
                            }
                        }}
                        defaultButtonText={(selOption && selOption !== '' &&labelFooter && selOption !== '없음') ? String(selOption)+labelFooter :(selOption && selOption !== '') ? String(selOption) : labelFooter ? defaultText+labelFooter : defaultText}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            if(selOption && selOption !== ''){
                                if(labelFooter && selOption !== '없음'){
                                    return String(selOption)+labelFooter;
                                }
                                return String(selOption)
                            }
                            else{
                                if(labelFooter && defaultText !== '없음'){
                                    return defaultText+labelFooter;
                                }
                                return defaultText;
                            }
                        }}
                        rowTextForSelection={(item, index) => {
                            if(labelFooter && item !== '없음'){
                                return item+labelFooter;
                            }
                            else{
                                return item;
                            }
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
                {(objOptionList) &&
                    
                    <SelectDropdown
                        ref={citiesDropdownRef}
                        data={objList}
                        onSelect={(objItem:string, index) => {
                            if(objSetOption){
                                let tempIdx = objOptionList?.filter((el)=>el.name === objItem)[0].key;

                                if(tempIdx){
                                    if(type){
                                        objSetOption(tempIdx,type);
                                        console.log(tempIdx, type);
                                    }
                                    else{
                                        objSetOption(tempIdx);
                                    }
                                }
                            }
                        }}
                        defaultButtonText={(selOption && selOption !== '' &&labelFooter) ? String(selOption)+labelFooter :(selOption && selOption !== '') ? String(selOption) :labelFooter ? defaultText+labelFooter : defaultText}
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
                            if(labelFooter){
                                return item+labelFooter;
                            }
                            else{
                                return item;
                            }
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

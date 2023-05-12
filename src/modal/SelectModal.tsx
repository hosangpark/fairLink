import React from 'react';

import Modal from 'react-native-modal';
import { Pressable, Text, View } from 'react-native';
import { colors, fontStyle, modalStyle, selectBoxStyle } from '../style/style';
import { CustomButton } from '../component/CustomButton';
import { SelectModalType } from './modalType';
import { CustomSelectBox } from '../component/CustomSelectBox';

export const SelectModal = ({
    show,
    hide,
    action,
    bigTitle,
    smallTitle,
    date,
    strOptList,
    objOptList,
    strSetOption,
    objSetOption,
    defaultText = '',
    btnLabel = '확인',
    style,
    type,
    selOption,
    item,
}:SelectModalType) =>{

    return(
        <Modal 
            animationIn  ={"slideInUp"}
            animationOut ={"slideOutDown"}
            animationInTiming  = {300}
            animationOutTiming = {300}
            isVisible={show}
            useNativeDriver={true}
            style={[{justifyContent:'center',alignItems:'center',flex:1,flexDirection : 'column', zIndex:999999999}]}
            onBackdropPress={hide}
        >
            <View style={[modalStyle.modalWrapper ,modalStyle.loginIntroModal,style]}>
                {item &&
                    <View style={{width:'100%'}}>
                        <Text style={[fontStyle.f_regular,{fontSize:16,color:colors.FONT_COLOR_BLACK2}]}>{item.fulldate}</Text>
                    </View>
                }
                {bigTitle &&
                    <View style={{width:'100%'}}>
                        <Text style={[fontStyle.f_medium,{fontSize:18,color:colors.FONT_COLOR_BLACK}]}>{bigTitle}</Text>
                    </View>
                }
                {smallTitle &&
                    <View>
                        <Text>{smallTitle}</Text>
                    </View>
                }
                <View style={{flexDirection:'row'}}>
                    {objOptList &&
                        <CustomSelectBox
                            style={{marginTop:20}}
                            defaultText='선택하세요.'
                            objOptionList={objOptList}
                            objSetOption={objOptList && objSetOption}
                            type={type}
                            buttonStyle={selectBoxStyle.btnStyle}
                            buttonTextStyle={selectBoxStyle.btnTextStyle}
                            rowStyle={selectBoxStyle.rowStyle}
                            rowTextStyle={selectBoxStyle.rowTextStyle}
                            selOption={selOption}
                        />
                    }
                    {strOptList &&
                        <CustomSelectBox
                            style={{marginTop:20}}
                            defaultText='선택하세요.'
                            type={type}
                            strOptionList={strOptList}
                            strSetOption={strOptList && strSetOption}
                            buttonStyle={selectBoxStyle.btnStyle}
                            buttonTextStyle={selectBoxStyle.btnTextStyle}
                            rowStyle={selectBoxStyle.rowStyle}
                            rowTextStyle={selectBoxStyle.rowTextStyle}
                            selOption={selOption}
                        />
                    }
                </View>
            <CustomButton
                style={{marginTop:20}}
                action={action}
                label={btnLabel}
            />
            </View>
            
        </Modal>
    )
}
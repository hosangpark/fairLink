import React from 'react';

import Modal from 'react-native-modal';
import { Pressable, Text, View } from 'react-native';
import { colors, fontStyle, modalStyle } from '../style/style';
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
        >
            <Pressable style={{
                width:'100%',
                height:'100%',
                justifyContent:'center',
                alignItems:'center',
                backgroundColor:'transparent',
                // backgroundColor:'black',

                }}
                onPress={hide}
            >
                <View style={[modalStyle.loginIntroModal]}>
                    {date &&
                        <View>
                            <Text>{date}</Text>
                        </View>
                    }
                    {bigTitle &&
                        <View>
                            <Text>{bigTitle}</Text>
                        </View>
                    }
                    {smallTitle &&
                        <View>
                            <Text>{smallTitle}</Text>
                        </View>
                    }

                    <CustomSelectBox 
                        defaultText='선택하세요.'
                        objOptionList={objOptList}
                        objSetOption={objOptList && objSetOption}
                        strOptionList={strOptList}
                        strSetOption={strOptList && strSetOption}

                    />
                </View>
            </Pressable>
        </Modal>
    )
}
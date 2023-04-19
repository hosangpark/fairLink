import React from 'react';

import {View} from 'react-native';
import { CustomInputTextBox } from '../../../component/CustomInputTextBox';
import { colors, fontStyle } from '../../../style/style';
import { CustomButton } from '../../../component/CustomButton';
import { initialAlert } from '../../../modal/AlertModal';
import { AlertModal } from '../../../modal/AlertModal';
import { ErectionInputInfoType } from '../../screenType';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouterNavigatorParams } from '../../../../type/routerType';


export const ErectionInputInfo = ({
    memberType
}:ErectionInputInfoType) => {

    const navigation = useNavigation<StackNavigationProp<RouterNavigatorParams>>();
    const [alertModal, setAlertModal] = React.useState(()=>initialAlert);

    const alertModalOn = (msg : string, type? : string, strongMsg? : string) => {
        setAlertModal({
            alert:true,
            msg:msg,
            type:type ? type : '',
            strongMsg:strongMsg ? strongMsg : '',
        })
    }

    const alertModalOff = () => {
        setAlertModal(()=>initialAlert);
    }

    const [inputInfo , setInputInfo] = React.useState({
        emp_name : '',
        position : '',
        mb_name : '',
        emp_number : '',
    })

    const inputInfoHandler = (text : string, key? : string) => {
        if(key){
            setInputInfo({
                ...inputInfo,
                [key] : text,
            })
        }
    }

    const saveInfoHandler = () => {
        // if(inputInfo.emp_name === '' || inputInfo.position === '' || inputInfo.mb_name === '' || inputInfo.emp_number === ''){
        //     alertModalOn('필수항목을 모두 입력하세요.');
        // }
        // else{
            navigation.navigate('RegDocument',{memberType:memberType})
        // }
    }

    return(
        <View>
            <CustomInputTextBox
                containerStyle={{marginTop:20}}
                action={()=>{}}
                button=''
                editable={true}
                placeholder='회사명을 입력해주세요.'
                placeholderTextColor={colors.GRAY_COLOR}
                input={inputInfo.emp_name}
                setInput={inputInfoHandler}
                type={'emp_name'}
                title={'회사명'}
                essential
            />
            <CustomInputTextBox
                containerStyle={{marginTop:20}}
                action={()=>{}}
                button=''
                editable={true}
                placeholder='직책을 입력해주세요.'
                placeholderTextColor={colors.GRAY_COLOR}
                input={inputInfo.position}
                setInput={inputInfoHandler}
                type={'position'}
                title={'직책'}
                essential
            />
            <CustomInputTextBox
                containerStyle={{marginTop:20}}
                action={()=>{}}
                button=''
                editable={true}
                placeholder='대표자명을 입력해주세요.'
                placeholderTextColor={colors.GRAY_COLOR}
                input={inputInfo.mb_name}
                setInput={inputInfoHandler}
                type={'mb_name'}
                title={'회사명'}

                essential
            />
            <CustomInputTextBox
                containerStyle={{marginTop:20}}
                action={()=>{}}
                button=''
                editable={true}
                placeholder='사업자등록번호를 입력해주세요.'
                placeholderTextColor={colors.GRAY_COLOR}
                input={inputInfo.emp_number}
                setInput={inputInfoHandler}
                type={'emp_number'}
                title={'사업자등록번호'}
                essential
                inputType={'number-pad'}
            />

            <CustomButton 
                action={saveInfoHandler}
                label='저장 후 필수서류 등록'
                style={{marginTop:30}}
                labelStyle={{...fontStyle.f_semibold}}
            />

            <AlertModal 
                show={alertModal.alert}
                msg={alertModal.msg}
                type={alertModal.type}
                hide={alertModalOff}
                action={()=>{}}
                btnLabel='확인'
            />
        </View>
    )
}
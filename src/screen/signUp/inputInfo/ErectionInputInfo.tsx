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
import { KakaoProfile, getProfile } from '@react-native-seoul/kakao-login';
import CheckBox from '@react-native-community/checkbox';
import messaging from '@react-native-firebase/messaging';
import { usePostMutation } from '../../../util/reactQuery';
import { useAppDispatch } from '../../../redux/store';
import { toggleLoading } from '../../../redux/actions/LoadingAction';
import { checkCompanyNumber } from '../../../util/func';


export const ErectionInputInfo = ({
    sns_id,
    memberType
}:ErectionInputInfoType) => {

    const dispatch = useAppDispatch();
    const navigation = useNavigation<StackNavigationProp<RouterNavigatorParams>>();
    const [alertModal, setAlertModal] = React.useState(()=>initialAlert);

    

    const signupErecMutation = usePostMutation('signupErec','member/signup1.php');

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
        mct_company : '',
        mct_position : '',
        mct_ceo : '',
        mct_busi_num : '',
    })

    const inputInfoHandler = (text : string, key? : string) => {
        if(key){
            setInputInfo({
                ...inputInfo,
                [key] : text,
            })
        }
    }

    const saveInfoHandler = async () => {
        
        if(inputInfo.mct_company === '' || inputInfo.mct_position === '' || inputInfo.mct_ceo === '' || inputInfo.mct_busi_num === ''){
            alertModalOn('필수항목을 모두 입력하세요.');
        }
        else if(!checkCompanyNumber(inputInfo.mct_busi_num)){
            alertModalOn(`올바른 사업자등록번호를 입력해주세요.\nex) 123-12-12345`);
        }
        // else 
        else{
            dispatch(toggleLoading(true));
            const pushToken = await messaging().getToken();
            const profile: any = await getProfile();

            const erecSignUpParams = {
                mt_id : profile.email === 'null' ? 'aaa@aaa.com' : profile.email,
                sns_id : sns_id,
                app_token : pushToken,
                sql_check : 'N',
                mt_type : '1',
                mt_name : profile.nickname === 'null' ? 'name' : profile.nickname,
                mt_birth : profile.birthyear === 'null' || profile.birthday === 'null' ? '1998-01-06' : profile.birthyaer+'-'+profile.birthday,
                // mt_gender : 'M'
                mt_hp : profile.phoneNumber === 'null' ? '010-9793-9181' : profile.phoneNumber,
                mct_company : inputInfo.mct_company,
                mct_position : inputInfo.mct_position,
                mct_ceo : inputInfo.mct_ceo,
                mct_busi_num : inputInfo.mct_busi_num,
            }

            const {data,msg,result} = await signupErecMutation.mutateAsync(erecSignUpParams);
            console.log(result,msg);
            console.log(data);

            if(result === 'true'){
                navigation.replace('RegDocument',{
                    fileCheck:data.data.file_check,
                    memberType:memberType,
                    mt_idx:data.data.mt_idx,
                    mt_id : sns_id,
                });
            }
            else{
                alertModalOn(msg,'');
            }
            dispatch(toggleLoading(false));
        }
        // else{
            // navigation.navigate('RegDocument',{memberType:memberType})
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
                input={inputInfo.mct_company}
                setInput={inputInfoHandler}
                type={'mct_company'}
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
                input={inputInfo.mct_position}
                setInput={inputInfoHandler}
                type={'mct_position'}
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
                input={inputInfo.mct_ceo}
                setInput={inputInfoHandler}
                type={'mct_ceo'}
                title={'대표자명'}

                essential
            />
            <CustomInputTextBox
                containerStyle={{marginTop:20}}
                action={()=>{}}
                button=''
                editable={true}
                placeholder='ex) 123-12-12345'
                placeholderTextColor={colors.GRAY_COLOR}
                input={inputInfo.mct_busi_num}
                setInput={inputInfoHandler}
                type={'mct_busi_num'}
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
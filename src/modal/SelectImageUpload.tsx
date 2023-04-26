import React from 'react';
import { AlertModalType, SelectImageUploadType } from './modalType';
import { launchImageLibrary, launchCamera } from "react-native-image-picker";
import Modal from 'react-native-modal';
import { Platform, Pressable, Text, View,TouchableOpacity,PermissionsAndroid } from 'react-native';
import { colors, fontStyle, modalStyle, styles } from '../style/style';
import { CustomButton } from '../component/CustomButton';
import { MarginCom } from '../component/MarginCom';
import { PERMISSIONS, request,check, RESULTS,openSettings } from 'react-native-permissions';
import { AlertModal, initialAlert } from './AlertModal';
export const initialFileType = {
    name : '',
    type : '',
    uri : '',
    size : 0,
}

export const SelectImageUpload = ({ //서류 업로드 (카메라, 갤러리 선택 modal)
    show,
    hide,
    setImage,
}:SelectImageUploadType) => {

    const imagePickerOption = {
        mediaType: "photo",
        maxWidth: 768,
        maxHeight: 768,
        includeBase64: Platform.OS === "android",
    };

    const [alertModal, setAlertModal] = React.useState(()=>initialAlert);

    const alertModalOn = (msg:string, type:string) => {
        setAlertModal({
            alert:true,
            msg:msg,
            type : type,
            strongMsg:'',
        })
    }
    const alertModalOff = () => {
        setAlertModal(()=>initialAlert);
    }
    const alertAction = () => {
        if(alertModal.type === 'android_denied'){
            openSettings();
        }
        else if(alertModal.type === 'ios_denied'){
            requestCameraPermission();
        }
        else if(alertModal.type === 'ios_blocked'){
            openSettings();
        }
    }
    

    const onPickImage = (res:any) => { //이미지 선택후 처리
        if(res.didCancle || !res){
            return;
        }
        if(res.assets?.length > 0){
            setImage(res.assets[0]);
            hide();
        }
    }
    const onLaunchCamera = async() => {
        try {
            if(Platform.OS === 'android'){
                const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: '카메라 권한 요청',
                    message: '카메라 권한이 필요합니다.',
                    buttonNeutral: '나중에 다시 묻지 않음',
                    buttonNegative: '취소',
                    buttonPositive: '확인',
                },
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    launchCamera(imagePickerOption, onPickImage);
                } else {
                alertModalOn(`카메라를 사용하기 위한 권한이 거부되어있습니다. \n 권한을 허용해주세요.`,'android_denied');
                }
            }
            else{ //ios 권한 요청
                const result = await check(PERMISSIONS.IOS.CAMERA);
                switch (result) {
                case 'granted': //ios 권한 허용
                    launchCamera(imagePickerOption, onPickImage);
                    break;
                case 'denied': //카메라 거부
                    alertModalOn(`카메라를 사용하기 위한 권한이 거부되어있습니다. \n 권한을 허용해주세요.`,'ios_denied');
                    break;
                case 'blocked': //카메라 차단
                    alertModalOn(`카메라를 사용하기 위한 권한이 거부되어있습니다. \n 권한을 허용해주세요.`,'ios_blocked');

                    break;
                default:
                    break;
                }
            }
          } catch (err) {
            console.warn(err);
          }
      };

    const requestCameraPermission = async () => { //ios 카메라 권한 요청
        try {
            const result = await request(PERMISSIONS.IOS.CAMERA);
            if (result === 'granted') {
                launchCamera(imagePickerOption, onPickImage);
            } else {
                alertModalOn(`카메라 권한이 거부되었습니다. \n 카메라 권한이 필요합니다.`,'ios_blocked');
            }
        } catch (error) {
            console.error(error);
        }
    };


    const onLaunchImageLibrary = () => { //갤러리 실행
        launchImageLibrary(imagePickerOption, onPickImage);
    };
    

    return(
        <Modal 
            animationIn  ={"slideInUp"}
            animationOut ={"slideOutDown"}
            animationInTiming  = {300}
            animationOutTiming = {300}
            isVisible={show}
            useNativeDriver={true}
            onBackButtonPress={hide}
            style={[{margin:0,justifyContent:'center',alignItems:'center',flex:1,flexDirection : 'column', zIndex:999999999,backgroundColor:'transparent'}]}
        >   
            <Pressable style={[{backgroundColor:'transparent',height:'100%',width:'100%'}]} onPress={hide}>
            </Pressable>
            <View style={{position:'absolute',bottom:0,left:0,backgroundColor:colors.WHITE_COLOR,width:'100%',paddingVertical:30, paddingHorizontal:20,borderTopLeftRadius:12,borderTopRightRadius:12}}>
                <TouchableOpacity onPress={onLaunchCamera}>
                    <Text style={[fontStyle.f_semibold,{fontSize:18,color:colors.FONT_COLOR_BLACK}]}>카메라로 촬영하기</Text>
                </TouchableOpacity>
                <MarginCom mt={20} mb={20} isBorder isBorderDeep />
                <TouchableOpacity onPress={onLaunchImageLibrary}>
                    <Text style={[fontStyle.f_semibold,{fontSize:18,color:colors.FONT_COLOR_BLACK}]}>사진 선택하기</Text>
                </TouchableOpacity>
            </View>
            <AlertModal 
                show={alertModal.alert}
                msg={alertModal.msg}
                hide={alertModalOff}
                action={alertAction}
            />
        </Modal>
    )
}
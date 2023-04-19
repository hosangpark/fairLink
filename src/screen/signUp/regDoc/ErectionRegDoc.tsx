import React from 'react';
import {View ,Text, TouchableOpacity,ImageBackground,Image, Platform} from 'react-native';

import { colors, fontStyle, styles } from '../../../style/style';
import { CustomButton } from '../../../component/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouterNavigatorParams } from '../../../../type/routerType';
import { AlertModal, initialAlert } from '../../../modal/AlertModal';
import { SelImageType } from '../../screenType';
import { SelectImageUpload, initialFileType } from '../../../modal/SelectImageUpload';



export const ErectionRegDoc = ({memberType}:{memberType:number}) => {

    const navigation = useNavigation<StackNavigationProp<RouterNavigatorParams>>();
    const [busRegImage,setBusRegImage] = React.useState<SelImageType>(()=>initialFileType);

    const [alertModal, setAlertModal] = React.useState({
        ...initialAlert,
        title : '',
    })
    const [cameraModal, setCameraModal] = React.useState(false);

    const alertModalOff= () => {
        setAlertModal({
            ...initialAlert,
            title : '',
        })
    };

    const alertModalOn = (msg:string, type? : string, strongMsg? : string, title? : string) => {
        setAlertModal({
            alert:true,
            msg:msg,
            type : type ? type : '',
            strongMsg : strongMsg ? strongMsg : '',
            title : title ? title : '',
        })
    }

    const alertAction = () => {
        if(alertModal.type === 'delete_confirm'){
            setBusRegImage(()=>initialFileType)
        }
    }

    const uploadImage = async (image : SelImageType) => {
        setBusRegImage(image);
    }

    
    

    return(
       <View style={[styles.white_box_con]}>
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                <Text style={[fontStyle.f_semibold,{fontSize:20,color:colors.FONT_COLOR_BLACK}]}>서류 업로드</Text>
                <Text style={[fontStyle.f_regular,{fontSize:15,color:colors.FONT_COLOR_BLACK}]}><Text style={{color:colors.ORANGE_COLOR}}>*</Text> 필수항목</Text>
            </View>
            <View style={{marginTop:20}}>
                <Text style={[fontStyle.f_semibold,{fontSize:16,color:colors.FONT_COLOR_BLACK,marginBottom:10}]}>사업자등록증 <Text style={{color:colors.ORANGE_COLOR}}>*</Text></Text>
                <TouchableOpacity style={{ marginRight: 8, width: 100, height: 100 }} onPress={()=>{setCameraModal(true)}}>
                    <ImageBackground
                    style={{ flex: 1,backgroundColor:colors.BACKGROUND_COLOR_GRAY1,borderRadius:5,justifyContent:'center',alignItems:'center',borderWidth:busRegImage.uri === ''? 0:1,borderColor:colors.BORDER_GRAY_COLOR }}
                    source={{uri:busRegImage.uri}}
                    resizeMode="cover"
                    imageStyle={{ borderRadius: 10 }}>
                        {busRegImage.uri === '' &&
                            <Image 
                                style={{ width: 15, height: 15}}
                                source={require('../../../assets/img/ic_add.png')}
                            />
                        }
                        {busRegImage.uri !== '' &&
                            <TouchableOpacity
                                style={{ position:'absolute', right: 10, top: 10 }}
                                onPress={() =>{alertModalOn('파일을 삭제하시겠습니까?','delete_confirm','','사업자등록증')}}>
                                <Image
                                style={{ width: 25, height: 25 }}
                                source={require('../../../assets/img/ic_modify.png')}
                                />
                            </TouchableOpacity>
                        }
                    </ImageBackground>
                </TouchableOpacity>
            </View>
            <CustomButton
                style={{marginTop:30}} 
                action={()=>{navigation.replace('Main')}}
                label={'회원가입 완료'}
            />

            <AlertModal 
                show={alertModal.alert}
                hide={alertModalOff}
                msg={alertModal.msg}
                title={alertModal.title}
                action={alertAction}
                btnLabel='삭제하기'
                type={alertModal.type}
            />
            <SelectImageUpload 
                show={cameraModal}
                hide={()=>{setCameraModal(false);}}
                setImage={uploadImage}
            />
       </View> 
    )
}
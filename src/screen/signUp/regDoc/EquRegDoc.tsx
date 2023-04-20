import React from 'react';
import {View ,Text, TouchableOpacity,ImageBackground,Image, Platform} from 'react-native';

import { colors, fontStyle, styles } from '../../../style/style';
import { launchImageLibrary, launchCamera } from "react-native-image-picker";
import { NumberObejctType } from '../../../component/componentsType';
import { equUploadList } from '../../../component/utils/list';
import { SelImageType } from '../../screenType';
import { AlertModal, initialAlert } from '../../../modal/AlertModal';
import { SelectImageUpload } from '../../../modal/SelectImageUpload';


type EquRegDocType = {
    memberType : number,
    mt_idx:number,
    fileCheck : NumberObejctType,
}

export const EquRegDoc = ({memberType,fileCheck,mt_idx}:EquRegDocType) => { //조종사, 조종사 서류 받기

    const [uploadList, setUploadList] = React.useState([]);

    const [alertModal, setAlertModal] = React.useState({
        ...initialAlert,
        title : '',
        btnLabel : '',
    })
    const [selImage, setSelImage] = React.useState('');

    const [cameraModal, setCameraModal] = React.useState(false);

    const alertModalOff= () => {
        setAlertModal({
            ...initialAlert,
            title : '',
            btnLabel : '',
        })
    };

    const alertModalOn = (msg:string,btnLabel : string, type? : string, strongMsg? : string, title? : string) => {
        setAlertModal({
            alert:true,
            msg:msg,
            type : type ? type : '',
            strongMsg : strongMsg ? strongMsg : '',
            title : title ? title : '',
            btnLabel : btnLabel,
        })
    }

    const alertAction = () => {
        if(alertModal.type === 'delete_confirm'){
            // setBusRegImage(()=>initialFileType)
        }
        else if(alertModal.type === 'upload_success'){
            // navigation.replace('Main');
        }
    }

    const uploadImage = async (image : SelImageType) => {
        const tempArray = [];
        const tempObj = {
            ...image,
            key : selImage,
        }

        console.log(tempObj);
        setUploadList

        setSelImage('');
    }


    return(
       <View style={[styles.white_box_con]}>
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                <Text style={[fontStyle.f_semibold,{fontSize:20,color:colors.FONT_COLOR_BLACK}]}>서류 업로드{memberType === 1 && '(장비 관련)'}</Text>
                <Text style={[fontStyle.f_regular,{fontSize:15,color:colors.FONT_COLOR_BLACK}]}><Text style={{color:colors.ORANGE_COLOR}}>*</Text> 필수항목</Text>
            </View>

            
            {equUploadList.map((item,index) => {
                return(
                    <>
                        {Object.values(fileCheck)[index] === 'Y' &&
                            <View style={{marginTop:10}}>
                                <Text style={[fontStyle.f_semibold,{fontSize:16,color:colors.FONT_COLOR_BLACK,marginBottom:10}]}>{item.name}</Text>
                                {/* <Text style={[fontStyle.f_regular,{fontSize:14,color:colors.MAIN_COLOR,marginBottom:10}]}>건설기계 대금 200만원 이상인 경우 의무가입 대상입니다. */}
                                {/* </Text> */}
                                <TouchableOpacity style={{ marginRight: 8, width: 100, height: 100 }} onPress={()=>{setCameraModal(true); setSelImage(String(index+1))}}>
                                    <ImageBackground
                                    style={{ flex: 1,backgroundColor:colors.BACKGROUND_COLOR_GRAY1,borderRadius:5,justifyContent:'center',alignItems:'center',borderWidth:undefined? 0:1,borderColor:colors.BORDER_GRAY_COLOR }}
                                    source={undefined}
                                    resizeMode="cover"
                                    imageStyle={{ borderRadius: 10 }}>
                                        <Image 
                                        style={{ width: 15, height: 15}}
                                        source={require('../../../assets/img/ic_add.png')}
                                        />
                                        <TouchableOpacity
                                            style={{ position:'absolute', right: 10, top: 10 }}
                                            onPress={() =>{}}>
                                            <Image
                                            style={{ width: 25, height: 25 }}
                                            source={require('../../../assets/img/ic_modify.png')}
                                            />
                                        </TouchableOpacity>
                                    </ImageBackground>
                                </TouchableOpacity>
                            </View>
                        }
                    </>
                )
            })}
            <AlertModal 
                show={alertModal.alert}
                hide={alertModalOff}
                msg={alertModal.msg}
                title={alertModal.title}
                action={alertAction}
                btnLabel={alertModal.btnLabel}
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
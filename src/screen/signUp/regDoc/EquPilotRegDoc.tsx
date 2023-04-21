import React from 'react';
import {View ,Text, TouchableOpacity,ImageBackground,Image, Platform} from 'react-native';

import { colors, fontStyle, styles } from '../../../style/style';
import { launchImageLibrary, launchCamera } from "react-native-image-picker";
import { NumberObejctType } from '../../../component/componentsType';
import { equUploadList, pilotUploadList } from '../../../component/utils/list';
import { SelImageType } from '../../screenType';
import { AlertModal, initialAlert } from '../../../modal/AlertModal';
import { SelectImageUpload } from '../../../modal/SelectImageUpload';
import { baseUrl, debugKey, usePostMutation } from '../../../util/reactQuery';
import { CustomButton } from '../../../component/CustomButton';
import { useAppDispatch } from '../../../redux/store';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouterNavigatorParams } from '../../../../type/routerType';


type EquPilotRegDocType = {
    memberType : number,
    mt_idx:number,
    fileCheck : NumberObejctType,
}

type tempUploadImageType = {
    name : string
    type : string,
    tmp_name : string,
    size : number,
    key : string,
}

export const EquPilotRegDoc = ({memberType,fileCheck,mt_idx}:EquPilotRegDocType) => { //장비업체, 조종사 서류 받기

    console.log(memberType);

    const dispatch = useAppDispatch();
    const reqFileList = memberType === 1 ? equUploadList : pilotUploadList;
    const navigation = useNavigation<StackNavigationProp<RouterNavigatorParams>>();
    const uploadEquDocMutation = usePostMutation('uploadErecDoc',memberType === 1 ? 'member/signup2_file.php' : 'member/signup4_file.php' ,true);

    const [uploadList, setUploadList] = React.useState<tempUploadImageType[]>([]);

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
            deleteImage(String(selImage));
            
        }
        else if(alertModal.type === 'upload_success'){
            navigation.replace('Main');
        }
    }

    const uploadImage = async (image : SelImageType) => {
        console.log(image);
        const tempArray = [...uploadList];
        const tempObj = {
            // ...image,
            name : image.fileName,
            type : 'image/jpg',
            tmp_name : image.uri,
            size : image.fileSize,
            key : selImage,
        }

        tempArray.push(tempObj);
        setUploadList([...tempArray]);
        setSelImage('');
    }

    const deleteImage = async (key:string) => {
        const filterArray = uploadList.filter((el) => el.key !== key);

        setUploadList([...filterArray]);
        // console.log(filterArray);
    }

    const uploadDocumentHandler = async () => { //서류 업로드
        
        let uploadImageParams = {
            mt_idx : mt_idx,
        }
        let flag = true;
        for (let key in fileCheck){
            // console.log(fileCheck[key]);
            if(fileCheck[key] === 'Y'){
                const filterData = uploadList.filter(el => el.key === key);
                if(filterData.length === 0){
                    const noneData = reqFileList.find(el=> el.key === key);
                    console.log(noneData);
                    if(noneData){
                        alertModalOn(`${noneData.name}을 업로드해주세요.`,'확인')
                        flag = false;
                        break;
                    }
                }
            }
        }
        if(flag){
            uploadList.forEach((item,index) => {
                const keyName = `met_file${item.key}`
                uploadImageParams = {
                    ...uploadImageParams,
                    [keyName] : {
                        name : item.name,
                        size : item.size,
                        uri :Platform.OS === 'android' ? item.tmp_name : item.tmp_name.replace('file://', ''),
                        type : item.type,
                    },
                }
            })

            const {result,data,msg} = await uploadEquDocMutation.mutateAsync(uploadImageParams);

            if(result === 'true'){
                alertModalOn('회원가입이 완료되었습니다.','확인','upload_success');
            }
            else{
                alertModalOn(msg,'확인','');
            }
        }
    }


    return(
       <View style={[styles.white_box_con]}>
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                <Text style={[fontStyle.f_semibold,{fontSize:20,color:colors.FONT_COLOR_BLACK}]}>서류 업로드{memberType === 1 && '(장비 관련)'}</Text>
                <Text style={[fontStyle.f_regular,{fontSize:15,color:colors.FONT_COLOR_BLACK}]}><Text style={{color:colors.ORANGE_COLOR}}>*</Text> 필수항목</Text>
            </View>

            
            {reqFileList.map((item,index) => {
                return(
                    <View key={index}>
                        {Object.values(fileCheck)[index] === 'Y' &&
                            <View style={{marginTop:10}}>
                                <Text style={[fontStyle.f_semibold,{fontSize:16,color:colors.FONT_COLOR_BLACK,marginBottom:10}]}>{item.name} <Text style={{color:colors.ORANGE_COLOR}}>*</Text></Text>
                                {/* <Text style={[fontStyle.f_regular,{fontSize:14,color:colors.MAIN_COLOR,marginBottom:10}]}>건설기계 대금 200만원 이상인 경우 의무가입 대상입니다. */}
                                {/* </Text> */}
                                <TouchableOpacity style={{ marginRight: 8, width: 100, height: 100 }} onPress={()=>{setCameraModal(true); setSelImage(String(index+1))}}>
                                    <ImageBackground
                                    style={{ flex: 1,backgroundColor:colors.BACKGROUND_COLOR_GRAY1,borderRadius:5,justifyContent:'center',alignItems:'center',borderWidth:undefined? 0:1,borderColor:colors.BORDER_GRAY_COLOR }}
                                    source={uploadList[uploadList.findIndex(el=>el.key === String(index+1))] ? { uri : uploadList[uploadList.findIndex(el=>el.key === String(index+1))].tmp_name}  : undefined}
                                    resizeMode="cover"
                                    imageStyle={{ borderRadius: 10 }}>
                                        {!uploadList[uploadList.findIndex(el=>el.key === String(index+1))] &&
                                            <Image 
                                            style={{ width: 15, height: 15}}
                                            source={require('../../../assets/img/ic_add.png')}
                                            />
                                        }
                                        {uploadList.filter((el) => el.key === String(index+1)).length > 0 &&
                                            <TouchableOpacity
                                                style={{ position:'absolute', right: 10, top: 10 }}
                                                onPress={() =>{
                                                    alertModalOn('파일을 삭제하시겠습니까?','삭제하기','delete_confirm','','사업자등록증');
                                                    setSelImage(String(index+1))
                                                }}>
                                                <Image
                                                style={{ width: 25, height: 25 }}
                                                source={require('../../../assets/img/ic_modify.png')}
                                                />
                                            </TouchableOpacity>
                                        }
                                    </ImageBackground>
                                </TouchableOpacity>
                            </View>
                        }
                    </View>
                )
            })}
            <CustomButton
                style={{marginTop:30}} 
                action={uploadDocumentHandler}
                label={'회원가입 완료'}
            />
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
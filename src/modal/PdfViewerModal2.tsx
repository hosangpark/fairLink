import React from 'react';
import { AlertClearType, ImageModalType, PdfViewerModalType } from './modalType';
import {ActivityIndicator, View,TouchableOpacity,Image,Text} from 'react-native'
import Modal from 'react-native-modal'
import { colors, fontStyle, styles } from '../style/style';
import Pdf from 'react-native-pdf';
import WebView from 'react-native-webview';
import { CustomButton } from '../component/CustomButton';
import { AlertModal, initialAlert } from './AlertModal';
import { usePostMutation } from '../util/reactQuery';
import { useAppSelector } from '../redux/store';
export const PdfViewerModal2 = ({
    show,
    action,
    hide,
    pdfUrl,
    webviewUrl,
    contract_idx,
    setSelPdfUrl,
}:PdfViewerModalType) => {

    const {mt_idx} = useAppSelector(state => state.userInfo);
    const [isError , setIsError] = React.useState(false);
    const [alertModal, setAlertModal] = React.useState<AlertClearType>(()=>initialAlert); //alert 객체 생성 (초기값으로 clear);
    const contractUpdate = usePostMutation('getcontractupdate' , 'equip/equip_contract_update.php'); //프로필 정보 불러오기

    const PdfPage = React.useCallback(()=>{
        return(
            <>
                {pdfUrl == '' ?
                <WebView 
                    source={{uri:webviewUrl}}
                    bounces={true}
                    style={{flex:1}}
                />
                :
                    <Pdf
                        trustAllCerts={false}
                        source={{uri:pdfUrl}}
                        onLoadComplete={(numberOfPages,filePath) => {
                            if(isError){
                                setIsError(false);
                            }
                            console.log(`Number of pages: ${numberOfPages}`);
                        }}
                        key={pdfUrl}
                        onPageChanged={(page,numberOfPages) => {
                            console.log(`Current page: ${page}`);
                        }}
                        onError={(error) => {
                            setIsError(true);
                            console.log(error);
                        }}
                        onPressLink={(uri) => {
                            console.log(`Link pressed: ${uri}`);
                        }}

                        style={{flex:9,backgroundColor:colors.WHITE_COLOR}}
                    />
                }
            </>
        )
    },[isError,pdfUrl])

    const alertModalOn = (msg : string, type? : string) => { //alert 켜기
        setAlertModal({
            alert:true,
            strongMsg:'',
            msg:msg,
            type:type? type:'confirm' ,
        })
    }
    const alertModalOff = () =>{ //modal 종료
        setAlertModal(initialAlert)
    }

    const ContractHandler = async()=>{
        if(alertModal.type == 'OK_confirm'){
            const {data, result , msg } = await contractUpdate.mutateAsync(
                {
                    mt_idx:mt_idx,
                    contract_idx:contract_idx,
                    status : "Y"
                }
            );
            
            if(result == 'true'){
                setIsError(false);
                setSelPdfUrl('');
                hide();
            }
        } else if(alertModal.type == 'NO_confirm') {
            const {data, result , msg } = await contractUpdate.mutateAsync(
                {
                    mt_idx:mt_idx,
                    contract_idx:contract_idx,
                    status : "N"
                }
            );
            if(result == 'true'){
                setIsError(false);
                setSelPdfUrl('');
                hide();
            }
        }
    }

    return(
        <Modal 
            isVisible={show}
            onBackdropPress={()=>{
                // if(action){
                //     action();
                // }
                // hide();
            }}
            onBackButtonPress={()=>{
                setIsError(false);
                setSelPdfUrl('');
                hide();
            }}
            animationIn  ={"fadeIn"}
            animationOut ={"fadeOut"}
            animationInTiming  = {100}
            animationOutTiming = {100}
            useNativeDriver={true}
            style={[{margin:0,justifyContent:'center',alignItems:'center',flex:1,flexDirection : 'column', zIndex:9999,backgroundColor:'transparent'}]}
            >
            <View style={{width:'100%',height:'100%'}}>
                <View style={{backgroundColor:colors.WHITE_COLOR,justifyContent:'center',alignItems:'flex-end',padding:20}} >
                    <TouchableOpacity style={{height:30,width:30}} onPress={()=>{
                        setIsError(false);
                        setSelPdfUrl('');
                        hide();
                    }}>
                        <Image style={{width:20,height:20}} source={require('../assets/img/ic_x.png')}/>
                    </TouchableOpacity>
                </View>
                <View style={{flex:9}}>
                    {!isError ?
                        <PdfPage />
                    :
                    <View style={{backgroundColor:colors.WHITE_COLOR,flex:1,alignItems:'center',justifyContent:'center'}}>
                        <Text style={[fontStyle.f_semibold,{fontSize:18,color:colors.FONT_COLOR_BLACK}]}>문서가 손상되었거나, 존재하지 않습니다.</Text>
                    </View>
                    }
                </View>
                <View style={{backgroundColor:colors.WHITE_COLOR,justifyContent:'center',alignItems:'flex-end',padding:20}} >
                <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                    <CustomButton
                        style={{flex:1,marginRight:10}}
                        label={'계약 체결'}
                        action={()=>{alertModalOn(`건설기계임대차계약을${'\n'}체결하시게습니까?`, 'OK_confirm');}}
                    />
                    <CustomButton
                        style={{...styles.whiteButtonStyle,flex:1}}
                        label={'계약서 수정 요청'}
                        labelStyle={styles.whiteButtonLabelStyle}
                        action={()=>{alertModalOn(`계약서 수정요청을 하시겠습니까?`, 'NO_confirm');}}
                    />
                </View>
                </View>
            </View>
            <AlertModal
            show={alertModal.alert}
            msg={alertModal.msg}
            hide={alertModalOff}
            type={alertModal.type}
            action={ContractHandler}
        />
        </Modal>
    )
}

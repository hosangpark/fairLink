import React from 'react';
import {SafeAreaView,View,Text, TouchableOpacity} from 'react-native';
import cusToast from '../../util/toast/CusToast';
import { AlertClearType } from '../../modal/modalType';
import { AlertModal ,initialAlert} from '../../modal/AlertModal';
import { LoadingModal } from '../../modal/LoadingModal';


export const Home = () => {

    const [isLoading, setIsLoading] = React.useState<boolean>(false); //modal 로딩 on off

    const [alertModal, setAlertModal] = React.useState<AlertClearType>(()=>initialAlert); //alert 객체 생성 (초기값으로 clear);
    const alertModalOn = (msg : string, type? : string) => { //alert 켜기
        setAlertModal({
            alert:true,
            msg:msg,
            type:type ? type : '' ,
        })
    }

    const alertModalOff = () =>{ //modal 종료
        setAlertModal(initialAlert)
    }

    const alertAction = () => { //alert 확인 눌렀을때 발생할 action
       if(alertModal.type === ''){ //alert Type이 지정되어있을때 발생할 이벤트
            //....... some logic
       } 
       alertModalOff();
    }

    function toastOn(msg:string){ //토스트 테스트
        cusToast(msg);
    }


    return(
        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
            <View style={{marginBottom:20}}>
                <Text>Home</Text>
            </View>
            <View style={{width:100,height:100,justifyContent:'center',alignItems:'center',backgroundColor:'#fff'}}>
                <TouchableOpacity onPress={()=>toastOn('사용할 메시지 출력')}>
                    <Text>토스트 출력</Text>
                </TouchableOpacity>
            </View>

            <View style={{width:100,height:100,justifyContent:'center',alignItems:'center',backgroundColor:'#fff'}}>
                <TouchableOpacity onPress={()=>{setIsLoading(true); alertModalOn('테스트'); }}>
                    <Text>알림창 표시 (태스트)</Text>
                </TouchableOpacity>
            </View>
            <LoadingModal 
                isLoading={isLoading}
            />
            <AlertModal 
                show={alertModal.alert}
                msg={alertModal.msg}
                hide={alertModalOff}
            />
            
        </View>
    )
}
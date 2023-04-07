import React from 'react';
import {SafeAreaView,View,Text, TouchableOpacity, ScrollView} from 'react-native';
import cusToast from '../../util/toast/CusToast';
import { AlertClearType } from '../../modal/modalType';
import { AlertModal ,initialAlert} from '../../modal/AlertModal';
import { LoadingModal } from '../../modal/LoadingModal';
import { UserInfoCard } from '../../component/card/UserInfoCard';
import { styles } from '../../style/style';
import { CustomSelectBox } from '../../component/CustomSelectBox';


export const Home = () => {

    const [isLoading, setIsLoading] = React.useState<boolean>(false); //modal 로딩 on off

    const [alertModal, setAlertModal] = React.useState<AlertClearType>(()=>initialAlert); //alert 객체 생성 (초기값으로 clear);

    const [strOption , setStrOption] = React.useState<string>('aa');

    const tempOptionList = [
        'aa',
        'bb',
        'cc',
        'dd',
        'gg',
    ] 

    const alertModalOn = (msg : string, type? : string) => { //alert 켜기
        setAlertModal({
            alert:true,
            strongMsg:'ddd',
            msg:msg,
            type:type ? type : 'confirm' ,
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
        <ScrollView contentContainerStyle={[styles.ScreenContainer]}>
                <View style={{marginBottom:20}}>
                    <Text>Home</Text>
                </View>

                <UserInfoCard 
                    empName='힘찬중기'
                    jobType='1'
                    location='[경남]'
                    rating={23}
                    score={5}
                    recEmpCount={64}
                    userName='김경태'
                    userProfileUrl=''
                />
                <UserInfoCard 
                    empName='힘찬중기'
                    jobType='2'
                    location='[경남]'
                    rating={23}
                    score={5}
                    recEmpCount={64}
                    userName='김경태'
                    userProfileUrl=''
                />

                <CustomSelectBox 
                    strOptionList={tempOptionList}
                    selOption={strOption}
                    strSetOption={setStrOption}
                />

                <View style={{width:100,height:100,justifyContent:'center',alignItems:'center',backgroundColor:'#fff', marginTop:40}}>
                    <TouchableOpacity onPress={()=>toastOn('사용할 메시지 출력')}>
                        <Text>토스트 출력</Text>
                    </TouchableOpacity>
                </View>

                <View style={{width:100,height:100,justifyContent:'center',alignItems:'center',backgroundColor:'#fff'}}>
                    <TouchableOpacity onPress={()=>{alertModalOn('테스트'); }}>
                        <Text>알림창 표시 (태스트)</Text>
                    </TouchableOpacity>
                </View>
                <LoadingModal 
                    isLoading={isLoading}
                />
                <AlertModal 
                    show={alertModal.alert}
                    strongMsg={alertModal.strongMsg}
                    msg={alertModal.msg}
                    hide={alertModalOff}
                    type={alertModal.type}
                />
        </ScrollView>
    )
}
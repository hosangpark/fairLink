import React from "react";
import { ScrollView, View, Text, useWindowDimensions } from "react-native";
import { colors, fontStyle, styles } from "../../../style/style";
import { TouchableOpacity } from "react-native-gesture-handler";
import { UserInfoCard } from "../../../component/card/UserInfoCard";
import { AlertClearType } from "../../../modal/modalType";
import { AlertModal, initialAlert } from "../../../modal/AlertModal";
import { NodataView } from "../../../component/NodataView";
import { usePostQuery } from "../../../util/reactQuery";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { toggleLoading } from "../../../redux/actions/LoadingAction";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouterNavigatorParams } from "../../../../type/routerType";
import { RequestRouterNavigatorParams } from "../../../../type/RequestRouterType";
import { FavoriteListItemType } from "../../screenType";

export const FavoriteSpare = () => {
    const dispatch = useAppDispatch();
    const navigation = useNavigation<StackNavigationProp<RouterNavigatorParams & RequestRouterNavigatorParams>>();

    const {mt_idx , mt_type} = useAppSelector(state => state.userInfo);
    const {data : favData , isLoading:favLoading, isError : favError} = usePostQuery('getEquFavList',{mt_idx:'17',type:'1'},'equip/equip_like_list.php');

    const [alertModal, setAlertModal] = React.useState<AlertClearType>(() => initialAlert);

    const [favList, setFavList] = React.useState<FavoriteListItemType[]>([]);

    const alertModalOn = ( msg : string, type? : string ) => {
        setAlertModal({
            alert: true,
            strongMsg: '',
            msg: msg,
            type: type ? type : '' ,
        })
    }

    const alertModalOff = () => {
        setAlertModal(initialAlert)
    }
    const alertAction = () =>{
        if(alertModal.type === 'error'){

        }
    }

    React.useEffect(()=>{
        dispatch(toggleLoading(favLoading));
        if(favError){
            alertModalOn('즐겨찾기 리스트를 불러오는 도중 오류가 발생했습니다. \n고객센터에 문의해주세요.','error')
        }
        else{
            if(favData){
                // console.log(favData);
                console.log(favData.data.data);
                setFavList([...favData.data.data]);
            }
        }
    },[favData,favLoading,favError])

    
    return (
        <View style={{ margin: 20}}>
            <TouchableOpacity style={{ marginBottom: 30}}>
                <View style={[styles.buttonStyle]}>
                    <Text style={[styles.buttonLabelStyle]}>조종사 추가하기</Text>
                </View>
            </TouchableOpacity>
            {
                // 즐겨찾기 등록 전
                <NodataView msg={'즐겨찾기 조종사가 없습니다'}/>
            }

            {favList.map((item:FavoriteListItemType,index:number) => {
                return(
                    <View style={{marginBottom:30}}>
                        <UserInfoCard 
                            index = '0'
                            item={item}
                            isDelete = {true}
                            action={()=>{}}
                        />
                    </View>
                )
            })}

            
            <View style={{marginBottom:30}}>
                {/* <UserInfoCard 
                    index = '0'
                    jobType = '0'
                    userProfileUrl = ''
                    empName = '힘찬중기'
                    userName = '정우성'
                    score = {5}
                    rating = {41}
                    recEmpCount = {6}
                    location = '[경남] 진주시, 사천시, 창원시'
                    isDelete = {true}
                    action = {()=>{}}
                /> */}
            </View>
            <AlertModal 
            show={alertModal.alert}
                msg={alertModal.msg}
                // action={}
                hide={alertModalOff}
                type={alertModal.type}
            />
        </View>
    )
}
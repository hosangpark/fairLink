import React from "react";
import { ScrollView, View, Text, useWindowDimensions } from "react-native";
import { colors, fontStyle, styles } from "../../../style/style";
import { TouchableOpacity } from "react-native-gesture-handler";
import { UserInfoCard } from "../../../component/card/UserInfoCard";
import { NodataView } from "../../../component/NodataView";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouterNavigatorParams } from "../../../../type/routerType";
import { RequestRouterNavigatorParams } from "../../../../type/RequestRouterType";
import { usePostQuery } from "../../../util/reactQuery";
import { AlertClearType } from "../../../modal/modalType";
import { AlertModal, initialAlert } from "../../../modal/AlertModal";
import { FavoriteListItemType } from "../../screenType";
import { toggleLoading } from "../../../redux/actions/LoadingAction";
import { MarginCom } from "../../../component/MarginCom";

export const AffiliationFilot = () => {

    const dispatch = useAppDispatch();
    const navigation = useNavigation<StackNavigationProp<RouterNavigatorParams & RequestRouterNavigatorParams>>();
    const isFocusded = useIsFocused();

    const {mt_idx , mt_type} = useAppSelector(state => state.userInfo);
    const {data : favData , isLoading:favLoading, isError : favError, refetch : favRefetch} = usePostQuery('getEquFavList',{mt_idx:mt_idx,type:'2'},'equip/equip_like_list.php');

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

    React.useEffect(()=>{
        if(isFocusded){
            favRefetch();
        }
    },[isFocusded])

    return (
        <View style={{ margin: 20}}>
            <TouchableOpacity onPress={()=>{navigation.navigate('FavoriteAdd',{equFavType:'2'})}}>
                <View style={[styles.buttonStyle]}>
                    <Text style={[styles.buttonLabelStyle]}>조종사 추가하기</Text>
                </View>
            </TouchableOpacity>
            {
                // 즐겨찾기 등록 전
            }
            <MarginCom mt={20} />
            {favList.length === 0 ?
                <NodataView msg={'소속된 조종사가 없습니다'}/>
                :
                favList.map((item:FavoriteListItemType,index:number) => {
                    return(
                        <View style={{marginBottom:30}} key={index}>
                            <UserInfoCard 
                                index = '0'
                                item={item}
                                isDelete = {true}
                                action={()=>{}}
                                equFavType="2"
                                refetch={favRefetch}
                                isBtn={false}
                            />
                        </View>
                    )
                })
            }
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
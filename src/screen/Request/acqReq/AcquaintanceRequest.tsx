import React,{useState} from "react";
import { ScrollView, View, Text, SafeAreaView, FlatList } from "react-native";
import { BackHeader } from "../../../component/header/BackHeader";
import { colors, fontStyle } from "../../../style/style";
import { UserInfoCard } from "../../../component/card/UserInfoCard";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouterNavigatorParams } from "../../../../type/routerType";
import { CustomButton } from "../../../component/CustomButton";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { usePostQuery } from "../../../util/reactQuery";
import { toggleLoading } from "../../../redux/actions/LoadingAction";
import { AlertModal, initialAlert } from "../../../modal/AlertModal";
import { FavoriteListItemType } from "../../screenType";
import { RequestRouterNavigatorParams } from "../../../../type/RequestRouterType";

export const AcquaintanceRequest = () => {
    const {mt_idx, mt_type} = useAppSelector(state => state.userInfo);
    const dispatch = useAppDispatch();
    const isFocused = useIsFocused();
    const navigation = useNavigation<StackNavigationProp<RouterNavigatorParams & RequestRouterNavigatorParams>>();
    const [check,setCheck] = useState('0');

    const {data : likeOrderData, isLoading : likeOrderLoading, isError : likeOrderError, refetch : likeOrderRefetch} = usePostQuery('getLikeOrder',{mt_idx:mt_idx},'cons/cons_like_order_list.php')
    const [likeOrderList, setLikeOrderList] = React.useState<FavoriteListItemType[]>([]);
    const [alertModal, setAlertModal] = React.useState(()=>initialAlert);

    const alertModalOn = (msg : string, type ? : string,strongMsg? : string) => {
      setAlertModal({
        ...alertModal,
        alert:true,
        msg:msg,
        type : type ? type : '',
        strongMsg: strongMsg ? strongMsg : '',
      })
    }
    const alertModalOff = () => {
      setAlertModal(()=>initialAlert);
    }

    const alertAction = () => {
      if(alertModal.type === 'apiError'){
        navigation.goBack();
      }
      else if(alertModal.type === 'sel_confirm'){
        navigation.navigate('AcqReqStep1',{item:likeOrderList[0]});
      }
    }
 
    const Checkbridge = (e:string)=>{
      if(check==e){
        setCheck('0')
      } else {
        setCheck(e)
      }
    }

    React.useEffect(()=>{

      dispatch(toggleLoading(likeOrderLoading));

      if(likeOrderError){
        alertModalOn('예기치 못한 오류가 발생하였습니다. \n 고객센터에 문의해주세요.','apiError');
      }
      else{
        if(likeOrderData){
          if(likeOrderData.result === 'true'){
            setLikeOrderList([...likeOrderData.data.data]);
            console.log(likeOrderData.data.data);
          }
          else{
            alertModalOn(likeOrderData.msg,'apiError')
          }
        }
      }


    },[likeOrderData,likeOrderLoading,likeOrderError])

    React.useEffect(()=>{
      if(isFocused){
        likeOrderRefetch();
      }
    },[isFocused])

    return (
      <SafeAreaView style={{flex:1}}>
        <BackHeader title="지인배차 회사선택" />
        {/* <ScrollView style={{flex:1}}> */}
          <View style={{ backgroundColor: colors.WHITE_COLOR, paddingHorizontal: 40,paddingVertical:10,alignItems:'center'}}>
              <Text style={[fontStyle.f_regular,{color:colors.FONT_COLOR_BLACK,fontSize:16,lineHeight:25,textAlign:'center'}]}>등록된 즐겨찾기 장비회사 중에서 {"\n"}배차요청할 회사를 선택해주세요.</Text>
          </View>
          <View style={{flex:1,paddingHorizontal:20,paddingTop:20}}>
            <FlatList 
                data={likeOrderList}
                style={{marginBottom:20}}
                showsVerticalScrollIndicator={false}
                renderItem={({item,index})=>{
                    return(
                        <View style={{paddingVertical:15}}>
                        <UserInfoCard 
                            index={String(index)}
                            item={item}
                            isDelete={false}
                            action={e=>Checkbridge(e)}
                            isCheck={check}
                            refetch={likeOrderRefetch}
                        />
                        </View>
                    )
                  }}
              />
          </View>
        <CustomButton
          style={{height:60}}
          label='선택완료'
          action={()=>{
            const selItem = likeOrderList[Number(check)]

            alertModalOn(`님을 선택하셨습니다.\n배차요청 페이지로 이동할까요?`,'sel_confirm',`[${selItem.name}]`);

            // alertModalOn()
          }}
        />
        <AlertModal
          show={alertModal.alert}
          msg={alertModal.msg}
          hide={alertModalOff}
          action={alertAction}
          btnLabel="확인"
          type={alertModal.type}
          strongMsg={alertModal.strongMsg}
        />
      </SafeAreaView>
    )
}
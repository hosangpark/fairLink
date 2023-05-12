import React,{useState} from 'react';
import {View, TextInput,Image,TouchableOpacity, ScrollView, FlatList, Text} from 'react-native';
import { colors, fontStyle, selectBoxStyle2 } from '../../../../style/style';
import { UserInfoCard } from '../../../../component/card/UserInfoCard';
import { CustomSelectBox } from '../../../../component/CustomSelectBox';
import { selectBoxStyle } from '../../../../style/style';
import { CustomButton } from '../../../../component/CustomButton';
import { CustomAccordion2 } from '../../../../component/CustomAccordion2';
import { CustomInputTextBox } from '../../../../component/CustomInputTextBox';
import { monthList } from '../../../../component/utils/list';
import { useAppDispatch, useAppSelector } from '../../../../redux/store';
import { usePostMutation, usePostQuery } from '../../../../util/reactQuery';
import { AlertModal, initialAlert } from '../../../../modal/AlertModal';
import { toggleLoading } from '../../../../redux/actions/LoadingAction';
import { HistoryItemType } from '../../../screenType';
import cusToast from '../../../../util/toast/CusToast';

type FavoriteAddPhone = {
  equFavType? : string;
}

export const WorkHistory = ({equFavType}:FavoriteAddPhone) => {

    const {mt_idx,mt_type} = useAppSelector(state => state.userInfo);
    const dispatch = useAppDispatch();

    const [userType,setUserType] = useState('3')
    const [year,setYear] = useState<string>(String(new Date().getFullYear()))
    const [month,setMonth] = useState<string>(String(new Date().getMonth()+1));
    const [searchText,setSearchText] = useState<string>('');

    const [historyList, setHistoryList] = React.useState<HistoryItemType[]>([]);

    const getHistoryDataMutation = usePostMutation('getHistory',mt_type === '1' ? 'cons/cons_like_search.php' : 'equip/equip_like_search.php');
    const addFavoriteUserMutation = usePostMutation('addFavoriteUser',
      mt_type === '1' ? 'cons/cons_like_add.php' : 'equip/equip_like_add.php'
  ); //즐겨찾기 추가
    const [alertModal, setAlertModal] = React.useState(()=>initialAlert);

    const alertModalOn = (msg:string, type?:string) => {
      setAlertModal({
        ...alertModal,
        alert:true,
        msg:msg,
        type:type? type : ''
      })
    }

    const alertModalOff = () => {
      setAlertModal(()=>initialAlert);
    }

    const alertAction = () => {

    }

    async function addFavoriteUser(mpt_idx : string){//즐겨찾기 추가

      console.log(mpt_idx);

      let params = {
          mt_idx : mt_idx,
          mpt_idx : mpt_idx,
          type : '',
      }

      if(mt_type === '2' && equFavType){
          params = {
              ...params,
              type : equFavType,
          }
      }
      console.log(params);

      dispatch(toggleLoading(true));
      const {result, msg} = await addFavoriteUserMutation.mutateAsync(params);
      dispatch(toggleLoading(false));

      if(result === 'true'){
          alertModalOn('즐겨찾기 장비에 정상적으로 추가되었습니다.','add_success');
      }
      else{
          if(msg === '이미 등록되어 있는 조종사입니다.'){
              cusToast(msg);
          }
          else{
              alertModalOn(msg,'error');
          }
      }
  }

    const getHistoryHandler = async () => {
        const params = {
          mt_idx : mt_idx,
          type : 'order',
          search_year : year,
          search_month : Number(month) < 10 ? '0'+month : month,
          search_txt : searchText,
        }

        if(searchText === ''){
          alertModalOn('현장명을 기입해주세요.');
        }
        else{
          dispatch(toggleLoading(true));
          const {data,result,msg} = await getHistoryDataMutation.mutateAsync(params);
          dispatch(toggleLoading(false));

          console.log(params);

          console.log(result,msg,data);

          if(result === 'true'){
            setHistoryList([...data.data]);
          }
          else{
            alertModalOn(msg,'');
          }
        }

      }
    return(
      <>
      <AlertModal 
        show={alertModal.alert}
        msg={alertModal.msg}
        hide={alertModalOff}
        action={alertAction}
      />
      <View style={{backgroundColor:colors.WHITE_COLOR,paddingHorizontal:20,paddingVertical:10}}>
      <View style={{flexDirection:'row'}}>
        <View style={{flex:1,marginRight:10,marginBottom:20}}>
            <CustomSelectBox
                defaultText='선택하세요.'
                strOptionList={['2020년','2021년','2022년','2023년']}
                selOption={year}
                strSetOption={setYear}
                labelFooter='년'
                buttonStyle={selectBoxStyle.btnStyle}
                buttonTextStyle={selectBoxStyle.btnTextStyle}
                rowStyle={selectBoxStyle.rowStyle}
                rowTextStyle={selectBoxStyle.rowTextStyle}
            />
        </View>
            <CustomSelectBox 
                defaultText='선택하세요.'
                strOptionList={monthList()}
                labelFooter='월'
                selOption={month}
                strSetOption={setMonth}
                buttonStyle={selectBoxStyle.btnStyle}
                buttonTextStyle={selectBoxStyle.btnTextStyle}
                rowStyle={selectBoxStyle.rowStyle}
                rowTextStyle={selectBoxStyle.rowTextStyle}
            />
      </View>
      <CustomInputTextBox
        style={{
          height:46,
          marginTop:10,
        }}
        placeholder={'계약서에 명시된 현장명을 기입하세요.'}
        imgfile={undefined}
        button={'검색'}
        action={()=>{getHistoryHandler()}}
        editable={true}
        placeholderTextColor={''}
        input={searchText}
        setInput={setSearchText}
      />
        </View>
        <ScrollView style={{marginTop:10}}>
        {/* <View><Text>검색결과</Text></View> */}
          {
            historyList.map((data, i) => (
                <View key={i}>
                  <CustomAccordion2 
                      key={i}
                      title={data.crt_name}
                      subtitle={`${data.end_date} ${data.content}`}
                      data={data}
                      userType={userType}
                      action={()=>{console.log(i)}}
                      favAction={addFavoriteUser}
                  />
                </View>
            ))
        }
        </ScrollView>
        {/* <FlatList 
            data={tempList}
            style={{marginTop:10,paddingHorizontal:20}}
            showsVerticalScrollIndicator={false}
            renderItem={({item,index})=>{
                return(
                    <View style={{paddingVertical:15}}>
                    <UserInfoCard
                        index={item.index}
                        empName={item.empName}
                        jobType={item.jobType}
                        location={item.location}
                        rating={item.rating}
                        recEmpCount={item.recEmpCount}
                        score={item.score}
                        userName={item.userName}
                        userProfileUrl={item.userProfileUrl}
                        isDelete={false}
                        isFavorite={'0'}
                        action={()=>{}}
                    />
                    </View>
                )
            }}
        /> */}
      </> 
    )
}
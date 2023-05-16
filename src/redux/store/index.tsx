import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { combineReducers , configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import { Loading } from '../reducers/LoadingReducer';
import { UserInfo } from '../reducers/UserInfoReducer';
import { FilterReducer } from '../reducers/FilterReducer';
const rootReducer = combineReducers({ //reducer 묶기
    isLoading : Loading,
    userInfo : UserInfo,
    Filter: FilterReducer
})
//자동로그인 체크를 하면 local 로그인정보 & 자동로그인 체크 안할경우 session

export const store = configureStore({ //store 설정
    reducer : rootReducer, //rootReducer 설정 combineReducers로 병합한 slice reducer들을 병합한 rootReducer로 설정
    // preloadedState : persistedState,// 리덕스 스토어 초기값
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({serializableCheck: false}).concat(

            ),
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector : TypedUseSelectorHook<RootState> = useSelector; //useSelector 커스텀
export const useAppDispatch = () => useDispatch<AppDispatch>(); //useDispatch 커스텀



export default store;
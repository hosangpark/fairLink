import {useQuery , useMutation } from 'react-query';
import axios from 'axios';

export const baseUrl = '';
export const debugKey = '';

const axiosInstance = axios.create({
    baseURL : baseUrl
})

export const fetchPostData = async (postData:object , apiUrl : string) => { //respone 데이터 반환

    const config = {
        headers : {
            'Content-Type': 'multipart/form-data',
        }
    }

const {data} = await axiosInstance.post(apiUrl,{
        debug_key : debugKey,
        ...postData
    },config)

    return data;
}

export const usePostQuery = (postKey: string,postData : object, apiUrl : string) => { //useQuery ( get )데이터 반환
    return useQuery([postKey, postData], () => fetchPostData(postData,apiUrl));
};

export const usePostMutation = (postKey:string, apiUrl : string) => { //useMutation ( post ) 데이터 반환
    return useMutation((postData:any) => fetchPostData(postData,apiUrl));
}


// export default usePostQuery;

export interface BackHeaderType {
    backAction? : () => void;
    title : string;
}

export interface CustomButtonType {
    style? : object,
    label : string,
    action : ()=>void,
}


export interface UserInfoCardType {
    jobType : string,
    userProfileUrl : string,
    empName : string,
    userName:string,
    score:number,
    rating:number,
    recEmpCount:number,
    location:string,
}

export interface TextBoxType {
    boldText?: string,
    subText: string,
    rightText: string,
    type: number,
}
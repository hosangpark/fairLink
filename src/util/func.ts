// import axios from "axios";
// import { baseUrl } from "./axiosQuery";



//현재 날짜 구하기 yyyy-mm-dd
export const getToday = () => {
    var date = new Date();
    var year = date.getFullYear();
    var month = ("0" + (1 + date.getMonth())).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);

    return year + "-" + month + "-" + day;
}

export const idCheck = (id : string) => {
    const idReg =  /^[a-z]+[a-z0-9]{8,16}$/g;

    if(id === ''){
        return {
            result:false,
            msg:'아이디를 입력해주세요.',
        }
    }
    else if(!idReg.test(id)){
        return{
            result:false,
            msg:'아이디는 영소문자 8~16자로 입력해주세요.',
        }
    }
    else{
        return{
            result:true,
            msg:'사용가능한 아이디 입니다.',
        }
    }
}

export const emailCheck = (email:string) => { //이메일 유효성 검사
    const emailReg = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    if(email === ''){
        return {
            result:false,
            msg : '이메일을 입력해주세요.',
        }
    }
    else if(!emailReg.test(email)){
        return{
            result:false,
            msg:'올바르지 않은 이메일입니다.',
        }
    }
    else{
        return{
            result:true,
            msg:'사용가능한 이메일입니다.',
        }
    }
}

export const pwCheck = (pw:string) => { //비밀번호 유효성 검사 (6~20자리 특수문자 포함)
    const passwordReg = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,14}$/
    if(pw === ''){
        return {
            result:false,
            msg : '비밀번호를 입력해주세요.',
        }
    }
    else if(!passwordReg.test(pw)){
        return{
            result:false,
            msg:'영문, 숫자, 특수문자를 조합하여 입력해주세요. (8~14자)',
        }
    }
    else{
        return{
            result:true,
            msg:'사용가능한 비밀번호 입니다.',
        }
    }
}

export const pwCheckRe = (pw:string,pw_re:string) => { //비밀번호 재입력 유효성 검사
    if(pw_re === ''){
        return{
            result:false,
            msg:'비밀번호를 한번 더 입력해주세요.',
        }
    }
    else if(pw !== pw_re){
        return{
            result:false,
            msg:'비밀번호가 일치하지 않아요!',
        }
    }
    else{
        return{
            result:true,
            msg:'비밀번호가 일치합니다.',
        }
    }
}

export const phoneAutoHipone = (phone:string) => {

    // const stringPhone = phone.replaceAll('-','');

    const hiponePhone = phone.replace(/[^0-9]/g, '').replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);

    return hiponePhone;
}

export const phoneCheck = (phone:string) => { //휴대폰 유효성 검사(-제외)
    const phoneRule = /^(01[0]{1})[0-9]{3,4}[0-9]{4}$/

    if(phone === ''){
        return {
            result:false,
            msg : '휴대폰번호를 입력해주세요.',
        }
    }
    else if(!phoneRule.test(phone)){
        return{
            result:false,
            msg:'올바르지 않은 휴대폰 번호입니다.',
        }
    }
    else{
        return{
            result:true,
            msg:'사용가능한 휴대폰번호 입니다.',
        }
    }
}

export const nameCheckRe = (name:string) => { //이름 체크
    const nameReg = /^[가-힣a-zA-Z]{2,15}$/;
    if(!nameReg.test(name)){
        return {
            result:false,
            msg:'이름은 2~15자, 한글과 영문으로 입력해주세요.',
        }
    }
    else{
        return {
            result:true,
            msg:'',
        }
    }
}

export const textBrConverter = (text:string) => { //
    let convertText = text;
    if(text === ''){
        return '';
    }
    else{
        convertText = convertText.replace(/\r\n/ig, '<br>');
        convertText = convertText.replace(/\\n/ig, '<br>');
        convertText = convertText.replace(/\n/ig, '<br>');

        return convertText;
    }
}

export const getDate = () => {

    const nowDate = new Date();
    const nowYear = nowDate.getFullYear();
    const nowMonth = nowDate.getMonth()+1;
    const nowDay = nowDate.getDate();

    const weekList = ['일','월','화','수','목','금','토'];

    const nowWeek = weekList[nowDate.getDay()];

    const prevWeekDate = new Date(nowYear, nowMonth-1, nowDay - 7);

    const prevWeekYear = prevWeekDate.getFullYear(); //7일전
    const prevWeekMonth = prevWeekDate.getMonth()+1; //7일전
    const prevWeekDay = prevWeekDate.getDate(); //7일전
    return{
        year : nowYear, //현재 년도
        month : nowMonth, //현재 월
        day : nowDay, //현재 일
        nowWeek,//현재 요일
        prevWeekYear, //7일전 년도
        prevWeekMonth, //7일전 월
        prevWeekDay, //7일전 일
        prevWeekDate, //7일전 전체
        koText : `${nowYear}년 ${nowMonth}월 ${nowDay}일`,
        prevKoText : `${prevWeekYear}년 ${prevWeekMonth}월 ${prevWeekDay}일 ~ ${nowYear}년 ${nowMonth}월 ${nowDay}일`,
        onlyYearMonth : `${nowYear}년 ${nowMonth < 10 ? '0'+nowMonth : nowMonth}월`,
        comText : `${nowYear}.${nowMonth < 10 ? '0'+nowMonth : nowMonth}.${nowDay < 10 ? '0'+nowDay : nowDay}`,
        hiponText : `${nowYear}-${nowMonth < 10 ? '0'+nowMonth : nowMonth}-${nowDay < 10 ? '0'+nowDay : nowDay}`
    }
}

export const getTime = () => { //현재시간 구하기 
    const nowDate = new Date();

    const nowHour = nowDate.getHours() < 10 ? `0${nowDate.getHours()}` : nowDate.getHours();
    const nowMin = nowDate.getMinutes() < 10 ? `0${nowDate.getMinutes()}` : nowDate.getMinutes();

    return {
        nowHour,
        nowMin,
    }
}

export const dateConverter = (date:Date) => { //date -> year,month,day 
    const converDate = date;

    const year = converDate.getFullYear();
    const month = Number(converDate.getMonth()+1) < 10  ? '0'+String(converDate.getMonth()+1) : converDate.getMonth()+1;
    const day = converDate.getDate() < 10 ? '0'+converDate.getDate() : converDate.getDate();

    return {
        year,
        month,
        day,
    }
}

export const getDonutStyle = (fw:number,fh:number,bw:number,bh:number,per:number) => {
    return{
        '--donut-width' : fw+'rem',
        '--donut-height' : fh+'rem',
        '--donut-back-width' : bw+'rem',
        '--donut-back-height' : bh+'rem',
        '--donut-per' : per+'%'
    }
}

export const getColGraphStyle = (per:number,color:string,label:string) => {
    return{
        '--graph-per' : per+'%',
        '--graph-color' : color,
        '--graph-label' : label,
    }
}

export const getMinMax = (list:any) => { //최소,최대값 구하기 
    const min = Math.min(...list);
    const max = Math.max(...list);

    return {
        min,
        max,
    }
}

// export const NumberReplace = (event) => {

//     console.log(event);

//     if(event.key === '.' 
//         || event.key === '-'
//         || event.key >= 0 && event.key <= 9) {
//         return true;
//     }
    
//     return false;
// }

export const NumberComma = (number:number) => { //숫자 천단위 ',' 찍기
    if(number === 0){
        return 0;
    }
    const comNumber = number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

    return comNumber;
}

// export const idBlock = (id:string,sIndex:number,eIndex:number,bText:number) => { //문자열 *처리
//     //id : targetId
//     //sIndex : start index
//     //eIndex : end index
//     //bText : replace Text
    
//     let converId = id;

//     String.prototype.replaceAt = function(index, replacement) {
//         if (index >= this.length) {
//             return this.valueOf();
//         }
    
//         var chars = this.split('');
//         chars[index] = replacement;
//         return chars.join('');
//     }
    
//     for(let i=sIndex; i<=eIndex; i++){
//         converId = converId.replaceAt(i,bText)
//     }

//     return converId; 
// }

export const createBase64Image = (file:any,baseValue:any) => { //base64 이미지 생성
    const reader = new FileReader();
    let fileResult;
    let base64 = '';
    reader.readAsDataURL(file)

    // const setFile = (result) => {
    //     console.log(result);
    //     base64 = result;
    // }

    reader.onload = (event:any) => {
        fileResult = event.target.result;
        baseValue = fileResult;
        // setFile(fileResult);
    }
    // console.log(fileResult);

    console.log(base64);
    
    // return reader.result;
}

export const secTimeConverter = (sec:string) => { // ms -> hh,mm,ss 
    const hour = Number(sec)/3600;
    const min = (Number(sec)%3600)/60;
    const second = Number(sec)%60;

    return {
        hour,
        min,
        second,
    }
}

// export const downloadFile = (url:string,fileName:string) => { //파일 다운로드
//     axios.get(`${baseUrl}file/file_download.php`,{params:{file:url,file_name:fileName}, responseType: 'blob',})
//     .then(response => {
//         const url = window.URL.createObjectURL(new Blob([response.data]));
//         const link = document.createElement('a');
//         link.href = url;
//         link.setAttribute('download', fileName);
//         document.body.appendChild(link);
//         link.click();
//         if (link.parentNode) {
//         link.parentNode.removeChild(link);
//         }
//     })
//     .catch(error => {
//         console.log(error);
//     });
// }

import React,{useState} from 'react';
import { CustomAccordionType } from './componentsType';
import { Text, TouchableOpacity, View,Image,FlatList, StyleSheet } from 'react-native';
import { colors, fontStyle, styles } from '../style/style';
import { NodataView } from './NodataView';
import { UserInfoCard2 } from './card/BoardCard';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { DocumentAccordion } from './DocumentAccordion';



export const User1DocumentList = (

) => {
    return(
    <>
      <DocumentAccordion
          title={'장비(차량) 서류'}
          subList={[
          {
              title:'건설기계조종사면허증',
              registration:false
          },
          {
              title:'운전면허증(1종)',
              registration:false
          }
          ]}
      />
      <DocumentAccordion
          title={'자격 및 기타 서류'}
          subList={[
          {
              title:'건설기계조종사면허증',
              registration:false
          },
          {
              title:'운전면허증(1종)',
              registration:false
          }
          ]}
      />
      <DocumentAccordion
          title={'계약 서류'}
          subList={[
          {
              title:'건설기계임대차계약서',
              registration:false
          },
          ]}
      />
      <DocumentAccordion
          title={'작업일보'}
          subList={[
          {
              title:'23.01.12 작업일보',
              registration:true
          },
          ]}
      />
    </>
    )
}
export const User2DocumentList = (

) => {
    return(
    <>
      <DocumentAccordion
          title={'장비(차량) 서류'}
          subList={[
          {
              title:'건설기계조종사면허증',
              registration:false
          },
          {
              title:'운전면허증(1종)',
              registration:false
          }
          ]}
      />
      <DocumentAccordion
          title={'자격 및 기타 서류'}
          subList={[
          {
              title:'건설기계조종사면허증',
              registration:false
          },
          {
              title:'운전면허증(1종)',
              registration:false
          }
          ]}
      />
      <DocumentAccordion
          title={'계약 서류'}
          subList={[
          {
              title:'건설기계임대차계약서',
              registration:false
          },
          ]}
      />
      <DocumentAccordion
          title={'작업일보'}
          subList={[
          {
              title:'23.01.12 작업일보',
              registration:true
          },
          ]}
      />
    </>
    )
}
export const User3DocumentList = (

) => {
    return(
    <>
      <DocumentAccordion
          title={'작업일보'}
          subList={[
          {
              title:'23.01.12 작업일보',
              registration:true
          },
          ]}
      />
    </>
    )
}



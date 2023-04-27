import React,{useState} from 'react';
import { CustomAccordionType } from './componentsType';
import { Text, TouchableOpacity, View,Image,FlatList, StyleSheet } from 'react-native';
import { colors, fontStyle, styles } from '../style/style';
import { NodataView } from './NodataView';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { DocumentAccordion } from './DocumentAccordion';

// str.replace('A', '')
export type DocumnetArrayType = { 
    items1:Array<{
        title:string
        file_check:string
        file_url:string
    }>,
    items2:Array<{
        title:string
        file_check:string
        file_url:string
    }>,
    items3:Array<{
        title:string
        file_check:string
        file_url:string
    }>,
    items4:Array<{
        title:string
        file_check:string
        file_url:string
    }>,
}

export const User1DocumentList = ({
    items1,
    items2,
    items3,
    items4,
}:DocumnetArrayType) => {
    return(
    <>
      <DocumentAccordion
          title={'장비(차량) 서류'}
          subList={items1}
      />
      <DocumentAccordion
          title={'자격 및 기타 서류'}
          subList={items2}
      />
      <DocumentAccordion
          title={'계약 서류'}
          subList={items3}
      />
      <DocumentAccordion
          title={'작업일보'}
          subList={items4}
      />
    </>
    )
}
export const User2DocumentList = ({
    items1,
    items2,
    items3,
    items4,
}:DocumnetArrayType) => {
    return(
    <>
      <DocumentAccordion
        title={'장비(차량) 서류'}
        subList={items1}
      />
      <DocumentAccordion
        title={'자격 및 기타 서류'}
        subList={items2}
      />
      <DocumentAccordion
        title={'계약 서류'}
        subList={items3}
      />
      <DocumentAccordion
        title={'작업일보'}
        subList={items4}
      />
    </>
    )
}
export const User3DocumentList = ({
    items1,
}:DocumnetArrayType) => {
    return(
    <>
      <DocumentAccordion
        title={'작업일보'}
        subList={items1}
      />
    </>
    )
}



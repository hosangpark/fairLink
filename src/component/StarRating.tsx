import React from 'react';
import { View, Image } from 'react-native';

type StarRatingProps = {
    score: number;
}

/** score에 따른 별점 생성 */
export const StarRating: React.FC<StarRatingProps> = ({score}) => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
        stars.push(
            <Image 
                key={i}
                style={{ width: 29, height: 27, margin: 4}} 
                source={ 
                    i <= score
                        ? require('../assets/img/ic_star_on.png') 
                        : require('../assets/img/ic_star_off.png') 
                }
            />
        )
    }

    return <View style={{ flexDirection: 'row', justifyContent: 'center'}}>{stars}</View>
}
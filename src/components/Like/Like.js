import Checkbox from 'material-ui/Checkbox';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';

import React from 'react'

const LikeCheckbox = (props) => {



    const style = {
        fill: 'black',
        borderRadius: '50%',
        padding: '4px'
    }
    return (
        <div className="like-btn">
            <Checkbox
                iconStyle={ style }
                inputStyle={ { backgroundColor: 'rgba(255, 255, 255, 0.8)', } }
                style={ { color: 'black' } }
                checkedIcon={ <FontIcon style={ { backgroundColor: 'rgba(255, 255, 255, 0.8)', } } className="material-icons" >  favorite </FontIcon> }
                uncheckedIcon={ <FontIcon style={ { backgroundColor: 'rgba(255, 255, 255, 0.8)', } } className="material-icons"> favorite_border </FontIcon> }
            />
        </div>
    )

}
export default LikeCheckbox;



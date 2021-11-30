import React from 'react'
import { Window, Content, ClosedBtn} from './AddPopUpStyle';


function PopUp(props) {

    return props.trigger ? (
        <Window>
            <Content>
                
                <h1 style={{marginBottom: '40px'}}>Trạng thái mã giảm giá</h1>
                <p> {props.DisState}</p>

                <ClosedBtn onClick={() => props.setTrigger(false)}>OK</ClosedBtn>    
            </Content>    

        </Window>
    ) : "";
}

export default PopUp;
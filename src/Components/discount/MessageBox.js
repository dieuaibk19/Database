import React from 'react'
import { Window, Content, ClosedBtn} from './AddPopUpStyle';


function PopUp(props) {

    return props.trigger ? (
        <Window>
            <Content>
                
                <div>Đã thêm vào thành công</div>
                <ClosedBtn onClick={() => props.setTrigger(false)}>OK</ClosedBtn>    
            </Content>    

        </Window>
    ) : "";
}

export default PopUp

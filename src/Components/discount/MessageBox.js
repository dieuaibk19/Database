import React from 'react'
import { Window, Content, ClosedBtn} from './AddPopUpStyle';


function PopUp(props) {

    return props.trigger ? (
        <Window>
            <Content>
                
                {!props.message && <div>Đã thêm vào thành công</div>}
                <div>{props.message}</div>
                <ClosedBtn onClick={() => props.setTrigger(false)}>OK</ClosedBtn>    
            </Content>    

        </Window>
    ) : "";
}

export default PopUp;

import React from 'react'
import { Window, Content, ClosedBtn} from './AddPopUpStyle';


function PopUp(props) {

    return props.trigger ? (
        <Window>
            <Content>
                
                <div>Thêm mã giảm giá</div>
                <form>
                    <label> Discount code: </label> <input></input>
                    <label> Discount value: </label> <input></input>
                    <label> Discount type: </label> <input></input>
                    <label> Valid date: </label> <input></input>
                    <label> Expire date: </label> <input></input>
                    <label> ID Shop: </label> <input></input>
                    <label> Shop Discount Type:  </label> <input></input>
                </form>
                <ClosedBtn onClick={() => props.setTrigger(false)}>OK</ClosedBtn>    
            </Content>    

        </Window>
    ) : "";
}

export default PopUp

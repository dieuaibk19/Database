import React from 'react'
import { Window, Content, ClosedBtn} from './AddPopUpStyle';


function PopUp(props) {
    console.log('Shop has valid discount ');
    const ShopList = props.ShopList;
    console.log(ShopList);
    return props.trigger ? (
        <Window>
            <Content>
                
                <h1>Danh sách shop</h1>
            {
                ShopList.map((item) => {
                    return (
                    <div>
                    <div> ID: {item.ID_SHOP}</div>
                    <div> NUM: {item.DISCOUNT_NUM}</div>
                    </div>
                    );
                })
            }
                <ClosedBtn onClick={() => props.setTrigger(false)}>Close</ClosedBtn>    
            </Content>    

        </Window>
    ) : "";
}

export default PopUp

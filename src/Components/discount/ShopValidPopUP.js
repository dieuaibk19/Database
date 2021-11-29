import React from 'react'
import { Window, Content, ClosedBtn} from './AddPopUpStyle';


function PopUp(props) {
    console.log('Shop has valid discount ');
    const ShopList = props.ShopList;
    if (ShopList.length === 0) {
        return <Window>
        <Content>
            <div>Không có shop nào</div>
            <ClosedBtn onClick={() => props.setTrigger(false)}>Close</ClosedBtn>  
        </Content>
        </Window>
    }

    return props.trigger ? (
        <Window>
            <Content>
                
                <h1 style={{marginBottom: '40px'}}>Danh sách shop</h1>

                <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)'}}>
                    <div style={{fontWeight:'bold'}}> ID </div>
                    <div style={{fontWeight:'bold'}}> NUM </div>
                    </div>
            {
                ShopList.map((item) => {
                    return (
                    <div div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)'}}>
                    <div> {item.ID_SHOP}</div>
                    <div> {item.DISCOUNT_NUM}</div>
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

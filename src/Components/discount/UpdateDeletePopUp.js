import React, {useState} from 'react';
import { Window, Content, ClosedBtn} from './AddPopUpStyle';
import MessageBox from './MessageBox';
import axios from 'axios';

function InputField (props){
    return (
        <div style={{textAlign: 'left', margin: '20px', position: 'relative'}}>
        <label> {props.label}: </label>
        <input style={{position: 'absolute', right: '10px'}} onChange = {(e) => props.handleOnChange(e.target.value)}></input>
        </div>
    );
}

function PopUp(props) {

    const [code, setCode] = useState('');
    const [value, setValue] = useState('');
    const [type, setType] = useState('');
    const [validDate, setValidDate] = useState('');
    const [expireDate, setExpireDate] = useState('');
    const [shopID, setShopId] = useState('');
    const [shopDisType, setShopDisType] = useState('');
    const [messageBox, setMessageBox] = useState(false);

    const handleSubmit = () => {
        if (code === '' || value === '' || type === '' || validDate ==='' || expireDate === '' || shopID === '' || shopDisType === ''){
            console.log('Du lieu khong hop le');
            return;
          }

          axios.put('http://localhost:5000/discount/shop', { 
            code: code,
            value: value,
            type: type,
            validDate: validDate,
            expireDate: expireDate,
            shopID: shopID,
            shopDisType: shopDisType
          })
          .then (setMessageBox(true))
          .catch(e => {
          console.log(e);});
        }

    return props.trigger ? (
        <Window>
            <Content>
                
                <h1 style={{marginBottom: '40px'}}>Thêm mã giảm giá</h1>
                <form>
                    <InputField label='Discount code' handleOnChange={(val) => setCode(val)}/>
                    <InputField label='Discount value' handleOnChange={(val) => setValue(val)}/>
                    <InputField label='Discount type' handleOnChange={(val) => setType(val)}/>
                    <InputField label='Valid date' handleOnChange={(val) => setValidDate(val)}/>
                    <InputField label='Expire date' handleOnChange={(val) => setExpireDate(val)}/>
                    <InputField label='ID shop' handleOnChange={(val) => setShopId(val)}/>
                    <InputField label='Shop Discount Type' handleOnChange={(val) => setShopDisType(val)}/>

{/* <label> Discount code: </label> <input></input>
    <label> Discount value: </label> <input></input>
    <label> Discount type: </label> <input></input>
    <label> Valid date: </label> <input></input>
    <label> Expire date: </label> <input></input>
    <label> ID Shop: </label> <input></input>
    <label> Shop Discount Type:  </label> <input></input> */}
    

                </form>
                <ClosedBtn onClick={handleSubmit}>Submit</ClosedBtn>
                <ClosedBtn onClick={props.setTrigger}>Close</ClosedBtn>       
            </Content>    
            {messageBox && <MessageBox trigger={messageBox} setTrigger={() => {setMessageBox(false); props.setTrigger();}}/>}

        </Window>
    ) : "";
}

export default PopUp

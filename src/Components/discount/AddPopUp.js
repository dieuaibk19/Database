import React, {useState, useEffect} from 'react';
import { Window, Content, ClosedBtn} from './AddPopUpStyle';
import MessageBox from './MessageBox';
import axios from 'axios';

function InputField (props){
    return (
        <div style={{textAlign: 'left', margin: '20px', position: 'relative'}}>
        <label> {props.label}: </label>
        <input style={{position: 'absolute', right: '10px'}} onChange = {(e) => props.handleOnChange(e.target.value)} value={props.value}></input>
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
    const [description, setDescription] = useState('');
    const [messageBox, setMessageBox] = useState(false);

    const handleSubmit = () => {
        //validate data
        
        if (code === '' || value === '' || type === '' || validDate ==='' || expireDate === '' || shopID === '' || shopDisType === ''){
            console.log('Du lieu khong hop le');
            return;
          }
        
          axios.post('http://localhost:5000/discount/shop', { 
            code: code,
            value: value,
            type: type,
            validDate: validDate,
            expireDate: expireDate,
            shopID: shopID,
            shopDisType: shopDisType,
            description: description
          })
          .then (setMessageBox(true))
          .catch(e => {
          console.log(e);});
        }

    const handleCloseMessageBox = () => {
        setCode('');
        setValue('');
        setType('');
        setValidDate('');
        setExpireDate('');
        setShopId('');
        setShopDisType('');
        setDescription('');

        setMessageBox(false);
    }

    return props.trigger ? (
        <Window>
            <Content>
                
                <h1 style={{marginBottom: '40px'}}>Thêm mã giảm giá</h1>
                <form>
                    <InputField label='Discount code' handleOnChange={(val) => setCode(val)} value={code}/>
                    <InputField label='Discount value' handleOnChange={(val) => setValue(val)} value={value}/>
                    <InputField label='Discount type' handleOnChange={(val) => setType(val)} value={type}/>
                    <InputField label='Valid date' handleOnChange={(val) => setValidDate(val)} value={validDate}/>
                    <InputField label='Expire date' handleOnChange={(val) => setExpireDate(val)} value={expireDate}/>
                    <InputField label='ID shop' handleOnChange={(val) => setShopId(val)} value={shopID}/>
                    <InputField label='Shop Discount Type' handleOnChange={(val) => setShopDisType(val)} value={shopDisType}/>
                    <InputField label='Discount Description' handleOnChange={(val) => setDescription(val)} value={description}/>

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
            {messageBox && <MessageBox trigger={messageBox} setTrigger={handleCloseMessageBox}/>}

        </Window>
    ) : "";
}

export default PopUp

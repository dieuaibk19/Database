import React, {useState, useEffect} from 'react';
import { Window, Content, ClosedBtn} from './AddPopUpStyle';
import MessageBox from './MessageBox';
import moment from 'moment';
import axios from 'axios';

function InputField (props){
    return (
        <div style={{textAlign: 'left', margin: '20px', position: 'relative'}}>
        <label> {props.label}: </label>
        <input type={props.type} style={{position: 'absolute', right: '10px'}} onChange = {(e) => props.handleOnChange(e.target.value)} value={props.value}></input>
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
    const [returnMessage, setReturnMessage]= useState('');
    const [messageBox, setMessageBox] = useState(false);

    const handleSubmit = () => {
        //validate data
        
        if (code === '' || value === '' || type === '' || validDate ==='' || expireDate === '' || shopID === '' || shopDisType === ''){
            setReturnMessage('Error, some field can not be empty !');
            setMessageBox(true);
            return;
          }

        if (code.length > 9){
            setReturnMessage('Error, discount code is too long !');
            setMessageBox(true);
            return;
        }

          if (value < 0){
            setReturnMessage('Error, value can not be less than or equal 0 !');
            setMessageBox(true);
            return;
        }

        if (type.toUpperCase() !== 'VOUCHER' && type.toUpperCase() != 'COUPON'){
            setReturnMessage('Error, type can only be Voucher or Coupon !');
            setMessageBox(true);
            return;
        }

        if (type.toUpperCase() !== 'COUPON' && value > 100){
            setReturnMessage('Error, Coupon can not be greater than 100 !');
            setMessageBox(true);
            return;
        }

        if (!moment(validDate, 'YYYY-MM-DD',true).isValid()){
            setReturnMessage('Error, valid date is invalid !');
            setMessageBox(true);
            return;
        }

        if (!moment(expireDate, 'YYYY-MM-DD',true).isValid()){
            setReturnMessage('Error, expire date is invalid !');
            setMessageBox(true);
            return;
        }

        if (shopDisType.toUpperCase() !== 'NORMAL' && shopDisType.toUpperCase() != 'SUBSCRIBED'){
            setReturnMessage('Error, Shop discount type can only be Normal or Subscribed !');
            setMessageBox(true);
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
          }).then((results) => setReturnMessage(results.data[0][0].ERROR_MESSAGE))
          .then (() => setMessageBox(true))
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
                    <InputField label='Discount value' handleOnChange={(val) => setValue(val)} value={value} type="number"/>
                    <InputField label='Discount type' handleOnChange={(val) => setType(val)} value={type}/>
                    <InputField label='Valid date' handleOnChange={(val) => setValidDate(val)} value={validDate}/>
                    <InputField label='Expire date' handleOnChange={(val) => setExpireDate(val)} value={expireDate}/>
                    <InputField label='ID shop' handleOnChange={(val) => setShopId(val)} value={shopID}/>
                    <InputField label='Shop Discount Type' handleOnChange={(val) => setShopDisType(val)} value={shopDisType}/>
                    <InputField label='Discount Description' handleOnChange={(val) => setDescription(val)} value={description}/>
                </form>
                <ClosedBtn onClick={handleSubmit}>Submit</ClosedBtn>
                <ClosedBtn onClick={props.setTrigger}>Close</ClosedBtn>       
            </Content>    
            {messageBox && <MessageBox trigger={messageBox} setTrigger={handleCloseMessageBox} message={returnMessage}/>}

        </Window>
    ) : "";
}

export default PopUp

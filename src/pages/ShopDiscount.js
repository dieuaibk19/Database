import ShopDisComponent from '../Components/discount/discountElement';
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import AddWindow from '../Components/discount/AddPopUp';
import ShopValidDiscountWindow from '../Components/discount/ShopValidPopUP';
import DisStateWindow from '../Components/discount/DisStatePopUP';
import 'react-datepicker/dist/react-datepicker.css';


export default function ShopDiscount() {
  //fetch data
  const [ShopDisList, setShopDisList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addTrigger, setAddTrigger] = useState(false);
  const [showShopTrigger, setShowShopTrigger] = useState(false);
  const [showDisStateTrigger, setshowDisStateTrigger] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [num, setNum] = useState(0);
  const [code, setCode] = useState(0);
  const [validDisList, setValidDisList] = useState([]);
  const [discountState, setDiscountState] = useState('');

  useEffect(async() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    axios.get('http://localhost:5000/discount/shop')
    .then((results) => {
      setShopDisList(results.data[0]);
      setLoading(false);
    })
    .catch(e => {
      console.log(e);
    });
  }

  const handleShowAll = () => {
    setLoading(true);
    fetchData();
  }

  const openAddWindow = () => {
    setAddTrigger(true);
  }

  function parseDate(date) {
    let parse_date = date.getFullYear().toString() + '-';
    let month = date.getMonth();

    if (month < 9){
      parse_date += '0';
    }
    parse_date += (date.getMonth() + 1).toString() + '-';
    parse_date += date.getDate().toString();

    return parse_date;
  }

  const handleChangeDate = (date) => {
    console.log(date);
    setSelectedDate(date);
  }

  const handleSearchExpDate = () => {
    if (selectedDate === null) {return;}
    const parse_date = parseDate(selectedDate);
    setLoading(true);
    axios.get('http://localhost:5000/discount/shop/expire_date', { params: {
      date: parse_date}})
    .then((results) => {
      setShopDisList(results.data[0]);
      setLoading(false);
    }).catch(e => {
      console.log(e);
    });
  }

  const onChangeNum = (e) => {
    setNum(e.target.value);
  }

  const handleShowShop = () => {
    axios.get('http://localhost:5000/discount/shop/shop_valid_date', { params: {
      num: num}})
    .then((results) => {
      setValidDisList(results.data[0]);
    })
    .then(() => setShowShopTrigger(true))
    .catch(e => {
      console.log(e);
    });
    
  }

  const onChangeCode = (e) => {
    setCode(e.target.value);
  }

  const handleShowDisState = () => {
    axios.get('http://localhost:5000/discount/shop/discount_state', { params: {
      code: code}})
    .then((results) => {
      setDiscountState(results.data[0].DISCOUNT_STATE);
    })
    .then(() => setshowDisStateTrigger(true))
    .catch(e => {
      console.log(e);
    });

  }

  
  return (
    loading ? (<h1> LOADING </h1>) : (<>
    <div style={{display: 'flex', gap: '50px', justifyContent: 'center', marginBottom:'60px', marginTop:'80px'}}>

    <div>
      <div style={{display: 'inline-block'}}>
      <DatePicker
            selected={selectedDate}
            onChange={(date) => handleChangeDate(date)}
            dateFormat='yyyy/MM/dd'
          />
          </div>
      <button onClick={handleSearchExpDate}>SEARCH EXPIRE DATE</button>
    </div>


    <div>
      <input type='number' onChange={onChangeNum} value={num}/>
      <button onClick={handleShowShop}>SHOW SHOP HAS VALID DISCOUNT</button>
    </div>

    <div>
      <input type='text' onChange={onChangeCode}/>
      <button onClick={handleShowDisState} value={code}>SHOW DISCOUNT STATE</button>
    </div>

    <div>
      <button onClick={openAddWindow}>ADD DISCOUNT</button>
    </div>

    <div>
      <button onClick={handleShowAll}>SHOW ALL</button>
    </div>

    </div>
      <ShopDisComponent DiscountList={ShopDisList} itemsPerPage={6} />
      {addTrigger && <AddWindow trigger={addTrigger} setTrigger={() => setAddTrigger(false)}/>}
      {showShopTrigger && <ShopValidDiscountWindow ShopList={validDisList} trigger={showShopTrigger} setTrigger={() => {setShowShopTrigger(false)}}/>}
      {showDisStateTrigger && <DisStateWindow DisState={discountState} trigger={showDisStateTrigger} setTrigger={() => setshowDisStateTrigger(false)}/>}
      
    </>)
  );

}
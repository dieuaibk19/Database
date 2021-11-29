import ShopDisComponent from '../Components/discount/discountElement';
import { useEffect, useState } from 'react';
import axios from 'axios';
import AddWindow from '../Components/discount/AddPopUp';
export default function ShopDiscount() {
  //fetch data
  const [ShopDisList, setShopDisList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addTrigger, setAddTrigger] = useState(false);

  useEffect(async() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get('http://localhost:5000/discount/shop')
    .then((results) => {
      setShopDisList(results.data[0]);
      setLoading(false);
      console.log(results.data[0]);
    }).catch(e => {
      console.log(e);
    });
  }

  const openAddWindow = () => {
    setAddTrigger(true);
  }
  

  return (
    loading ? (<h1> LOADING </h1>) : (<>
      <button onClick={openAddWindow}>ADD DISCOUNT</button>

      {/* <input placeholder='expire date'></input>
      <button>SEARCH DATE EXPIRE</button>
      <input placeholder='type'></input>
      <input placeholder='num'></input>
      <button>SEARCH DISCOUNT</button>
      <button>SHOW DISCOUNT EXPIRED TODAY</button> */}
      <ShopDisComponent DiscountList={ShopDisList} itemsPerPage={6} />
      {addTrigger && <AddWindow trigger={addTrigger} setTrigger={() => setAddTrigger(false)}/>}
    </>)
  );

}
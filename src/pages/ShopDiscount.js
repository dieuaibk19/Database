import ShopDisComponent from '../Components/discount/discountElement';
import { useEffect, useState } from 'react';
import axios from 'axios';
const ShopDisList = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
export default function ShopDiscount() {
  //fetch data
  //const [ShopDisList, setShopDisList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(async() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get('http://localhost:5000/discount/shop')
    .then((results) => {
      setLoading(false);
      console.log(results);
    }).catch(e => {
      console.log(e);
    });

  }
  

  return (
    loading ? (<h1> LOADING </h1>) : (<>
      <button>ADD DISCOUNT</button>
      <ShopDisComponent DiscountList={ShopDisList} itemsPerPage={6} />
    </>)
  );

}
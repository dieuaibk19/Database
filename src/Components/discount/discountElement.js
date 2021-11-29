import { Cell, Title, Row, Container } from './discountStyle';
import ReactPaginate from 'react-paginate';
import {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import UpdateDeleteWindow from './AddPopUp';
// import './review.css';
// import axios from 'axios';

function OneRow(props){
    const [trigger, setTrigger] = useState(false);
    const {DISCOUNT_CODE, DISCOUNT_VALUE, DISCOUNT_TYPE, VALID_DATE, EXPIRE_DATE, ID_SHOP, SHOP_DIS_TYPE} = props.info;
    function handleClick(){
      console.log('Click on 1 record');
      setTrigger(true);
    }
    return(
      <>
      <Row onClick = {handleClick}>
        <Cell>{DISCOUNT_CODE}</Cell>
        <Cell>{DISCOUNT_VALUE}</Cell>
        <Cell>{DISCOUNT_TYPE}</Cell>
        <Cell>{VALID_DATE}</Cell>
        <Cell>{EXPIRE_DATE}</Cell>
        <Cell>{ID_SHOP}</Cell>
        <Cell>{SHOP_DIS_TYPE}</Cell>
      </Row>
       {<UpdateDeleteWindow trigger={trigger}/>  }
      </>
    );
  }
  
  function TitleRow(){
    return (
      <Row>
        <Title>Code</Title>
        <Title>Value</Title>
        <Title>Type</Title>
        <Title>Valid date</Title>
        <Title>Expire date</Title>
        <Title>Shop ID</Title>
        <Title>Shop Dis Type</Title>
      </Row>
    );
  }



function Items({ currentItems }) {
  return (
    <div className="items" style={{width: '1000px'}}>
    {currentItems && currentItems.map((item) => (
      <div>
        <OneRow info={item}/>
      </div>
    ))}
      </div>
  );
}


function ShopDiscount({ DiscountList, itemsPerPage }) {

  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => { 
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(DiscountList.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(DiscountList.length / itemsPerPage));
    console.log('List nhan o element');
    console.log(DiscountList);
    console.log(currentItems);
  }, [itemOffset, itemsPerPage]);

  const handlePageClick = (event) => {
    const newOffset = event.selected * itemsPerPage % DiscountList.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <Container> 
      <TitleRow />
      <Items currentItems={currentItems}/>
      
      <div className='container' style={{display:'flex', justifyContent:'right', position:'absolute', bottom: '0px'}}>
      <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
      </div>
      </Container>


    
    </>
  );
}
  
  
  export default ShopDiscount;
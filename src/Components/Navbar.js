import "./Navbar.css"

export default function Navbar (props) {
  return (
    <div>
      <div align="center">
          <button type="button" class="bt " >
            {" "}
            CUSTOMER
          </button>
          <button type="button" class="bt margin-left" >
            PRODUCT
          </button>
          <button type="button" class="bt margin-left" >
            <a style={{textDecoration: 'none', color: 'black'}} href='http://localhost:3000/discount/shop_discount'> DISCOUNT </a>
          </button>
            
          <button type="button" class="bt margin-left">
          CART
          </button>
          <button type="button" class="bt margin-left" >
          ORDER
          </button>
          
      </div>
    </div>
  );
};


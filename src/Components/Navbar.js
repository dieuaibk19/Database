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
            DISCOUNT
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


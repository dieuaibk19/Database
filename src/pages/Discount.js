import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

<Switch>
<Route path="/discount/shop_discount" exact component={ShopDiscount} />
<Route path="/discount/system_discount" exact component={SystemDiscount} />
</Switch>
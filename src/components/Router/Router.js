import React from 'react';
import {Route, Switch} from 'react-router-dom';

import Landing from '../Landing/Landing';
import Catalogue from '../Catalogue/Catalogue';
import Login from '../Login/Login';
import UserSettings from '../UserSettings/UserSettings';
import Products from '../Products/Products';
import Um from '../Um/Um';
import Departments from '../Departments/Departments';
import Credits from '../Credits/Credits';
import Invoices from '../Invoices/Invoices';


const Router = ()=> {
    return(
        <Switch>
            <Route path="/" exact component={Landing} />
            <Route path="/catalogo" component={Catalogue} />
            <Route path="/login" component={Login} />
            <Route path="/user_settings" component={UserSettings} />
            <Route path="/edit_products" component={Products} />            
            <Route path="/edit_um" component={Um} />            
            <Route path="/edit_departments" component={Departments} />            
            <Route path="/edit_credits" component={Credits} />            
            <Route path="/edit_invoices" component={Invoices} />            
        </Switch>

    )
}

export default Router;
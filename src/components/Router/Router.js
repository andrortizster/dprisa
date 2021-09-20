import React from 'react';
import {Route, Switch} from 'react-router-dom';

import Landing from '../Landing/Landing';
import Catalogue from '../Catalogue/Catalogue';
import Login from '../Login/Login';

const Router = ()=> {
    return(
        <Switch>
            <Route path="/" exact component={Landing} />
            <Route path="/catalogo" component={Catalogue} />
            <Route path="/login" component={Login} />
        </Switch>

    )
}

export default Router;
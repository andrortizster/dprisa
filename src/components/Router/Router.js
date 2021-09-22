import React from 'react';
import {Route, Switch} from 'react-router-dom';

import Landing from '../Landing/Landing';
import Catalogue from '../Catalogue/Catalogue';
import Login from '../Login/Login';
import UserSettings from '../UserSettings/UserSettings';

const Router = ()=> {
    return(
        <Switch>
            <Route path="/" exact component={Landing} />
            <Route path="/catalogo" component={Catalogue} />
            <Route path="/login" component={Login} />
            <Route path="/user_settings" component={UserSettings} />
        </Switch>

    )
}

export default Router;
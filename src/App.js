import React, { useEffect, useState } from 'react';
import './App.css';
import {BrowserRouter} from 'react-router-dom';
import { connect,} from 'react-redux';



import NavBar from './components/NavBar/NavBar';
import Router from './components/Router/Router';
import * as actionTypes from './store/actions';

function App(props) {
  const { onInitUser } = props;

  useEffect(()=>{
    if (localStorage.usuario) {
      onInitUser(localStorage.usuario)
    }
  },[onInitUser])


  return (
    <BrowserRouter>
      <NavBar/>  
      <Router />
    </BrowserRouter>
  );
}

const mapStateToProps = state => {
    return {      
      user: state.user,
    }
}


const mapDispatchToProps = dispatch => {
    return{
      onInitUser: (user) => dispatch(actionTypes.initUser(user)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);

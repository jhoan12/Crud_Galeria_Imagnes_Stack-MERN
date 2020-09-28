import React from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";


import Navbar from './components/Navbar';
import Registrar from './components/Registrar';
import Login from './components/Login';
import Articulos from './components/Articulos';
import AgregarArticulo from './components/AgregarArticulo';
import EditarArticulo from './components/EditarArticulo';
import Galeria from './components/Galeria';
import AgregarImagen from './components/AgregarImagen';
import Footer from './components/Footer';

const Protegida = (props) => {
  const token = sessionStorage.getItem('token')
  if(token){
    return <Route {...props}/>  
  }else{
    return <Redirect to="/"/>
  }
}

function App() {
  return (
    <Router>
      <Navbar/>
      <Switch>
        <Route path="/" exact component={Login}/>
        <Route path="/registrar" exact component={Registrar}/>
        <Protegida path="/galeria" exact component={Articulos}/>
        <Protegida path="/agregarArticulo" exact component={AgregarArticulo}/>
        <Protegida path="/actualizarArticulo/:id" exact component={EditarArticulo}/>
        <Protegida path="/galeriaArticulo/:id" exact component={Galeria} />
        <Protegida path="/agregarImagen/:id" exact component={AgregarImagen}/>
      </Switch>
      <Footer/>
    </Router>
  );
}

export default App;

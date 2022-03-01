import React from 'react'
import { BrowserRouter as  Route, Router, Switch } from 'react-router-dom'
import { Form } from '../components/Form';
import Inicio from '../components/Inicio';
import { List } from '../components/List';
import { Navbar } from '../components/Navbar';


export const AppRouter = () => {
    return (
        <div>
            <Router>
            <Navbar/>
                <Switch>
                    <Route exact path="/Registro" element={<Form/>}/>
                    <Route exact path="/Listar" element={<List/>}/>
                    <Route exact path="/Inicio" element={<Inicio/>}/>
                </Switch>
            </Router>
        </div>
    )
}

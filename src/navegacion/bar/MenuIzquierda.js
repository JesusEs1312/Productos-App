import { Divider, List, ListItem, ListItemText } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export const MenuIzquierda = (classes) => {
    <div className = {classes.list}>
        <List>
            <ListItem components={Link} button to="/auth/perfil">
                <i className="material-icons">account_box</i>
                <ListItemText classes={{primary : classes.listItemText}} primary="Perfil"/>
            </ListItem>
        </List>
        <Divider/>
        <List>
            <ListItem components={Link} button to="/producto/nuevo">
                <i className="material-icons">add_box</i>
                <ListItemText classes={{primary : classes.listItemText}} primary="Nuevo Producto"/>
            </ListItem>
            <ListItem components={Link} button to="/producto/lista">
                <i className="material-icons">menu_book</i>
                <ListItemText classes={{primary : classes.listItemText}} primary="Lista Productos"/>
            </ListItem>
        </List>
    </div>
} 
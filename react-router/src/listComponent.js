import React, { Component } from "react";



export default class ListComponent extends Component{
    render(){
        return [
            <li key="A">1st item</li>,
            <li key="B">2nd item</li>,
            <li key="C">3rd item</li>
        ];
    }
}



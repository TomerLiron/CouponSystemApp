import { Card } from '@material-ui/core';
import React from 'react';
import Button from '../../UI/Button/Button'
export default function Details(props) {
  return (
    <Card style={{backgroundColor:"rgb(0, 135, 240)"}}>
      <h1>{"Company Name:" + props.company.name}</h1>
      <h1>{"Id:" + props.company.id}</h1>
      <h1>{"email:" + props.company.email}</h1>
      <Button style={{float:"right"}} onClick={props.hideDetails}>Hide</Button>
    </Card>
    
  );
};


import React from 'react';

export default function Details(props) {
        return (
          <ul >
            <li>
              <p>{"Company Name:" + props.company.name}</p>
              <p>{"Id:" + props.company.id}</p>
              <p>{"email:" + props.company.email}</p>
            </li>
      
      
      
          </ul>
        );
      };


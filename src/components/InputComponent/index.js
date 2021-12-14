import React from 'react'
import { InputGroup , Form } from 'react-bootstrap'
const InputComponent = (props) => {

    return (

    <React.Fragment>
        <Form.Label srOnly>{props.label}</Form.Label>
            <InputGroup>
             
              <Form.Control
                type={props.type}
                id={props.id}
                name={props.email}
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.onChange}
                {...props}
              />
              
            </InputGroup>
    </React.Fragment>

    )

}

export default InputComponent
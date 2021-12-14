import { InputGroup, FormControl } from 'react-bootstrap'

const passwordInput = (props) => {

    return(
        <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">Password</InputGroup.Text>
        <FormControl
          placeholder="Password"
          aria-label="Password"
          aria-describedby="basic-addon1"
          size={props.size}
          {...props}
        />
        </InputGroup>
    )
}

export default passwordInput

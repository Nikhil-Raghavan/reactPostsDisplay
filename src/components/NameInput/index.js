import { InputGroup, FormControl } from 'react-bootstrap'

const nameInput = (props) => {

    return(
        <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">Name</InputGroup.Text>
        <FormControl
          placeholder="Username"
          aria-label="Username"
          aria-describedby="basic-addon1"
          size={props.size}
          {...props}
        />
        </InputGroup>
    )
}

export default nameInput

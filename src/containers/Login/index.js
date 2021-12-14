import React, { useEffect, useState } from 'react';
import styles from './index.module.css'
import { Helmet } from 'react-helmet';
import NameInput from '../../components/NameInput';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from '../../utils/injectReducer';
import { useInjectSaga } from '../../utils/injectSaga';
// import saga from './saga';
import reducer from './reducer';
import { makeSelectToken } from './selector';
import PasswordInput from '../../components/PasswordInput';
import { setToken } from './actions'
import { Form, Button, Container, InputGroup, Row , Col } from 'react-bootstrap';
import vrfJson from '../../jsons/verification.json'


const key = 'Login';

const Login = ({token, setValidationToken , history, location}) => {

  useInjectReducer({ key, reducer });
  // useInjectSaga({ key, saga });


  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [validated, setValidated] = useState(false);
  const [userValidated, setUserValidated] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  useEffect(() => {
    console.log("token is", token)
  }, [token]);

  const handleValidated = () =>{
    localStorage.setItem('validUser', true )
    history.push('/dashboard')
  }

  const handleSubmit=(e)=>{
    e.preventDefault()
    // const frm = document.getElementsByName('loginform')[0];
    // console.log(frm);
    // console.log(e)

    const form = e.currentTarget;
    console.log(form,form.checkValidity())

    if (form.checkValidity() === true) {
      setValidated(true);
      
      console.log(userName,password)
  
      let formData = {"userName": userName, "password": password}
  
      console.log(formData)

      // console.log("json is",vrfJson)

      let users = vrfJson.users


      users.map((key,value) =>{

        if(formData.userName == key.username && formData.password == key.password){
          console.log("matched",key.username,key.password)
          setUserValidated(true)
         
        }
      })

      if(userValidated){
        handleValidated();
      }

      else {
        alert("Please enter a valid username and password")
      }

     

      e.stopPropagation();

      setValidationToken();
    }

    

    // if(validated){

    //   // console.log(e.target,"consoled")

    //   // console.log(userName,password)
  
    //   // let formData = {"userName": userName, "password": password}
  
    //   // console.log(formData)

    // }

   
  }
  return (
    <React.Fragment>
      <Helmet>
        <title>React App-Login</title>
        <meta
          name="description"
          content=""
        />
  

      </Helmet>

      <Container>
        {/* <h1>Login Component Goes Here</h1> */}

        {/* <Form className={styles.formClass}>
            <NameInput size="sm" onChange={(e)=>{console.log(e.target.value)}}/>
            <PasswordInput size="sm" onChange={(e)=>{console.log(e.target.value)}}/>

            <Button variant="primary" type="submit" onClick={handleSubmit}>
                Submit
                </Button>

        </Form> */}


        
      <Form
          className={styles.formClass}
          id="loginform"
          name="loginform"
          onSubmit={handleSubmit}
          noValidate 
          validated={validated}
        >
            <Form.Label srOnly>Username</Form.Label>
            <InputGroup>
             
              <Form.Control
                type="text"
                id="userId"
                name="username"
                placeholder="Username"
                minLength="4"
                maxLength="40"
                required
                value={userName}
                // pattern="^[a-zA-Z0-9-.]+$"
                onChange={e => setUserName(e.target.value)}
              />
              <Form.Control.Feedback></Form.Control.Feedback>
            </InputGroup>


            <Form.Label srOnly>Password</Form.Label>
            <InputGroup>
            
              <Form.Control
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </InputGroup>
          
          <Button
            style={{ backgroundColor: '#00aae4', borderColor: '#00aae4' }}
            // onClick={handleSubmit}
             type="submit"
          >
            Submit
          </Button>
        </Form>



      </Container>

    </React.Fragment >
  );
}


const mapStateToProps = createStructuredSelector({
  token: makeSelectToken()
});

export function mapDispatchToProps(dispatch) {
  return {
      setValidationToken: () => {
          dispatch(setToken());
      },
  }
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Login)

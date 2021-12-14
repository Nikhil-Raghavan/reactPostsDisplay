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
import validEmails from '../../jsons/validEmails.json'
import InputComponent from '../../components/InputComponent';


const key = 'Login';

const Login = ({token, setValidationToken , history, location}) => {

  useInjectReducer({ key, reducer });


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validated, setValidated] = useState(false);
  const [userValidated, setUserValidated] = useState(false);
  const [errors, setErrors] = useState('')

  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  useEffect(() => {
    if(userValidated){
      localStorage.setItem('validUser', true )
    history.push('/dashboard')
    }
  }, [userValidated]);

  // const handleValidated = () =>{
  //   localStorage.setItem('validUser', true )
  //   history.push('/dashboard')
  // }

  const handleSubmit=(e)=>{
    e.preventDefault()
    if(validate()){
      console.log("validated")

      let formData = {"email": email, "password": password}

      console.log(formData)

         let users = vrfJson.users

      users.map((key,value) =>{

        if(formData.email == key.email && formData.password == key.password){
          console.log("matched",key.email,key.password)
          setUserValidated(true)
         
        }
      })

    }

    // if (form.checkValidity() === true) {
    //   setValidated(true);
  // }  
   
  }  

  const validate= () =>{
    let errors = {};
    let isValid = true;

    if (!email) {
      isValid = false;
      errors["email"] = "Please enter your email Address.";
    }

    if (!password) {
      isValid = false;
      errors["password"] = "Please enter password.";
    }

    if (email !== "") {
        
      var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
      if (!pattern.test(email)) {
        isValid = false;
        errors["email"] = "Please enter valid email address.";
      }

      let emailDomain = email.split('@');

      let emailIsWork = validEmails.includes(emailDomain[1])

      if(!emailIsWork){
        isValid = false;
        errors["email"] = "Please enter a work email domain"
      }
    }

    if(password !== ""){
      var pattern = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
      if (!pattern.test(password)) {
        isValid = false;
        errors["password"] = "Password should minimum of 8 letters with a combination of at least one number, one special character, and one Capital letter.";
      }
    } 

    setErrors(errors)

    return isValid;
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
               
      <Form
          className={styles.formClass}
          id="loginform"
          name="loginform"
          onSubmit={handleSubmit}
          noValidate 
          // validated={validated}
        >
            <InputComponent
                label="Email"
                type="text"
                id="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}/>

            <div className={styles.error}>{errors.email ? errors.email : null}</div>

            <InputComponent
                label="Password"
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}/>
            
            <div className={styles.error}>{errors.password ? errors.password : null}</div>
                  


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

import { Button, Form, Col, Row } from 'react-bootstrap'
import { useState } from "react";
import "../style/register.css";
import { API } from '../API';
import swal from 'sweetalert';
import { useHistory } from 'react-router-dom';


const Register = () => {
  
  // הגדרת משתנים עבור טופס הרשמה
  const history = useHistory()


  const [validated, setValidated] = useState(false);

  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [City, setCity] = useState('');
  const [Birthday, setBirthday] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');
  const [Id, setId] = useState('');
  const [file, setFile] = useState('');




  const handleSubmit = (event) => {

    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }


    // === לעומת == גם מתייחס לסוג המשתנים ולא רק לערך שלהם כמו ב ==
    if (Password === ConfirmPassword && Password.length >= 8 && Password.length <= 12) { //אם הסיסמאות זהות ניתן להירשם
      setValidated(true);
      uploadImage();
      swal("You have successfully registered!", "", "success");
      history.push(`/Login`);
    }

    if (Password === ConfirmPassword && Password.length < 8 || Password.length > 12) { //אם הסיסמאות זהות ניתן להירשם
      event.preventDefault();
      event.stopPropagation();
      swal("Password length is incorrect! Password length should be between 8 and 12 numbers!", "", "warning");
      return;
    }


    if (Password != ConfirmPassword ) { //אם הסיסמאות אינן זהות לא ניתן להתחבר 
      event.preventDefault();
      event.stopPropagation();
      swal("Stop", "Passwords don't match!", "warning");
      return;
    }
  };




  const uploadImage = async () => { //העלאת תמונה
    try {
      const form = new FormData();
      form.append("photo", file); //הוספת קובץ
      let res = await fetch(API.USERS.UPLOAD, {
        method: 'POST',
        body: form
      });
      let data = await res.json()
      if (data.img) {
        registerUser(data.img)
      }
    } catch (error) {
      swal(error, "", "error");
    }
  }




  const registerUser = async (img) => { //פונקציה להרשמה של משתמש
    try {
      let user = {
        FirstName,
        LastName,
        City,
        Birthday,
        Email,
        Password,
        Id,
        UserTypeCode: 1,
        ConfirmPassword,
        Photo: img
      }
      console.log(user)
      let res = await fetch(API.USERS.ADD, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      });
      // let data = await res.json();

    } catch (error) {
      console.log(error)
      swal(error, "", "error");
    }
  }







  return (

    <div className="reg">
      <Form noValidate validated={validated} onSubmit={handleSubmit} >

        <div className="titlePageRegister">
          <p>Another moment and you are with us 😃</p>
        </div>

        <Row className="mb-3">

          <Form.Group as={Col} md="3" controlId="validationCustom01">
            <Form.Label>First name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="First name"
              value={FirstName}
              onChange={(event) => setFirstName(event.target.value)}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>


          <Form.Group as={Col} md="3" controlId="validationCustom02">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Last name"
              value={LastName}
              onChange={(event) => setLastName(event.target.value)}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>



        </Row>

        <Row className="mb-3">

          <Form.Group as={Col} md="3" controlId="validationCustom03">
            <Form.Label>City</Form.Label>
            <Form.Control type="text"
              placeholder="City"
              value={City}
              onChange={(event) => setCity(event.target.value)}
              required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid city.
            </Form.Control.Feedback>
          </Form.Group>


          <Form.Group as={Col} md="3" controlId="validationCustom04">
            <Form.Label>Birthday</Form.Label>
            <Form.Control
              placeholder="Birthday"
              value={Birthday}
              type="date"
              onChange={(event) => setBirthday(event.target.value)}
              required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid state.
            </Form.Control.Feedback>
          </Form.Group>


          <Form.Group as={Col} md="4" controlId="validationCustom05">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email"
              placeholder="Email"
              value={Email}
              onChange={(event) => setEmail(event.target.value)}
              required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid zip.
            </Form.Control.Feedback>
          </Form.Group>


        </Row>

        <Row className="mb-3">

          <Form.Group as={Col} md="3" controlId="validationCustom05">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password"
              value={Password}
              onChange={(event) => setPassword(event.target.value)}
              required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid zip.
            </Form.Control.Feedback>
          </Form.Group>


          <Form.Group as={Col} md="3" controlId="validationCustom05">
            <Form.Label> Confirm password</Form.Label>
            <Form.Control type="password" placeholder="Confirm password"
              value={ConfirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid zip.
            </Form.Control.Feedback>
          </Form.Group>


          <Form.Group as={Col} md="3" controlId="validationCustom05">
            <Form.Label>Id</Form.Label>
            <Form.Control type="number" placeholder="Id"
              value={Id}
              onChange={(event) => setId(event.target.value)}
              required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid zip.
            </Form.Control.Feedback>
          </Form.Group>


          <Form.Group as={Col} md="4" className="mb-3" controlId="validationCustom05">
            <br></br>
            <Form.Control
              type="file"
              onChange={(event) => setFile(event.target.files[0])}
              required
            />
            <br></br>
          </Form.Group>
        </Row>

        <Form.Group className="mb-3">
          <Form.Check
            required
            label="Agree to terms and conditions"
            feedback="You must agree before submitting."
            feedbackType="invalid"
          />
        </Form.Group>

        <div className="sub">
          <Button type="submit">Submit form</Button>
        </div>

      </Form>
    </div >

  );
}

export default Register;
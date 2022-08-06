import { useHistory } from 'react-router-dom';
import React from 'react';
import "bootstrap/dist/css/bootstrap.css";
import '../style/login_page.css';
import { useState } from "react";
import { Form, Button } from 'react-bootstrap';
import { API } from '../API';
import swal from 'sweetalert';
import Modal from 'react-bootstrap/Modal'



const Login = () => {

  const history = useHistory()

  // for popup add topic close or open window
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');

  const [Id, setId] = useState('');





  // Initialize a boolean state
  const [passwordShown, setPasswordShown] = useState(false);


  // פונקציה המאפשרת להשפיע על ההצגה של הסיסמא כטקסט או נקודות
  const togglePassword = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
  };






  //טיפול בשגיאות
  const checkLogin = async () => {

    if (Email == '' || Password == '') {
      swal("Stop", "You need to fill in all the fields!", "warning");
      return;
    }

    else {
      loginUser();
    }
  }


  
  // אם השדה ריק id טיפול בשגיאה בהכנסת 
  const checkIdForget = async () => {

    if (Id == '') {
      swal("Stop", "You need to fill in the field!", "warning");
      return;
    }

    else {
      ForgetPassword();
    }
  }




  //פונקציה שמטפלת במקרה אם משתמש שכח את הסיסמא שלו וייצור אחת חדשה 
  const ForgetPassword = async () => {

    try {
      let user = { Id }

      let res = await fetch(API.USERS.FORGET, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      });

      let data = await res.json()

      let u = JSON.parse(sessionStorage.getItem("user"));

      if (u != null || u != undefined) { // אם יש משתמש מחובר אז לא ניתן לבצע התחברות חדשה
        swal("Stop", "You need to logout first!", "warning");
        return;
      }

      else {
        history.push(`/updateNewPassword/${data.User_code}`); //מעבר לדף עדכון סיסמא חדשה אם שכח את הישנה
        window.location.reload(false); // רענון דף
      }

    } catch (error) {
      console.log(error)
    }
  }




  // פונקציה שמטפלת בהתחברות המשתמש לאתר
  const loginUser = async () => {

    try {
      let user = { Email, Password }

      let res = await fetch(API.USERS.LOGIN, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      });

      let data = await res.json() // ממיר את הres לאובייקט json
      let u = JSON.parse(sessionStorage.getItem("user"));

      if (u != null || u != undefined) { // אם יש משתמש מחובר אז לא ניתן לבצע התחברות חדשה
        swal("Stop", "You need to logout first!", "warning");
        return;
      }


      // אם המשתמש לא מחובר - ניתן לבצע התחברות - לפי סוג משתמש
      if (data.UserType_code == 1) { // מעבר לדף פרופיל של משתמש ספציפי
        sessionStorage.setItem("user", JSON.stringify(data))
        history.push(`/Profile/${data.User_code}`);
        window.location.reload(false); // רענון דף
      }

      if (data.UserType_code == 2) { // מעבר לדף מנהל האתר
        sessionStorage.setItem("user", JSON.stringify(data))
        history.push(`/Admin/${data.User_code}`);
        window.location.reload(false);
      }


    } catch (error) {
      console.log(error)
    }
  }



  // פונקציה הבודקת אם המשתמש מחובר או לא כדי לדעת אם המשתמש זקוק להרשמה לאתר
  const checkUserLogin = async () => {

    let u = JSON.parse(sessionStorage.getItem("user"))

    if (u != null || u != undefined) {
      swal("Stop", "You need to Logout first!", "warning");
    }
    else {
      history.push(`/Register`);
    }
  }




  //connect demo user
  const loginUserDemo = async () => {

    try {
      let user = {
        Email: "User@gmail.com",
        Password: "1111"
      }

      let res = await fetch(API.USERS.LOGIN, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      });


      let data = await res.json() // ממיר את הres לאובייקט json
      let u = JSON.parse(sessionStorage.getItem("user"));


      if (u != null || u != undefined) { // אם יש משתמש מחובר אז לא ניתן לבצע התחברות חדשה
        swal("Stop", "You need to logout first!", "warning");
        return;
      }


      // אם המשתמש לא מחובר - ניתן לבצע התחברות - לפי סוג משתמש
      if (data.UserType_code == 1) { // מעבר לדף פרופיל של משתמש ספציפי
        sessionStorage.setItem("user", JSON.stringify(data))
        history.push(`/Profile/${data.User_code}`);
        window.location.reload(false); // רענון דף
      }

    } catch (error) {
      console.log(error)
    }
  }




  return (

    <div>
      <section className="banner">

        <div className="box contect">

          <div className="log">
            <h3>How good you are back to us! 😎</h3>
            <br></br>

            <input type="email"
              id="fname"
              name="fname"
              placeholder="Email"
              value={Email}
              onChange={(event) => setEmail(event.target.value)} />

            <br></br>
            <br></br>


            <div className='hidePass'>
              <input type={passwordShown ? "text" : "password"}
                id="fname"
                name="fname"
                placeholder="Password"
                value={Password}
                onChange={(event) => setPassword(event.target.value)}
              />


              <a onClick={togglePassword}><img src="https://img.icons8.com/ios-glyphs/30/000000/visible--v2.png" /></a>
            </div>


            <Button variant="primary" type="Login" onClick={checkLogin}>
              Login
            </Button>

            <br />



            <a href="#" className="forget" onClick={loginUserDemo}
              style={{ textDecoration: "none", color: "black", fontWeight: "600", fontSize: "13px", }}
            >Connect Demo User
            </a>


            <br />
            <br />


            <Form.Text className="text-muted">
              Forgot your password? Immediate recovery from here.
              Or you can contact us.
            </Form.Text>


            <a href="#" className="forget" onClick={handleShow}
              style={{ textDecoration: "none", color: "black", fontWeight: "bold", fontSize: "14px", }}
            >Password Recovery
            </a>



            <Modal show={show} onHide={handleClose} animation={true} size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >

              <section className="window1">

                <div className="boxWin image">


                </div>

                <div className="boxWin contectWin">

                  <div className="AddTopicPop">

                    <label for="fname" style={{ fontFamily: "Verdana" }}>User Id :</label><br />
                    <input type="text"
                      required
                      placeholder="User Id"
                      value={Id}
                      onChange={(event) => setId(event.target.value)}
                    />

                    <br></br>

                    <Button variant="success" type="addTopic" onClick={checkIdForget}>
                      Set Id
                    </Button>

                  </div>
                </div>
              </section>
            </Modal>


          </div>
        </div>



        <div className="box image">

          <div className="imageLogin">

            <Form>
              <Form.Text className="text-muted1">
                <p>you don't have user?</p>
              </Form.Text>
              <br></br>

              <Button variant="primary"
                type="Login"
                onClick={checkUserLogin}
                style={{ textDecoration: "none", color: "white", fontSize: "17px" }}>
                Register here!
              </Button>

            </Form>

          </div>
        </div>
      </section>
    </div>

  );

}

export default Login;
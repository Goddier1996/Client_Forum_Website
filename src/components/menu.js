import { useEffect, useState } from 'react';
import './style_componets/menu.css';
import 'bootstrap/dist/css/bootstrap.css'
import { Nav, Navbar, Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';


const Menu = () => {

  
  const [user, SetUser] = useState({})
  const history = useHistory()

  let u = JSON.parse(sessionStorage.getItem("user")) //יצירת משתנה מהסאשיין על מנת להציג תמונה של משתמש ספציפי





  const LoadUser = async () => {

    let u = JSON.parse(sessionStorage.getItem("user"))

    if (u == null || u == undefined) {
      SetUser("");
    }
    else {
      SetUser(u);
    }
  }



  const checkProfile = async () => { //אם המשתמש לא מחובר לא יוכל להיכנס לפרופיל ולהפך 

    let u = JSON.parse(sessionStorage.getItem("user"))

    if (u == null || u == undefined) {
      swal("Stop", "You need to login first!", "warning");
    }
    else {
      history.push(`/Profile/${u.User_code}`);
    }
  }




  const checkRegister = async () => { // אם המשתמש מחובר הוא לא יוכל לבצע הרשמה ולהפך

    let u = JSON.parse(sessionStorage.getItem("user"))

    if (u != null || u != undefined) {
      swal("Stop", "You need to Logout first!", "warning");
    }
    else {
      history.push(`/Register`);
    }
  }



  useEffect(() => {

    LoadUser();
  }, [])






  if (u == null || u == undefined) { // אם אין משתמש מחובר מציגים את התמונת ברירת מחדל 

    return (

      <>
        <Navbar style={{ background: "#f6f5fa" }} expand="lg">
          <Navbar.Brand className="Logo">
            <Link to="/" >
              <img
                src={require("../images/Logo.png").default}
              />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="mr-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >

              <div className="linksChoise">

                {/* <Button style={{ margin: "5px" }} variant="primary"><a href="https://www.facebook.com/" style={{ textDecoration: "none", color: "white", fontWeight: "bold" }}><p>Facebook</p></a></Button>{' '} */}

                <Button style={{ margin: "5px" }} variant="outline-success"><Link to="/Login" style={{ textDecoration: "none", color: "black" }}><p>Login</p></Link></Button>{' '}

                <Button style={{ margin: "5px" }} variant="outline-success"><Link onClick={checkRegister} style={{ textDecoration: "none", color: "black" }}><p>Register</p></Link></Button>{' '}

              </div>

            </Nav>


            {/* <Form className="d-flex">
              <img
                src={require("../images/user1.png").default}
                width="36"
                height="36"
                style={{ cursor: "pointer" }}
                alt="Profile"
                onClick={checkProfile}
              />
            </Form> */}

          </Navbar.Collapse>
        </Navbar>
      </>

    );
  }



  else { // אם המשתמש מחובר - הצגת תמונה אישית

    return (

      <>
        <Navbar style={{ background: "#f6f5fa" }} expand="lg">
          <Navbar.Brand className="Logo">
            <Link to="/" style={{ textDecoration: "none" }}>
              <img
                src={require("../images/Logo.png").default}
              />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="mr-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >

              <div className="linksChoise">

                {/* <Button style={{ margin: "5px" }} variant="primary"><a href="https://www.facebook.com/" style={{ textDecoration: "none", color: "white", fontWeight: "bold" }}><p>Facebook</p></a></Button>{' '} */}

                {/* <Button style={{ margin: "5px" }} variant="outline-success"><Link to="/Login" style={{ textDecoration: "none", color: "black" }}><p>Login</p></Link></Button>{' '} */}

                {/* <Button style={{ margin: "5px" }} variant="outline-success"><Link onClick={checkRegister} style={{ textDecoration: "none", color: "black" }}><p>Register</p></Link></Button>{' '} */}

              </div>


            </Nav>


            <Form className="d-flex" style={{ display: "flex", flexDirection: "column" }}>

              <img
                src={user.Photo}
                width="50"
                height="50"
                style={{ cursor: "pointer", borderRadius: "50%", border: "2px solid grey" }}
                alt="Profile"
                onClick={checkProfile}
              />
              Hi {user.First_name}

            </Form>
          </Navbar.Collapse>
        </Navbar>
      </>

    );
  }


}


export default Menu;
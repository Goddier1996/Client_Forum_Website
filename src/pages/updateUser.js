import { Button, Form, Col, Row } from 'react-bootstrap'
import '../style/MessagePage_CommunityPage.css';
import { useEffect, useState } from 'react';
import { API } from '../API';
import { useParams, useHistory } from 'react-router-dom';
import React from 'react';
import swal from 'sweetalert';


// עדכון פרטי משתמש בדף אדמין בלבד
const UpdateUser = () => {

    const history = useHistory()

    const [FirstName, setFirstName] = useState('');
    const [LastName, setLastName] = useState('');
    const [City, setCity] = useState('');
    const [Birthday, setBirthday] = useState('');
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [ConfirmPassword, setConfirmPassword] = useState('');
    const [Id, setId] = useState('');

    const [users, SetUser] = useState([]);

    let { id } = useParams();





    const LoadUser = async () => {

        let res = await fetch(`${API.USERS.GET}/${id}`, { method: 'GET' });

        let data = await res.json();
        SetUser(data);
    }





    // טיפול בשגיאות בנסיון לשנות לסיסמא חדשה
    const checkPasswordInput = async () => {

        if (Password == '' || ConfirmPassword == '') {
            swal("Stop", "You need to fill in all the fields!", "warning");
            return;
        }

        if (Password === ConfirmPassword && Password.length >= 8 && Password.length <= 12) { //אם הסיסמאות זהות ניתן להירשם
            swal("You have successfully update your password!", "", "success");
            updateUser();
        }

        if (Password === ConfirmPassword && Password.length < 8 || Password.length > 12) { //אם הסיסמאות זהות ניתן להירשם
            swal("Password length is incorrect! Password length should be between 8 and 12 numbers!", "", "warning");
            return;
        }


        if (Password != ConfirmPassword) { //אם הסיסמאות אינן זהות לא ניתן להתחבר 
            swal("Stop", "Passwords don't match!", "warning");
            return;
        }
    }



    const updateUser = async () => {
        let userData = JSON.parse(sessionStorage.getItem("user"));

        try {
            let d = new Date(Birthday);

            let user = {
                First_name: FirstName,
                Last_name: LastName,
                City,
                Birthday: `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`,
                Email,
                User_password: Password,
                Id,
                UserType_code: 1,
                Photo: null,
                Confirm_password: ConfirmPassword
            }

            let res = await fetch(`${API.USERS.GET}/update/${id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            });
            let data = await res.json()
            swal("You have successfully updated user details!", "", "success");
            console.log(data)


            history.push(`/Admin/${userData.User_code}`); // לאחר העדכון חזרה לדף אדמין
            window.location.reload(false); // רענון דף

        } catch (error) {
            console.log(error)
        }
    }


    const handleFormSubmit = (e) => {

        e.preventDefault(); // אירועים לא פועלים בו זמנית-אירוע סינתטי
        checkPasswordInput();
    }



    useEffect(() => {
        LoadUser();
    }, [])




    return (

        users.map(user =>

            <div className="reg">

                <br></br>
                <br></br>
                <br></br>


                <Form onSubmit={handleFormSubmit}>


                    <Row className="mb-3">

                        <Form.Group as={Col} md="3" controlId="validationCustom01">
                            <Form.Label>First name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder={user.First_name}
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
                                placeholder={user.Last_name}
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
                                placeholder={user.City}
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
                                placeholder={user.Birthday}
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
                                placeholder={user.Email}
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
                            <Form.Control
                                type="password"
                                placeholder={user.User_password}
                                value={Password}
                                onChange={(event) => setPassword(event.target.value)}
                                required />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid zip.
                            </Form.Control.Feedback>
                        </Form.Group>


                        <Form.Group as={Col} md="3" controlId="validationCustom05">
                            <Form.Label> Confirm password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder={user.Confirm_password}
                                value={ConfirmPassword}
                                onChange={(event) => setConfirmPassword(event.target.value)}
                                required />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid zip.
                            </Form.Control.Feedback>
                        </Form.Group>




                        <Form.Group as={Col} md="3" controlId="validationCustom05">
                            <Form.Label>Id</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder={user.Id}
                                value={Id}
                                onChange={(event) => setId(event.target.value)}
                                required />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid zip.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>


                    <Button variant="success" >
                        Update User
                    </Button>

                </Form>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
            </div>
        )
    );
}

export default UpdateUser;
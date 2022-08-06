import { Button } from 'react-bootstrap'
import '../style/updatePasswordPage.css';
import { useEffect, useState } from 'react';
import { API } from '../API';
import { useParams, useHistory } from 'react-router-dom';
import React from 'react';
import swal from 'sweetalert';



const UpdateNewPassword = () => {

    const history = useHistory()

    const [Password, setPassword] = useState('');
    const [ConfirmPassword, setConfirmPassword] = useState('');

    const [users, SetUsers] = useState([])

    let { id } = useParams();



    // כדי להציג את שם המשתמש בכותרת
    const LoadInfo = async () => {

        let res = await fetch(`${API.USERS.GET}/${id}`, { method: 'GET' });
        let data = await res.json();

        SetUsers(data);
    }



       // טיפול בשגיאות בנסיון לשנות לסיסמא חדשה
       const checkPasswordInput = async () => {

        if (Password == '' || ConfirmPassword == '') {
            swal("Stop", "You need to fill in all the fields!", "warning");
            return;
        }

        if (Password === ConfirmPassword && Password.length >= 8 && Password.length <= 12) { //אם הסיסמאות זהות ניתן להירשם
            swal("You have successfully update your password!", "", "success");
            updatePassword();
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






    // פונקציה האחראית על עדכון סיסמא ישנה שהמשתמש שכח לסיסמא חדשה
    const updatePassword = async () => {

        try {

            let user = {
                User_password: Password,
                Confirm_password: ConfirmPassword
            }

            let res = await fetch(`${API.USERS.GET}/updatePassword/${id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            });
            let data = await res.json()
            console.log(data)


            swal("You have successfully updated your password!", "", "success");
            history.push(`/`);
            window.location.reload(false); // רענון דף

        } catch (error) {
            console.log(error)
        }
    }




    useEffect(() => {
        LoadInfo();
    }, [])




    return (

        users.map(user =>

            <div className="box">

                <div className="AddTopicPop">
                    <br></br>
                    <br></br>

                    <div className="titlePageUpdatePassword">
                        <p>Hi {user.First_name} update your password</p>
                    </div>

                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>


                    <label for="fname" style={{ fontFamily: "Verdana" }}>New Password :</label><br />
                    <input type="password"
                        required
                        value={Password}
                        onChange={(event) => setPassword(event.target.value)}
                    />

                    <br></br>

                    <label for="fname" style={{ fontFamily: "Verdana" }}>Confirm New Password :</label><br />
                    <input type="password"
                        required
                        value={ConfirmPassword}
                        onChange={(event) => setConfirmPassword(event.target.value)}

                    />

                    <br></br>
                    <br></br>



                    <Button variant="success" type="addTopic" onClick={() => checkPasswordInput()}>
                        Update Password
                    </Button>

                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>



                </div>

            </div>
        )
    );


}

export default UpdateNewPassword;
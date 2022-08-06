import '../style/profile.css';
import { useEffect, useState } from 'react';
import { API } from '../API';
import { useHistory } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal'
import { Button, Form, Col, Row, Tab, Tabs, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import swal from 'sweetalert';



const Profile = () => {

    let history = useHistory();

    const [user, SetUser] = useState({})

    // for popup add topic close or open window
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const [FirstName, setFirstName] = useState('');
    const [LastName, setLastName] = useState('');
    const [City, setCity] = useState('');
    const [Birthday, setBirthday] = useState('');
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [ConfirmPassword, setConfirmPassword] = useState('');
    const [Id, setId] = useState('');
    const [file, setFile] = useState('');

    

    //הצגת אשכולים ותגובות לכל משתמש ספציפי
    const [topics, setTopics] = useState([]);
    const [comments, setComments] = useState([]);

    let iTopics = 1;
    let iComments = 1;



    const LoadSpecificUser = async () => {

        let u = JSON.parse(sessionStorage.getItem("user"))
        if (u == null || u == undefined) {
            history.push("/Login");
        }
        else {
            SetUser(u);
        }
    }



    const LoadTopics = async () => {

        let u = JSON.parse(sessionStorage.getItem("user"))
        if (u == null || u == undefined) {
            setTopics("")
        }

        else {
            let res = await fetch(`${API.TOPICS.GET}/${u.User_code}/showTopicsUser`, { method: 'GET' });
            let data = await res.json();

            setTopics(data);
        }
    }



    const LoadComments = async () => {

        let u = JSON.parse(sessionStorage.getItem("user"))
        if (u == null || u == undefined) {
            setTopics("")
        }

        else {
            let res = await fetch(`${API.COMMENTS.GET}/${u.User_code}/showCommentsUser`, { method: 'GET' });
            let data = await res.json();

            setComments(data);
        }
    }






     

    // טיפול בשגיאות בנסיון לשנות לסיסמא חדשה
    const checkPasswordInput = async () => {

        if (Password == '' || ConfirmPassword == '') {
            swal("Stop", "You need to fill in all the fields!", "warning");
            return;
        }

        if (Password === ConfirmPassword && Password.length >= 8 && Password.length <= 12) { //אם הסיסמאות זהות ניתן להירשם
            swal("You have successfully update your password!", "", "success");
            uploadImage(user.User_code);
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



    // משפיע על השדות בתהליך העדכון של פרטי המשתמש בפרופיל
    const handleFormSubmit = (e) => {

        e.preventDefault(); //אירועים לא פועלים בו זמנית - אירוע סינתטי
        checkPasswordInput();
    }





    const uploadImage = async (x) => {
        try {
            const form = new FormData();
            form.append("photo", file);
            let res = await fetch(API.USERS.UPLOAD, {
                method: 'POST',
                body: form
            });
            let data = await res.json()
            if (data.img) {
                UpdateProfileUser(x, data.img)
            }
        } catch (error) {
            swal(error, "", "error");
        }
    }




    //Update Functions
    const UpdateProfileUser = async (x, img) => { // עדכון פרטי משתמש

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
                Photo: img,
                Confirm_password: ConfirmPassword
            }

            let res = await fetch(`${API.USERS.GET}/update/${x}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            });
            let data = await res.json()
            swal("You have successfully updated user details!", "", "success");
            console.log(data)

            sessionStorage.clear(); //מנתק את המשתמש מהפרופיל לאחר העדכון

            history.push("/");
            window.location.reload(false); //רענון דף

        } catch (error) {
            console.log(error)
        }
    }




    //Delete Functions
    const DeleteTopic = async (Id) => { // מחיקת אשכול

        let res = await fetch(`${API.TOPICS.GET}/delete/${Id}`, { method: 'DELETE' });
        window.location.reload(false); // רענון דף
    }


    const DeleteComment = async (Id) => { // מחיקת תגובה

        let res = await fetch(`${API.COMMENTS.GET}/delete/${Id}`, { method: 'DELETE' });
        window.location.reload(false); // רענון דף
    }



    // התנתקות משתמש 
    const clearAll = (event) => {
        sessionStorage.clear();
        history.push("/");
        window.location.reload(false); // רענון דף
    }



    const checkAdmin = async () => {
        history.push(`/Admin/${user.User_code}`);
    }


    // מעביר אותנו לדף עדכון אשכול ע"י מספר אשכול
    const ToUpdateTopicPage = async (x) => {
        history.push(`/UpdateTopic/${x}`);
    }



    const toMessagePage = async (id) => { // מעבר לדף נושא ספציפי מדף פרופיל למטה בטבלה

          history.push(`/MessagePage/${id}`);
      }
    



    useEffect(() => { //פונקציות הטוענות פרטים ספציפיים - משתמש, אשכול, תגובה 
        LoadSpecificUser();
        LoadTopics();
        LoadComments();

    }, [])


    useEffect(() => { //נוצרו על מנת להציג משתנים באינפוטים - בשדות בעדכון פרטי משתמש ספציפי
        setFirstName(user.First_name)
        setLastName(user.Last_name)
        setCity(user.City)
        setBirthday(user.Birthday)
        setEmail(user.Email)
        setPassword(user.User_password)
        setConfirmPassword(user.Confirm_password)
        setId(user.Id)
        setFile(user.Photo)

    }, [user])





    if (user.UserType_code == 2) { //Admin = 2

        return (

            <div class="main-body">

                <div className="titlePageProfile">
                    <p>Welcome To Your Profile Page <span> - Here you can control and see your Info</span></p>
                    <Button variant="danger" size="sm" onClick={clearAll}>Log out</Button>
                </div>

                <div class="row gutters-sm">

                    <div class="col-md-4 mb-3">
                        <div class="card">
                            <div class="card-body">
                                <div class="d-flex flex-column align-items-center text-center">
                                    <img src={user.Photo} alt="Admin" class="rounded-circle" width="150" />
                                    <div class="mt-3">
                                        <h4>Hi {user.First_name}</h4>
                                        <Button className="adminBtn" variant="info" size="sm" onClick={checkAdmin}>To Admin Page</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-8">
                        <div class="card mb-3">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-sm-3">
                                        <h6 class="mb-0">Full Name</h6>
                                    </div>
                                    <div class="col-sm-9 text-secondary">
                                        {user.First_name} {user.Last_name}
                                    </div>
                                </div>
                                <hr />
                                <div class="row">
                                    <div class="col-sm-3">
                                        <h6 class="mb-0">Email</h6>
                                    </div>
                                    <div class="col-sm-9 text-secondary">
                                        {user.Email}
                                    </div>
                                </div>
                                <hr />
                                <div class="row">
                                    <div class="col-sm-3">
                                        <h6 class="mb-0">Birthday</h6>
                                    </div>
                                    <div class="col-sm-9 text-secondary">
                                        {user.Birthday}
                                    </div>
                                </div>
                                <hr />
                                <div class="row">
                                    <div class="col-sm-3">
                                        <h6 class="mb-0">City</h6>
                                    </div>
                                    <div class="col-sm-9 text-secondary">
                                        {user.City}
                                    </div>
                                </div>
                                <hr />
                                <div class="row">
                                    <div class="col-sm-3">
                                        <h6 class="mb-0">User ID</h6>
                                    </div>
                                    <div class="col-sm-9 text-secondary">
                                        {user.Id}
                                    </div>
                                </div>
                                <hr />

                                <div class="row">
                                    <div class="col-sm-12">
                                        <Button variant="info" size="sm"
                                            onClick={handleShow}
                                            style={{ textDecoration: "none", color: "white", fontSize: "16px" }}>
                                            Edit profile
                                        </Button>
                                    </div>

                                    <div className="popup">
                                        <Modal
                                            show={show} onHide={handleClose} animation={true} size="lg"
                                            aria-labelledby="contained-modal-title-vcenter"
                                            centered
                                        >

                                            <div className="titlePageUpd">
                                                <p>Update Your Profile <span> - {user.First_name} {user.Last_name}</span></p>
                                                <Button variant="danger" size="sm" onClick={handleClose}>X</Button>
                                            </div>
                                            <div className="modalPopUp">
                                                <Form onSubmit={handleFormSubmit}>

                                                    <Row className="mb-3">

                                                        <Form.Group as={Col} md="3" controlId="validationCustom01">
                                                            <Form.Label>First name</Form.Label>
                                                            <Form.Control
                                                                required
                                                                type="text"
                                                                placeholder="First name"
                                                                value={FirstName}
                                                                onChange={(event) => setFirstName(event.target.value)}
                                                                style={{ background: "rgba(255, 255, 255, 0.582)" }}
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
                                                                style={{ background: "rgba(255, 255, 255, 0.582)" }}
                                                            />
                                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                                        </Form.Group>

                                                    </Row>

                                                    <Row className="mb-3">

                                                        <Form.Group as={Col} md="3" controlId="validationCustom03">
                                                            <Form.Label>City</Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                placeholder="City"
                                                                value={City}
                                                                onChange={(event) => setCity(event.target.value)}
                                                                required
                                                                style={{ background: "rgba(255, 255, 255, 0.582)" }}
                                                            />
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
                                                                required
                                                                style={{ background: "rgba(255, 255, 255, 0.582)" }}
                                                            />
                                                            <Form.Control.Feedback type="invalid">
                                                                Please provide a valid state.
                                                            </Form.Control.Feedback>
                                                        </Form.Group>

                                                        <Form.Group as={Col} md="4" controlId="validationCustom05">
                                                            <Form.Label>Email</Form.Label>
                                                            <Form.Control
                                                                type="email"
                                                                placeholder="Email"
                                                                value={Email}
                                                                onChange={(event) => setEmail(event.target.value)}
                                                                required
                                                                style={{ background: "rgba(255, 255, 255, 0.582)" }}
                                                            />
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
                                                                placeholder="Password"
                                                                value={Password}
                                                                onChange={(event) => setPassword(event.target.value)}
                                                                required
                                                                style={{ background: "rgba(255, 255, 255, 0.582)" }}
                                                            />
                                                            <Form.Control.Feedback type="invalid">
                                                                Please provide a valid zip.
                                                            </Form.Control.Feedback>
                                                        </Form.Group>

                                                        <Form.Group as={Col} md="3" controlId="validationCustom05">
                                                            <Form.Label> Confirm password</Form.Label>
                                                            <Form.Control
                                                                type="password"
                                                                placeholder="Confirm password"
                                                                value={ConfirmPassword}
                                                                onChange={(event) => setConfirmPassword(event.target.value)}
                                                                required
                                                                style={{ background: "rgba(255, 255, 255, 0.582)" }}
                                                            />
                                                            <Form.Control.Feedback type="invalid">
                                                                Please provide a valid zip.
                                                            </Form.Control.Feedback>
                                                        </Form.Group>

                                                        <Form.Group as={Col} md="3" controlId="validationCustom05">
                                                            <Form.Label>Id</Form.Label>
                                                            <Form.Control
                                                                type="number"
                                                                placeholder="Id"
                                                                value={Id}
                                                                onChange={(event) => setId(event.target.value)}
                                                                required
                                                                style={{ background: "rgba(255, 255, 255, 0.582)" }}
                                                            />
                                                            <Form.Control.Feedback type="invalid">
                                                                Please provide a valid zip.
                                                            </Form.Control.Feedback>
                                                        </Form.Group>

                                                        <Form.Group as={Col} md="4" className="mb-3">
                                                            <br></br>
                                                            <Form.Control
                                                                type="file"
                                                                onChange={(event) => setFile(event.target.files[0])}
                                                                style={{ background: "none", border: "none" }}
                                                            />

                                                        </Form.Group>
                                                    </Row>

                                                    <Button type="submit" >Update details</Button>

                                                </Form>
                                            </div>
                                        </Modal>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="titlePageControl">
                    <p>Control your messages :<br />▼</p>
                </div>

                <Tabs defaultActiveKey="Topics" transition={false} id="noanim-tab-example">

                    <Tab eventKey="Topics" title="Topics" className='topics'>
                        <Table striped bordered hover size="sm" style={{ fontSize: "13px" }}>
                            <thead>
                                <tr>
                                    <th style={{ width: "19px" }}>#</th>
                                    {/* <th style={{ width: "30px" }}>Serial code</th>
                                    <th style={{ width: "30px" }}>Category code</th> */}
                                    <th style={{ width: "50px" }}>Topic title</th>
                                    <th style={{ width: "210px" }}>Topic text</th>
                                    <th style={{ width: "70px" }}>Date published</th>
                                    {/* <th style={{ width: "70px" }}>Publish by-user code</th> */}
                                    <th style={{ width: "10px" }}></th>
                                    <th style={{ width: "10px" }}></th>
                                </tr>
                            </thead>

                            {topics.map(topic =>
                                <tbody>
                                    <tr>
                                        <td>{iTopics++}</td>
                                        {/* <td>{topic.Serial_code}</td>
                                        <td>{topic.Category_code}</td> */}
                                        <td><Link onClick={() => toMessagePage(topic.Serial_code)} style={{ textDecoration: "none", color: "#28a745", fontWeight: "bold" }}>{topic.Topic_title}</Link></td>
                                        <td>{topic.Topic_text}</td>
                                        <td>{topic.Date_published}</td>
                                        {/* <td>{topic.Publish_by}</td> */}

                                        <td><Button variant="primary" size="sm" onClick={() => ToUpdateTopicPage(topic.Serial_code)}>Update</Button></td>
                                        <td><Button variant="danger" size="sm" onClick={() => DeleteTopic(topic.Serial_code)}>Delete</Button></td>
                                    </tr>
                                </tbody>
                            )}
                        </Table>
                    </Tab>


                    <Tab eventKey="Comments" title="Comments" className='commentss'>
                        <Table striped bordered hover size="sm" style={{ fontSize: "13px" }}>
                            <thead>
                                <tr>
                                    <th style={{ width: "19px" }}>#</th>
                                    {/* <th style={{ width: "30px" }}>Serial code</th>
                                    <th style={{ width: "20px" }}>Topic number</th> */}
                                    <th style={{ width: "230px" }}>Comment</th>
                                    {/* <th style={{ width: "60px" }}>Publish by-user code</th> */}
                                    <th style={{ width: "40px" }}></th>
                                    <th style={{ width: "30px" }}></th>
                                </tr>
                            </thead>

                            {comments.map(comment =>
                                <tbody>
                                    <tr>
                                        <td>{iComments++}</td>
                                        {/* <td>{comment.Serial_code}</td>
                                        <td>{comment.Topic_number}</td> */}
                                        <td>{comment.Comment}</td>
                                        {/* <td>{comment.Publish_by}</td> */}
                                        <td></td>
                                        <td><Button variant="danger" size="sm" onClick={() => DeleteComment(comment.Serial_code)}>Delete</Button></td>
                                    </tr>
                                </tbody>
                            )}
                        </Table>
                    </Tab>
                </Tabs>
            </div>
        );
    }



    else { // User = 1

        return (

            <div class="main-body">

                <div className="titlePageProfile">
                    <p>Welcome To Your Profile Page <span> - Here you can control and see your Info</span></p>
                    <Button variant="danger" size="sm" onClick={clearAll}>Log out</Button>
                </div>

                <div class="row gutters-sm">
                    <div class="col-md-4 mb-3">
                        <div class="card">
                            <div class="card-body">
                                <div class="d-flex flex-column align-items-center text-center">
                                    <img src={user.Photo} class="rounded-circle" width="150" />
                                    <div class="mt-3">
                                        <h4>Hi {user.First_name}</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-8">
                        <div class="card mb-3">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-sm-3">
                                        <h6 class="mb-0">Full Name</h6>
                                    </div>
                                    <div class="col-sm-9 text-secondary">
                                        {user.First_name} {user.Last_name}
                                    </div>
                                </div>
                                <hr />
                                <div class="row">
                                    <div class="col-sm-3">
                                        <h6 class="mb-0">Email</h6>
                                    </div>
                                    <div class="col-sm-9 text-secondary">
                                        {user.Email}
                                    </div>
                                </div>
                                <hr />
                                <div class="row">
                                    <div class="col-sm-3">
                                        <h6 class="mb-0">Birthday</h6>
                                    </div>
                                    <div class="col-sm-9 text-secondary">
                                        {user.Birthday}
                                    </div>
                                </div>
                                <hr />
                                <div class="row">
                                    <div class="col-sm-3">
                                        <h6 class="mb-0">City</h6>
                                    </div>
                                    <div class="col-sm-9 text-secondary">
                                        {user.City}
                                    </div>
                                </div>
                                <hr />
                                <div class="row">
                                    <div class="col-sm-3">
                                        <h6 class="mb-0">User ID</h6>
                                    </div>
                                    <div class="col-sm-9 text-secondary">
                                        {user.Id}
                                    </div>
                                </div>
                                <hr />

                                <div class="row">
                                    <div class="col-sm-12">
                                        <Button variant="info" size="sm"
                                            onClick={handleShow}
                                            style={{ textDecoration: "none", color: "white", fontSize: "16px" }}>
                                            Edit profile
                                        </Button>
                                    </div>

                                    <div className="popup">
                                        <Modal show={show} onHide={handleClose} animation={true} size="lg"
                                            aria-labelledby="contained-modal-title-vcenter"
                                            centered
                                        >
                                            <Form onSubmit={handleFormSubmit}>

                                                <div className="titlePageUpd">
                                                    <p>Update Your Profile <span> - {user.First_name} {user.Last_name}</span></p>
                                                    <Button variant="danger" size="sm" onClick={handleClose}>X</Button>
                                                </div>

                                                <div className="modalPopUp">

                                                    <Row className="mb-3">

                                                        <Form.Group as={Col} md="3" controlId="validationCustom01">
                                                            <Form.Label>First name</Form.Label>
                                                            <Form.Control
                                                                required
                                                                type="text"
                                                                placeholder="First name"
                                                                value={FirstName}
                                                                onChange={(event) => setFirstName(event.target.value)}
                                                                style={{ background: "rgba(255, 255, 255, 0.582)" }}
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
                                                                style={{ background: "rgba(255, 255, 255, 0.582)" }}
                                                            />
                                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                                        </Form.Group>
                                                    </Row>

                                                    <Row className="mb-3">

                                                        <Form.Group as={Col} md="3" controlId="validationCustom03">
                                                            <Form.Label>City</Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                placeholder="City"
                                                                value={City}
                                                                onChange={(event) => setCity(event.target.value)}
                                                                required
                                                                style={{ background: "rgba(255, 255, 255, 0.582)" }}
                                                            />
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
                                                                required
                                                                style={{ background: "rgba(255, 255, 255, 0.582)" }}
                                                            />
                                                            <Form.Control.Feedback type="invalid">
                                                                Please provide a valid state.
                                                            </Form.Control.Feedback>
                                                        </Form.Group>

                                                        <Form.Group as={Col} md="4" controlId="validationCustom05">
                                                            <Form.Label>Email</Form.Label>
                                                            <Form.Control
                                                                type="email"
                                                                placeholder="Email"
                                                                value={Email}
                                                                onChange={(event) => setEmail(event.target.value)}
                                                                required
                                                                style={{ background: "rgba(255, 255, 255, 0.582)" }}
                                                            />
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
                                                                placeholder="Password"
                                                                value={Password}
                                                                onChange={(event) => setPassword(event.target.value)}
                                                                required
                                                                style={{ background: "rgba(255, 255, 255, 0.582)" }}
                                                            />
                                                            <Form.Control.Feedback type="invalid">
                                                                Please provide a valid zip.
                                                            </Form.Control.Feedback>
                                                        </Form.Group>

                                                        <Form.Group as={Col} md="3" controlId="validationCustom05">
                                                            <Form.Label> Confirm password</Form.Label>
                                                            <Form.Control
                                                                type="password"
                                                                placeholder="Confirm password"
                                                                value={ConfirmPassword}
                                                                onChange={(event) => setConfirmPassword(event.target.value)}
                                                                required
                                                                style={{ background: "rgba(255, 255, 255, 0.582)" }}
                                                            />
                                                            <Form.Control.Feedback type="invalid">
                                                                Please provide a valid zip.
                                                            </Form.Control.Feedback>
                                                        </Form.Group>

                                                        <Form.Group as={Col} md="3" controlId="validationCustom05">
                                                            <Form.Label>Id</Form.Label>
                                                            <Form.Control
                                                                type="number"
                                                                placeholder="Id"
                                                                value={Id}
                                                                onChange={(event) => setId(event.target.value)}
                                                                required
                                                                style={{ background: "rgba(255, 255, 255, 0.582)" }}
                                                            />
                                                            <Form.Control.Feedback type="invalid">
                                                                Please provide a valid zip.
                                                            </Form.Control.Feedback>
                                                        </Form.Group>

                                                        <Form.Group as={Col} md="4" className="mb-3">
                                                            <br></br>
                                                            <Form.Control
                                                                type="file"

                                                                onChange={(event) => setFile(event.target.files[0])}
                                                                style={{ background: "none", border: "none" }}
                                                            />
                                                        </Form.Group>
                                                    </Row>

                                                    <Button type="submit">Update details</Button>
                                                </div>
                                            </Form>
                                        </Modal>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="titlePageControl">
                    <p>Control your messages :<br />▼</p>
                </div>

                <Tabs defaultActiveKey="Topics" transition={false} id="noanim-tab-example">


                    <Tab eventKey="Topics" title="Topics" className='topics'>
                        <Table striped bordered hover size="sm" style={{ fontSize: "13px" }}>
                            <thead>
                                <tr>
                                    <th style={{ width: "19px" }}>#</th>
                                    {/* <th style={{ width: "30px" }}>Serial code</th> */}
                                    {/* <th style={{ width: "30px" }}>Category code</th> */}
                                    <th style={{ width: "50px" }}>Topic title</th>
                                    <th style={{ width: "210px" }}>Topic text</th>
                                    <th style={{ width: "70px" }}>Date published</th>
                                    {/* <th style={{ width: "70px" }}>Publish by-user code</th> */}
                                    <th style={{ width: "10px" }}></th>
                                    <th style={{ width: "10px" }}></th>
                                </tr>
                            </thead>

                            {topics.map(topic =>
                                <tbody>
                                    <tr>
                                        <td>{iTopics++}</td>
                                        {/* <td>{topic.Serial_code}</td> */}
                                        {/* <td>{topic.Category_code}</td> */}
                                        <td><Link onClick={() => toMessagePage(topic.Serial_code)} style={{ textDecoration: "none", color: "#28a745", fontWeight: "bold" }}>{topic.Topic_title}</Link></td>
                                        <td>{topic.Topic_text}</td>
                                        <td>{topic.Date_published}</td>
                                        {/* <td>{topic.Publish_by}</td> */}
                                        <td><Button variant="primary" size="sm" onClick={() => ToUpdateTopicPage(topic.Serial_code)}>Update</Button></td>
                                        <td><Button variant="danger" size="sm" onClick={() => DeleteTopic(topic.Serial_code)}>Delete</Button></td>
                                    </tr>
                                </tbody>
                            )}
                        </Table>
                    </Tab>

                    <Tab eventKey="Comments" title="Comments" className='commentss'>
                        <Table striped bordered hover size="sm" style={{ fontSize: "13px" }}>
                            <thead>
                                <tr>
                                    <th style={{ width: "19px" }}>#</th>
                                    {/* <th style={{ width: "30px" }}>Serial code</th>
                                    <th style={{ width: "20px" }}>Topic number</th> */}
                                    <th style={{ width: "230px" }}>Comment</th>
                                    <th style={{ width: "30px" }}></th>

                                </tr>
                            </thead>

                            {comments.map(comment =>
                                <tbody>
                                    <tr>
                                        <td>{iComments++}</td>
                                        {/* <td>{comment.Serial_code}</td>
                                        <td>{comment.Topic_number}</td> */}
                                        <td>{comment.Comment}</td>
                                        <td><Button variant="danger" size="sm" onClick={() => DeleteComment(comment.Serial_code)}>Delete</Button></td>
                                    </tr>
                                </tbody>
                            )}
                        </Table>
                    </Tab>
                </Tabs>
            </div>
        );
    }
}

export default Profile;
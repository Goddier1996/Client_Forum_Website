import { Button, Form } from 'react-bootstrap'
import '../style/MessagePage_CommunityPage.css';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { API } from '../API';
import { useParams } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal'
import React from 'react';
import swal from 'sweetalert';



const CommunityPage = () => {


    // for popup add topic close or open window
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [TopicTitle, setTopicTitle] = useState(''); //input
    const [TopicText, setTopicText] = useState('');

    const [titleCategory, SetTitleCategory] = useState([]); //כותרת בתחילה העמוד - איזה קטגוריה באותו דף אשכול

    const [topics, SetTopics] = useState([]);

    let { id } = useParams();
    let Category_code = id;

    let userData = JSON.parse(sessionStorage.getItem("user"));



    // פונקציה הטוענת אשכול מסוים לפי קטגוריה מסוימת אליה הוא משתייך
    const LoadTopics = async () => {

        let res = await fetch(`${API.CATEGORIES.GET}/${Category_code}/topics`, { method: 'GET' });
        let data = await res.json();

        SetTopics(data);
    }




    // טיפול בשגיאות - אם השדות של הוספת אשכול ריקים
    const checkTopic = async () => {

        if (TopicTitle == '' || TopicText == '') {
            swal("Stop", "You need to fill in all the fields!", "warning");
            return;
        }

        else {
            addTopic();
        }
    }



    // פונקציה המטפלת בהוספת אשכול
    const addTopic = async () => {
        let userData = JSON.parse(sessionStorage.getItem("user"));

        // אם המשתמש לא מחובר הוא לא יכול להוסיף אשכול
        if (userData == null || userData == undefined) {
            swal("Stop", "You need to sign in!", "warning");
        }


        try {
            let Publish_by = userData.User_code;

            let d = new Date(); // הגדרת משתנה לתאריך

            let user = {
                Category_code,
                TopicTitle,
                TopicText,
                DatePublished: `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`,
                Publish_by
            }

            let res = await fetch(API.TOPICS.ADD, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            });

            swal("Added a topic successfully!", "", "success");

            window.location.reload(false); // רענון דף
            let data = await res.json()
            console.log(data)

        } catch (error) {
            console.log(error)
        }
    }



    // פונקציה האחראית על הצגה של שם הקטגוריה הספציפית שרואים כעת את האשכולים שלה -> דף אשכול
    const LoadCategory = async () => {

        let res = await fetch(`${API.CATEGORIES.GET}/${Category_code}`, { method: 'GET' });
        let data = await res.json();

        SetTitleCategory(data);
    }



    useEffect(() => {
        LoadTopics();
        LoadCategory();
    }, [])



    // if user connect can add a new topic , else hide a button add topic
    if (userData != null) {

        return (

            <div className="posts-table">

                {titleCategory.map(title =>

                    <div className="titlePageCommunity">
                        <p>
                            <NavLink to={`/`}>
                                <img src={require("../images/hhh.png").default}
                                    style={{ margin: "5px", paddingBottom: "4px" }}
                                    width="auto"
                                    height="37"
                                    alt="Profile"
                                />
                            </NavLink>

                            Community Page {'> '}

                            {title.Name_category}
                        </p>

                        <Button variant="success" size="sm"
                            onClick={handleShow}
                            style={{ textDecoration: "none", color: "white" }}>
                            Add New Cluster
                        </Button>
                    </div>
                )}


                <Modal show={show} onHide={handleClose} animation={true} size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >

                    <section className="window">

                        <div className="boxWin image">

                            <div className="imageTopicAdd">

                                <Form >
                                    <Form.Text className="text-muted1">
                                        <p>Create new Topic</p>
                                    </Form.Text>
                                    <br></br>
                                </Form>
                            </div>
                        </div>



                        <div className="boxWin contectWin">

                            <div className="AddTopicPop">

                                <label for="fname" style={{ fontFamily: "Verdana" }}>Topic Title :</label><br />
                                <input type="text"
                                    required
                                    placeholder="Title"
                                    value={TopicTitle}
                                    onChange={(event) => setTopicTitle(event.target.value)}
                                />

                                <br></br>

                                <label for="fname" style={{ fontFamily: "Verdana" }}>Write Post :</label><br />
                                <textarea type="text"
                                    required
                                    placeholder="Post"
                                    value={TopicText}
                                    onChange={(event) => setTopicText(event.target.value)}

                                />

                                <br></br>


                                <Button variant="success" type="addTopic" onClick={checkTopic} >
                                    Add New Topic
                                </Button>

                                <Button variant="danger" onClick={handleClose}>
                                    Close
                                </Button>

                            </div>
                        </div>
                    </section>
                </Modal>



                <div className="table-head">
                    <div className="status usersS">Users</div>
                    <div className="subjects topicsS">Topics</div>
                    <div className="replies repliesS">Replies</div>
                    <div className="last-reply">Date Publish</div>
                </div>



                {
                    topics.map(topic =>

                        <div className="table-row">

                            <div className="status">
                                <img
                                    src={topic.Photo}
                                    alt="Profile" />
                            </div>

                            <div className="subjects">

                                <NavLink to=
                                    {`/MessagePage/${topic.Serial_code}`}
                                    style={{ textDecoration: "none", color: "green", fontSize: "15px" }}>
                                    {topic.Topic_title}
                                </NavLink>
                                <br />

                                <span
                                    style={{ textDecoration: "none", color: "black", fontSize: "13px" }}>
                                    Started by
                                    <b> {topic.First_name} {topic.Last_name}</b>
                                </span>
                            </div>

                            <div className="replies">
                                {topic.Count_Comments}
                            </div>

                            <div className="datePublish">
                                {topic.Date_published}
                            </div>

                        </div>
                    )

                }


                <br></br>
                <br></br>
                <br></br>
                <br></br>


            </div >
        );
    }



    else {

        return (

            <div className="posts-table">

                {titleCategory.map(title =>

                    <div className="titlePageCommunity">
                        <p>
                            <NavLink to={`/`}>
                                <img src={require("../images/hhh.png").default}
                                    style={{ margin: "5px", paddingBottom: "4px" }}
                                    width="auto"
                                    height="37"
                                    alt="Profile"
                                />
                            </NavLink>

                            Community Page {'> '}

                            {title.Name_category}
                        </p>

                        {/* <Button variant="success" size="sm"
                            onClick={handleShow}
                            style={{ textDecoration: "none", color: "white" }}>
                            Add New Cluster
                        </Button> */}

                        {/* <h4 style={{ fontSize: "12px", textAlign: "center", color: "rgb(97, 89, 89)" }}>Sign In and can add Topic</h4> */}

                    </div>
                )}


                <Modal show={show} onHide={handleClose} animation={true} size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >

                    <section className="window">

                        <div className="boxWin image">

                            <div className="imageTopicAdd">

                                <Form >
                                    <Form.Text className="text-muted1">
                                        <p>Create new Topic</p>
                                    </Form.Text>
                                    <br></br>
                                </Form>
                            </div>
                        </div>



                        <div className="boxWin contectWin">

                            <div className="AddTopicPop">

                                <label for="fname" style={{ fontFamily: "Verdana" }}>Topic Title :</label><br />
                                <input type="text"
                                    required
                                    placeholder="Title"
                                    value={TopicTitle}
                                    onChange={(event) => setTopicTitle(event.target.value)}
                                />

                                <br></br>

                                <label for="fname" style={{ fontFamily: "Verdana" }}>Write Post :</label><br />
                                <textarea type="text"
                                    required
                                    placeholder="Post"
                                    value={TopicText}
                                    onChange={(event) => setTopicText(event.target.value)}

                                />

                                <br></br>


                                <Button variant="success" type="addTopic" onClick={checkTopic} >
                                    Add New Topic
                                </Button>

                                <Button variant="danger" onClick={handleClose}>
                                    Close
                                </Button>

                            </div>
                        </div>
                    </section>
                </Modal>



                <div className="table-head">
                    <div className="status usersS">Users</div>
                    <div className="subjects topicsS">Topics</div>
                    <div className="replies repliesS">Replies</div>
                    <div className="last-reply">Date Publish</div>
                </div>



                {
                    topics.map(topic =>

                        <div className="table-row">

                            <div className="status">
                                <img
                                    src={topic.Photo}
                                    alt="Profile" />
                            </div>

                            <div className="subjects">

                                <NavLink to=
                                    {`/MessagePage/${topic.Serial_code}`}
                                    style={{ textDecoration: "none", color: "green", fontSize: "15px" }}>
                                    {topic.Topic_title}
                                </NavLink>
                                <br />

                                <span
                                    style={{ textDecoration: "none", color: "black", fontSize: "13px" }}>
                                    Started by
                                    <b> {topic.First_name} {topic.Last_name}</b>
                                </span>
                            </div>

                            <div className="replies">
                                {topic.Count_Comments}
                            </div>

                            <div className="datePublish">
                                {topic.Date_published}
                            </div>

                        </div>
                    )

                }


                <br></br>
                <br></br>
                <br></br>
                <br></br>


            </div >
        );
    }

}

export default CommunityPage;
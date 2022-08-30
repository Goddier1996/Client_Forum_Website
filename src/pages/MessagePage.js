import '../style/MessagePage_CommunityPage.css';
import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { API } from '../API';
import { Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import swal from 'sweetalert';



const MessagePage = () => {

    let history = useHistory();

    const [topics, SetTopics] = useState([])//הצגת כותרת 
    const [comments, SetComments] = useState([]) //הצגת תגובות
    const [comment, SetComment] = useState('') //הוספת תגובה



    let { id } = useParams();


    let u = JSON.parse(sessionStorage.getItem("user"));




    const LoadTopics = async () => {

        let res = await fetch(`${API.TOPICS.GET}/${id}/message`, { method: 'GET' });
        let data = await res.json();

        SetTopics(data);
    }






    const LoadComments = async () => {

        let res = await fetch(`${API.COMMENTS.GET}/${id}/comments`, { method: 'GET' });
        let data = await res.json();

        SetComments(data);
    }





    const checkComment = async () => {

        if (comment == '') {
            swal("Stop", "You need to add a comment!", "warning");
            return;
        }

        else {
            addComment();
        }
    }





    const addComment = async () => {

        let userData = JSON.parse(sessionStorage.getItem("user"));

        if (userData == null || userData == undefined) {
            swal("Stop!", "You need to sign in!", "warning");
            history.push("/Login");
        }

        try {
            let publishBy = userData.User_code;
            let d = new Date();

            let user = {
                Topic_number: id,
                Comment: comment,
                Publish_by: publishBy,
                Date_published: `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
            }
            console.log(user);
            let res = await fetch(API.COMMENTS.ADD, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            });

            swal("Added a comment successfully!", "", "success");
            window.location.reload(false); // רענון דף
            let data = await res.json()
            console.log(data)

        } catch (error) {
            console.log(error)
        }
    }




    useEffect(() => {
        LoadTopics();
        LoadComments();
    }, [])




    if (u != null || u != undefined) {
        return (

            <div className="formMessage">

                {topics.map(topic =>

                    <div className="titlePageMessage">
                        <p >
                            <NavLink to={`/`}>
                                <img src={require("../images/hhh.png").default}
                                    style={{ margin: "5px", paddingBottom: "4px" }}
                                    width="37"
                                    height="37"
                                    alt="Profile"
                                />
                            </NavLink>


                            <NavLink to={`/CommunityPage/${topic.Category_code}`}
                                style={{ textDecoration: "none", color: "#6b6b6b" }}>
                                <a target="_blank">  Community Page {'> '} </a>
                            </NavLink>

                            Message Page {'> '}

                            {topic.Topic_title}
                        </p>
                    </div>
                )}

                <div className="topic-container">

                    <div className="head">

                        <div className="authors">Author</div>
                        <div className="content">Message</div>

                    </div>



                    {topics.map(topic =>
                        <div className="body">

                            <div className="authors">
                                {/* מעבר לדף פרטי משתמש ע"י לחיצה על תמונה של הודעה ראשית */}
                                <NavLink to={`/UserInfo/${topic.Publish_by}`}>
                                    <img src={topic.Photo} alt="" height="140px" width="110" />
                                </NavLink>

                                <div className="username"
                                    style={{ textDecoration: "none", color: "#28a745", fontSize: "14px" }}>
                                    {topic.First_name} {topic.Last_name}, {topic.City}</div>

                                <div className="date"
                                    style={{ textDecoration: "none", color: "#6b6b6b" }}>
                                    Date Publish: <p>{topic.Date_published}</p></div>

                            </div>

                            <div className="content">
                                {topic.Topic_text}
                            </div>

                        </div>
                    )}

                </div>



                {comments.map(comment =>
                    <div className="body">

                        <div className="authors">
                            <div className="username">
                                {/* מעבר לדף פרטי משתמש ע"י לחיצה על תמונה של תגובה  */}
                                <NavLink to={`/UserInfo/${comment.Publish_by}`}>
                                    <img src={comment.Photo} alt="" height="140px" width="110" />
                                </NavLink>
                                <div className="username"
                                    style={{ textDecoration: "none", color: "#6b6b6b", fontSize: "14px" }}>
                                    {comment.First_name} {comment.Last_name}, {comment.City} </div>

                                <div className="date">Date Publish: <p>{comment.Date_published}</p></div>
                            </div>
                        </div>

                        <div className="content">
                            {comment.Comment}
                        </div>
                    </div>
                )}




                <div className="comment-area hide" id="comment-area" >
                    <textarea name="comment" id="" placeholder="comment here ... "
                        value={comment}
                        onChange={(event) => SetComment(event.target.value)}></textarea>
                </div>

                <Button variant="success" onClick={checkComment}>
                    Send Message
                </Button>

            </div>
        );
    }


    else {
        return (

            <div className="formMessage">

                {topics.map(topic =>

                    <div className="titlePageMessage">
                        <p >
                            <NavLink to={`/`}>
                                <img src={require("../images/hhh.png").default}
                                    style={{ margin: "5px", paddingBottom: "4px" }}
                                    width="37"
                                    height="37"
                                    alt="Profile"
                                />
                            </NavLink>

                            <NavLink to={`/CommunityPage/${topic.Category_code}`}
                                style={{ textDecoration: "none", color: "#6b6b6b" }}>
                                <a target="_blank">  Community Page {'> '} </a>
                            </NavLink>

                            Message Page {'> '}

                            {topic.Topic_title}
                        </p>
                    </div>
                )}

                <div className="topic-container">

                    <div className="head">

                        <div className="authors">Author</div>
                        <div className="content">Message</div>

                    </div>

                    {topics.map(topic =>
                        <div className="body">

                            <div className="authors">

                                <NavLink to={`/UserInfo/${topic.Publish_by}`}>
                                    <img src={topic.Photo} alt="" height="140px" width="110" />
                                </NavLink>

                                <div className="username"
                                    style={{ textDecoration: "none", color: "#28a745", fontSize: "14px" }}>
                                    {topic.First_name} {topic.Last_name}, {topic.City}</div>

                                <div className="date"
                                    style={{ textDecoration: "none", color: "#6b6b6b" }}>
                                    Date Publish: <p>{topic.Date_published}</p></div>

                            </div>

                            <div className="content">
                                {topic.Topic_text}
                            </div>

                        </div>
                    )}
                </div>



                {comments.map(comment =>
                    <div className="body">

                        <div className="authors">
                            <div className="username">
                                <NavLink to={`/UserInfo/${comment.Publish_by}`}>
                                    <img src={comment.Photo} alt="" height="140px" width="110" />
                                </NavLink>
                                <div className="username"
                                    style={{ textDecoration: "none", color: "#6b6b6b", fontSize: "14px" }}>
                                    {comment.First_name} {comment.Last_name}, {comment.City} </div>

                                <div className="date">Date Publish: <p>{comment.Date_published}</p></div>
                            </div>
                        </div>

                        <div className="content">
                            {comment.Comment}
                        </div>
                    </div>
                )}



                <div className="connectuser">
                    <p>You need to <a href="/Login">login</a> or <a href="/Register">register</a> to post a comment.</p>
                </div>
            </div>
        );
    }
}

export default MessagePage;
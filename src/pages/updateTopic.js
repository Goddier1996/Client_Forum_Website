import { Button } from 'react-bootstrap'
import '../style/MessagePage_CommunityPage.css';
import { useEffect, useState } from 'react';
import { API } from '../API';
import { useParams, useHistory } from 'react-router-dom';
import React from 'react';
import swal from 'sweetalert';


const UpdateTopic = () => {

    const history = useHistory()

    const [TopicTitle, setTopicTitle] = useState('');
    const [TopicText, setTopicText] = useState('');

    const [topics, SetTopic] = useState([]);

    let { id } = useParams();
    let Serial_code = id;


    // פונקציה האחראית על הצגת האשכולים ע"י הקוד הסידורי של כל אשכול
    const LoadTopic = async () => {

        let res = await fetch(`${API.TOPICS.GET}/${Serial_code}`, { method: 'GET' });
        let data = await res.json();

        SetTopic(data);
    }




    const checkUpdateTopics = async (CategoryCode) => {

        if (TopicTitle == '' || TopicText == '') {
            swal("Stop", "You need to fill in all the fields!", "warning");
            return;
        }


        else {
            updateTopic(CategoryCode);
        }
    }



    // פונקציה האחראית על עדכון פרטי אשכול
    const updateTopic = async (CategoryCode) => {
        let userData = JSON.parse(sessionStorage.getItem("user"));

        try {
            let Publish_by = userData.User_code;
            let d = new Date();

            let user = {
                Category_code: CategoryCode,
                Publish_by,
                TopicTitle,
                TopicText,
                DatePublished: `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`,
            }

            let res = await fetch(`${API.TOPICS.GET}/update/${Serial_code}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            });

            let data = await res.json()
            swal("You have successfully updated your details!", "", "success");

            history.push(`/Profile/${data.User_code}`);


            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }



    useEffect(() => {
        LoadTopic();
    }, [])





    return (

        topics.map(topic =>

            <div className="box">

                <div className="AddTopicPop">
                    <br></br>
                    <br></br>
                    <br></br>

                    <label for="fname" style={{ fontFamily: "Verdana" }}>Topic Title :</label><br />
                    <input type="text"
                        required
                        placeholder={topic.Topic_title}
                        value={TopicTitle}
                        onChange={(event) => setTopicTitle(event.target.value)}
                    />

                    <br></br>

                    <label for="fname" style={{ fontFamily: "Verdana" }}>Write Post :</label><br />
                    <textarea type="text"
                        required
                        placeholder={topic.Topic_text}
                        value={TopicText}
                        onChange={(event) => setTopicText(event.target.value)}

                    />

                    <br></br>
                    <br></br>



                    <Button variant="success" type="addTopic" onClick={() => checkUpdateTopics(topic.Category_code)}>
                        Update Topic
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

export default UpdateTopic;
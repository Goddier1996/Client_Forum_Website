import { Button, Form } from 'react-bootstrap'
import '../style/MessagePage_CommunityPage.css';
import { useEffect, useState } from 'react';
import { API } from '../API';
import { useParams, useHistory } from 'react-router-dom';
import React from 'react';
import swal from 'sweetalert';



const UpdateCategory = () => {

    const history = useHistory()

    const [NameCategory, setNameCategory] = useState('');
    const [file, setFile] = useState('');

    const [categories, SetCategory] = useState([])


    let { id } = useParams();


    // הצגה של ערכי הנתונים הקודמים בשדות של עדכון קטגוריה
    const LoadCategory = async () => {

        let res = await fetch(`${API.CATEGORIES.GET}/${id}`, { method: 'GET' });
        let data = await res.json();

        SetCategory(data);
    }



    const checkUpdateCategoryFiled = async () => {

        if (NameCategory == '' || !file) {
            swal("Stop", "You need to fill in all the fields!", "warning");
            return;
        }


        else {
            uploadImage();
        }
    }



    const uploadImage = async () => {
        try {
            const form = new FormData();
            form.append("photo", file);
            let res = await fetch(API.CATEGORIES.UPLOAD, {
                method: 'POST',
                body: form
            });
            let data = await res.json()
            if (data.img) {
                updateCategory(data.img);
            }
        } catch (error) {
            swal(error, "", "error");
        }
    }




    //Update Function
    const updateCategory = async (img) => {
        let userData = JSON.parse(sessionStorage.getItem("user"));

        try {

            let user = {
                Name_category: NameCategory,
                Photo: img
            }

            let res = await fetch(`${API.CATEGORIES.GET}/update/${id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            });
            let data = await res.json()
            console.log(data)

            swal("You have successfully updated category!", "", "success");
            history.push(`/Admin/${userData.User_code}`);
            window.location.reload(false); // רענון דף

        } catch (error) {
            console.log(error)
        }
    }










    useEffect(() => {
        LoadCategory();
    }, [])






    return (

        categories.map(category =>

            <div className="box">

                <div className="AddTopicPop">
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>

                    <label for="fname" style={{ fontFamily: "Verdana" }}>Category Name :</label><br />
                    <input type="text"
                        required
                        placeholder={category.Name_category}
                        value={NameCategory}
                        onChange={(event) => setNameCategory(event.target.value)}
                    />

                    <br></br>

                    <label for="fname" style={{ fontFamily: "Verdana" }}>Category Image :</label><br />
                    <Form.Control type="file" onChange={(event) => setFile(event.target.files[0])} />

                    <br></br>
                    <br></br>



                    <Button variant="success" type="addTopic" onClick={() => checkUpdateCategoryFiled()}>
                        Update Category
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
                    <br></br>
                    <br></br>
                    <br></br>

                </div>
            </div>

        )
    );
}

export default UpdateCategory;
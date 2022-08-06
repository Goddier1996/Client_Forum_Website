import '../style/admin.css';
import { Button, Form, Tab, Tabs, Table } from 'react-bootstrap'
import { API } from '../API';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';



const Admin = () => {

  let history = useHistory();

  // הוספת קטגוריה רק מהאדמין
  const [NameCategory, setNameCategory] = useState('');
  const [Photo, setPhoto] = useState('');

  //הצגת משתנים בדף אדמין
  const [users, SetUsers] = useState([])
  const [catergories, setCatergories] = useState([]);
  const [topics, setTopics] = useState([]);
  const [comments, setComments] = useState([]);

  const [showDeletedUsers, setDeletedUsers] = useState([]);
  const [showDeletedCategories, setDeletedCategories] = useState([]);
  const [showDeletedTopics, setDeletedTopics] = useState([]);
  const [showDeletedComments, setDeletedComments] = useState([]);


  let iUsers = 1;
  let iCatergories = 1;
  let iTopics = 1;
  let iComments = 1;





  const LoadUsers = async () => {

    let res = await fetch(API.USERS.GET, { method: 'GET' });
    let data = await res.json();

    SetUsers(data);
  }




  const LoadCatergories = async () => {

    let res = await fetch(API.CATEGORIES.GET, { method: 'GET' });
    let data = await res.json();

    setCatergories(data);
  }





  const LoadTopics = async () => {

    let res = await fetch(API.TOPICS.GET, { method: 'GET' });
    let data = await res.json();

    setTopics(data);
  }




  const LoadComments = async () => {

    let res = await fetch(API.COMMENTS.GET, { method: 'GET' });
    let data = await res.json();

    setComments(data);
  }




  const LoadDeletedUsers = async () => {

    let res = await fetch(API.USERS.SHOW, { method: 'GET' });
    let data = await res.json();

    setDeletedUsers(data);
  }



  const LoadDeletedCategories = async () => {

    let res = await fetch(API.CATEGORIES.SHOW, { method: 'GET' });
    let data = await res.json();

    setDeletedCategories(data);
  }




  const LoadDeletedTopics = async () => {

    let res = await fetch(API.TOPICS.SHOW, { method: 'GET' });
    let data = await res.json();

    setDeletedTopics(data);
  }




  const LoadDeletedComments = async () => {

    let res = await fetch(API.COMMENTS.SHOW, { method: 'GET' });
    let data = await res.json();

    setDeletedComments(data);
  }




  //Delete Functions
  const DeleteUser = async (Id) => {

    let res = await fetch(`${API.USERS.GET}/delete/${Id}`, { method: 'DELETE' });
    window.location.reload(false); // רענון דף
  }



  const DeleteCategory = async (Id) => {

    let res = await fetch(`${API.CATEGORIES.GET}/delete/${Id}`, { method: 'DELETE' });
    window.location.reload(false); // רענון דף
  }



  const DeleteTopic = async (Id) => {

    let res = await fetch(`${API.TOPICS.GET}/delete/${Id}`, { method: 'DELETE' });
    window.location.reload(false); // רענון דף
  }



  const DeleteComment = async (Id) => {

    let res = await fetch(`${API.COMMENTS.GET}/delete/${Id}`, { method: 'DELETE' });
    window.location.reload(false); // רענון דף
  }




  const ToUpdateUserPage = async (x) => {
    history.push(`/UpdateUser/${x}`);
  }



  const ToUpdateCategoryPage = async (x) => {
    history.push(`/UpdateCategory/${x}`);
  }






  //Reactivate Functions
  const ReactivateUser = async (Id) => {

    let res = await fetch(`${API.USERS.GET}/reactivate/${Id}`, { method: 'PUT' });
    window.location.reload(false); // רענון דף
  }



  const ReactivateCategories = async (Id) => {

    let res = await fetch(`${API.CATEGORIES.GET}/reactivate/${Id}`, { method: 'PUT' });
    window.location.reload(false); // רענון דף
  }


  
  const ReactivateTopics = async (Id) => {

    let res = await fetch(`${API.TOPICS.GET}/reactivate/${Id}`, { method: 'PUT' });
    window.location.reload(false); // רענון דף
  }



  const ReactivateComments = async (Id) => {

    let res = await fetch(`${API.COMMENTS.GET}/reactivate/${Id}`, { method: 'PUT' });
    window.location.reload(false); // רענון דף
  }





  // התנתקות משתמש אדמין
  const logout = (event) => {
    sessionStorage.clear();
    history.push("/");
    window.location.reload(false); // רענון דף
  }




  useEffect(() => {
    LoadUsers();
    LoadCatergories();
    LoadTopics();
    LoadComments();
    LoadDeletedUsers();
    LoadDeletedCategories();
    LoadDeletedTopics();
    LoadDeletedComments();
  }, [])






  const checkAddCategoryFiled = async () => {

    if (NameCategory == '' || !Photo) {
      swal("Stop", "You need to fill in all the fields!", "warning");
      return;
    }

    else {
      uploadImage();
      swal("Successfully added a category!", "", "success");
      window.location.reload(false); // רענון דף
    }
  }





  const uploadImage = async () => {
    try {
      const form = new FormData();
      form.append("photo", Photo);
      let res = await fetch(API.CATEGORIES.UPLOAD, {
        method: 'POST',
        body: form
      });
      let data = await res.json()
      if (data.img) {
        addCategoryAdmin(data.img)
      }
    } catch (error) {
      swal(error, "", "error");
    }
  }






  const addCategoryAdmin = async (img) => {
    try {
      let user = {
        Name_category: NameCategory,
        Photo: img
      }
      let res = await fetch(API.CATEGORIES.ADD, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      });
      let data = await res.json()
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }





  return (

    <div className="reg">

      <div className="titlePage">
        <p>Admin Page</p>
        <Button variant="danger" size="sm" onClick={logout}>Log out</Button>
      </div>


      <Tabs defaultActiveKey="Users" transition={false} id="noanim-tab-example">


        <Tab eventKey="Users" title="Users" className='userss'>
          <Table striped bordered hover size="sm" style={{ fontSize: "13px" }}>
            <thead>
              <tr>
                <th style={{ width: "19px" }}>#</th>
                <th style={{ width: "80px" }}>Photo</th>
                <th style={{ width: "10px" }}>User Type code</th>
                <th style={{ width: "10px" }}>User code</th>
                <th style={{ width: "70px" }}>First Name</th>
                <th style={{ width: "70px" }}>Last Name</th>
                <th style={{ width: "100px" }}>Birthday</th>
                <th style={{ width: "70px" }}>City</th>
                <th style={{ width: "80px" }}>Id</th>
                <th style={{ width: "110px" }}>Email</th>
                <th style={{ width: "110px" }}>Password</th>
                <th style={{ width: "70px" }}></th>
                <th style={{ width: "50px" }}></th>
              </tr>
            </thead>

            {users.map(user =>
              <tbody>
                <tr>
                  <td>{iUsers++}</td>
                  <td><img src={user.Photo} height="60px" width="60px"></img></td>
                  <td>{user.UserType_code}</td>
                  <td>{user.User_code}</td>
                  <td>{user.First_name}</td>
                  <td>{user.Last_name}</td>
                  <td>{user.Birthday}</td>
                  <td>{user.City}</td>
                  <td>{user.Id}</td>
                  <td>{user.Email}</td>
                  <td>{user.User_password}</td>
                  <td><Button variant="primary" size="sm" onClick={() => ToUpdateUserPage(user.User_code)}>Update</Button>{' '}</td>
                  <td><Button variant="danger" size="sm" onClick={() => DeleteUser(user.User_code)}>Delete</Button></td>
                </tr>
              </tbody>
            )}

            {showDeletedUsers.map(user =>
              <tbody>
                <tr>
                  <td>{iUsers++}</td>
                  <td><img src={user.Photo} height="60px" width="120px"></img></td>
                  <td>{user.UserType_code}</td>
                  <td>{user.User_code}</td>
                  <td>{user.First_name}</td>
                  <td>{user.Last_name}</td>
                  <td>{user.Birthday}</td>
                  <td>{user.City}</td>
                  <td>{user.Id}</td>
                  <td>{user.Email}</td>
                  <td>{user.User_password}</td>
                  <td></td>
                  <td><Button variant="success" size="sm" onClick={() => ReactivateUser(user.User_code)}>Reactivate</Button></td>
                </tr>
              </tbody>
            )}
          </Table>
          <p className="userType">* User Type code :<br />1 - Regular user <br />2 - Admin</p>
        </Tab>



        <Tab eventKey="Catergories" title="Catergories" className='catergoriess'>
          <Table striped bordered hover size="sm" style={{ fontSize: "13px", marginBottom: "50px" }}>
            <thead>
              <tr>
                <th style={{ width: "19px" }}>#</th>
                <th style={{ width: "40px" }}>Category photo</th>
                <th style={{ width: "40px" }}>Serial code</th>
                <th style={{ width: "40px" }}>Name category</th>
                <th style={{ width: "40px" }}></th>
                <th style={{ width: "40px" }}></th>
              </tr>
            </thead>

            {catergories.map(category =>
              <tbody>
                <tr>
                  <td>{iCatergories++}</td>
                  <td><img src={category.Photo} height="60px" width="120px"></img></td>
                  <td>{category.Serial_code}</td>
                  <td>{category.Name_category}</td>

                  <td><Button variant="primary" size="sm" onClick={() => ToUpdateCategoryPage(category.Serial_code)}>Update</Button></td>
                  <td><Button variant="danger" size="sm" onClick={() => DeleteCategory(category.Serial_code)}>Delete</Button></td>
                </tr>



              </tbody>
            )}



            {showDeletedCategories.map(category =>
              <tbody>
                <tr>
                  <td>{iCatergories++}</td>
                  <td><img src={category.Photo} height="60px" width="120px"></img></td>
                  <td>{category.Serial_code}</td>
                  <td>{category.Name_category}</td>
                  <td></td>
                  <td><Button variant="success" size="sm" onClick={() => ReactivateCategories(category.Serial_code)}>Reactivate</Button></td>
                </tr>
              </tbody>
            )}
          </Table>
        </Tab>


        <Tab eventKey="Topics" title="Topics" className='topicss'>
          <Table striped bordered hover size="sm" style={{ fontSize: "13px", marginBottom: "176px" }}>
            <thead>
              <tr>
                <th style={{ width: "19px" }}>#</th>
                <th style={{ width: "30px" }}>Serial code</th>
                <th style={{ width: "30px" }}>Category code</th>
                <th style={{ width: "50px" }}>Topic title</th>
                <th style={{ width: "210px" }}>Topic text</th>
                <th style={{ width: "70px" }}>Date published</th>
                <th style={{ width: "70px" }}>Publish by-user code</th>
                <th style={{ width: "10px" }}></th>
                <th style={{ width: "10px" }}></th>

              </tr>
            </thead>

            {topics.map(topic =>
              <tbody>
                <tr>
                  <td>{iTopics++}</td>
                  <td>{topic.Serial_code}</td>
                  <td>{topic.Category_code}</td>
                  <td>{topic.Topic_title}</td>
                  <td>{topic.Topic_text}</td>
                  <td>{topic.Date_published}</td>
                  <td>{topic.Publish_by}</td>

                  <td><Button variant="danger" size="sm" onClick={() => DeleteTopic(topic.Serial_code)}>Delete</Button></td>
                </tr>
              </tbody>
            )}



            {showDeletedTopics.map(topic =>
              <tbody>
                <tr>
                  <td>{iTopics++}</td>
                  <td>{topic.Serial_code}</td>
                  <td>{topic.Category_code}</td>
                  <td>{topic.Topic_title}</td>
                  <td>{topic.Topic_text}</td>
                  <td>{topic.Date_published}</td>
                  <td>{topic.Publish_by}</td>
                  <td></td>
                  <td><Button variant="success" size="sm" onClick={() => ReactivateTopics(topic.Serial_code)}>Reactivate</Button></td>
                </tr>
              </tbody>
            )}

          </Table>
        </Tab>




        <Tab eventKey="Comments" title="Comments" className='commentss'>
          <Table striped bordered hover size="sm" style={{ fontSize: "13px", marginBottom: "270px" }}>
            <thead>
              <tr>
                <th style={{ width: "19px" }}>#</th>
                <th style={{ width: "30px" }}>Serial code</th>
                <th style={{ width: "20px" }}>Topic number</th>
                <th style={{ width: "230px" }}>Comment</th>
                <th style={{ width: "60px" }}>Publish by-user code</th>
                <th style={{ width: "10px" }}></th>
                <th style={{ width: "10px" }}></th>

              </tr>
            </thead>

            {comments.map(comment =>
              <tbody>
                <tr>
                  <td>{iComments++}</td>
                  <td>{comment.Serial_code}</td>
                  <td>{comment.Topic_number}</td>
                  <td>{comment.Comment}</td>
                  <td>{comment.Publish_by}</td>
                  <td><Button variant="danger" size="sm" onClick={() => DeleteComment(comment.Serial_code)}>Delete</Button></td>
                  <td></td>
                </tr>
              </tbody>
            )}


            {showDeletedComments.map(comment =>
              <tbody>
                <tr>
                  <td>{iComments++}</td>
                  <td>{comment.Serial_code}</td>
                  <td>{comment.Topic_number}</td>
                  <td>{comment.Comment}</td>
                  <td>{comment.Publish_by}</td>
                  <td></td>
                  <td><Button variant="success" size="sm" onClick={() => ReactivateComments(comment.Serial_code)}>Reactivate</Button></td>
                </tr>
              </tbody>
            )}
          </Table>
        </Tab>




        <Tab eventKey="Add Category" title="Add Category" style={{ marginBottom: "220px" }}>

          <div className="box">

            <div className="AddTopicPop">
              <br></br>
              <br></br>


              <label for="fname" style={{ fontFamily: "Verdana" }}>Category Name :</label><br />
              <input type="text"
                required
                placeholder="Name Category"
                value={NameCategory}
                onChange={(event) => setNameCategory(event.target.value)}
              />

              <br></br>

              <label for="fname" style={{ fontFamily: "Verdana" }}>Category Image :</label><br />
              <Form.Control
                type="file"
                onChange={(event) => setPhoto(event.target.files[0])}
              />

              <br></br>
              <br></br>



              <Button variant="success" type="addTopic" onClick={() => checkAddCategoryFiled()}>
                Add Category
              </Button>


            </div>

          </div>
        </Tab>
      </Tabs>
    </div>
  );
  
}

export default Admin;
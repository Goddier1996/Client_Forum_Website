import '../style/profile.css';
import '../style/infoUser.css';
import { useEffect, useState } from 'react';
import { API } from '../API';
import { useParams } from 'react-router-dom';



const UserInfo = () => {

    const [users, SetUsers] = useState([])

    let { id } = useParams();


    // אחראי על הצגת האינפורמציה לגבי אותו משתמש
    const LoadInfo = async () => {

        let res = await fetch(`${API.USERS.GET}/${id}`, { method: 'GET' });
        let data = await res.json();

        SetUsers(data);
    }



    useEffect(() => {
        LoadInfo();
    }, [])





    return (

        users.map(user =>

            <div>

                <div className="title_info">
                    <p>{user.First_name} Details:</p>
                </div>

                <br></br>
                <br></br>
                <br></br>
                <br></br>

                <div className="main-body">


                    <div className="row gutters-sm">
                        <div className="col-md-4 mb-3">
                            <div className="card">
                                <div className="card-body">
                                    <div className="d-flex flex-column align-items-center text-center">
                                        <img src={user.Photo} width="200" />

                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-8">
                            <div className="card mb-3">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Full Name</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            {user.First_name} {user.Last_name}
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Email</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            {user.Email}
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Birthday</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            {user.Birthday}
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">City</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            {user.City}
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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

export default UserInfo;
import { CardColumns } from 'react-bootstrap'
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { API } from '../API';
import '../style/home.css';



const Home = () => {



  const [categories, SetCategories] = useState([])


  const LoadCategories = async () => {

    let res = await fetch(API.CATEGORIES.GET, { method: 'GET' });
    let data = await res.json();

    SetCategories(data);
  }


  
  useEffect(() => {

    LoadCategories();

  }, [])




  return (

    <div >

      <div className="StyleCarousel">
        <img
          className="d-block w-100"
          src={require("../images/homeee.png").default}
        />
      </div>

      <br></br>

      <CardColumns>

        {categories.map(category =>

          <div className="NEWS1">
            <div className="NEWScard">
              <img src={category.Photo} />
              <div className="top-left">
                <NavLink to={`/CommunityPage/${category.Serial_code}`}
                  style={{
                    textDecoration: "none",
                    color: "#fff",
                    borderColor: "white",
                    background: "#00000082",
                    borderRadius: "8px 0px",
                    top: "0px",
                    left: "0px",
                    fontSize: "25px",
                    borderBottom: "2px solid #fff",
                    borderRight: "2px solid #fff",
                    position: "absolute",
                    padding: "4px",
                    textShadow: "1px 0 0 #000, -1px 0 0 #000, 0 1px 0 #000, 0 -1px 0 #000, 1px 1px #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000",
                  }}
                >{category.Name_category}</NavLink>
              </div>
            </div>

          </div>
        )
        }

      </CardColumns>

      <br></br>
      <br></br>
    </div >
  );
}

export default Home;
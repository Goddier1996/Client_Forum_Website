
import 'bootstrap/dist/css/bootstrap.css'
import React from 'react';
import './style_componets/footer.css';
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert'; // popup 



const Footer = () => {

	const history = useHistory()

	let u = JSON.parse(sessionStorage.getItem("user")) //יצירת משתנה מהסאשיין על מנת להציג תמונה של משתמש ספציפי




	const checkProfile = async () => {


		if (u == null || u == undefined) {
			swal("Stop", "You need to login first!", "warning");
		}
		else {
			history.push(`/Profile/${u.User_code}`);
		}
	}



	const checkRegister = async () => { // אם המשתמש מחובר הוא לא יוכל לבצע הרשמה ולהפך


		if (u != null || u != undefined) {
			swal("Stop", "You need to Logout first!", "warning");
		}
		else {
			history.push(`/Register`);
		}
	}



	if (u == null || u == undefined) {
		return (
			<div className="foot">
				<footer className="footer-distributed">

					<div className="footer-left">

						<Link to="/" style={{ textDecoration: "none" }}>
							<img
								src={require("../images/Logo.png").default}
								style={{
									width: 'auto',
									height: '58px'
								}}
							/>
						</Link>

						<p className="footer-company-name">Made by Artium and Shelly © 2022</p>
					</div>



					<div className="footer-center">

						<p className="footer-links">

							<a href="#" className="link-1"><Link to="/"><span>Home</span></Link></a>

							<a href="#" className="link-2" onClick={checkRegister}><span>Register</span></a>

							<a href="#" className="link-3" onClick={checkProfile}><span>Profile</span></a>

							<a href="#" className="link-4"><Link to="/Login"><span>Login</span></Link></a>

						</p>
					</div>



					<div className="footer-right">

						<p className="footer-company-about">
							<span>About the forum</span>
							This forum deals with a variety of general topics related to everyone's daily lives.
						</p>

						<div className="footer-icons">

							<a href="https://www.facebook.com/" >
								<i>
									<img class="image1"
										src={require("../images/f.jpg").default}
										width="25"
										height="25"
										alt="Profile"
									/>
								</i>
							</a>

							<a href="https://www.instagram.com">
								<i>
									<img class="image2"
										src={require("../images/Instagram.png").default}
										width="25"
										height="25"
										alt="Profile"
									/>
								</i>
							</a>

							<a href="https://twitter.com/twitter">
								<i>
									<img class="image3"
										src={require("../images/Twitter.png").default}
										width="25"
										height="25"
										alt="Profile"
									/>
								</i>
							</a>

							<a href="https://mail.google.com/">
								<i>
									<img class="image4"
										src={require("../images/Gmail.png").default}
										width="25"
										height="25"
										alt="Profile"
									/>
								</i>
							</a>

						</div>
					</div>
				</footer>
			</div>
		);
	}

	else {

		return (

			<div className="foot">
				<footer className="footer-distributed">

					<div className="footer-left">

						<Link to="/" style={{ textDecoration: "none" }}>
							<img
								src={require("../images/Logo.png").default}
								style={{
									width: 'auto',
									height: '58px'
								}}
							/>
						</Link>

						<p className="footer-company-name">Made by Artium and Shelly © 2022</p>
					</div>



					<div className="footer-center">

						<p className="footer-links">

							<a href="#" className="link-1"><Link to="/"><span>Home</span></Link></a>

							{/* <a href="#" className="link-2" onClick={checkRegister}><span>Register</span></a> */}

							<a href="#" className="link-3" onClick={checkProfile}><span>Profile</span></a>

							{/* <a href="#" className="link-4"><Link to="/Login"><span>Login</span></Link></a> */}

						</p>
					</div>



					<div className="footer-right">

						<p className="footer-company-about">
							<span>About the forum</span>
							This forum deals with a variety of general topics related to everyone's daily lives.
						</p>

						<div className="footer-icons">

							<a href="https://www.facebook.com/" >
								<i>
									<img class="image1"
										src={require("../images/f.jpg").default}
										width="25"
										height="25"
										alt="Profile"
									/>
								</i>
							</a>

							<a href="https://www.instagram.com">
								<i>
									<img class="image2"
										src={require("../images/Instagram.png").default}
										width="25"
										height="25"
										alt="Profile"
									/>
								</i>
							</a>

							<a href="https://twitter.com/twitter">
								<i>
									<img class="image3"
										src={require("../images/Twitter.png").default}
										width="25"
										height="25"
										alt="Profile"
									/>
								</i>
							</a>

							<a href="https://mail.google.com/">
								<i>
									<img class="image4"
										src={require("../images/Gmail.png").default}
										width="25"
										height="25"
										alt="Profile"
									/>
								</i>
							</a>

						</div>
					</div>
				</footer>
			</div>
		);
	}





}

export default Footer;



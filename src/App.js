import { BrowserRouter, Route, Switch } from "react-router-dom"; // מאפשר העברה בין מסכים
import React from 'react';
import Menu from "./components/menu";
import Footer from "./components/footer";
import Home from "./pages/home";
import Login from "./pages/Login";
import Register from "./pages/register";
import MessagePage from "./pages/MessagePage";
import CommunityPage from "./pages/CommunityPage";
import Admin from "./pages/admin";
import Profile from "./pages/profile";
import UpdateTopic from './pages/updateTopic';
import UpdateUser from './pages/updateUser';
import UpdateCategory from "./pages/updateCategory";
import UserInfo from './pages/UserInfo';
import UpdateNewPassword from "./pages/updateNewPassword";



function App() { // אחראי על ההעברה בין המסכים

  return (
    // מסנכרן ושומר את כתובת האתר
    <BrowserRouter>

      {/* קומפוננטה menu */}
      <Menu />

      {/* ייחודי Route אחראי לטעינת  */}
      <Switch>

        <Route path="/" exact component={Home} />
        <Route path="/Login" exact component={Login} />
        <Route path="/Register" exact component={Register} />
        <Route path="/MessagePage/:id" exact component={MessagePage} />
        <Route path="/CommunityPage/:id" exact component={CommunityPage} />
        <Route path="/Admin/:id" exact component={Admin} />
        <Route path="/Profile/:id" exact component={Profile} />
        <Route path="/UpdateTopic/:id" exact component={UpdateTopic} />
        <Route path="/UpdateUser/:id" exact component={UpdateUser} />
        <Route path="/UpdateCategory/:id" exact component={UpdateCategory} />
        <Route path="/UserInfo/:id" exact component={UserInfo} />
        <Route path="/UpdateNewPassword/:id" exact component={UpdateNewPassword} />

      </Switch>

      {/* קומפוננטה footer */}
      <Footer />

    </BrowserRouter>

  );
}

export default App;
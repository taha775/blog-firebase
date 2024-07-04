import React from "react";
import { Routes, Route } from "react-router-dom";

import Blogs from "../Components/Blogs/Blogs";
import SinglePost from "../Components/SinglePost";
import About from "../Components/About";
import Contact from "../Components/Contact";
import Home from "../Components/Home";
import Signup from "../Components/USER/Signup";
import Login from "../Components/USER/Login";
import Userpanel from "../Panels/UserPanel/Userpanel";
import Adminpanel from "../Panels/AdminPanel/Adminpanel";
import Writerpanel from "../Panels/WriterPanel/Writerpanel";
import Post from "../Panels/UserPanel/Post";
import Mypost from "../Panels/UserPanel/Mypost";
import Buisness from "../Components/Categories/Buisness";
import Entertainment from "../Components/Categories/Entertainment";
import Health from "../Components/Categories/Health";
import News from "../Components/Categories/News";
import Sports from "../Components/Categories/Sports";
import Technology from "../Components/Categories/Technology";
import Lifestyle from "../Components/Categories/Lifestyle";
import Other from "../Components/Categories/Other";
import Education from "../Components/Categories/Education";
import Disclaimer from "../Components/Disclaimer";
import Privacypolicy from "../Components/Privacypolicy";
import Allusers from "../Panels/AdminPanel/Allusers";
import Allpost from "../Panels/AdminPanel/Allpost";
import Allposts from "../Panels/UserPanel/Allposts";
import AddPost from "../Panels/AdminPanel/AddPost";




const Navigation = () => {
  return (
        <Routes>
          {/* pages */}
        <Route path="/" element={<Home/>} />
        <Route path="/disclaimer" element={<Disclaimer/>} />
        <Route path="/privacypolicy" element={<Privacypolicy/>} />
        <Route path="/blog" element={<Blogs/>} />
        <Route path="/singlepost" element={<SinglePost/>} />
        <Route path="/aboutus" element={<About/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />

        {/* categories */}
        <Route path="/buisness" element={<Buisness/>} />
        <Route path="/entertainment" element={<Entertainment/>} />
        <Route path="/health" element={<Health/>} />
        <Route path="/news" element={<News/>} />
        <Route path="/sports" element={<Sports/>} />
        <Route path="/technology" element={<Technology/>} />
        <Route path="/lifestyle" element={<Lifestyle/>} />
        <Route path="/education" element={<Education/>} />
        <Route path="/history" element={<History/>} />
        <Route path="/other" element={<Other/>} />
        
        {/* panels */}
        <Route path="/user-panel/:uid" element={<Userpanel showNavBar={false} showFooter={false} />}>
          <Route path="/user-panel/:uid" element={<Allposts />} />
          <Route path="new-post/:uid" element={<Post />} />
          <Route path="my-posts/:uid" element={<Mypost />} />
        
        </Route>
      
        <Route path="/writer-panel/:uid" element={<Writerpanel  showNavBar={false} showFooter={false} />} />
        
        <Route path="/admin-panel/*" element={<Adminpanel />}>
        
          <Route path="allusers" element={<Allusers />} />
          <Route path="allposts" element={<Allpost />} />
          <Route path="addpost" element={<AddPost />} />
        </Route>
        
        </Routes>
  );
};

export default Navigation;

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Header from './components/Header';
import MainBody from './components/MainBody';
import Login from './components/Login';
import Signup from './components/Signup';
import ProfileMainBody from './components/ProfileMainBody';
import Upload  from './components/Upload';
import Test1 from './components/Test'
import './styles/styles.css';

const App = () => {
    return (
        <Router>
            <div>
                {/* <Header /> */}
                <Routes>
                    <Route path="/" element={<MainBody />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/upload" element={<Upload />} />
                    <Route path="/profile" element={<ProfileMainBody />} />
                    <Route path="/test1" element={<Test1 />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;

import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Header';
import TopSpotIts from './components/TopSpotIts';
import GoSpotit from './components/GoSpotit';
import Feed from './components/Feed';
import './components/theme.css';

const App = () => (
    <>
        <Header />   
        <div className='container'>
            <TopSpotIts />    
            <Feed />
            <GoSpotit />
        </div>
    </>
);

ReactDOM.render(<App />, document.getElementById("root"));

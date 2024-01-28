import React from 'react'
import Navbar from './Components/Navbar';
import News from './Components/News';
import NewsItem from './Components/NewsItem';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';
import { useState } from 'react';
const App=()=>{
  const pageSize=9;
  let [progress,setProgress]=useState(0);
  return(
      <div className='bg-secondary'>
        <BrowserRouter>
        <Navbar/>
        <LoadingBar
        color='#f11946'
        progress={100}
        height={4}
        onLoaderFinished={() => setProgress(progress)}
        />
          <Routes>
          <Route
              exact
              path="/wwe"
              element={<News setProgress={setProgress}
                query="wwe"
                pageSize={15}/>}
            />
            <Route
              exact
              path="/*"
              element={<News setProgress={setProgress}
                key="general"
                country="in" category="general" pageSize={15}/>}
            />
            <Route 
              exact
              path="/business/*"
              element={<News setProgress={setProgress}
              key="business"
              country="in" category="business" 
              pageSize={15}/>}
              />
              <Route 
              exact
              path="/health/*"
              element={<News setProgress={setProgress}
              key="health"
              country="in" category="health" 
              pageSize={15}/>}
              />
              <Route 
              exact
              path="/science/*"
              element={<News setProgress={setProgress} 
              key="science"
              country="in" category="science" 
              pageSize={15}/>}
              />
              <Route 
              exact
              path="/sports/*"
              element={<News setProgress={setProgress} 
              key="sports"
              country="in" category="sports" 
              pageSize={15}/>}
              />
              <Route 
              exact
              path="/technology/*"
              element={<News setProgress={setProgress}
              key="technology"
              country="in" category="technology" 
              pageSize={15}/>}
              />
            </Routes>
        </BrowserRouter>
      </div>
      );
}
export default App;
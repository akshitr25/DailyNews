import React, { Component } from 'react'
import Navbar from './Components/Navbar';
import News from './Components/News';
import NewsItem from './Components/NewsItem';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
        <Navbar/>
          <Routes>
            <Route
              exact
              path="/*"
              element={<News
                key="general"
                country="in" category="general" pageSize={9}/>}
            />
            <Route 
              exact
              path="/business/*"
              element={<News 
              key="business"
              country="in" category="business" 
              pageSize={9}/>}
              />
              <Route 
              exact
              path="/health/*"
              element={<News 
              key="health"
              country="in" category="health" 
              pageSize={9}/>}
              />
              <Route 
              exact
              path="/science/*"
              element={<News 
              key="science"
              country="in" category="science" 
              pageSize={9}/>}
              />
              <Route 
              exact
              path="/sports/*"
              element={<News 
              key="sports"
              country="in" category="sports" 
              pageSize={9}/>}
              />
              <Route 
              exact
              path="/technology/*"
              element={<News 
              key="technology"
              country="in" category="technology" 
              pageSize={9}/>}
              />
              <Route 
              exact
              path="/WWE/*"
              element={<News 
              country="us"
              pageSize={9}/>}
              />
            </Routes>
        </BrowserRouter>
      </div>
    )
  }
}

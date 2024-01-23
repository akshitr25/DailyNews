import React, { Component } from 'react'
import Navbar from './Components/Navbar';
import News from './Components/News';
import NewsItem from './Components/NewsItem';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';
export default class App extends Component {
  pageSize=9;
  state= {progress: 0}
  setProgress=(progress)=>{
    this.setState({progress: progress})
  }
  render() {
    return (
      <div>
        <BrowserRouter>
        <Navbar/>
        <LoadingBar
        color='#f11946'
        progress={100}
        onLoaderFinished={() => this.setProgress(this.state.progress)}
        />
          <Routes>
            <Route
              exact
              path="/*"
              element={<News setProgress={this.setProgress}
                key="general"
                country="in" category="general" pageSize={9}/>}
            />
            <Route 
              exact
              path="/business/*"
              element={<News setProgress={this.setProgress}
              key="business"
              country="in" category="business" 
              pageSize={9}/>}
              />
              <Route 
              exact
              path="/health/*"
              element={<News setProgress={this.setProgress}
              key="health"
              country="in" category="health" 
              pageSize={9}/>}
              />
              <Route 
              exact
              path="/science/*"
              element={<News setProgress={this.setProgress} 
              key="science"
              country="in" category="science" 
              pageSize={9}/>}
              />
              <Route 
              exact
              path="/sports/*"
              element={<News setProgress={this.setProgress} 
              key="sports"
              country="in" category="sports" 
              pageSize={9}/>}
              />
              <Route 
              exact
              path="/technology/*"
              element={<News setProgress={this.setProgress}
              key="technology"
              country="in" category="technology" 
              pageSize={9}/>}
              />
            </Routes>
        </BrowserRouter>
      </div>
    )
  }
}

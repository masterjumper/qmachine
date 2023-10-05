import "./App.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons';
import {faXTwitter} from '@fortawesome/free-brands-svg-icons';
import React, { useEffect, useState } from 'react';

function App() {

    const [appColor, setAppColor] = useState('');
    const [appText, setAppText] = useState('');
    const [appAuth, setAppAuth] = useState('');

    const [appTimeRefresh, setAppTimeRefresh] = useState(15);

    useEffect(() => {
      const randomColor = generateRandomColor();
      setAppColor(randomColor);
    }, []);

    useEffect(()=>{
      const delay = 800;
      const fetchData = async () => {
        await new Promise(resolve => setTimeout(resolve, delay));
          fetch('https://dummyjson.com/quotes/random')
          .then(res => 
            res.json()
          )      
          .then(data=>{        
            setAppText(' ' + data.quote.trim());
            setAppAuth(data.author);
            setAppTimeRefresh(15);
          });
      };
      fetchData();
      const interval = setInterval(() => {
        fetchData();
      }, 15000);
  
      return () => clearInterval(interval);
    },[])

    useEffect(() => {
      const interval = setInterval(() => {
        setAppTimeRefresh((appTimeRefresh) => appTimeRefresh - 1);
      }, 1000);
  
      return () => clearInterval(interval);              
    }, []);

    useEffect(() => {
      if (appTimeRefresh === 0) {
        const newColor = generateRandomColor();
        setAppColor(newColor);
      }
    }, [appTimeRefresh]);

    const generateRandomColor = () => {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {        
        color += letters[Math.floor(Math.random() * 8)];        
      }      
      return color;
    };

    let styles = {
      backgroundColor: appColor, 
      transition: 'background-color 3s linear',      
    }

    return (
    <div className='App'>
      <body className='App-header' style={styles}>        
        <div className="row justify-content-center" style={styles}>
          <div className="card w-150" id="quote-box" >
            <div className="card-body">
              <blockquote className="blockquote mb-5">                
                <p style={{color: appColor, fontFamily: 'Roboto', fontSize:'36px', width:'500px', transition: 'color 3s linear'}}>
                  <FontAwesomeIcon icon={faQuoteLeft} size="lg"  style={{color: appColor, transition: 'color 3s linear'}}/>
                    {appText}
                </p>
              </blockquote>
              <blockquote className="blockquote mb-2">
                <footer className="blockquote-footer text-end" style={{ color: appColor, fontFamily: 'Roboto', transition: 'color 3s linear', fontSize:'22px' }} id="author">{appAuth}                  
                </footer>
              </blockquote> 
                <div className="d-flex justify-content-between">
                  <div className="text-start">
                    <a href="https://twitter.com/intent/tweet" rel="noreferrer" target="_blank" className="btn" style={{ backgroundColor: appColor, transition: 'background-color 3s linear', color:"white" }} id="tweet-quote">                
                    <FontAwesomeIcon icon={faXTwitter} size="lg" />
                    </a>
                  </div>
                  <div className="text-end">
                    <a href="http://localhost:3000" rel="noreferrer" className="btn" style={{backgroundColor: appColor, transition: 'background-color 3s linear', color:"white" }} id="new-quote">Next Quote</a>
                  </div>
                </div>             
            </div>
          </div>
        </div>
        <div>
          <h6>
            it will change in {appTimeRefresh} sec.
          </h6>
        </div>
      </body>
      <footer style={{position:'fixed', left: 0, bottom: 0, width: '100%', backgroundColor: appColor, transition: 'background-color 3s linear', color:"white" }}>
        <h6 style={{fontSize:'12px'}}>by <a href="http://localhost:3000" rel="noreferrer" style={{color:"white", textDecoration: 'none' }}>S.Muguerza</a></h6>
      </footer>
    </div>
  );
}

export default App;
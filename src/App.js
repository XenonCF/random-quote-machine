import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareTwitter, faSquareTumblr } from '@fortawesome/free-brands-svg-icons'
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from "react";


export default function App() {
  const [state, setState] = useState([{}])
  const [currentAuthor, setCurrentAuthor] = useState("")
  const [currentQuote, setCurrentQuote] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  
  useEffect(() => {
    const dataFetch = async () => {
      const data = await (
        await fetch('https://api.quotable.io/quotes/random?limit=50', {
          method: 'GET',
          contentType: 'application/json'
        })
      ).json();
      
      setState(
        data.map(result => ({quote: result.content, author: result.author}))
      );
      
    };

    dataFetch();
  }, []);

  useEffect(() => setCurrentAuthor(state[currentIndex].author), [state, currentIndex]);
  useEffect(() => setCurrentQuote(state[currentIndex].quote), [state, currentIndex]);

  function randomIndex() {
    setCurrentIndex(Math.floor(Math.random() * 50))
  }

  return (
    <div className="App" >
      <div className="card" style={{width: 700}}>
        <div className="card-body">
          <blockquote id='quote-box' className="blockquote mb-0 ">
            <p id="text"><FontAwesomeIcon icon={faQuoteLeft}/>{currentQuote}</p>
            <footer id='author' className="blockquote-footer"><cite title="Source Title">{currentAuthor}</cite></footer>
            <a id='tweet-quote' href={'https://twitter.com/intent/tweet?text="' + currentQuote + '" -' + currentAuthor} className="card-link"><FontAwesomeIcon icon={faSquareTwitter} /></a>
            <a id='tumblr' href={"https://www.tumblr.com/widgets/share/tool?posttype=quote&caption="+currentAuthor+"&content="+currentQuote+"&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button"}className="card-link"><FontAwesomeIcon icon={faSquareTumblr} /></a>
            <div id="spacer"></div>
            <button id="new-quote" className="card-link" onLoad={randomIndex} onClick={randomIndex}>New Quote</button>
          </blockquote>
        </div>
      </div>
    </div>
  );
}

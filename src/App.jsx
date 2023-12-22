import { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = { 
      author: '',
      content: '',
      color: ''
    }

    this.randomQuote = this.randomQuote.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.getRandomHexColor = this.getRandomHexColor.bind(this);
  }
  
  async randomQuote() {
  try {
    const response = await fetch('https://api.quotable.io/random');
    const quote = await response.json()
    return quote;
  } catch (e) {
    throw new Error(e.message)
  }
  }

  async componentDidMount() {
  await this.handleClick()
  }
  
  async handleClick(){
    const quote = await this.randomQuote();
    const color = this.getRandomHexColor();

    this.setState({
      author: quote.author,
      content: quote.content,
      color: color
    });

    document.body.style.backgroundColor = color;
  }
  
  getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

  render() {
    const {content, author, color} = this.state;

    return (
      <div>
        <div id="quote-box">
          <div className='quote-text'>
            <p id="text" style={{color: color, transition: "all 1s ease"}} >
              <i className="fa fa-quote-left" style={{color: color, transition: "all 1s ease"}}></i>{content}<i className="fa fa-quote-right" style={{color: color, transition: "all 1s ease"}}></i>
            </p>
          </div>

          <div className="quote-author">
            <p id="author" style={{color: color, transition: "all 1s ease"}}>- {author}</p>
          </div>
          <div className="buttons">
            <button className='button' id="new-quote" style={{backgroundColor: color, transition: "all 1s ease"}} onClick={this.handleClick}>New quote</button>
            <a className='button' id="tweet-quote" target="_top" href="https://twitter.com/intent/tweet" style={{backgroundColor: color, transition: "all 1s ease"}}>
              <i className="fab fa-twitter"></i>
            </a>
          </div>
        </div>
        
        <div className="dev">
          by <a href="https://github.com/VadymPopov">Vadym Popov</a>
        </div>
      </div>
    );
  }
}

export default App;
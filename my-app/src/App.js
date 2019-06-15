import React, { Component } from 'react';
import Particles from 'react-particles-js';
import './App.css';

const particleOpt =
{
  particles: {
    number: {
      value: 150,
      density: {
        enable: true,
        value_area: 500
      }
    }
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiUrl: null,
      author: '',
      text: '',
      count: 0
    };
  }

  componentDidMount() {
    fetch('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json', {
      headers: {
        Accept: "application/json",
      }
    })
      .then(response => response.json())
      .then((responseData) => {
        this.Generator(responseData.quotes)
      })
      .catch(error => this.setState({ error }));
  }

  handleClick = () => {
    this.Generator(this.state.apiUrl);
  }

  Generator = (data) => {
    let randomNumber = Math.floor(Math.random() * (data.length));

    this.setState({
      apiUrl: data,
      text: data[randomNumber].quote,
      author: data[randomNumber].author,
      count: this.state.count + 1

    })
  }

  shareOnTwitter = () => {
    var url = "twitter.com";
    let text = `${this.state.author} - ${this.state.text}`
    window.open('http://twitter.com/share?url=' + encodeURIComponent(url) + '&text=' + encodeURIComponent(text), '', 'left=0,top=0,width=550,height=450,personalbar=0,toolbar=0,scrollbars=0,resizable=0');
  }

  render() {
    return (
      <div id="main">
        <h1 id="title">Random Quote Machine</h1>
        <div id="quote-box">
          <p id="text">{this.state.text}</p>
          <p id="author"> - {this.state.author}</p>
          <button id="tweet-quote" onClick={this.shareOnTwitter}>Twitter</button>
          <button id="new-quote" onClick={this.handleClick}>New Quote</button>
          <Particles
            params={particleOpt}
          />
        </div>
      </div>
    );
  }
}

export default App;
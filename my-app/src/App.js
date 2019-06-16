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
      screen: 'home',
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
  handleClickAllQuotes = () => {
    this.setState({
      screen: 'AllData'
    })
  }
  backHome = () => {
    this.setState({ screen: 'home' })
  }

  render() {
    const AllQuotes = [];
    if (this.state.screen === 'home') {
      return (
        <div id="main">
          <h1 id="title">Random Quote Machine</h1>
          <div id="quote-box">
            <p id="text">{this.state.text}</p>
            <p id="author"> - {this.state.author}</p>
            <button id="tweet-quote" onClick={this.shareOnTwitter}>Twitter</button>
            <button id="new-quote" onClick={this.handleClick}>New Quote</button>
            <button id="AllData" onClick={this.handleClickAllQuotes}>Show all quotes</button>

            <Particles
              params={particleOpt}
            />

          </div>

        </div>
      )

    } else if (this.state.screen === 'AllData') {

      this.state.apiUrl.forEach(element => {
        AllQuotes.push(
          <div>
            <ul className="allList">
              <li className="QuoteList">{"Quote : " + element.quote}</li>
              <li className="AuthorList">{"author : " + element.author}</li>
            </ul>

          </div>
        );

      })
    }
    return <div>
      <h1 id="AllQuotes">All Quotes</h1>
      {AllQuotes}
      <button id="backHome" onClick={this.backHome}>Back</button>
    </div>
  }
}

export default App;
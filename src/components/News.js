import React, { Component} from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";


export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 6,
    // category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
 
articles = [ {"source": {
    "id": "bbc-news",
    "name": "BBC News"
    },
    "author": "BBC News",
    "title": "Mother of six-year-old who shot teacher jailed for two years",
    "description": "Deja Taylor is jailed for two years after pleading guilty to felony child neglect over the incident.",
    "url": "http://www.bbc.co.uk/news/world-us-canada-67722479",
    "urlToImage": "https://ichef.bbci.co.uk/news/1024/branded_news/E1FA/production/_130805875_gettyimages-1246686493.jpg",
    "publishedAt": "2023-12-16T06:37:16.7507749Z",
    "content": "The mother of a six-year-old boy who shot his teacher in Virginia has been sentenced to two years in prison. \r\nDeja Taylor, 26, reached a plea deal with prosecutors to lessen the sentencing which cou… [+1675 chars]"
    },];
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
  }

  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=64ac15be63ae49ac856cce7b84ae51ea&page=1&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    // console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
  }
  handlePrevclick = async () => {
    console.log("Previous");
    let url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country}&category=${this.props.category}&apiKey=64ac15be63ae49ac856cce7b84ae51ea&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
      this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      loading: false,
    });
  };
  handleNextclick = async () => {
    console.log("Next");
    if (
      !(
        this.state.page + 1 >
        Math.ceil(this.state.totalResults / this.props.pageSize)
      )
    ) {
      let url = `https://newsapi.org/v2/top-headlines?country=${
        this.props.country
      }&category=${
        this.props.category
      }&apiKey=64ac15be63ae49ac856cce7b84ae51ea&page=${
        this.state.page + 1
      }&pageSize=${this.props.pageSize}`;
      this.setState({ loading: true });
      let data = await fetch(url);
      let parsedData = await data.json();

      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles,
        loading: false,
      });
    }
  };
  render() {
    return (
      <div className="container my-5 py-2">
        <h2 className="text-center">NewsMonkey -Top {this.props.category} headlines</h2>
        {this.state.loading && <Spinner />}
        <div className="row">
          {!this.state.loading &&
            this.state.articles.map((element) => {
              return (
                <div className="col-md-4 p-2" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title : ""}
                    description={element.description ? element.description : ""}
                    imageurl={element.urlToImage}
                    newsurl={element.url} author={element.author} date={element.publishedAt}
                  />
                </div>
              );
            })}
        </div>
        <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePrevclick}
          >
            &larr;previous
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextclick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;

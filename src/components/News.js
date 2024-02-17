import React, { Component ,useEffect, useState} from 'react';
import NewsItem from './NewsItem';
import  Spinner  from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
// import { parse } from 'dotenv';


const News= (props)=> {
  const [articles,setArticles]=useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, settotalResults] = useState(0)
  const capitalizeFirstLetter=(string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  useEffect(() => {
    document.title=`${document.title=`${capitalizeFirstLetter(props.category)}-NewsPark`}`
    updateNews();
  }, [])
    // constructor(props) {
      //     super(props);
      //     this.state = {
        //         articles: [],
        //         loading: true,
        //         page:1,
        //         totalResults:0
        //     }
        
        // }
        
        const  updateNews=async()=>{
          props.setProgress(0)
          let url=`https://newsapi.org/v2/everything?q=${props.category}&apiKey=105f27ddb1c944b6bfaa49eac1a4f907&page=${page}&pageSize=${props.pageSize}`;
          
          setLoading(true)
          let data=await fetch(url)
          let parseData=await data.json();
          setArticles(parseData.articles)
          settotalResults(parseData.totalResults)
          setLoading(false)
          props.setProgress(100)
        }

    const fetchMoreData = async() => {
      let url=`https://newsapi.org/v2/everything?q=${props.category}&apiKey=105f27ddb1c944b6bfaa49eac1a4f907&page=${page+1}&pageSize=${props.pageSize}`;
      setPage(page+1);
      setLoading(true)
      let data=await fetch(url)
      let parseData=await data.json();
      setArticles(articles.concat(parseData.articles))
      settotalResults(parseData.totalResults)
    };

    // handlePrevClick=async()=>{
    //   let url=`https://newsapi.org/v2/everything?q=${props.category}&apiKey=105f27ddb1c944b6bfaa49eac1a4f907&page=${this.state.page - 1}&pageSize=${props.pageSize}`;
    //   let data=await fetch(url)
    //   this.setState({loading:true})
    //   let parseData=await data.json();

    //     this.setState({
    //       page:this.state.page-1,
    //       articles:parseData.articles,
    //       loading:false
    //     })
    // }

    // handleNextClick=async()=>{
    //   if(this.state.page+1>Math.ceil(this.state.totalResults/20)){

    //   }
    //   else{
    //     let url=`https://newsapi.org/v2/everything?q=${props.category}&apiKey=105f27ddb1c944b6bfaa49eac1a4f907&page=${this.state.page + 1}&pageSize=${props.pageSize} `;
    //     this.setState({loading:true})
    //     let data=await fetch(url)
    //     let parseData=await data.json();
  
    //       this.setState({
    //         page:this.state.page+1,
    //         articles:parseData.articles,
    //         loading:false
    //       })
    //   }
    // }

        return (
            <div className="container my-3">
              <h1 className="text-center" style={{margin:'35px 0px',marginTop:'90px'}}>NewsPark - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
              <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
                <div className="row">
                    {articles.map((element)=>{
                        return <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title?element.title:""} description={element.description?element.description:""} imageurl={ element.urlToImage} newsurl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                        </div>
                    })}
                </div>
                </div>
         
        </InfiniteScroll>
              {/* {this.state.loading && <Spinner/>} */}
                {/* <div className="container d-flex justify-content-between">
                  <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>Previous</button>
                    <button disabled={this.state.page+1>Math.ceil(this.state.totalResults/20)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next</button>
                </div> */}
            </div>
        );
    }

News.defaultProps={
  category:'general',
  pageSize:8,
}

News.propTypes={
  pageSize:PropTypes.number,
  category:PropTypes.string
}
export default News
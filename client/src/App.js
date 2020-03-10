
import React, { useState, useEffect } from 'react';

import Footer from './components/Footer.js';
import Cards from './components/Cards.js';
import API from './utils/API.js';
import NewsList from './components/Newslist';

function App() {


   const [news, setNews] = useState({ news: [] });
   const [newsList, setNewsList] = useState({ newsList: [] });
   const [categories, setCategories] = useState({ categories: {
                     business:[],
                     general: [],
                     entertainment: [],
                     sports: [],
                     health: [],
                     science: [],
                     technology: []
                  }});


   useEffect(() => {
      getNews_();
      getCategories();
     // getNews_();
   }, [newsList])


   const getNews_ = (param) => {
      API.getNews(param || '').then(data => {
         setNews({ news: data.data.articles })
      })
   }

   const getCategories = ()=>{
      let categories_ = {
         business:[],
         general: [],
         entertainment: [],
         sports: [],
         health: [],
         science: [],
         technology: []
      };
      API.getHeadlines().then(data=>{
         data.data.sources.map(article=>{
            let cat = article.category;
            //categories[cat].push({desc:article.description, url:article.url});
            categories_[cat].push({desc:article.description, url:article.url});
         })
         setCategories({categories:categories_});
         //console.log(JSON.stringify(categories_));
      })
   }

   const handleClick = (e) => {
      console.log(e.target.id);
      getNews_(`&category=${e.target.id}`)
   };

   return (
      <div>
         <div className="text-center sticky-top" style={{ color: "black", fontSize: "30px" }}><a className="page-top" href="#">THE WORLD NETWORK  </a></div>

         <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
               <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" >
               <ul className="navbar-nav mr-auto" id="navigationItems">

                  <li className="nav-item">
                     <a className="nav-link" onClick={(e) => handleClick(e)} id="technology" href="#">Technology</a>
                  </li>
                  <li className="nav-item">
                     <a className="nav-link" onClick={(e) => handleClick(e)} id="sports" href="#">Sports</a>
                  </li>
                  <li className="nav-item">
                     <a className="nav-link" onClick={(e) => handleClick(e)} id="science" href="#">Science</a>
                  </li>
                  <li className="nav-item">
                     <a className="nav-link" onClick={(e) => handleClick(e)} id="finance" href="#">Finance</a>
                  </li>
                  <li className="nav-item">
                     <a className="nav-link" onClick={(e) => handleClick(e)} id="health" href="#">Health</a>
                  </li>
                  <li className="nav-item">
                     <a className="nav-link" onClick={(e) => handleClick(e)} id="business" href="#">Business</a>
                  </li>
                  <li className="nav-item">
                     <a className="nav-link" onClick={(e) => handleClick(e)} id="entertainment" href="#">Entertainment</a>
                  </li>
               </ul>

               <form className="form-inline">
                  <button className="btn btn-primary my-2 my-sm-0 ml-auto ">Sign in</button>
                  <button className="btn btn-outline-warning mr-auto" type="submit">Continue as guest</button>
               </form>


            </div>
         </nav>

         <div id="newslist">
         </div>

         <NewsList list={news} />

         {/* cards will go here */}
         <Cards list={categories} />

         <Footer></Footer>

      </div>
   );
}

export default App;





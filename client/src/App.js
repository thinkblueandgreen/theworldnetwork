import React, { useState, useEffect } from "react";

import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/Navbar.js";
import Form from './components/Form';
import API from "./utils/API";
import Pollscard from "./components/Pollscard";
import tech from "./assets/tech.json";
import NewsList from "./components/Newslist";
import Cards from "./components/Cards";
import Footer from "./components/Footer";

const App = function () {
    const [currentUser, setCurrentUser] = useState({username:null,id:null})
    const [categorypolls, setCategorypolls] = useState("politics")
    const [catPoll, setCatPoll] = useState({ catPoll: [] })
    const [newsList, setNewsList] = useState({ newsList: [] })
    const [news, setNews] = useState({ news: [] })
    const [categories, setCategories] = useState({
        categories: {
            business: [],
            general: [],
            entertainment: [],
            sports: [],
            health: [],
            science: [],
            technology: []
        }
    });

    useEffect(() => {
        getPolls(categorypolls)
    }, [categorypolls])

    useEffect(() => {
        getNews_();
        getCategories();
    }, [newsList])

    const changeCurrentUser =(user)=>{
        console.log(user)
        setCurrentUser(user)
    }

    const handleCategoryChange = evt => {
        setCategorypolls(evt.target.value)
    }

    const handleChoice = evt => {
        console.log(evt.target.innerHTML)
        console.log(evt.target.parentNode)
    }

    const getCategories = () => {
        let categories_ = {
            business: [],
            general: [],
            entertainment: [],
            sports: [],
            health: [],
            science: [],
            technology: []
        };
        API.getHeadlines().then(data => {
            data.data.sources.map(article => {
                let cat = article.category;
                categories_[cat].push({ desc: article.description, url: article.url });
            })
            setCategories({ categories: categories_ });
        })
    }



    const getPolls = (param) => {
        return API.getPolls(param || '').then(
            (data) => {
                console.log(data.data.polls)
                setCatPoll({ catPoll: data.data.polls })
                console.log(catPoll)
            }
        )
    }


    const getNews_ = async(param) => {
        const news = await API.getNews(param || '')
        // .then(data => {
        //     console.log('news', data.json())
            setNews({ news: news.articles })
            console.log(news)
        }
    


    const handleClick = (e) => {
        //e.preventDefault()
        console.log(e.target.id);
        getNews_(`&category=${e.target.id}`)
        setCategorypolls(e.target.id)
    };



    return (
        <div className="App">

            <div className="text-center sticky-top" style={{ color: "black", fontSize: "30px" }}><a className="page-top" href="#">WELCOME TO THE WORLD NETWORK {currentUser.username || ''}!</a> </div>


            {/* signin authentication goes here */}
            <Form changeCurrentUser={changeCurrentUser}/>
            {/* <Form /> */}
            

            <Navbar handleClick={handleClick} />
            <br />
            <br />


            {tech.map(politic => (
                <Pollscard id={politic.id}
                    key={politic.id}
                    name={politic.name}
                    optionOne={politic.optionOne}
                    optionTwo={politic.optionTwo}
                    handleChoice={handleChoice} />
            ))}


            <NewsList list={news} />

            <Cards list={categories} />

            <Footer></Footer>

        </div>
    );
}

export default App;





import React, {useEffect, useState} from 'react';
import './App.css';
import Tmdb from './Tmdb';
import MovieRow from './components/MovieRow';
import FeaturedMovie from './components/FeaturedMovie';
import Header from './components/Header';

export default () => {

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);
  useEffect(()=>{
    const loadAll = async () => {
      //Pegando a lista total
      let list = await Tmdb.getHomeList();
     setMovieList(list);
     
      //Pegando o Featured
      let originals = list.filter(i=>i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length -1));
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
      setFeaturedData(chosenInfo);
    }
    
    loadAll();
  }, []);

  useEffect(() => {
    const scrollLisneter = () => {
      if(window.scrollY > 20) {
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    }

    window.addEventListener('scroll', scrollLisneter);
    return () => {
      window.removeEventListener('scroll', scrollLisneter);
    }
  }, []);  

  return(
    <div className="page">

      <Header black={blackHeader}/>

      {featuredData &&
        <FeaturedMovie item={featuredData} />
      }

      <section className="lists">
        {movieList.map((item, key)=>(
           <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>
      <footer>
        Feito com <span role="img" arial-label="coração">❤️</span> por Nodlick<br/>
        Direitos de imagens para netflix<br/>
        Dados pegos pelo site Themoviedb.org<br/>
        Feito graças ao professor Bonieky Lacerda.
      </footer>
      {movieList.length <=0 &&
        <div className="loading">
          <img src="https://www.rchandru.com/images/portfolio/loading.gif" alt="Carregando"></img>
        </div>
      }
    </div>
  )
}
import React, { useEffect } from 'react'
import * as ReadyAdopt from '../store/slices/ReadyAdopt'
import * as Dogs from '../store/slices/Dogs'
import * as Cats from '../store/slices/Cats'
import * as Horses from '../store/slices/Horses'
import * as Rodents from '../store/slices/Rodents'
import * as Rabbits from '../store/slices/Rabbits'
import * as Birds from '../store/slices/Birds'
import { useAppSelector, useAppDispatch } from '../store'
import { useLocation } from 'react-router-dom';
import { getReadyAdoptAsync } from '../store/slices/ReadyAdopt'; 
import { getDogsAsync } from '../store/slices/Dogs'; 
import { getCatsAsync } from '../store/slices/Cats';
import { getHorsesAsync } from '../store/slices/Horses';
import { getRodentsAsync } from '../store/slices/Rodents';
import { getRabbitsAsync } from '../store/slices/Rabbits';
import { getBirdsAsync } from '../store/slices/Birds';
import Header from './Header'
import DisplayMovieRow from './DisplayMovieRow'
import { any } from 'prop-types'

const MainContent = ({ selectMovieHandler }: { selectMovieHandler: any }) => {
  const { movieDetails } = useAppSelector((state) => state.movieDetails)
  const ReadyAdopt = useAppSelector((state) => state.ReadyAdopt)
  const Dogs = useAppSelector((state) => state.Dogs)
  const Cats = useAppSelector((state) => state.Cats)
  const Horses = useAppSelector((state) => state.Horses)
  const Rodents = useAppSelector((state) => state.Rodents)
  const Rabbits = useAppSelector((state) => state.Rabbits)
  const Birds = useAppSelector((state) => state.Birds)

  const dispatch = useAppDispatch()

  useEffect(() => {
    switch (location.pathname) {
      case '/adopt':
        dispatch(getReadyAdoptAsync())
        break;
      case '/dogs':
        dispatch(getDogsAsync())
        break;
      case '/cats':
        dispatch(getCatsAsync())
        break;
      case '/horses':
        dispatch(getHorsesAsync())
        break;
      case '/rodents':
        dispatch(getRodentsAsync())
        break;
      case '/rabbits':
        dispatch(getRabbitsAsync())
        break;
      case '/birds':
        dispatch(getBirdsAsync())
        break;

    }
  }, [dispatch])

  const location = useLocation();

  // Logique pour déterminer le titre en fonction de la route
  let titles:[string, string, string, string, string, string, string, string] = ["", "", "", "", "", "", "", ""];
  // Logique pour déterminer les titres en fonction de la route
  switch (location.pathname) {
    case '/adopt':
      titles = [
        "Prêts pour adoption",
        "Nouveaux arrivants",
        "Besoin d'une famille",
        "Recherche de compagnie",
        "Animaux spéciaux",
        "Favoris de la communauté",
        "Longs séjours",
        "Réhabilitation réussie"
      ];
      break;
    case '/dogs':
      titles = [
        "Chiots joueurs",
        "Compagnons fidèles",
        "Chiens sportifs",
        "Races de grande taille",
        "Races de petite taille",
        "Chiens calmes",
        "Vieux amis",
        "Chiens pour appartement"
      ];
      break;
    case '/cats':
      titles = [
        "Chatons mignons",
        "Chats indépendants",
        "Chats câlins",
        "Chats actifs",
        "Chats de giron",
        "Chats tranquilles",
        "Sages matous",
        "Parfaits pour les familles"
      ];
      break;
    case '/horses':
      titles = [
        "Poulains curieux",
        "Chevaux de travail",
        "Compagnons d'équitation",
        "Grands galopeurs",
        "Mini-chevaux",
        "Chevaux calmes",
        "Chevaux expérimentés",
        "Adaptés aux enfants"
      ];
      break;
    case '/rodents':
      titles = [
        "Petits explorateurs",
        "Amis rongeurs",
        "Animaux faciles à soigner",
        "Pour débutants",
        "Hamsters actifs",
        "Cochons d'Inde câlins",
        "Gerbilles sociables",
        "Rats intelligents"
      ];
      break;
    case '/rabbits':
      titles = [
        "Lapereaux bondissants",
        "Lapins doux",
        "Adaptés aux enfants",
        "Races de lapins variées",
        "Compagnons tranquilles",
        "Lapins gourmands",
        "Animaux de compagnie actifs",
        "Lapins pour l'intérieur"
      ];
      break;
    case '/birds':
      titles = [
        "Oiseaux chanteurs",
        "Compagnons volants",
        "Parfaits pour les familles",
        "Oiseaux exotiques",
        "Petits perroquets",
        "Grands perroquets",
        "Oiseaux calmes",
        "Faciles à élever"
      ];
      break;
  }

  let moviesSelected:any[] = [];

  switch (location.pathname) {
    case '/adopt':
      moviesSelected = ReadyAdopt.data;
      break;
    case '/dogs':
      moviesSelected = Dogs.data;
      break;
    case '/cats':
      moviesSelected = Cats.data;
      break;
    case '/horses':
      moviesSelected = Horses.data;
      break;
    case '/rodents':
      moviesSelected = Rodents.data;
      break;
    case '/rabbits':
      moviesSelected = Rabbits.data;
      break;
    case '/birds':
      moviesSelected = Birds.data;
      break;
    // Ajoutez d'autres cas pour d'autres URL si nécessaire
    default:
      break;
  }

  const isRootOrAdopt = location.pathname === '/' || location.pathname === '/adopt';
console.log('ReadyAdopt',ReadyAdopt.data)
  return (
    <div className='container'>
      {
        isRootOrAdopt ? (
          <>
            <Header name={movieDetails.name} overview={movieDetails.overview} />
            <div className='movieShowcase'>
            <DisplayMovieRow
          isNetflixMovies={true}
          title={titles[0]}
          selectMovieHandler={selectMovieHandler}
          movies={moviesSelected}
        />
        <DisplayMovieRow
          title={titles[1]}
          selectMovieHandler={selectMovieHandler}
          movies={moviesSelected}
        />
        <DisplayMovieRow
          title={titles[2]}
          selectMovieHandler={selectMovieHandler}
          movies={moviesSelected}
        />
        <DisplayMovieRow
          title={titles[3]}
          selectMovieHandler={selectMovieHandler}
          movies={moviesSelected}
        />
        <DisplayMovieRow
          title={titles[4]}
          selectMovieHandler={selectMovieHandler}
          movies={moviesSelected}
        />
        <DisplayMovieRow
          title={titles[5]}
          selectMovieHandler={selectMovieHandler}
          movies={moviesSelected}
        />
        <DisplayMovieRow
          title={titles[6]}
          selectMovieHandler={selectMovieHandler}
          movies={moviesSelected}
        />
        <DisplayMovieRow
          title={titles[7]}
          selectMovieHandler={selectMovieHandler}
          movies={moviesSelected}
        />
            </div>
          </>
        ) : (
          <div className='movieShowcase paddingMovieShowcase'>
                    <DisplayMovieRow
          isNetflixMovies={true}
          title={titles[0]}
          selectMovieHandler={selectMovieHandler}
          movies={ReadyAdopt.data}
        />
        <DisplayMovieRow
          title={titles[1]}
          selectMovieHandler={selectMovieHandler}
          movies={ReadyAdopt.data}
        />
        <DisplayMovieRow
          title={titles[2]}
          selectMovieHandler={selectMovieHandler}
          movies={ReadyAdopt.data}
        />
        <DisplayMovieRow
          title={titles[3]}
          selectMovieHandler={selectMovieHandler}
          movies={ReadyAdopt.data}
        />
        <DisplayMovieRow
          title={titles[4]}
          selectMovieHandler={selectMovieHandler}
          movies={ReadyAdopt.data}
        />
        <DisplayMovieRow
          title={titles[5]}
          selectMovieHandler={selectMovieHandler}
          movies={ReadyAdopt.data}
        />
        <DisplayMovieRow
          title={titles[6]}
          selectMovieHandler={selectMovieHandler}
          movies={ReadyAdopt.data}
        />
        <DisplayMovieRow
          title={titles[7]}
          selectMovieHandler={selectMovieHandler}
          movies={ReadyAdopt.data}
        />
          </div>
        )
      }

    </div>
  )
}

export default MainContent

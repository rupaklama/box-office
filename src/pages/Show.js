import React, { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';

import tvMazeApi from '../api/tvMaze';
import ShowMainData from '../components/show/ShowMainData';
import Details from '../components/show/Details';
import Seasons from '../components/show/Seasons';
import Cast from '../components/show/Cast';
import { ShowPageWrapper, InfoBlock } from './Show.styled';

const Show = () => {
  // const [results, setResults] = useState(null);
  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState(null);

  // useParams hook matches current url param
  const { id } = useParams();
  // console.log('params', id)

  const initialState = {
    results: null,
    isLoading: true,
    error: null,
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case 'fetch_success':
        return {
          // ...state,
          isLoading: false,
          results: action.payload,
          error: null,
        };
      case 'fetch_failed': 
        return {
          ...state,
          isLoading: false,
          error: action.error,
        }
      default:
        return state;
    }
  };

  // objects destructuring
  const [{ results, isLoading, error }, dispatch] = useReducer(reducer, initialState);
  console.log(results)

  useEffect(() => {
    let isMounted = true;
    const fetch = async () => {
      try {
        const { data } = await tvMazeApi.get(
          `/shows/${id}?embed[]=seasons&embed[]=cast`
        );

        if (isMounted) {
          // setResults(data);
          // setIsLoading(false);
          dispatch({ type: 'fetch_success', payload: data })
        }
      } catch (err) {
        if (isMounted) {
          // setError(err.message);
          // setIsLoading(false);
          dispatch({ type: 'fetch_failed', payload: err.message })
        }
      }
    };

    fetch();
    // this clean up func gets executed before calling on next callback func
    // or componentDidMount, doing clean up before starting something new
    // which prevents memory leak - unnecessary use of RAM & app performance degrades
    return () => {
      isMounted = false;
    };
  }, [id]);

  if (isLoading) {
    return <div>Data is being loaded!</div>;
  }

  if (error) {
    return <div>Error occurred: {error}</div>;
  }

  return (
    <ShowPageWrapper>
      <ShowMainData
        image={results.image}
        name={results.name}
        rating={results.rating}
        summary={results.summary}
        tags={results.genres}
      />

      <InfoBlock>
        <h2>Details</h2>
        <Details 
          status={results.status} 
          network={results.network} 
          premiered={results.premiered}
        />
      </InfoBlock>

      <InfoBlock>
        <h2>Seasons</h2>
        <Seasons seasons={results._embedded.seasons} />
      </InfoBlock>

      <InfoBlock>
        <h2>Casts</h2>
        <Cast cast={results._embedded.cast}/>
      </InfoBlock>
    </ShowPageWrapper>
  );
};

export default Show;

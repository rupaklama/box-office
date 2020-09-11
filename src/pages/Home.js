import React, { useState, useCallback } from 'react';

import MainPageLayout from '../layouts/MainPageLayout';
import tvMazeApi from '../api/tvMaze';
import ShowGrid from '../components/show/ShowGrid';
import ActorGrid from '../components/actor/ActorGrid';
import { useLastQuery, useWhyDidYouUpdate } from '../hooks/custom-hooks';

// we don't have to optimize this func because it's not
// part of home component
const renderResults = (results) => {
  if (results && results.length === 0) {
    return <div>No results</div>;
  }

  if (results && results.length > 0) {
    return results[0].show
      ? //results.map(item => <div key={item.show.id}>{item.show.name}</div>)
      <ShowGrid data={results}/>
      : // results.map(item => <div key={item.person.id}>{item.person.name}</div>)
      <ActorGrid data={results} />
  }

  return null;
};


const Home = () => {
  // using custom hook - useLastQuery
  const [input, setInput] = useLastQuery(); 
  const [results, setResults] = useState(null);
  const [searchOption, setSearchOption] = useState('shows');

  // first isShowsSearch is set to true, otherwise false
  const isShowsSearch = searchOption === 'shows';

  
  const onKeyDown = e => {
    if (e.keyCode === 13) {
      onSearch();
    }
  };

  // function memoization - don't create another function when render 
  // only create when our input value changes
  const onInputChange = useCallback(e => {
    setInput(e.target.value);
  }, [setInput]);

  

  const onSearch = async () => {
    const { data } = await tvMazeApi.get(`/search/${searchOption}?q=${input}`);

    setResults(data);
  };

 
  const onRadioChange = useCallback(e => {
    setSearchOption(e.target.value);
  }, []);

  // console.log(searchOption);

  // This hook makes it easy to see which prop changes are causing a component to re-render. 
  // first arg is our custom name that we see it inside console
  // Second arg is the object with props change over time on components that we want to test
  useWhyDidYouUpdate('home', {onInputChange })
  
  return (
    <MainPageLayout>
      <input
        type="text"
        placeholder="Search for something"
        value={input}
        onChange={onInputChange}
        onKeyDown={onKeyDown}
      />

      <div>
        <label>
          Shows
          <input
            type="radio"
            value="shows"
            checked={isShowsSearch}
            onChange={onRadioChange}
          />
        </label>
        <label>
          Actors
          <input
            type="radio"
            value="people"
            checked={!isShowsSearch}
            onChange={onRadioChange}
          />
        </label>
      </div>

      <button onClick={onSearch}>Search</button>

      {renderResults(results)}

    
    </MainPageLayout>
  );
};

export default Home;

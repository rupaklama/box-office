import React, { useState } from 'react';

import MainPageLayout from '../layouts/MainPageLayout';
import tvMazeApi from '../api/tvMaze';
import ShowGrid from '../components/show/ShowGrid';
import ActorGrid from '../components/actor/ActorGrid';

const Home = () => {
  const [input, setInput] = useState('');
  const [results, setResults] = useState(null);
  const [searchOption, setSearchOption] = useState('shows');

  // first isShowsSearch is set to true, otherwise false
  const isShowsSearch = searchOption === 'shows';

  const onInputChange = e => {
    setInput(e.target.value);
  };

  const onKeyDown = e => {
    if (e.keyCode === 13) {
      onSearch();
    }
  };

  const onSearch = async () => {
    const { data } = await tvMazeApi.get(`/search/${searchOption}?q=${input}`);

    setResults(data);
  };

  const renderResults = () => {
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

  const onRadioChange = e => {
    setSearchOption(e.target.value);
  };

  console.log(searchOption);

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

      {renderResults()}
    </MainPageLayout>
  );
};

export default Home;

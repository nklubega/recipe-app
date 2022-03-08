import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Recipe from './recipe';
const App = () => {
  
  const APP_ID = 'b716ee17'
  const APP_KEY = 'a8c42b7ba74acf3d653045b4e5c040c8'

  const [recipes, setRecipes] = useState([])
  const [search, setSearch] = useState("")
  const [query, setQuery] = useState('chicken')

  useEffect(() => {
    getRecipes()
  }, [query])
  
  const getRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=3&calories=591-722&health=alcohol-free`
      )
    const data = await response.json()
    setRecipes(data.hits)
    console.log(data.hits);
  }
  
  const updateSearch = e => {
    setSearch(e.target.value)
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('')
  }

  return (
    <div className="App" >
      <form className="search-form" onSubmit={getSearch}>
        <input className='search-bar' type='text' value={search} onChange={updateSearch} />
        <button className='search-button' type='submit'>
        Search
        </button>
      </form>
      <div className='recipes'>
      {recipes.map(recipe => (
        <Recipe
        key={recipe.recipe.label} 
        title={recipe.recipe.label} 
        calories={recipe.recipe.calories} 
        image={recipe.recipe.image}
        ingredients={recipe.recipe.ingredients}
        />
      ))}
      </div>
    </div>

  );
};

export default App;

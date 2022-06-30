/*заменила версию, также внесла другие изменения:
Привет.
Приложение не будет работать с новой версией React, нужно заменить на прежнюю. 
Как это сделать:

в папке package.json заменить:
"react": "^18.0.0"
"react-dom": "^18.0.0"
на
"react": "^17.0.2"
"react-dom": "^17.0.2"

  в папке index.js .                                                                                                                                                                                                  
import ReactDOM from 'react-dom/client' на
import ReactDOM from 'react-dom';

там же в папке index.js заменить:
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(  <React.StrictMode>  <App /> </React.StrictMode>;
на
ReactDOM.render(  <React.StrictMode>    <App /> </React.StrictMode>,
  document.getElementById('root'))

удалить node_module, переустановить командой npm install

*/

import './App.css';
import { useEffect } from 'react';
import video from './food.mp4'
import { useState } from 'react';
import MyRecipesComponent from './MyRecipesComponent';


function App() {

  const MY_ID = '807e6c7b';
  const MY_KEY = 'b4d8899675fa0c99635c117c08e4ff91';

  const [mySearch, setMySearch] = useState('');
  const [myRecipes, setMyRecipes] = useState([]);


  useEffect(async () => {
    const response = await fetch('https://api.edamam.com/search?q=${avocado}&app_id=${MY_ID}&app_key=${MY_KEY}');
    /*console.log(response);*/
    const data = await response.json();
    console.log(data.hits);
    setMyRecipes(data.hits);
  }, [])

  const myRecipeSearch = (e) => {
    console.log(e.target.value)
    setMySearch(e.target.value)
  }

  return (
    <div className="App">
      
    <div className='container'>
      <video autoPlay muted loop>
      <source src={video} type='video/mp4'/>
      </video>

    <h1>Find a Recipe</h1>
    </div>

    <div className='container'>
      <form>
        <input className='search' placeholder='Search' onChange={myRecipeSearch} value={mySearch}>
        
        </input>
      </form>
    
      <button>
        <img src='https://img.icons8.com/fluency/48/000000/fry.png' className='icons'/>
      </button>
      </div>

      {myRecipes.map(element => (
        <MyRecipesComponent label={element.recipe.label}/>
      ))}

  </div>
  );
}

export default App;

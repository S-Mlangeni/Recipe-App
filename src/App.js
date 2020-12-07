import React, { useState } from 'react';
import './App.css';
require("dotenv").config(); //Loads the variables in the .env file as environment variables. 

function App() {
  const MY_APP_ID = process.env.REACT_APP_API_ID; //Uppercase letters naming convention is used as it is recommended in the API's url.
  const MY_APP_KEY = process.env.REACT_APP_API_KEY; //Same reason as above.
  /* Note that "REACT_APP_" or "react_app_" is the required prefix to the name of the
  variables in the .env file since react is being used. Otherwise, it is not necessary. Ensure to restart 
  server every time a new variable is added to the .env file. */
  const [recipeLabel, setRecipeLabel] = useState([]);
  const [Search, setSearch] = useState("");
  
  const SearchFunc = (event) =>{
    setSearch(event.target.value);//"event.target" needs to be called in React.
  }
  
  const Data = async (event) => { //"event" parameter needs to be passed in since this function will be triggered by a user event.
    event.preventDefault(); //To prevent page from refreshing as form element is used. "e", which is short for event, can be used instead.
    const userquery = Search;
    //setSearch(""); //No need to empty seachbox. Hence, this line commented out.
    const API_info = await fetch(`https://api.edamam.com/search?q=${userquery}&app_id=${MY_APP_ID}&app_key=${MY_APP_KEY}`) 
    //"await" is used to account for the delay between requesting and recieving information from API. 
    //"async" is the corresponding keyword which allows asynchronous calls to be made. These keywords are commonly used when working with API/third-party systems.
    //Back ticks in the API url are used to allow for concatenation of the url with previously defined string variables - ES6 allows us to do this.
    const formatted_API_info = await API_info.json(); //The "json" method formats/cleans-up the collected data then presents it in a relatively readable way.
    console.log(formatted_API_info.hits);
    setRecipeLabel(formatted_API_info.hits); //A State variable needs to be created then updated to transfer the fetched information inside from the function to the component (outside the function "Data"). This will allow the information to be read and returned by the component.
    console.log(recipeLabel);
  }
  
  return (
    <div className="App">
     <h1>Food Recipes</h1>
     <form>
       <input type="text" className="searchbox" value={Search} onChange={SearchFunc}/>
       <input type="submit" value="Search" className="searchbutton" onClick={Data} />
     </form>
     {recipeLabel.map((items)=>{
       return(<div> <h2>{items.recipe.label}</h2>
                    <img src={items.recipe.image} alt="" />
                    <p>Ingredients:</p>
                    {items.recipe.ingredients.map((ingred)=>{
                      return (<ul><li>{ingred.text}</li></ul>)
                    })}
              </div>); //The "alt" attribute/prop in the image element is required by React. Otherwise a warning is displayed.
     })}
     
    </div>
  );
}

export default App;

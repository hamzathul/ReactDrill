import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [recipes, setRecipes] = useState([]);
  const [input, setInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [cache, setCache] = useState({});

  useEffect(() => {
    const timer = setTimeout(fetchData, 400);

    return () => {
      // important ////////////////

      clearTimeout(timer);
    };
  }, [input]);

  const fetchData = async () => {
    if (cache[input]) {
      setRecipes(cache[input]);
      console.log("Cache hit");
      return;
    }
    const datas = await fetch(
      "https://dummyjson.com/recipes/search?q=" + input
    );
    const json = await datas.json();
    setRecipes(json.recipes);
    setCache((prev) => ({ ...prev, [input]: json.recipes }));
  };
  return (
    <div className="App">
      <h1>Auto-complete Search Bar</h1>
      <input
        type="text"
        className="search-input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)} // setTimout here is not the best approach
      />
      <div className="receipe-container">
        {showSuggestions &&
          recipes.map((recipe) => {
            return (
              <span
                key={recipe.id} // important ////////////////
                className="recipe-items"
                onClick={() => setInput(recipe.name)}
              >
                {recipe.name}
              </span>
            );
          })}
      </div>
    </div>
  );
}

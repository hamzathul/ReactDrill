import { useState } from "react";
import "./App.css";
import useFetchData from "./hooks/useFetchData";

function App() {
  const { data, loading, error } = useFetchData(
    "https://dummyjson.com/products?limit=250"
  );

  const noItemsPerPage = 10;
  const noOfPages = data ? Math.ceil(data.length / noItemsPerPage) : 0;

  const [currentPage, setCurrentPage] = useState<number>(0);

  const start = currentPage * noItemsPerPage;
  const end = start + noItemsPerPage;

  const handleButton = (n: number) => {
    setCurrentPage(n);
  };

  const handleBackClick = () => {
    setCurrentPage((prev) => prev - 1);
  };

  const handleFrontClick = () => {
    setCurrentPage((prev) => prev + 1);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <div className="button-container">
        <button onClick={() => handleBackClick()} disabled={currentPage === 0}>
          back
        </button>
        {[...Array(noOfPages).keys()].map((n) => {
          return (
            <div className="buttons">
              <button
                onClick={() => handleButton(n)}
                className={`${currentPage === n ? "current-page" : ""}`}
              >
                {n}
              </button>
            </div>
          );
        })}
        <button
          onClick={handleFrontClick}
          disabled={currentPage === noOfPages - 1}
        >
          front
        </button>
      </div>

      <div className="App">
        {data.slice(start, end).map((product: any) => {
          return (
            <div key={product.id} className="container">
              <img src={product.thumbnail} alt={product.title} />
              <span>{product.title}</span>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;

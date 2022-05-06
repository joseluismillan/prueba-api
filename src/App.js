import Pagination from "./components/PaginatedItems";
import { useState } from "react";

function App() {
  const [user, setUser] = useState();
  const [results, setResults] = useState([]);
  const [state, setState] = useState(false);

  const searchUsers = () => {
    fetch(`https://api.github.com/search/users?q=${user}`, { 
      headers: {
           'Accept' : 'application/vnd.github.v3+json'
       }})
      .then((response) => response.json())
      .then((data) => {
        
        setResults({ data });
      });
  };

//   function getUser(username) {
//     return fetch(`https://api.github.com/users/${username}`)
//     .then(response => response.json())
//     .then(response => {
//         return response;
//     })
// }

  const handleChange = (e) => {
    setUser(e.target.value);
  };

  const handleClick = (e) => {
    searchUsers();
    setTimeout(function () {
      setState(true);
    }, 1000);
  };
// console.log(results)

  return (
    <>
      <div className="container">
        <div className="row mb-3">
          <div className="col align-self-center">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Github users"
                onChange={handleChange}
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                id="search"
                onClick={handleClick}
              >
                Buscar
              </button>
            </div>
          </div>
        </div>
        {state ? (
          <div className="row mb-3">
            Usuarios encontrados: {results.data.total_count}
          </div>
        ) : null}

        <div className="row">
          
            {state && (
              <Pagination
                itemsPerPage={6}
                resultados={results.data}
                setState={setState}
                
              />
            )}
          
        </div>
      </div>
    </>
  );
}

export default App;

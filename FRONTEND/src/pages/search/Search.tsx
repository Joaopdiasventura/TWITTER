import { Link, useNavigate } from 'react-router-dom';
import { useState, useRef } from "react";
import {StyledContainer} from "./Css";
import axios from 'axios';

const app = axios.create({
   baseURL: "https://twitter-3y8z.onrender.com"
});

function Search() {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const nameRef = useRef<HTMLInputElement>(null);

  
    const search = async () => {
      try {
        const nomeInput = nameRef.current;
  
        if (!nomeInput.value) {
          return;
        }
  
        const result = await app.get("/search/" + nomeInput.value);
        if (result.data.length === 0) {
          setUsers([{nome: "NENHUM USUÁRIO ENCONTRADO", email: null}]);
        } else {
          setUsers(result.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    const navegar = (email) => {
      return () => {
        if (email) {
          localStorage.setItem("oemail", email);
          setTimeout(() => {
            navigate('/another');
          }, 300);
        }
      }
    };
  
    return (
      <StyledContainer>
        <div className="content">
        <nav>
          <Link to="/start">🏠</Link>
          <Link to="/enter">🌐</Link>
          <Link to="/profile">⚪</Link>
          <Link to="/post">➕</Link>
        </nav>
          <form id="buscar">
            <input type="text" placeholder="Nome do usuário:" id="nome" ref={nameRef} onKeyUp={search} />
          </form>
          <div id="users">
            {users.map((user, index) => (
              <div key={index} className='user' onClick={navegar(user.email)}>
                <p>{user.name}</p>
              </div>
            ))}
          </div>
        </div>
      </StyledContainer>
    );
  }
  
  export default Search;
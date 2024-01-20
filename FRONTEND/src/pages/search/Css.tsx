import styled from "styled-components";

export const StyledContainer = styled.div`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Arial", sans-serif; /* Exemplo de fonte */
  }

  body {
    color: #efefef; /* Cor clara para o texto */
    height: 100vh;
    display: flex;
    justify-content: center; /* Centralizar horizontalmente */
    align-items: center; /* Centralizar verticalmente */
    background-color: #282c34; /* Cor de fundo mais suave */
    padding: 20px;
  }

  .content {
    border-radius: 8px; /* Bordas arredondadas */
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2); /* Sombra para destacar */
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 400px; /* Largura máxima para responsividade */
    padding: 20px;
    background-color: #151515; /* Cor de fundo do conteúdo */
    overflow: hidden;
  }

  nav {
    display: flex;
    justify-content: center;
    padding: 10px 0;

    a {
      color: white;
      text-decoration: none;
      margin: 0 15px;
      font-weight: bold;

      &:hover {
        color: #ffd700;
      }
    }
  }

  form {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
  }

  input[type="text"] {
    width: 100%;
    padding: 10px;
    border: 1px solid #444;
    background-color: #333;
    color: #efefef;
    border-radius: 4px; /* Bordas arredondadas */
  }

  input[type="text"]:focus {
    outline: none;
    border-color: #1a1a1a; /* Cor de destaque ao focar */
  }

  #users {
    width: 100%;
    overflow-y: auto;
    max-height: 300px;
    padding-top: 10px;
  }

  .user {
    display: flex;
    align-items: center;
    border: 1px solid #444;
    padding: 10px;
    transition: background-color 0.2s;
    cursor: pointer;
    color: #efefef;
  }

  .user:hover {
    background-color: #000000;
  }

  .user img {
    width: 30px;
    height: 30px;
    margin-right: 10px;
    border-radius: 50%;
  }
`;

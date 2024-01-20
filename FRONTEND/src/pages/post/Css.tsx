import styled from "styled-components";

export const StyledContainer = styled.div`
    font-family: 'Arial', sans-serif;
    color: #FFFFFF;
    background-color: #0d0d0d;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 25px;
    max-width: 400px;
    margin: 0 auto;

    .container {
        text-align: center;
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
        flex-direction: column;
        gap: 15px;
    }

    h1{
        margin: 10px;
    }

    textarea, input {
        background-color: #191919;
        color: #FFFFFF;
        border: none;
        border-radius: 5px;
        padding: 10px;
        font-size: 16px;
    }

    textarea::placeholder, input::placeholder {
        color: #AAAAAA; 
    }

    button {
        padding: 10px 15px;
        border-radius: 5px;
        border: none;
        background-color: #ff0a0a;
        color: #FFFFFF;
        cursor: pointer;
        transition: background-color 0.2s, transform 0.2s;

        &:hover {
            background-color: #d10505; 
            transform: scale(1.05); 
        }
    }
    *:focus{
        outline: none;
    }
`;

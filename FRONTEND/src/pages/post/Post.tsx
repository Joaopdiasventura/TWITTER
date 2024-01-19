import { StyledContainer } from './Css';
import { FormEvent, useRef } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const app = axios.create({
    baseURL: "https://twitter-3y8z.onrender.com"
});

function Post(): JSX.Element {
    const navigate = useNavigate();
    const title = useRef<HTMLInputElement>(null);
    const content = useRef<HTMLTextAreaElement>(null);

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        const token = localStorage.getItem("token");

        if (!token) {
            console.error('Token não encontrado');
            return;
        }

        const creatorUser = await app.post("/decode", {token}).then(result => result.data);

        try {
            if (title.current != null && content.current != null) {
                await app.post("/post", {
                    title: title.current.value,
                    content: content.current.value,
                    creatorUser
                }).then(()=>{navigate("/profile")});
            }
        } catch (error) {
            console.error('Erro ao enviar post:', error);
        }
    };

    return (
        <StyledContainer >
            <div className="container">
                <h1>FAÇA UM POST</h1>
                <form id="postar" onSubmit={handleSubmit}>
                    <input type="text" ref={title} placeholder="TITULO DO POST" required/>
                    <textarea name="conteudo" ref={content} cols={30} rows={10} placeholder="CONTEUDO DO POST"></textarea>
                    <button type="submit">POSTAR</button>
                </form>
            </div>
        </StyledContainer >
    );
}

export default Post;
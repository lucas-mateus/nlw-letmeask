import { useState, FormEvent } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useParams } from 'react-router-dom'
import logoImg from '../assets/images/Logo.svg'
import { Button } from '../components/Button'
import { RoomCode } from '../components/RoomCode'
import { useAuth } from '../hooks/useAuth'
import { database } from '../services/firebase'
import '../styles/room.scss'

type RoomParam = {
    id:string
}

export function Room(){
    const {user} = useAuth();
    const [newQuestion, setNewQuestion] = useState('');
    const params = useParams<RoomParam>()
    const roomId = params.id;

    async function handleSendQuestion(event:FormEvent) {
        event.preventDefault();

        if(newQuestion.trim() === ''){
            toast.error('Campo está vazio!');
            return;
        }

        if(!user){
            throw new Error ("O usuário deve estar logado para enviar pergunta.")
        }

        const question = {
            content: newQuestion,
            author:{
                name: user.name,
                avatar: user.avatar,
            },
            isHighlighted: false,
            isAnswered: false
        }

        await database.ref(`rooms/${roomId}/questions`).push(question);

        setNewQuestion('');
        toast.success('Pergunta enviada com sucesso!');
    }

    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="logomarca da aplicação Letmeask" />
                    <RoomCode code={roomId}/>
                </div>
                <div><Toaster/></div>
            </header>

            <main>
                <div className="room-title">
                    <h1>Sala qualquer</h1>
                    <span>4 perguntas</span>
                </div>

                <form onSubmit={handleSendQuestion}>
                    <textarea
                        onChange={event=> setNewQuestion(event.target.value)}
                        value={newQuestion}
                        placeholder="O que você quer perguntar?"
                    />

                    <div className="form-footer">
                        {   user ? (
                            <div className="user-info">
                                <img src={user.avatar} alt={user.name} />
                                <p>{user.name}</p>
                            </div>
                        ) : (
                            <span>Para enviar uma pergunta, <button>faça seu login</button></span>
                        )
                        
                        }
                        <Button disabled={!user} type="submit">Enviar Pergunta</Button>
                    </div>
                </form>
            </main>
        </div>
    )
}
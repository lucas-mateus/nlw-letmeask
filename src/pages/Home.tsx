import { useHistory } from 'react-router-dom'
import { FormEvent } from 'react'

import { Button } from '../components/Button'
import illustrationImg from '../assets/images/Illustration.svg'
import logoImg from '../assets/images/Logo.svg'
import logoGoogleImg from '../assets/images/IconGoogle.svg'
import '../styles/auth.scss'
import { useAuth } from '../hooks/useAuth'
import { useState } from 'react'
import { database } from '../services/firebase'

export function Home() {
    const history = useHistory();
    const { user, signInWithGoogle } = useAuth();

    const [roomCode, setRoomCode] = useState('');

    async function handleCreateRoom() {
        if (!user) {
            await signInWithGoogle();
        }
        history.push('/rooms/new');
    }

    async function handleJoinRoom(event: FormEvent){
        event.preventDefault();

        if(roomCode.trim() === ''){
            return;
        }

        const roomRef = await database.ref(`rooms/${roomCode}`).get();

        if(!roomRef.exists()){
            alert('Oops, parece que a sala que você está buscando não existe');
            return;   
        }

        history.push(`/rooms/${roomCode}`)

    }

    return (
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="Ilustração que simboliza perguntas e respostas" />
                <strong>Crie salas de Perguntas e Respostas ao-vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo real.</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="Logo da aplicação Let me ask" />
                    <button className="create-room" onClick={handleCreateRoom}>
                        <img src={logoGoogleImg} alt="Ícone do Google" />
                        Crie sua sala com o Google
                    </button>
                    <div className="separator">ou entre em uma sala</div>
                    <form onSubmit={handleJoinRoom}>
                        <input
                            type="text"
                            placeholder="Digite o código da sala"
                            onChange={event => setRoomCode(event.target.value)}
                            value={roomCode}
                        />

                        <Button type="submit">
                            Entrar na sala
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    )
}
import { FormEvent, useState} from 'react'
import { Button } from '../components/Button'
import {Link, useHistory} from 'react-router-dom'

import illustrationImg from '../assets/images/Illustration.svg'
import logoImg from '../assets/images/Logo.svg'
import '../styles/auth.scss'
import { useAuth } from '../hooks/useAuth'
import { database } from '../services/firebase'

export function NewRoom(){
    
    const history = useHistory();
    const {user} = useAuth();

    const [newRoom, setNewRoom] = useState('');

    async function handleCreateRoom(event: FormEvent){
        event.preventDefault();

        if(newRoom.trim() === ''){
            return;
        }
        
        const roomRef = database.ref('rooms');

        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authId: user?.id
        });

        history.push(`/rooms/${firebaseRoom.key}`)
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
                    <h3>Olá, {user?.name}</h3>
                    <h2>Criar uma nova sala</h2>
                    <form onSubmit={handleCreateRoom}>
                        <input 
                            type="text"
                            placeholder="Nome da sala"
                            onChange={event => setNewRoom(event.target.value)}
                            value={newRoom}

                        />
                        
                        <Button type="submit">
                            Criar uma nova sala
                        </Button>
                    </form>
                    <p>Ou caso deseje, <Link to="/">entre em uma sala existente.</Link></p>
               </div>
           </main>
       </div>
    )
}
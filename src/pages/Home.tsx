import { useHistory } from 'react-router-dom'

import { Button } from '../components/Button'
import illustrationImg from '../assets/images/Illustration.svg'
import logoImg from '../assets/images/Logo.svg'
import logoGoogleImg from '../assets/images/IconGoogle.svg'
import '../styles/auth.scss'
import { useAuth } from '../hooks/useAuth'

export function Home() {
    const history = useHistory();
    const { user, signInWithGoogle } = useAuth();

    async function handleCreateRoom() {
        if (!user) {
            await signInWithGoogle();
        }
        history.push('/rooms/new');
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
                    <form action="">
                        <input
                            type="text"
                            placeholder="Digite o código da sala"
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
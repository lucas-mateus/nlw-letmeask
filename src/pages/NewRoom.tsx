import { Button } from '../components/Button'
import {Link} from 'react-router-dom'
import illustrationImg from '../assets/images/Illustration.svg'
import logoImg from '../assets/images/Logo.svg'
import logoGoogleImg from '../assets/images/IconGoogle.svg'
import '../styles/auth.scss'

export function NewRoom(){
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
                    <h2>Criar uma nova sala</h2>
                    <form action="">
                        <input 
                            type="text"
                            placeholder="Nome da sala"
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
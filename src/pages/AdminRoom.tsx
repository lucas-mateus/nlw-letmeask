//import toast, { Toaster } from 'react-hot-toast'
import { useParams } from 'react-router-dom'
import logoImg from '../assets/images/Logo.svg'
import { Button } from '../components/Button'
import { Question } from '../components/Question'
import { RoomCode } from '../components/RoomCode'
import { useRoom } from '../hooks/useRoom'
import '../styles/room.scss'


type RoomParam = {
    id: string
}

export function AdminRoom() {
    const params = useParams<RoomParam>();
    const roomId = params.id;

    const {title,questions} = useRoom(roomId);


    return (
        <div id="page-room">
          
            <header>
                <div className="content">
                    <img src={logoImg} alt="logomarca da aplicação Letmeask" />
                    <div>
                        <RoomCode code={roomId} />
                        <Button isOutlined>Encerrar sala</Button>
                    </div>
                </div>
            </header>

            <main>
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {questions.length > 0 && <span>{questions.length} perguntas</span>}
                </div>


                <div className="questions-list">
                    {questions.map(question => {
                        return (
                            <Question
                                key={question.id}
                                content={question.content}
                                author={question.author}
                            />
                        )
                    })}
                </div>
            </main>
        </div>
    )
}
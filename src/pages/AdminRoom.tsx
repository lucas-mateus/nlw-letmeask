//import toast, { Toaster } from 'react-hot-toast'
import { useHistory, useParams } from 'react-router-dom'
import logoImg from '../assets/images/Logo.svg'
import deleteImg from '../assets/images/delete.svg'
import checkImg from '../assets/images/check.svg'
import answerImg from '../assets/images/answer.svg'


import { Button } from '../components/Button'
import { Question } from '../components/Question'
import { RoomCode } from '../components/RoomCode'
import { useRoom } from '../hooks/useRoom'
import '../styles/room.scss'
import { database } from '../services/firebase'
import { toast,Toaster } from 'react-hot-toast'


type RoomParam = {
    id: string
}

export function AdminRoom() {

    const history = useHistory();
    const params = useParams<RoomParam>();
    const roomId = params.id;

    const {title,questions} = useRoom(roomId);

    async function handleEndingRoom() {
        await database.ref(`rooms/${roomId}`).update({
            endedAt: new Date(),
        })

        history.push('/')
    }
    
    async function handleCheckQuestionAsAnswered(questionId: string){
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isAnswered: true
        })

    }

    async function handleHiglighQuestion(questionId: string){
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isHighlighted: true
        })
    }


    async function handleDeleteQuestion(questionId: string){
        if(window.confirm('Você tem certeza que deseja remover essa pergunta?')){
            await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
            toast.success('Pergunta deletada com sucesso');
        }
    }

    return (
        <div id="page-room">
          <Toaster/>
            <header>
                <div className="content">
                    <img src={logoImg} alt="logomarca da aplicação Letmeask" />
                    <div>
                        <RoomCode code={roomId} />
                        <Button isOutlined
                            onClick={handleEndingRoom}
                        >Encerrar sala</Button>
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
                                isAnswered={question.isAnswered}
                                isHighlighted={question.isHighlighted}
                            >

                                {!question.isAnswered && (
                                    <>
                                        <button
                                            type="button"
                                            onClick={() => handleCheckQuestionAsAnswered(question.id)}
                                        >
                                            <img src={checkImg} alt="Marcar pergunta como respondida" />
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => handleHiglighQuestion(question.id)}
                                        >
                                            <img src={answerImg} alt="Destacar pergunta" />
                                        </button>
                                    </>

                                )}

                                <button
                                    type="button"
                                    onClick={() => handleDeleteQuestion(question.id)}
                                >
                                    <img src={deleteImg} alt="Remover pergunta" />
                                </button>
                            </Question>
                        )
                    })}
                </div>
            </main>
        </div>
    )
}
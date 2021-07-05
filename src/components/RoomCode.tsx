import toast from 'react-hot-toast';
import copyIcon from '../assets/images/copy.svg';

import '../styles/room-code.scss'

type RoomCodeType = {
    code: string
}

export function RoomCode(props: RoomCodeType){

    function copyRoomCodeToClipboard(){
        navigator.clipboard.writeText(props.code)
        toast.success('Código da sala copiado')
    }

    return(
       
        <button className="room-code" onClick={copyRoomCodeToClipboard}>  
            <div>
                <img src={copyIcon} alt="ícone de copiar" />
            </div>
            <span>Sala #{props.code}</span>
        </button>
    )
}
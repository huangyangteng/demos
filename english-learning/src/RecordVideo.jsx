import { useState } from 'react'
import Webcam from 'react-webcam'
const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
  };
export default function RecordVideo() {
    const [open, setOpen] = useState(false)
    const [muted,setMuted]=useState(true)
    const clickOpen = (flag) => {
        setOpen(flag)
    }
    return (
        <div className='record-video'>
            {open ? (
                <>
                <Webcam audio={!muted} width={640} height={360} videoConstraints={videoConstraints}></Webcam>
                <span onClick={() => clickOpen(false)}>❌</span>
                <b onClick={() => setMuted(!muted)}>{muted?'🔇':'🔊'}</b>
                </>
            ) : (
                <button onClick={() => clickOpen(true)}>打开摄像头</button>
            )}
        </div>
    )
}

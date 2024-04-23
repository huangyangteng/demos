import { useState } from 'react'
import Webcam from 'react-webcam'

export default function RecordVideo() {
    const [open, setOpen] = useState(false)
    console.log(open)
    const clickOpen = (flag) => {
        setOpen(flag)
    }
    return (
        <div className='record-video'>
            {open ? (
                <>
                <Webcam audio={true} width={640} height={360}></Webcam>
                <button onClick={() => clickOpen(false)}>关闭摄像头</button>
                </>
            ) : (
                <button onClick={() => clickOpen(true)}>打开摄像头</button>
            )}
        </div>
    )
}

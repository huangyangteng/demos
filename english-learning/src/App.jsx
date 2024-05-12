import { useRef, useState } from 'react'
import './App.css'
import { list, endMap, pdfMap } from './data'
import RecordVideo from './components/RecordVideo'
import RenderPdf from './components/RenderPdf'
import Recommend from './components/Recommend'
function App() {
    const videoDom = useRef(null)
    const [endTime, setEndTime] = useState(null)
    const [curMark, setCurMark] = useState(null)
    const pdfRef = useRef()
    const playMark = ({ text, start }) => {
        setCurMark({
            text,
            start
        })
        videoDom.current.currentTime = start
        videoDom.current.play()
        setEndTime(endMap.get(text))
        let page = pdfMap.get(text)
        if (page) {
            pdfRef.current.toPage(page - 4)
        }
    }
    const onTimeUpdate = () => {
        if (endTime && videoDom.current.currentTime >= endTime) {
            videoDom.current.pause()
            setEndTime(null)
            if (curMark) {
                videoDom.current.currentTime = curMark.start
            }
        }
    }
    return (
        <div className="wrapper">
            <video
                className="example-video"
                ref={videoDom}
                onTimeUpdate={onTimeUpdate}
                controls={false}
                
                src="https://leexiao.site/file/en.mp4"></video>
            <div className="record-video-wrapper">
                <RecordVideo />
                <Recommend />
            </div>
            <div className="marks">
                <div className="title-1">元音</div>
                <div className="title-1">辅音</div>
                <div className="title-2">长元音</div>
                <div className="title-2">短元音</div>
                <div className="title-2">双元音</div>
                <div className="title-2">清辅音</div>
                <div className="title-2">浊辅音</div>

                {list.map((item, index) => (
                    <div
                        onClick={() => playMark(item, index)}
                        className={'text text-' + item.text}
                        key={item.text}>
                        {item.text}
                    </div>
                ))}
            </div>
            <div className="info">
                <RenderPdf ref={pdfRef} />
            </div>
        </div>
    )
}

export default App

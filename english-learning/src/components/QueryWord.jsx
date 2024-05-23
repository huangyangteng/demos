import axios from 'axios'
import { useState } from 'react'

axios.defaults.baseURL = 'https://leexiao.site/gk-api'
// 预加载音频文件
function preloadAudio(audios) {
    audios.forEach(function (audioSrc) {
        // 为每个音频文件创建一个新的Audio对象
        var audio = new Audio()
        // 设置音频源
        audio.src = audioSrc

        // 加载音频文件
        audio.load()
    })
}

export default function QueryWord() {
    const [searchWord, setSearchWord] = useState('')

    const handleSearch = (e) => {
        setSearchWord(e.target.value)
    }
    const [soundMark, setSoundMark] = useState({ uk: null, us: null })
    const [meaning, setMeaning] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    console.log(error)
    const fetchWord = (e) => {
        if (e.key === 'Enter') {
            setLoading(true)
            setError(null)
            setMeaning('')
            setSoundMark({ uk: null, us: null })
            axios
                .get('/util/translate?word=' + searchWord)
                .then((res) => {
                    if (res.data.code === 2000) {
                        const { soundmark, meaning } = res.data.data
                        setSoundMark(soundmark)
                        setMeaning(meaning)
                        preloadAudio([
                            soundMark.uk.sound,
                            soundMark.uk.fsound,
                            soundMark.us.sound,
                            soundMark.us.fsound
                        ])
                    } else {
                        setError(res.data.data)
                    }
                    setLoading(false)
                })
                .catch((error) => {
                    console.log(error.toString())
                    // setError(error)
                    setLoading(false)
                })
        }
    }

    const playSound = (src) => {
        let audio = new Audio(src)
        audio.load()
        audio.play()
    }

    return (
        <div className="query-word">
            <input
                value={searchWord}
                placeholder="input word"
                onChange={handleSearch}
                onKeyUp={fetchWord}
            />
            {loading && <div>loading...</div>}
            {!!error && <div>{error}</div>}

            <div className="word-content">
                <div>{meaning}</div>
                {soundMark.uk && (
                    <div className="word-item">
                        {soundMark.uk.text}
                        <span onClick={() => playSound(soundMark.uk.sound)}>
                            👨🏼
                        </span>
                        <span onClick={() => playSound(soundMark.uk.fsound)}>
                            👩🏻‍🦳
                        </span>
                    </div>
                )}
                {soundMark.us && (
                    <div className="word-item">
                        {soundMark.us.text}
                        <span onClick={() => playSound(soundMark.us.sound)}>
                            👨🏼
                        </span>
                        <span onClick={() => playSound(soundMark.us.fsound)}>
                            👩🏻‍🦳
                        </span>
                    </div>
                )}
            </div>
        </div>
    )
}

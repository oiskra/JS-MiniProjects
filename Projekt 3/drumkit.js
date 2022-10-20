const START_RECORDING_KEY = '0'
const CHANNEL_TIME_LIMIT = 15
const CHANNEL_1 = []
const CHANNEL_2 = []
const CHANNEL_3 = []
const CHANNEL_4 = []

// {
//     sound,
//     date,
//     duration
// }

document.addEventListener('keypress', onKeyPress)

const onKeyPress = event => {
    const key = event.key
    switch(key) {
        case '0':
            startRecording()
        case '1':
            playSound('boom')
            break
        case '2':
            playSound('clap')
            break
        case '3':
            playSound('hihat')
            break
        case '4':
            playSound('kick')
            break
        case '5':
            playSound('openhat')
            break
        case '6':
            playSound('ride')
            break
        case '7':
            playSound('snare')
            break
        case '8':
            playSound('tink')
            break
        case '9':
            playSound('tom')
            break
        }
}

const startRecording = () => {

}

const playSound = sound => {
    const audioTag = document.querySelector(`#${sound}`)
    audioTag.currentTime = 0 
    audioTag.play()
}


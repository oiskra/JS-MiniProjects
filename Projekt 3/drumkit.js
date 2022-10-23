const START_RECORDING_KEY = '0'
const CHANNEL_TIME_LIMIT = 15
const CHANNEL_1 = []
const SOUNDS = {
    1: 'boom',
    2: 'clap',
    3: 'hihat',
    4: 'kick',
    5: 'openhat',
    6: 'ride',
    7: 'snare',
    8: 'tink',
    9: 'tok'
}

const onKeyPress = event => {
    const key = event.key
    console.log(key)

    switch(key) {
        case '0':
            startRecording()
        case '1':
            toggleColorOnClick('boom')
            playSound('boom')
            break
        case '2':
            toggleColorOnClick('clap')
            playSound('clap')
            break
        case '3':
            toggleColorOnClick('hihat')
            playSound('hihat')
            break
        case '4':
            toggleColorOnClick('kick')
            playSound('kick')
            break
        case '5':
            toggleColorOnClick('openhat')
            playSound('openhat')
            break
        case '6':
            toggleColorOnClick('ride')
            playSound('ride')
            break
        case '7':
            toggleColorOnClick('snare')
            playSound('snare')
            break
        case '8':
            toggleColorOnClick('tink')
            playSound('tink')
            break
        case '9':
            toggleColorOnClick('tom')
            playSound('tom')
            break
        }
}
document.addEventListener('keypress', onKeyPress)

const toggleColorOnClick = sound => {
    const soundBtn = document.querySelector(`#sound-btn-${sound}`)

    soundBtn.classList.toggle('pressed')
    setTimeout(() => soundBtn.classList.toggle('pressed'), 100)
}
const startRecording = () => {
    document.addEventListener('keypress', event => {
        const key = event.key
        const record = {
            sound: SOUNDS[key],
            timestamp: Date.now()
        }
        CHANNEL_1.push(record)
        console.log(CHANNEL_1)
    })
}
startRecording()

const playRecordedPath = () => {
    if(CHANNEL_1.length === 0) return
    console.log('playing...')
    let counter = 0
    let timeout
    if(CHANNEL_1[counter+1])
        timeout = CHANNEL_1[counter+1].timestamp - CHANNEL_1[counter].timestamp
    else
        timeout = 0

    const interval = setInterval(() => {
        playSound(CHANNEL_1[counter].sound)
        counter++
        if(counter === CHANNEL_1.length){
            clearInterval(interval)
        }
    }, timeout)
}

const playSound = sound => {
    const audioTag = document.querySelector(`#${sound}`)
    audioTag.currentTime = 0 
    audioTag.play()
}

const createNewPath = () => {

}


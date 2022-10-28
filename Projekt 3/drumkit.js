'use strict'

const recBtn = document.querySelector('.record-btn')
const playBtn = document.querySelector('.play-btn')
const deleteBtn = document.querySelector('#delete-path-btn')
const addBtn = document.querySelector('#add-path-btn')

let IS_RECORDING = false
const RECORDING_TIME_LIMIT = 5
let PATH_TRACKER = 4;
const TRACKS = [[],[],[],[]]
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

const toggleColorOnClick = sound => {
    const soundBtn = document.querySelector(`#sound-btn-${sound}`)

    soundBtn.classList.toggle('pressed')
    setTimeout(() => soundBtn.classList.toggle('pressed'), 100)
}

const playSound = sound => {
    const audioTag = document.querySelector(`#${sound}`)
    audioTag.currentTime = 0 
    audioTag.play()
}

const startRecording = () => {
    IS_RECORDING = true
    const selectedPaths = returnSelectedPathIds()
    if(selectedPaths.length !== 1) {
        alert('You must have one track selected to record.')
        return
    }
    setTimeout(stopRecording, RECORDING_TIME_LIMIT*1000)

    // document.addEventListener('keypress', event => {
    //     const key = event.key
    //     const record = {
    //         sound: SOUNDS[key],
    //         timestamp: Date.now()
    //     }
    //     TRACKS[selectedPaths[0]].push(record)
    //     console.log(TRACKS)
    // })

    document.addEventListener('keypress', test)
}

const addSoundToTrack = (event) => {
    const selectedPaths = returnSelectedPathIds()

    const key = event.key
    const record = {
        sound: SOUNDS[key],
        timestamp: Date.now()
    }
    TRACKS[selectedPaths[0]].push(record)
    console.log(TRACKS)
}


const stopRecording = () => {
    IS_RECORDING = false
    console.log('is recording', IS_RECORDING)
    document.removeEventListener('keypress', addSoundToTrack)

}

const playRecordedPath = (ids) => {
    console.log(TRACKS)
    ids.forEach(id => {
        if(TRACKS[id].length === 0) return
        console.log('playing...')
        let counter = 0
        let timeout
        let setTimeoutId
        
        const playSingleSound = () => {
            if(counter === TRACKS[id].length){
                clearTimeout(setTimeoutId)
                return
            } 
            if(TRACKS[id][counter+1])
                timeout = TRACKS[id][counter+1].timestamp - TRACKS[id][counter].timestamp
            else
                timeout = 0
            
            playSound(TRACKS[id][counter].sound)
            console.log(TRACKS[id][counter].sound)
            counter = ++counter

            clearTimeout(setTimeoutId)
            setTimeoutId = setTimeout(playSingleSound, timeout)
        }
        
        setTimeoutId = setTimeout(playSingleSound, 0)
    })  
}
playBtn.addEventListener('click', () => {
    const ids = returnSelectedPathIds()
    playRecordedPath(ids)
})

const returnSelectedPathIds = () => {
    const paths = Array.from(document.querySelectorAll('.path'))
    const selected = paths
        .filter(el => el.classList.contains('selected-path'))
        .map(el => el.id.split('-')[1])
    
    return selected
}

const createSelectivePaths = () => {
    const paths = Array.from(document.querySelectorAll('.path'))
    paths.forEach(el => {
        el.addEventListener('click', () => {
            let isSelected = el.classList.contains('selected-path')
            if(isSelected)
                el.classList.remove('selected-path')
            else 
                el.classList.add('selected-path')
        })
    })
}

const createNewPath = () => {
    const allPaths = document.querySelector('.all-paths')
    const newPath = document.createElement('div');

    TRACKS[PATH_TRACKER] = []
    newPath.classList.add('path')
    newPath.id = `path-${PATH_TRACKER}`
    PATH_TRACKER = ++PATH_TRACKER

    newPath.addEventListener('click', () => {
        let isSelected = newPath.classList.contains('selected-path')
        if(isSelected)
            newPath.classList.remove('selected-path')
        else 
            newPath.classList.add('selected-path')
    })
    
    allPaths.appendChild(newPath) 
}

const deletePath = () => {   
    const paths = Array.from(document.querySelectorAll('.path'))
    const path = paths.find(el => el.classList.contains('selected-path'))
    const pathID = path.id.split('-')[1]

    if(!path)
        return;
    
    TRACKS.splice(pathID, 1)
    path.remove()
}

createSelectivePaths();

recBtn.addEventListener('click', startRecording)
addBtn.addEventListener('click', createNewPath)
deleteBtn.addEventListener('click', deletePath)
document.addEventListener('keypress', onKeyPress)



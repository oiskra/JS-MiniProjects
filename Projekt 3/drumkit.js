'use strict'

const recBtn = document.querySelector('.record-btn')
const playBtn = document.querySelector('.play-btn')
const loopBtn = document.querySelector('.loop-btn')
const deleteBtn = document.querySelector('#delete-path-btn')
const addBtn = document.querySelector('#add-path-btn')
const metronome = document.querySelector('#metronome')

let METRONOME_INTERVAL
let METRONOME_ON = false
let LOOP_ACTIVE = false
let LOOP_INTERVAL
const RECORDING_TIME_LIMIT = 5
let PATH_TRACKER = 4;
const TRACKS = [[],[],[],[]]
const SOUNDS = {
    q: 'boom',
    w: 'clap',
    e: 'hihat',
    r: 'kick',
    t: 'openhat',
    y: 'ride',
    u: 'snare',
    i: 'tink',
    o: 'tok'
}

const onKeyPress = event => {
    const key = event.key
    switch(key) {
        case 'q':
            toggleColorOnClick('boom')
            playSound('boom')
            break
        case 'w':
            toggleColorOnClick('clap')
            playSound('clap')
            break
        case 'e':
            toggleColorOnClick('hihat')
            playSound('hihat')
            break
        case 'r':
            toggleColorOnClick('kick')
            playSound('kick')
            break
        case 't':
            toggleColorOnClick('openhat')
            playSound('openhat')
            break
        case 'y':
            toggleColorOnClick('ride')
            playSound('ride')
            break
        case 'u':
            toggleColorOnClick('snare')
            playSound('snare')
            break
        case 'i':
            toggleColorOnClick('tink')
            playSound('tink')
            break
        case 'o':
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
    const selectedPaths = returnSelectedPathIds()
    if(selectedPaths.length !== 1) {
        alert('You must have one track selected to record.')
        return
    }
    setTimeout(stopRecording, RECORDING_TIME_LIMIT*1000)
    animateRecordedPath(selectedPaths[0])
    document.addEventListener('keypress', addSoundToTrack)
}

const animateRecordedPath = (pathId) => {

}

const addSoundToTrack = (event) => {
    const selectedPaths = returnSelectedPathIds()
    const key = event.key

    if(!Object.keys(SOUNDS).includes(key)) return
    const record = {
        sound: SOUNDS[key],
        timestamp: Date.now()
    }

    TRACKS[selectedPaths[0]].push(record)
    console.log(TRACKS)
}

const stopRecording = () => {
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
            counter = ++counter

            clearTimeout(setTimeoutId)
            setTimeoutId = setTimeout(playSingleSound, timeout)
        }
        
        setTimeoutId = setTimeout(playSingleSound, 0)
    })  
}


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
            el.classList.toggle('selected-path')
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
    if(!path) return;

    const pathID = path.id.split('-')[1]
    TRACKS.splice(pathID, 1)
    path.remove()
}

const animateMetronome = () => {
    const bmp = document.querySelector('#bpm')
    if(!bmp.value) {
        alert('set BMP')
        return
    }
    const msPerBeat = (60000 / bmp.value)

    if(!METRONOME_ON){
        METRONOME_INTERVAL = setInterval(() => {
            playSound('tink')
            metronome.animate([
                {transform: 'scale(1)'},
                {transform: 'scale(1.2)'}
            ], msPerBeat)
        }, msPerBeat)       
        METRONOME_ON = true
    } 
    else {
        clearInterval(METRONOME_INTERVAL)
        METRONOME_ON = false
    }
}

const loopPath = () => {
    if(LOOP_ACTIVE){
        clearInterval(LOOP_INTERVAL)
        LOOP_ACTIVE = false
        return
    }
    
    loopBtn.classList.toggle('active')    
    LOOP_INTERVAL = setInterval(()=>playRecordedPath(returnSelectedPathIds()), RECORDING_TIME_LIMIT*1000)
    LOOP_ACTIVE = true
}

createSelectivePaths();

loopBtn.addEventListener('click', loopPath)
metronome.addEventListener('click', animateMetronome)
recBtn.addEventListener('click', startRecording)
addBtn.addEventListener('click', createNewPath)
deleteBtn.addEventListener('click', deletePath)
playBtn.addEventListener('click', () => {
    const ids = returnSelectedPathIds()
    playRecordedPath(ids)
})
document.addEventListener('keypress', onKeyPress)



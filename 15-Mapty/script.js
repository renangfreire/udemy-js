'use strict';

// DOM VARIABLES
const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

function generateId(){
    // if(){}
    // verify if id already exists, otherwise create it
    return Math.trunc(Math.random() * 10000000000)
}


class Workout{
    date = new Date();
    id = Math.trunc(Math.random() * 10000000000)

    constructor(coords, distance, duration){
        this.coords = coords;
        this.distance = distance;
        this.duration = duration;
    }

    _setDescription(){
        const options = {
            month: 'long',
            day: 'numeric',
        }

        const date = new Intl.DateTimeFormat('en-us', options).format(this.date)

        const typeWorkout = `${this.type[0].toUpperCase()}${this.type.slice(1)}`

        this.description = `${typeWorkout} on ${date}`
    }
}

class Running extends Workout{
    type = 'running'
    constructor(coords, distance, duration, cadence){
        super(coords, distance, duration);
        this.cadence = cadence;
        this.calcPace()
        this._setDescription()
    }

    calcPace(){
        //min/km
        this.pace = this.duration / this.distance
        return this.pace
    }
}

class Cycling extends Workout{
    type = 'cycling'
    constructor(coords, distance, duration, elevationGain){
        super(coords, distance, duration);
        this.elevationGain = elevationGain;
        this.calcSpeed()
        this._setDescription()
    }

    calcSpeed(){
        // km/h
        this.speed = this.distance / (this.duration / 60)
        return this.speed
    }

}

////////////////////////////////////////////
/// CLASS APP

class App {
    #map
    #mapEvent
    #workouts = []

    constructor(){
        this._getPosition()
        
        this._getLocalStorage()
        
        form.addEventListener('submit', this._newWorkout.bind(this))

        inputType.addEventListener('change', this._toggleElevationField)

        containerWorkouts.addEventListener('click', this._workoutEventMoveMap.bind(this))
    }

    _getPosition(){
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(this._loadMap.bind(this), function(){
                alert('cannot get your current position')
            }, {enableHighAccuracy: true}); 
            
     }
    }

    _loadMap(pos){
        const {latitude, longitude} = pos.coords
            
            this.#map = L.map('map').setView([latitude, longitude], 14)
            
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(this.#map);
            
            this.#map.on('click', this._showForm.bind(this))
                
            
            this.#workouts.forEach(work => 
                this._renderWorkoutMarker(work))
    }

    _showForm(mapE){
        this.#mapEvent = mapE
        form.classList.remove('hidden')
        inputDistance.focus()
    }

    _hideForm(){
        inputCadence.value = inputDuration.value = inputElevation.value = inputDistance.value = '';
        form.style.display = 'none'
        form.classList.add('hidden') 
        setTimeout(() => form.style.display = 'grid', 100)

    }

    _toggleElevationField(){
        inputElevation.closest('.form__row').classList.toggle('form__row--hidden')
        inputCadence.closest('.form__row').classList.toggle('form__row--hidden')      
    }

    _newWorkout(e){
        const validInputs = (...inputs) => inputs.every(inp => Math.sign(inp) > 0)

        e.preventDefault()

        //Get data from form
        const type = inputType.value
        const distance = +inputDistance.value
        const duration = +inputDuration.value
        const {lat, lng} = this.#mapEvent.latlng
        const coords = [lat, lng]
        let workout

        // If workout cycling, create cycling object
        if(type === 'cycling'){
            const elevationGain = +inputElevation.value

             // Check if data is valid
            if(!validInputs(distance, duration, Math.abs(elevationGain))){
                return alert('Input have to be positive numbers!')
               }
            workout = new Cycling(coords, distance, duration, elevationGain)
        }


        // If workout running, create running object
        if(type === 'running'){
            const cadence = +inputCadence.value

             // Check if data is valid
            if(!validInputs(distance, duration, cadence)){
                return alert('Input have to be positive numbers!')
               }
            
            workout = new Running(coords, distance, duration, cadence)
        }

        //Add new Workout to workout Array
        this.#workouts.push(workout)

        // Render Workout on map as marker
        this._renderWorkoutMarker(workout)

        //Render workout on list
        this._renderWorkout(workout)

        // Clear Input fields + Hide form
        this._hideForm()

        // Add to localStorage
        this._setLocalStorage()
    }

    _renderWorkout(workout){
        
        const htmlRunning = `
        <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${Number(workout?.pace).toFixed(1)}</span>
            <span class="workout__unit">min/km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">🦶🏼</span>
            <span class="workout__value">${workout?.cadence}</span>
            <span class="workout__unit">spm</span>
          </div>`

        const htmlCycling = `
        <div class="workout__details">
          <span class="workout__icon">⚡️</span>
          <span class="workout__value">${Number(workout?.speed).toFixed(1)},</span>
          <span class="workout__unit">km/h</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">⛰</span>
          <span class="workout__value">${workout?.elevationGain}</span>
          <span class="workout__unit">m</span>
        </div>`

       const html = `
       <li class="workout workout--${workout.type}" data-id="${workout.id}">
          <h2 class="workout__title">${workout.description}</h2>
          <div class="workout__details">
            <span class="workout__icon">${workout.type == 'running' ? '🏃‍♂️' : '🚴‍♀️'}</span>
            <span class="workout__value">${workout.distance}</span>
            <span class="workout__unit">km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⏱</span>
            <span class="workout__value">${workout.duration}</span>
            <span class="workout__unit">min</span>
          </div>
          ${workout.type == 'running' ? htmlRunning : htmlCycling}
        </li>`

        form.insertAdjacentHTML('afterend', html)
    }

    _renderWorkoutMarker(workout){
        L.marker(workout.coords)
        .bindPopup(L.popup({
            maxWidth: 250,
            minWidth: 100,
            autoClose: false,
            closeOnClick: false,
            className: `${workout.type}-popup`
        }))
        .on('click', this._moveToPopup.bind(this, workout))
        .addTo(this.#map)
        .setPopupContent(`${workout.type == 'running' ? '🏃‍♂️' : '🚴‍♀️'} ${workout.description}`)
        .openPopup()
    }

    _moveToPopup(workout){
        const coords = workout.coords
        const options = {
            duration: .5,
        }
        this.#map.panTo(coords, options)

    }

    _workoutEventMoveMap(el){
        const workoutContainer = el.target.closest('.workout')
        if(!workoutContainer) return
            const workout = this.#workouts.find(el => el.id === +workoutContainer.dataset.id)
            this._moveToPopup(workout)
    }

    _getLocalStorage(){
        const data = JSON.parse(localStorage.getItem('workouts'))

        if(!data) return

        this.#workouts = data

        this.#workouts.forEach(el => {
            this._renderWorkout(el)
        })
    }

    _setLocalStorage(){
        localStorage.setItem('workouts', JSON.stringify(this.#workouts))
    }

    reset(){
        localStorage.removeItem('workouts')
        location.reload()
    }
}

// 

const app = new App()
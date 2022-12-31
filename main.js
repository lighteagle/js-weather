import './style.css'
import { getWeather } from './weather'
import {ICON_MAP} from './iconMap'

navigator.geolocation.getCurrentPosition(positionSuccess, positionError)

function positionSuccess({ coords }) {
    getWeather(
      coords.latitude,
      coords.longitude,
      Intl.DateTimeFormat().resolvedOptions().timeZone
    )
      .then(renderWeather)
      .catch(e => {
        console.error(e)
        alert("Error getting weather.")
      })
  }
  
  function positionError() {
    alert(
      "There was an error getting your location. Please allow us to use your location and refresh the page."
    )
  }

function renderWeather({ current, daily, hourly }) {
    renderCurrentWeather(current)
    renderDailyWeather(daily)
    renderHourlyWeather(hourly)
    
    document.body.classList.remove("blurred")
}

function setValue(selector, value, { parent = document } = {}) {
    parent.querySelector(`[data-${selector}]`).textContent = value
}

const currentIcon = document.querySelector("[data-current-icon]") 

function renderCurrentWeather(current) {
    currentIcon.src = getIconUrl(current.iconCode)
    setValue("current-temp", current.currentTemp)
    setValue("current-high", current.highTemp)
    setValue("current-low", current.lowTemp)
    setValue("current-fl-high", current.highFeelsLike)
    setValue("current-fl-low", current.lowFeelsLike)
    setValue("current-wind", current.windSpeed)
    setValue("current-precip", current.precip)
}

function getIconUrl(iconCode) {
    return `icons/${ICON_MAP.get(iconCode)}.svg`
}


const DAY_FORMATTER = new Intl.DateTimeFormat(undefined, {weekday:"long"})
const dailySection = document.querySelector("[data-day-section]")
const dayCardTemplate = document.getElementById("day-card-template")

function renderDailyWeather(daily){
    dailySection.innerHTML=""
    daily.forEach(day => {
        const element = dayCardTemplate.content.cloneNode(true)
        setValue("temp", day.maxTemp, {parent:element})
        setValue("date", DAY_FORMATTER.format(day.timestamp), {parent:element})
        element.querySelector("[data-icon]").src = getIconUrl(day.iconCode)
        dailySection.append(element)
    });
}

const HOUR_FORMATTER = new Intl.DateTimeFormat(undefined, {hour:"numeric"})
const hourlySection = document.querySelector("[data-hour-section]")
const hourCardTemplate = document.getElementById("row-card-template")

function renderHourlyWeather(hourly){
    hourlySection.innerHTML=""
    hourly.forEach(hour => {
        const element = hourCardTemplate.content.cloneNode(true)
        setValue("day", DAY_FORMATTER.format(hour.timestamp), { parent: element })
        setValue("time", HOUR_FORMATTER.format(hour.timestamp), {parent:element})
        setValue("temp", hour.temp, {parent:element})
        setValue("fl-temp", hour.feelsLike, {parent:element})
        setValue("wind", hour.windSpeed, {parent:element})
        setValue("precip", hour.precip, {parent:element})
        element.querySelector("[data-icon]").src = getIconUrl(hour.iconCode)
        hourlySection.append(element)
    });
}
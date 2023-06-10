const temperatureField = document.querySelector(".weather1");
const cityField = document.querySelector(".weather2 p")
const dateField = document.querySelector(".weather2 span")
const emojiField = document.querySelector(".weather3 p img")
const weatherField = document.querySelector(".weather3 span")
const searchField = document.querySelector(".searchField")
const form = document.querySelector("form")

const key = "556e94c7129741b4bdb120305231006";
let target = "delhi india"


const fetchData = async (target) => {
    try {
        const url = `https://api.weatherapi.com/v1/current.json?key=${key}&q=${target}`
        const result = await fetch(url)
        const data = await result.json()

        // console.log(data)
        const { current: { temp_c,
            condition:
            { icon, text }
        },
            location: { name, localtime }
        } = data;
        // console.log(icon, text)
        updateDom(temp_c, name, icon, text, localtime)
    } catch (error) {
        alert("Location not found")
    }

}

function updateDom(temperature, city, emoji, condition, localtime) {
    temperatureField.innerText = temperature
    cityField.innerText = city
    emojiField.src = emoji

    const exactTime = localtime.split(" ")[1]
    const exactDate = localtime.split(" ")[0]
    const exactDay = getDayName(new Date(exactDate).getDay())

    // console.log(getDayName(exactDay))
    weatherField.innerText = condition
    dateField.innerText = `${exactTime} - ${exactDay} ${exactDate}`
}

fetchData(target)

const getDayName = (day) => {
    switch (day) {
        case 0:
            return "Sunday"
            break;
        case 1:
            return "Monday"
            break;
        case 2:
            return "Tuesday"
            break;
        case 3:
            return "Wednesday"
            break;
        case 4:
            return "Thursday"
            break;
        case 5:
            return "Friday"
            break;
        case 6:
            return "Saturday"
    }
}
const search = (e) => {
    e.preventDefault();
    target = searchField.value
    fetchData(target)
}
form.addEventListener("submit", search)
//VIDEOS LIST
let listOfVideos = document.querySelector(".listOfVideos");
let videoInput = document.querySelector(".videoInput");
let addVideoBtn = document.querySelector(".addVideoBtn");
let newVideo;
let tools = document.querySelector(".tools");
let btnComplete = document.querySelector(".btnComplete");
let btnEdit = document.querySelector(".btnEdit");
let btnDelete = document.querySelector("btnDelete");
let iconComplete;
let iconDelete;
let removeVideo;
let popup = document.querySelector(".popup");
let popupAccept = document.querySelector(".popupAccept");
let popupCancel = document.querySelector(".popupCancel");
let noVideoAlert = document.querySelector(".noVideoAlert");
let sQuantity;
let popupInput = document.querySelector(".popupInput");
let videoId = 2;
let videoUnderEdit;
let noInputNameAlert = document.querySelector(".noInputNameAlert");
let wrongInputNameAlert = document.querySelector(".wrongInputNameAlert");

//Weather
let apiKey = "&APPID=1449243495e60a1a57654bfb6ce2b822";
let cityTyped = document.querySelector(".cityTyped");
cityTyped.value = "Kielce";
let apiLink = "https://api.openweathermap.org/data/2.5/weather?q=";
let weatherCity;
let url;
let units = "&units=metric";
let temperature = document.querySelector(".temperature");
let humidity = document.querySelector(".humidity");
let weatherSend = document.querySelector(".weatherSend");
let weather = document.querySelector(".weather");
let cityName = document.querySelector(".cityName");
let photo = document.querySelector(".photo");
let weatherError = document.querySelector(".weatherError");

//Videos LIST

const addNewVideo = () => {
    if (videoInput.value !== "" && videoInput.value.includes("https://www.youtube.com/embed/") 
    || videoInput.value !== "" && videoInput.value.includes("https://www.youtube.com/watch?v=") 
    || videoInput.value !== "" && videoInput.value.includes("https://youtu.be/")) {
        newVideo = document.createElement("li");
        newVideo.setAttribute("id", videoId);
        videoId++;
            newVideoLink = document.createElement("iframe");
            newVideoLink.width = 250;
            newVideoLink.height = 200;
            newVideoLink.setAttribute("allowfullscreen", "");
            //If the link is shared from YT
            if (videoInput.value.includes("https://www.youtube.com/embed/")) {
                newVideoLink.src = videoInput.value;
            }
            else if (videoInput.value.includes("https://www.youtube.com/watch?v=")) {
                //Cut the link
                srcVideoLinkCut = (videoInput.value).substring(32, ((videoInput.value).indexOf("&")));
                //Modify the link
                srcVideoLinkModified = "https://www.youtube.com/embed/" + srcVideoLinkCut;
                newVideoLink.src = srcVideoLinkModified;
            }
            // "https://youtu.be/" case
            else {
                //Cut the link
                srcVideoLinkCut = (videoInput.value).substring(17,);
                //Modify the link
                srcVideoLinkModified = "https://www.youtube.com/embed/" + srcVideoLinkCut;
                newVideoLink.src = srcVideoLinkModified;
            }
            
        newVideo.appendChild(newVideoLink);
        newVideo.className = "listItem";
        listOfVideos.appendChild(newVideo);

        //Add tools to the button
        tools = document.createElement("div");
        tools.className = "tools";
        iconComplete = document.createElement("i");
        iconDelete = document.createElement("i");
        newVideo.appendChild(tools);

        btnComplete = document.createElement("button");
        btnComplete.className = "btnComplete";
        tools.appendChild(btnComplete);
        btnComplete.appendChild(iconComplete);
        iconComplete.className = "fas fa-check";

        btnEdit = document.createElement("button");
        btnEdit.className = "btnEdit";
        btnEdit.innerText = "Edit";
        tools.appendChild(btnEdit);

        btnDelete = document.createElement("button");
        btnDelete.className = "btnDelete";
        tools.appendChild(btnDelete);
        btnDelete.appendChild(iconDelete);
        iconDelete.className = "fas fa-times";

        videosQuantity = document.querySelector(".listOfVideos").getElementsByTagName("li").length;
        videoAlert();
        wrongInputNameAlert.style.display = "none";

        }

    else {
            wrongInputNameAlert.style.display = "flex";
        }
};

const checkList = (e) => {
    if (e.target.closest("button").classList.contains("btnComplete")){
        e.target.closest("li").classList.toggle("liCompleted");
        e.target.closest("button").classList.toggle("btnCompleted");
    }
    else if (e.target.closest("button").className === "btnEdit") {
        openPopUp(e);
    }
    else if (e.target.closest("button").className === "btnDelete"){
        removeListFunction(e);
        videosQuantity = document.querySelector(".listOfVideos").getElementsByTagName("li").length;
        videoAlert();
    }
};
const removeListFunction = (e) => {
    const removeList = e.target.closest("li");
    removeList.remove();
};

const openPopUp = (e) => {
    popup.style.display = "flex";
    const beforeEdit = e.target.closest("li").id;
    videoUnderEdit = document.getElementById(beforeEdit);
    // Check if the link is defined
    if (typeof videoUnderEdit.firstChild.nextSibling.src !=="undefined"){
        popupInput.value = videoUnderEdit.firstChild.nextSibling.src;
    }
    else if (typeof videoUnderEdit.firstChild.src !=="undefined") {
        popupInput.value = videoUnderEdit.firstChild.src;
    }
    else {
        noInputNameAlert.style.display = "flex";
    }
}

const closePopUp = () => {
    popup.style.display = "none";
}

const acceptPopUp = () => {
    if (popupInput.value !== "") {
            if (popupInput.value.includes("https://www.youtube.com/watch?v=")) {
                popup.style.display = "none";
                //Here i change the link in the iframe
                videoUnderEditCut = (popupInput.value).substring(32, ((popupInput.value).indexOf("&")));
                //Modify the link
                videoUnderEditModified = "https://www.youtube.com/embed/" + videoUnderEditCut;
                //Check which element it is
                if (typeof videoUnderEdit.firstChild.nextSibling.src !=="undefined"){
                    videoUnderEdit.firstChild.nextSibling.src = videoUnderEditModified;
                }
                else if (typeof videoUnderEdit.firstChild.src !=="undefined") {
                    videoUnderEdit.firstChild.src = videoUnderEditModified;
                }
                noInputNameAlert.style.display = "none";
            }
            else if (popupInput.value.includes("https://www.youtube.com/embed/")) {
                popup.style.display = "none";
                //Check which element it is
                if (typeof videoUnderEdit.firstChild.nextSibling.src !=="undefined"){
                    videoUnderEdit.firstChild.nextSibling.src = popupInput.value;
                }
                else if (typeof videoUnderEdit.firstChild.src !=="undefined") {
                    videoUnderEdit.firstChild.src = popupInput.value;
                }

                noInputNameAlert.style.display = "none";
            } 
            else if (popupInput.value.includes("https://youtu.be/")) {
                popup.style.display = "none";
                //Here i change the link in the iframe
                videoUnderEditCut = (popupInput.value).substring(17, );
                //Modify the link
                videoUnderEditModified = "https://www.youtube.com/embed/" + videoUnderEditCut;
                //Check which element it is
                if (typeof videoUnderEdit.firstChild.nextSibling.src !=="undefined"){
                    videoUnderEdit.firstChild.nextSibling.src = videoUnderEditModified;
                }
                else if (typeof videoUnderEdit.firstChild.src !=="undefined") {
                    videoUnderEdit.firstChild.src = videoUnderEditModified;
                }
                noInputNameAlert.style.display = "none";
            }
            else {
                noInputNameAlert.style.display = "flex";
            }
    }
    else {
        noInputNameAlert.style.display = "flex";
    }
}

const videoAlert = () => {
    if (videoQuantity === 0){
      noVideoAlert.style.display = "flex";
    }
    else{
      noVideoAlert.style.display = "none";
    }
}

addVideoBtn.addEventListener("click", addNewVideo);
listOfVideos.addEventListener("click", checkList);
popupCancel.addEventListener("click", closePopUp);
popupAccept.addEventListener("click", acceptPopUp);

//WEATHER

const getWeather = () => {
    weatherCity = cityTyped.value;
    url = apiLink + weatherCity + apiKey + units;
    axios.get(url)
    .then (res => {
        const temp = res.data.main.temp;
        const hum = res.data.main.humidity;
        const whatWeather = Object.assign({}, ...res.data.weather);

        temperature.textContent = Math.floor(temp) + `°C`;
        humidity.textContent = hum + `%`;
        weather.textContent = whatWeather.main;
        cityName.textContent = cityTyped.value;

        weatherError.textContent = "";
        weatherError.style.visibility = "hidden";

        if ( whatWeather.id >= 200 && whatWeather.id <300)
            photo.src = "weather/thunderstorm.png";
        else if ( whatWeather.id >=300 && whatWeather.id <400) 
            photo.src = "weather/drizzle.png";
        else if ( whatWeather.id >=500 && whatWeather.id <600)
            photo.src = "weather/rain.png";
        else if ( whatWeather.id >=600 && whatWeather.id <700)
            photo.src = "weather/ice.png";
        else if ( whatWeather.id >=700 && whatWeather.id <800) 
            photo.src = "weather/fog.png";
        else if ( whatWeather.id ===800) 
            photo.src = "weather/sun.png";
        else if ( whatWeather.id >=801 && whatWeather.id <900) 
            photo.src = "weather/cloud.png";
        else 
            photo.src = "weather/unknown.png";
  })
  .catch(() => {
      weatherError.textContent = "Insert correct city name!";
      weatherError.style.visibility = "visible";
    });
};

weatherSend.addEventListener("click", getWeather);
getWeather();

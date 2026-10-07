const globeContainer = document.getElementById("globe-container");
const introScreen = document.getElementById("introScreen");
const locationPanel = document.getElementById("locationPanel");
const exploreButton = document.getElementById("exploreButton");
const closeButton = document.getElementById("closeButton");
const homeButton = document.getElementById("homeButton");
const nextButton = document.getElementById("nextButton");
const previousButton = document.getElementById("previousButton");

const locationNumber = document.getElementById("locationNumber");
const locationRegion = document.getElementById("locationRegion");
const countryLabel = document.getElementById("countryLabel");
const locationName = document.getElementById("locationName");
const coordinates = document.getElementById("coordinates");

const whatHappened = document.getElementById("whatHappened");
const whyItHappened = document.getElementById("whyItHappened");
const impact = document.getElementById("impact");
const prevention = document.getElementById("prevention");
const sourceText = document.getElementById("sourceText");

const beforeImage = document.getElementById("beforeImage");
const afterImage = document.getElementById("afterImage");

const beforePlaceholder = document.getElementById("beforePlaceholder");
const afterPlaceholder = document.getElementById("afterPlaceholder");

let currentLocation = 0;

const globe = Globe()(globeContainer)
    .globeImageUrl("https://unpkg.com/three-globe/example/img/earth-night.jpg")
    .bumpImageUrl("https://unpkg.com/three-globe/example/img/earth-topology.png")
    .backgroundColor("rgba(0,0,0,0)")
    .showAtmosphere(true)
    .atmosphereColor("#8fb66b")
    .atmosphereAltitude(0.12)
    .pointsData(locations)
    .pointLat("lat")
    .pointLng("lng")
    .pointColor(() => "#c9ef88")
    .pointAltitude(0.025)
    .pointRadius(0.42)
    .pointResolution(16)
    .pointsMerge(false)
    .onPointClick((location) => {
        const index = locations.indexOf(location);
        openLocation(index);
    });

globe.controls().enableZoom = true;
globe.controls().autoRotate = false;
globe.controls().rotateSpeed = 0.45;

function resizeGlobe() {
    globe
        .width(window.innerWidth)
        .height(window.innerHeight);
}

window.addEventListener("resize", resizeGlobe);

resizeGlobe();

function openLocation(index) {
    currentLocation = index;

    const location = locations[index];

    locationNumber.textContent =
        String(index + 1).padStart(2, "0") +
        " / " +
        String(locations.length).padStart(2, "0");

    locationRegion.textContent = location.region;
    countryLabel.textContent = location.country;
    locationName.textContent = location.name;
    coordinates.textContent = location.coordinates;

    whatHappened.textContent = location.whatHappened;
    whyItHappened.textContent = location.whyItHappened;
    impact.textContent = location.impact;
    prevention.textContent = location.prevention;
    sourceText.textContent = location.source;

    loadImage(beforeImage, location.before, beforePlaceholder);
    loadImage(afterImage, location.after, afterPlaceholder);

    locationPanel.classList.add("open");
    introScreen.classList.add("hidden");

    globe.pointOfView(
        {
            lat: location.lat,
            lng: location.lng,
            altitude: 1.8
        },
        1000
    );
}

function loadImage(image, path, placeholder) {
    image.onload = () => {
        image.parentElement.classList.add("has-image");
    };

    image.onerror = () => {
        image.parentElement.classList.remove("has-image");
        image.removeAttribute("src");
    };

    image.src = path;
}

function closeLocation() {
    locationPanel.classList.remove("open");

    
}

function goHome() {
    locationPanel.classList.remove("open");
    introScreen.classList.remove("hidden");

    globe.pointOfView(
        {
            lat: 20,
            lng: 20,
            altitude: 2.7
        },
        1000
    );
}

function nextLocation() {
    currentLocation++;

    if (currentLocation >= locations.length) {
        currentLocation = 0;
    }

    openLocation(currentLocation);
}

function previousLocation() {
    currentLocation--;

    if (currentLocation < 0) {
        currentLocation = locations.length - 1;
    }

    openLocation(currentLocation);
}

exploreButton.addEventListener("click", () => {
    introScreen.classList.add("hidden");

    globe.pointOfView(
        {
            lat: 20,
            lng: 20,
            altitude: 2.7
        },
        1000
    );
});

closeButton.addEventListener("click", closeLocation);

homeButton.addEventListener("click", goHome);

nextButton.addEventListener("click", nextLocation);

previousButton.addEventListener("click", previousLocation);

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeLocation();
    }

    if (event.key === "ArrowRight" && locationPanel.classList.contains("open")) {
        nextLocation();
    }

    if (event.key === "ArrowLeft" && locationPanel.classList.contains("open")) {
        previousLocation();
    }
});

document.getElementById("markerCount").textContent =
    String(locations.length).padStart(2, "0");
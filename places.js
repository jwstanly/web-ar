const loadPlaces = function(coords) {
    // COMMENT FOLLOWING LINE IF YOU WANT TO USE STATIC DATA AND ADD COORDINATES IN THE FOLLOWING 'PLACES' ARRAY
    const method = "dapi";

    const PLACES = [{
            name: "Bank of America",
            location: {
                lat: 30.326721, // add here latitude if using static data
                lng: -81.659542, // add here longitude if using static data
            },
            model: "./gltfModels/boat.glb",
        },
        {
            name: "Wells Fargo",
            location: {
                lat: 30.326384, // add here latitude if using static data
                lng: -81.65934, // add here longitude if using static data
            },
            model: "./gltfModels/wfc.glb",
        },
        {
            name: "TIAA Bank",
            location: {
                lat: 30.327423, // add here latitude if using static data
                lng: -81.662075, // add here longitude if using static data
            },
            model: "./gltfModels/tbc.glb",
        },
    ];

    /*if (method === "api") {
        return loadPlaceFromAPIs(coords);
    }*/

    return Promise.resolve(PLACES);
};

// getting places from REST APIs
function loadPlaceFromAPIs(position) {
    const params = {
        radius: 300, // search places not farther than this value (in meters)
        clientId: "HZIJGI4COHQ4AI45QXKCDFJWFJ1SFHYDFCCWKPIJDWHLVQVZ",
        clientSecret: "GYRKWWJMO2WK3KIRWBXIN5FQAWXTVFIK2QM4VQWNQ4TRAKWH",
        version: "20300101", // foursquare versioning, required but unuseful for this demo
    };

    // CORS Proxy to avoid CORS problems
    const corsProxy = "https://cors-anywhere.herokuapp.com/";

    // Foursquare API
    const endpoint = `${corsProxy}https://api.foursquare.com/v2/venues/search?intent=checkin
        &ll=${position.latitude},${position.longitude}
        &radius=${params.radius}
        &client_id=${params.clientId}
        &client_secret=${params.clientSecret}
        &limit=15
        &v=${params.version}`;
    return fetch(endpoint)
        .then((res) => {
            return res.json().then((resp) => {
                return resp.response.venues;
            });
        })
        .catch((err) => {
            console.error("Error with places API", err);
        });
}

window.onload = () => {
    const scene = document.querySelector("a-scene");

    // first get current user location
    return navigator.geolocation.getCurrentPosition(
        function(position) {
            // than use it to load from remote APIs some places nearby
            loadPlaces(position.coords).then((places) => {
                places.forEach((place) => {
                    const latitude = place.location.lat;
                    const longitude = place.location.lng;

                    // add place name
                    const entity = document.createElement("a-entity");
                    entity.setAttribute(
                        "gps-entity-place",
                        `latitude: ${latitude}; longitude: ${longitude};`
                    );
                    entity.setAttribute("scale", "13 13 13");
                    entity.setAttribute("rotation", "0 180 0");
                    entity.setAttribute("gltf-model", place.model);
                    entity.setAttribute("animation-mixer", "");

                    entity.addEventListener("loaded", () => {
                        window.dispatchEvent(
                            new CustomEvent("gps-entity-place-loaded")
                        );
                    });

                    scene.appendChild(entity);
                });
            });
        },
        (err) => console.error("Error in retrieving position", err), {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: 27000,
        }
    );
};
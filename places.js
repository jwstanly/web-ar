const loadPlaces = function(coords) {
    const PLACES = [{
            name: "AC Vent - Testing Site",
            location: {
                lat: 30.326806,
                lng: -81.668448,
            },
            model: "./gltfModels/tbc2.glb",
        },
        {
            name: "TIAA Bank",
            location: {
                lat: 30.327423,
                lng: -81.662075,
            },
            model: "./gltfModels/tbc.glb",
        },
        {
            name: "Bank of America",
            location: {
                lat: 30.326721,
                lng: -81.659542,
            },
            model: "./gltfModels/boat.glb",
        },
        {
            name: "Wells Fargo",
            location: {
                lat: 30.326384,
                lng: -81.65934,
            },
            model: "./gltfModels/wfc.glb",
        },
    ];

    return Promise.resolve(PLACES);
};

window.onload = () => {
    const scene = document.querySelector("a-scene");

    // first get current user location
    return navigator.geolocation.getCurrentPosition(
        function(position) {
            // than use it to load places from function above
            loadPlaces(position.coords).then((places) => {
                places.forEach((place) => {
                    const latitude = place.location.lat;
                    const longitude = place.location.lng;

                    // create AFrame entity
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
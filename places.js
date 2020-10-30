const loadPlaces = function(coords) {
    const PLACES = [{
            name: "Lofts Sign - Testing Site",
            location: {
                lat: 30.32752,
                lng: -81.66917,
            },
            scale: "3",
            rotation: "0 180 0",
            yPposition: "0",
            model: "./gltfModels/wfc.glb",
        },
        {
            name: "Parking Lot - Testing Site",
            location: {
                lat: 30.326464,
                lng: -81.667776,
            },
            scale: "13",
            rotation: "0 180 0",
            yPposition: "0",
            model: "./gltfModels/tbc2.glb",
        },
        {
            name: "TIAA Bank",
            location: {
                lat: 30.327423,
                lng: -81.662075,
            },
            scale: "13",
            rotation: "0 180 0",
            yPposition: "0",
            model: "./gltfModels/tbc.glb",
        },
        {
            name: "Bank of America",
            location: {
                lat: 30.326721,
                lng: -81.659542,
            },
            scale: "13",
            rotation: "0 180 0",
            yPposition: "0",
            model: "./gltfModels/boat.glb",
        },
        {
            name: "Wells Fargo",
            location: {
                lat: 30.326384,
                lng: -81.65934,
            },
            scale: "13",
            rotation: "0 180 0",
            yPposition: "0",
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
                    // argument hadeling
                    const latitude = place.location.lat;
                    const longitude = place.location.lng;
                    // if just one scale number, apply evenly to all 3 planes
                    const scale =
                        place.scale.split(" ").length == 1 ?
                        place.scale +
                        " " +
                        place.scale +
                        " " +
                        place.scale :
                        place.scale;
                    // create default rotation value of "0 0 0"
                    const rotation =
                        "rotation" in place ? place.rotation : "0 0 0";
                    // add 0 for x and z (x and z are artifacts of unused AFrame interface)
                    const position = "0 " + place.yPposition + " 0";
                    const model = place.model;

                    // create AFrame entity
                    const entity = document.createElement("a-entity");
                    entity.setAttribute(
                        "gps-entity-place",
                        `latitude: ${latitude}; longitude: ${longitude};`
                    );
                    entity.setAttribute("scale", scale);
                    entity.setAttribute("rotation", rotation);
                    entity.setAttribute("position", position);
                    entity.setAttribute("gltf-model", model);
                    entity.setAttribute("animation-mixer", "");
                    //attribute to make objects always face camera
                    entity.setAttribute("look-at", "[gps-camera]");

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
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>GeoAR.js demo</title>
    <!-- Script Swap (local vs cdn)
		<script src="./dist/aframe.min.js"></script>
    	<script src="./dist/aframe-ar.min.js"></script>
    	<script src="./dist/aframe-extras.loaders.min.js"></script>
	-->
    <script src="https://aframe.io/releases/0.9.2/aframe.min.js"></script>
    <script src="https://raw.githack.com/jeromeetienne/AR.js/master/aframe/build/aframe-ar.min.js"></script>
    <script src="https://raw.githack.com/donmccurdy/aframe-extras/master/dist/aframe-extras.loaders.min.js"></script>
    <script>
        THREEx.ArToolkitContext.baseURL =
            "https://raw.githack.com/jeromeetienne/ar.js/master/three.js/";
    </script>
    <!-- https://rawcdn.githack.com/AR-js-org/AR.js/91e73f483b0dd3a7c3a62d773722f7850b37ee1e/data/data/camera_para.dat -->
</head>

<body style="margin: 0; overflow: hidden">
    <a-scene vr-mode-ui="enabled: false" embedded arjs="sourceType: webcam; sourceWidth:1280; sourceHeight:960; displayWidth: 1280; displayHeight: 960; debugUIEnabled: false;">
        <a-entity id="object" a-entity gltf-model="./magnemite/scene.gltf" rotation="0 180 0" scale="0.15 0.15 0.15" gps-entity-place="latitude: 30.327177; longitude: -81.669151" animation-mixer />
        <a-camera gps-camera rotation-reader maxDistance="500"></a-camera>
    </a-scene>
    <script>
        const distanceMsg = document
            .querySelector("#object")
            .getAttribute("distanceMsg");
        console.log("Distance to point: " + distanceMsg);
    </script>
</body>

</html>

<!--
	Prime Osborn: "longitude: 30.327786; latitude: -81.670887;"
	Your Cubicle: "longitude: 30.327177; latitude: -81.669151;"
-->

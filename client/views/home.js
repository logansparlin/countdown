Template.home.rendered = function() {

		var targetRotation = 0,
			targetRotationY = 0;
		var targetRotationOnMouseDown = 0;
		var particleSystem,
			particle,
			particleMaterial;

		var windowHalfX = window.innerWidth / 2;
		var windowHalfY = window.innerHeight / 2;
		var cube;
		var camera, scene, renderer;
		init()
		animate()
		function init() {
			scene = new THREE.Scene();
			camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

			renderer = new THREE.WebGLRenderer();
			renderer.setSize( window.innerWidth, window.innerHeight );
			renderer.setClearColor( 0x222222, 1);
			document.body.appendChild( renderer.domElement );

			 var material = new THREE.MeshLambertMaterial({
		        map: THREE.ImageUtils.loadTexture('/img/grain.jpg')
		     });

			var geometry = new THREE.BoxGeometry( 1, 1, 1 );
			// var material = new THREE.MeshPhongMaterial( { color: 0x006699 } );
			cube = new THREE.Mesh( geometry, material );
			scene.add( cube );

			var bgCube = new THREE.BoxGeometry(200, 1, 200);
			var bgMesh = new THREE.MeshPhongMaterial( {color: 0x666666 });
			var bg = new THREE.Mesh( bgCube, bgMesh)
			bg.rotation.x = Math.PI/180 * 90;
		    bg.position.set(0,0, -50);
			scene.add(bg)

			// LIGHTS

			var directionalLight = new THREE.DirectionalLight( 0x999999, 0.2 );
			directionalLight.position.set( 0, 1, 0 );
			scene.add( directionalLight );

			var light = new THREE.AmbientLight( 0x222222 )
			light.shadowBias = 0.01;
			scene.add(light)

			var spotLight = new THREE.SpotLight( 0xffffff );
			spotLight.position.set( 120, 120, 200 );

			spotLight.castShadow = true;

			spotLight.shadowMapWidth = 1024;
			spotLight.shadowMapHeight = 1024;

			spotLight.shadowCameraNear = 500;
			spotLight.shadowCameraFar = 4000;
			spotLight.shadowCameraFov = 130;
			spotLight.exponent = 5;
			spotLight.intensity = 1;

			scene.add( spotLight );

			// End Lights

			// // Particles 

			particles = new THREE.Geometry;

			for (var p = 0; p < 50000; p++) {
				var particle = new THREE.Vector3(Math.random() * 500 - 350, Math.random() * 500 - 350, Math.random() * 500 - 450 );
				particles.vertices.push(particle)
			}

			particleMaterial = new THREE.PointCloudMaterial({ color: 0x444444, size: 1});

			particleSystem = new THREE.PointCloud(particles, particleMaterial);

			scene.add(particleSystem);

			// // End Particles

			camera.position.z = 3;

			document.addEventListener( 'mousedown', onDocumentMouseDown, false );
			document.addEventListener( 'touchstart', onDocumentTouchStart, false );
			document.addEventListener( 'touchmove', onDocumentTouchMove, false );


			window.addEventListener( 'resize', onWindowResize, false );
		}

	function onWindowResize() {

		windowHalfX = window.innerWidth / 2;
		windowHalfY = window.innerHeight / 2;

		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();

		renderer.setSize( window.innerWidth, window.innerHeight );

	}

	//

	function onDocumentMouseDown( event ) {
		event.preventDefault();

		document.addEventListener( 'mousemove', onDocumentMouseMove, false );
		document.addEventListener( 'mouseup', onDocumentMouseUp, false );
		document.addEventListener( 'mouseout', onDocumentMouseOut, false );

		mouseXOnMouseDown = event.clientX - windowHalfX;
		mouseYOnMouseDown = event.clientY - windowHalfY;
		targetRotationOnMouseDown = targetRotation;

	}

	function onDocumentMouseMove( event ) {
		mouseX = event.clientX - windowHalfX;
		mouseY = event.clientY - windowHalfY;

		targetRotation = targetRotationOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.02;
		targetRotationY = targetRotationOnMouseDown + (mouseY - mouseYOnMouseDown) * 0.02
	}

	function onDocumentMouseUp( event ) {

		document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
		document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
		document.removeEventListener( 'mouseout', onDocumentMouseOut, false );

	}

	function onDocumentMouseOut( event ) {

		document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
		document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
		document.removeEventListener( 'mouseout', onDocumentMouseOut, false );

	}

	function onDocumentTouchStart( event ) {

		if ( event.touches.length == 1 ) {

			event.preventDefault();

			mouseXOnMouseDown = event.touches[ 0 ].pageX - windowHalfX;
			mouseYOnMouseDown = event.touches[ 0 ].pageY - windowHalfY;
			targetRotationOnMouseDown = targetRotation;

		}

	}

	function onDocumentTouchMove( event ) {

		if ( event.touches.length == 1 ) {

			event.preventDefault();

			mouseX = event.touches[ 0 ].pageX - windowHalfX;
			mouseY = event.touches[0].pageY - windowHalfY;
			targetRotation = targetRotationOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.05;
			targetRotationY = targetRotationOnMouseDown + (mouseY - mouseYOnMouseDown ) * 0.05;
		}

	}

	function animate() {
		requestAnimationFrame(animate)

		render()
	}

	function render() {
		particleSystem.rotation.y += 0.003;
		particleSystem.rotation.x += 0.004
		cube.rotation.y += ( targetRotation - cube.rotation.y ) * 0.01;
		cube.rotation.x += ( targetRotationY - cube.rotation.x ) * 0.01;
		renderer.render( scene, camera );
		
	};

}
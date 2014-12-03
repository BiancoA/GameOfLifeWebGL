'use strict';
var visualGlob ={
	//N of boards, size of the cube, string with the ID of the container
	preInit: function(N_in,step) {
		
		this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 10, 5000);

		this.camera.position.x = 200;
		this.camera.position.y = 500;
		// Grid
		var size = N_in * Math.floor(step/2);
		//var  step = 50;

		this.linegeometry = new THREE.Geometry();

		for (var i = -size; i <= size; i += step) {
			this.linegeometry.vertices.push(new THREE.Vector3(-size, 0, i));
			this.linegeometry.vertices.push(new THREE.Vector3(size, 0, i));

			this.linegeometry.vertices.push(new THREE.Vector3(i, 0, -size));
			this.linegeometry.vertices.push(new THREE.Vector3(i, 0, size));
		}

		this.linematerial = new THREE.LineBasicMaterial({ 
			color: 0x000000, 
			opacity: 0.2 
		});
		// Cubes
		this.cubegeometry = new THREE.BoxGeometry(step, step, step);
		this.cubegeometry.needsUpdate = true;
		
		
		var oldmaterial = new THREE.MeshLambertMaterial({
			color: 0xffffff,
			shading: THREE.FlatShading,
			overdraw: true
		});
		oldmaterial.side=THREE.DoubleSide;
		
		var meshMaterial= this.createMaterial("vertexShader", "fragmentShader");
		this.cubematerial = new THREE.MeshFaceMaterial( [oldmaterial,oldmaterial,meshMaterial,
			oldmaterial,oldmaterial,oldmaterial]);
		
	
	

  
		// Lights

		this.ambientLight = new THREE.AmbientLight(Math.random() * 0x10);
		this.directionalLight = new THREE.DirectionalLight(Math.random() * 0xffffff);
		this.directionalLight.position.x = Math.random() - 0.5;
		this.directionalLight.position.y = Math.random() - 0.5;
		this.directionalLight.position.z = Math.random() - 0.5;
		this.directionalLight.position.normalize();
		this.renderer = new THREE.WebGLRenderer();
		this.renderer.setClearColor(0xeeeeee, 1);
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		
		
		
		
	},
	
	buildScene: function(board,step) {
		this.scene = new THREE.Scene();
		var sceneline = new THREE.Line(this.linegeometry, this.linematerial,THREE.LinePieces);
		this.scene.add(sceneline);
		var halfStep=Math.floor(step/2);
		for (var i = 0; i < board.N; i++) {
			for (var j = 0; j < board.N; j++) {
				if (board.grid[i][j] === true) {
					var cube = new THREE.Mesh(this.cubegeometry, this.cubematerial);
					cube.scale.y = 1;

					cube.position.x = i * step - board.N *halfStep + halfStep
					cube.position.y = halfStep;
					cube.position.z = j * step - board.N *halfStep + halfStep;

					this.scene.add(cube);
				}
			}
		}
		this.scene.add(this.ambientLight);
		this.scene.add(this.directionalLight);
	},
	


	render: function(timeFrame,board) {
		
		if (Date.now() - this.lastStep > timeFrame) {
		//console.log(this.lastStep);
			board.step();
			this.lastStep = Date.now();
	
			this.buildScene(board,50);
		
		}
		var timer = Date.now() * 0.00005;
		var time = performance.now();
		timer += this.mouseX * 0.001;

		this.camera.position.x = Math.cos(timer) * 2000;
		this.camera.position.z = Math.sin(timer) * 2000;
		this.camera.position.y += (-this.mouseY - this.camera.position.y) * 1 + 1000;
		this.camera.lookAt(this.scene.position);

		this.directionalLight.position.x = this.camera.position.x;
		this.directionalLight.position.y = this.camera.position.y;
		this.directionalLight.position.z = this.camera.position.z;
		this.directionalLight.position.normalize();

		this.renderer.render(this.scene, this.camera);
	},
	
	createMaterial : function createMaterial(vertexShader, fragmentShader) {
	            var vertShader = document.getElementById(vertexShader).innerHTML;
	            var fragShader = document.getElementById(fragmentShader).innerHTML;

	            var attributes = {
	            	
	            };
	            var uniforms = {
	                time: {type: 'f', value: 0.2},
	                scale: {type: 'f', value: 0.2},
	                alpha: {type: 'f', value: 0.6},
	                resolution: { type: "v2", value: new THREE.Vector2() }
	            };

	            uniforms.resolution.value.x = window.innerWidth;
	            uniforms.resolution.value.y = window.innerHeight;

	            var meshMaterial = new THREE.ShaderMaterial({
	                uniforms: uniforms,
	               // attributes: attributes,
	                vertexShader: vertShader,
	                fragmentShader: fragShader,
	                transparent: false

	            });
				

	            return meshMaterial;
	        }
	

}

var visualGlob_property = {
	container :{
		value: {},
		writable: true
	},
	camera:{
		value: {},
		writable: true
	},
	scene :{
		value: {},
		writable: true
	},
	renderer :{
		value: {},
		writable: true
	},
	directionalLight :{
		value: {},
		writable: true
	},
	cubegeometry :{
		value: {},
		writable: true
	},
	cubematerial :{
		value: {},
		writable: true
	},
	linegeometry :{
		value: {},
		writable: true
	},
	linematerial :{
		value: {},
		writable: true
	},
	ambientLight :{
		value: {},
		writable: true
	},
	lastStep :{
		value: 0,
		writable: true
	},
	mouseX:{
		value: 0,
		writable: true
	},
	mouseY:{
		value: 0,
		writable: true
	},
	windowHalfX:{
		value: window.innerWidth / 2,
		writable: true
	},
	windowHalfY:{
		value: window.innerHeight / 2,
		writable: true
	},
}
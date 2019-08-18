var container, stats, gui;
var camera, scene, renderer;
var mesh, geometry;
var mesh2, geopts;

var geometries = [
	new THREE.BoxBufferGeometry( 200, 200, 200, 2, 2, 2 ),
	new THREE.CircleBufferGeometry( 200, 32 ),
	new THREE.CylinderBufferGeometry( 75, 75, 200, 8, 8 ),
	new THREE.IcosahedronBufferGeometry( 100, 1 ),
	new THREE.OctahedronBufferGeometry( 200, 0 ),
	new THREE.PlaneBufferGeometry( 200, 200, 4, 4 ),
	new THREE.RingBufferGeometry( 32, 64, 16 ),
	new THREE.SphereBufferGeometry( 100, 12, 12 ),
	new THREE.TorusBufferGeometry( 64, 16, 12, 12 ),
	new THREE.TorusKnotBufferGeometry( 64, 16 )
];
var options = {
	Geometry: 0
};

var material = new THREE.MeshBasicMaterial( { color: 0x424242, wireframe: true, opacity: 0.5 } );
init();
animate();

function addMesh() {
	if ( mesh !== undefined ) {
		scene.remove( mesh );
		geometry.dispose();
	}
	geometry = geometries[ options.Geometry ];
	// scale geometry to a uniform size
	geometry.computeBoundingSphere();
	var scaleFactor = 160 / geometry.boundingSphere.radius;
	geometry.scale( scaleFactor, scaleFactor, scaleFactor );
	mesh = new THREE.Mesh( geometry, material );
	scene.add( mesh );
	var vertexNormalsHelper = new THREE.VertexNormalsHelper( mesh, 10 );
	mesh.add( vertexNormalsHelper );
}

function addRandomNode() {
	if ( mesh2 !== undefined ) {
		scene.remove( mesh2 );
		geopts.dispose();
	}

	geopts = new THREE.Geometry();
	const SIZE = 1000;
	const LENGTH = 10000;

	for (let i = 0; i < LENGTH; i++) {
		geopts.vertices.push(new THREE.Vector3(
			SIZE * (Math.random() - 0.5),
			SIZE * (Math.random() - 0.5),
			SIZE * (Math.random() - 0.5),
		));
	}
	
	const material2 = new THREE.PointsMaterial({
		size: 10,
		color: 0x333333,
	});

	mesh2 = new THREE.Points(geopts, material2);
	scene.add(mesh2);
}


function init() {

	container = document.getElementById( 'container' );
	camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 1, 1000 );
	camera.position.z = 500;
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xFFFFFF);
	addRandomNode();

	var helper = new THREE.GridHelper( 2000, 100 );
	// helper.position.y = 0;
	helper.material.opacity = 0.25;
	helper.material.transparent = true;
	scene.add( helper );

	var axes = new THREE.AxesHelper( 1000 );
	axes.position.set(0,0,0 );
	scene.add( axes );

	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	container.appendChild( renderer.domElement );
	//
	// stats = new Stats();
	// container.appendChild( stats.dom );
	//
	var geometries = {
		BoxBufferGeometry: 0,
		CircleBufferGeometry: 1,
		CylinderBufferGeometry: 2,
		IcosahedronBufferGeometry: 3,
		OctahedronBufferGeometry: 4,
		PlaneBufferGeometry: 5,
		RingBufferGeometry: 6,
		SphereBufferGeometry: 7,
		TorusBufferGeometry: 8,
		TorusKnotBufferGeometry: 9
	};
	gui = new dat.GUI( { width: 350 } );
	gui.add( options, 'Geometry', geometries ).onChange( function () {
		addMesh();
	
	} );

	var controls = new THREE.OrbitControls( camera, renderer.domElement );
	window.addEventListener( 'resize', onWindowResize, false );
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}
//
function animate() {
	requestAnimationFrame( animate );
	render();
	// stats.update();
}
function render() {
	renderer.render( scene, camera );
}

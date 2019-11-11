

var nodes = [];
var elements = [];

class NGNode {
    constructor(_id, _x, _y, _z) {
        this.id = _id;
        this.x = _x;
        this.y = _y;
        this.z = _z;
    }

}

class NGElement {
    constructor(_id, _n1, _n2, _matid, _secid) {
        this.id = _id;
        this.n1 = _n1;
        this.n2 = _n2;
        this.matid = _matid;
        this.secid = _secid;
    }
}

class NGMaterial {
    constructor(_id, _name, _E) {
        this.id = _id;
        this.name = _name;
        this.E = _E;
    }
}

class NGSection {
    constructor(_id, _area, _inertia) {
        this.id = _id;
        this.area = _area;
        this.inertia = _inertia;
    }
}

class NGLoad {
    constructor(_id, _nid, _x, _y) {
        this.id = _id;
        this.nid = _nid;
        this.x = _x;
        this.y = _y;
    }
}

function addData(txt)
{
    // Input Tab
    document.Input.rData.value = txt;

    // Read Input

    // Read Node
    var tempArray = txt.split("\n");
    for (var i=0; i<tempArray.length; i++){
        if (tempArray[i].startsWith('NODE')){
            var tempLine = tempArray[i].split(',');
            nodes.push(new NGNode(tempLine[1],tempLine[2],tempLine[3], 0))
        }
    }
    
    // Read Element
    var tempArray = txt.split("\n");
    for (var i=0; i<tempArray.length; i++){
        if (tempArray[i].startsWith('ELEM')){
            var tempLine = tempArray[i].split(',');
            elements.push(new NGElement(tempLine[1],tempLine[2],tempLine[3], tempLine[4], tempLine[5]))
        }
    }   

    // export to tables
    // export Node
    var tabledata_node = [];
    for (var i=0; i<nodes.length; i++){
        var tmp = {};
        tmp["id"] = nodes[i].id;
        tmp["x"] = nodes[i].x;
        tmp["y"] = nodes[i].y;
        tmp["z"] = nodes[i].z;
        tabledata_node.push(tmp);
    }

    // export Element
    var tabledata_element = [];
    for (var i=0; i<elements.length; i++){
        var tmp = {};
        tmp["id"] = elements[i].id;
        tmp["n1"] = elements[i].n1;
        tmp["n2"] = elements[i].n2;
        tmp["matid"] = elements[i].matid;
        tmp["secid"] = elements[i].secid;
        tabledata_element.push(tmp);
    }

    var table0 = new Tabulator("#table_node", {
        layout:"fitColumns",
        height:"100%",
        reactiveData: true, //turn on data reactivity
        data: tabledata_node, //load data into table
        columns:[
            {title:"Node id", field:"id", sorter:"number", width:200},
            {title:"X", field:"x", sorter:"number", formatter:"money", formatterParams:{precision:6}},
            {title:"Y", field:"y", sorter:"number", formatter:"money", formatterParams:{precision:6}},
            {title:"Z", field:"z", sorter: "number", formatter:"money", formatterParams:{precision:6}},
        ],
    });

    var table1 = new Tabulator("#table_element", {
        layout:"fitColumns",
        height:"100%",
        reactiveData: true, //turn on data reactivity
        data: tabledata_element, //load data into table
        columns:[
            {title:"Element id", field:"id", sorter:"number", width:200},
            {title:"N1", field:"n1", sorter:"number"},
            {title:"N2", field:"n2", sorter:"number"},
            {title:"Material id", field:"matid", sorter:"number"},
            {title:"Section id", field:"secid", sorter:"number"},
        ],
    });

    init();
    animate();

}

// three.js part

var container;
var camera, scene, renderer;
var mesh, geopts;

// var material = new THREE.MeshBasicMaterial( { color: 0x424242, wireframe: true, opacity: 0.5 } );

function addNode() {
	if ( mesh !== undefined ) {
		scene.remove( mesh );
		geopts.dispose();
	}

    // nodes

	var pts = new THREE.Geometry();
	for (var i = 0; i < nodes.length; i++) {
		pts.vertices.push(new THREE.Vector3(
			nodes[i].x,
			nodes[i].y,
			nodes[i].z,
		));
	}
	
	const mat_pt = new THREE.PointsMaterial({
		size: 0.2,
		color: 0x333333,
	});

	mesh = new THREE.Points(pts, mat_pt);
    scene.add(mesh);

    // elements
    var mat_lns = new THREE.LineBasicMaterial({
        color: 0x333333
    });
    for (var i=0; i<elements.length;i++){
        var tmpPts = new THREE.Geometry();
        
        const n1 = nodes.findIndex((n) => n.id === elements[i].n1);
        const n2 = nodes.findIndex((n) => n.id === elements[i].n2);

        tmpPts.vertices.push(
            new THREE.Vector3(nodes[n1].x, nodes[n1].y, nodes[n1].z)
        );
        tmpPts.vertices.push(
            new THREE.Vector3(nodes[n2].x, nodes[n2].y, nodes[n2].z)
        );
        var ln = new THREE.Line(tmpPts, mat_lns);
        scene.add(ln);
    }
}


function init() {

	container = document.getElementById( 'container' );
	camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 1, 1000 );
	camera.position.z = 20;
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xFFFFFF);
	addNode();

	var helper = new THREE.GridHelper( 100, 100 );
	helper.material.opacity = 0.25;
	helper.material.transparent = true;
	scene.add( helper );

	var axes = new THREE.AxesHelper( 50 );
	axes.position.set(0,0,0 );
	scene.add( axes );

	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	container.appendChild( renderer.domElement );

	var controls = new THREE.OrbitControls( camera, renderer.domElement );
	window.addEventListener( 'resize', onWindowResize, false );
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}

function animate() {
	requestAnimationFrame( animate );
	render();
}

function render() {
	renderer.render( scene, camera );
}

// exports.setmenu = function(){

// }
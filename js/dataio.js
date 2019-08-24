var nodes = [];

class NGNode {
    constructor(_id, _x, _y, _z) {
        this.id = _id;
        this.x = _x;
        this.y = _y;
        this.z = _z;
    }
}

function addData(txt)
{
    document.Node.rData.value = txt;

    var tempArray = new Array();
    tempArray = txt.split("\n");
    // window.alert(tempArray.length);
    for (var i=0; i<tempArray.length; i++){
        if (tempArray[i].startsWith('NODE')){
            var tempLine = tempArray[i].split(',');
            nodes.push(new NGNode(tempLine[1],tempLine[2],tempLine[3], 0))
            // window.alert(nodes[nodes.length-1].x);
        }
    }

    var tabledata = [
        {id:4, x:1.0, y:13.50, z:0.000 },
        {id:5, x:2.0, y:13.50, z:0.000 },
        {id:6, x:3.0, y:13.50, z:0.000 },
    ];

    document.SampleForm.txtArea.value = txt;
    var table = new Tabulator("#sample-table", {
        layout:"fitColumns",
        height:"100%",
        reactiveData: true, //turn on data reactivity
        data: tabledata, //load data into table
        columns:[
            {title:"node id", field:"id", sorter:"number", width:200},
            {title:"X", field:"x", sorter:"number", formatter:"money", formatterParams:{precision:6}},
            {title:"Y", field:"y", sorter:"number", formatter:"money", formatterParams:{precision:6}},
            {title:"Z", field:"z", sorter: "number", formatter:"money", formatterParams:{precision:6}},
        ],
    });

}

// don't read
window.alert(nodes[nodes.length-1].x);
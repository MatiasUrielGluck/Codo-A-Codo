const pianos = [];

var data = [
    {
        "id": "Yamaha1",
        "marca": "Yamaha, Modelo GB1K",
        "imagen": "piano1.png",
        "precio": 2725000,
    }, 
    {
        "id": "Yamaha2",
        "marca": "Yamaha, Modelo JX113T",
        "imagen": "piano2.png",
        "precio": 620000,
    }, 
    {
        "id": "Steinway1",
        "marca": "Steinway &#38; Sons, Modelo M",
        "imagen": "piano3.png",
        "precio": 5600000,
    }, 
    {
        "id": "Yamaha3",
        "marca": "Yamaha, Modelo U3",
        "imagen": "piano4.png",
        "precio": 992000,
    }, 
    {
        "id": "Waldemar1",
        "marca": "Waldemar, Berlin",
        "imagen": "waldemar.jpeg",
        "precio": 550000,
    }, 
    {
        "id": "Yamaha4",
        "marca": "Yamaha, Modelo JU109",
        "imagen": "yamaha1.jpeg",
        "precio": 1100000,
    }, 
]

for (var piano of data) {
    pianos.push(piano.id);
}
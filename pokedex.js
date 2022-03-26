let buscarBtn = document.getElementById('buscarBtn');
const url='https://pokeapi.co/api/v2/pokemon/';
buscarBtn.addEventListener('click',()=>{
    let inputName = document.getElementById('pokemon').value.toLowerCase();
    callPokeApi(inputName);
});

function callPokeApi(inputName){
    fetch(url+inputName)
        .then(
            response => response.json()
        )
        .then(
            data => {console.log(data);
            setValues(data);
            })
}

function setValues(data){
    let pokeName = document.getElementById('pokeName');
    let pokeImage = document.getElementById('pokeImage');
    let imageContainer = document.getElementById('imgContainer');
    let pokeType = document.getElementById('pokeTypes');
    let poketypesContainer = document.getElementById('types');
    let pokeStatsContainer = document.getElementById('stats');
    var moveSet = document.getElementById("moveSet");
    moveSet.textContent = '';
    poketypesContainer.textContent = '';
    pokeStatsContainer.textContent = '';
    /*name*/
    pokeName.innerHTML=uperFirst(data['name']);
    /*image*/
    pokeImage.style.display='block';
    pokeImage.src=data['sprites']['front_default'];
    /*types*/
    data['types'].forEach(element => {
        var typename= uperFirst(element['type']['name']);
        var newtype = document.createElement("div");
        var newtypeIcon = document.createElement("img");
        newtypeIcon.src="./"+typename+".png";
        /*newtypeIcon.width='200px';
        newtypeIcon.height='200px';*/
        newtypeIcon.style.width='5vw'
        newtype.appendChild(newtypeIcon);
        newtype.appendChild(document.createTextNode(typename));
        poketypesContainer.appendChild(newtype);
    });
    /*stats*/
    let count=0;
    data['stats'].forEach(element => {
        var statname= refactorstat(element['stat']['name']);
        var newtype = document.createElement("div");
        var stat = document.createElement("div");
        var stattType = document.createElement("div");
        if(count!=5){
            newtype.style.paddingRight='0.5vw';
            newtype.style.borderRight='1px solid white';
        }
        stat.appendChild(document.createTextNode(element['base_stat']));
        stattType.appendChild(document.createTextNode(statname));
        newtype.appendChild(stat);
        newtype.appendChild(stattType);
        pokeStatsContainer.appendChild(newtype);
        count++;
    });
    /*moves*/
    for (let index = 0; index < 10; index++) {
        var moveItem = document.createElement('li');
        moveItem.classList.add("list-group-item");
        moveItem.classList.add("list-group-item-warning");
        moveItem.style.fontWeight='bold';
        moveItem.appendChild(document.createTextNode(uperFirst(data['moves'][index]['move']['name'])));
        moveSet.appendChild(moveItem)
    }
}

function uperFirst(valueString){
     return valueString.charAt(0).toUpperCase()+valueString.slice(1);
}
function refactorstat(valueString){
    switch(valueString){
        case 'hp':
            return 'HP';
        case 'attack':
            return 'ATK';
        case 'defense':
            return 'DEF';
        case 'special-attack':
            return 'S.ATK';
        case 'special-defense':
            return 'S.DEF';
        case 'speed':
            return 'SPD';
    }
}
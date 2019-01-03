class Narod {
    constructor( imia, kartinka, kletkaDoma ) {
        this.imia = imia;
        this.kartinka = kartinka;
        this.kletkaDoma = kletkaDoma;
        
        this.el = null;
    }
}

const NARODY = [
    new Narod( 'Болгары', 'bolgar', { x: 12, y: 5 } ),
    new Narod( 'Литовцы', 'litovec', { x: 5, y: 4 } ),
    new Narod( 'Ливонцы', 'livonec', { x: 3, y: 4 } ),
    new Narod( 'Немцы', 'nemec', { x: 6, y: 9 } ),
    new Narod( 'Русичи', 'rusich', { x: 5, y: 0 } ),
    new Narod( 'Тевтонцы', 'tevtonec', { x: 5, y: 6 } ),
    new Narod( 'Викинги', 'viking', { x: 2,y: 6 } ),
    new Narod( 'Византийцы', 'vizantiec', { x: 13, y: 2 } ),
];

const novyjIgrokImiaEl = document.querySelector('#novyjIgrokImia');
const novyjIgrokCvetEl = document.querySelector('#novyjIgrokCvet');
const novyjIgrokNarodEl = document.querySelector('#novyjIgrokNarod');
const novyjIgrokSozdatEl = document.querySelector('#novyjIgrokSozdat');
const igrokiEl = document.querySelector('#igroki');
const igratEl = document.querySelector('#igrat');

NARODY.forEach( (narod, index) => {
    const narodEl = document.createElement( 'div' );
    narodEl.classList.add( 'narod' );
    narodEl.classList.add( 'flex' );
    
    if (index === 0) {
        narodEl.classList.add( 'narod-vybran' );
    }
    
    const kartinkaEl = document.createElement( 'div' );
    kartinkaEl.classList.add( 'narod' );
    kartinkaEl.style.backgroundImage = `url(./img/${narod.kartinka}.png)`;
    narodEl.appendChild( kartinkaEl );
    
    const imiaEl = document.createElement( 'div' );
    imiaEl.textContent = narod.imia;
    imiaEl.classList.add( 'has-text-centered' );
    narodEl.appendChild( imiaEl );
    
    novyjIgrokNarodEl.appendChild( narodEl );
    
    narod.el = narodEl;
});

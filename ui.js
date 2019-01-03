class Narod {
    constructor( imia, kartinka, kletkaDoma ) {
        this.imia = imia;
        this.kartinka = kartinka;
        this.kletkaDoma = kletkaDoma;
        
        this.el = null;
    }

    get vybran() {
        return this.el ? this.el.classList.contains( 'narod-vybran' ) : false;
    }

    set vybran( vbranLi ) {
        if (vbranLi) {
            this.el.classList.add( 'narod-vybran' );
        }
        else {
            this.el.classList.remove( 'narod-vybran' );
        }
    }
}

class Igrok {
    constructor( imia, cvet, narod ) {
        this.imia = imia;
        this.cvet = cvet;
        this.narod = narod;
    }
}

const NARODY = [
    new Narod( 'Болгары', 'bolgar', { x: 12, y: 5 } ),
    new Narod( 'Византийцы', 'vizantiec', { x: 13, y: 2 } ),
    new Narod( 'Викинги', 'viking', { x: 2, y: 6 } ),
    new Narod( 'Литовцы', 'litovec', { x: 5, y: 4 } ),
    new Narod( 'Ливонцы', 'livonec', { x: 3, y: 4 } ),
    new Narod( 'Немцы', 'nemec', { x: 6, y: 9 } ),
    new Narod( 'Русичи', 'rusich', { x: 5, y: 0 } ),
    new Narod( 'Тевтонцы', 'tevtonec', { x: 5, y: 6 } ),
];

const igroki = [];

const novyjIgrokImiaEl = document.querySelector('#novyjIgrokImia');
const novyjIgrokCvetEl = document.querySelector('#novyjIgrokCvet');
const novyjIgrokCvetKnopkaEl = document.querySelector('#novyjIgrokCvetKnopka');
const novyjIgrokNarodyEl = document.querySelector('#novyjIgrokNarod');
const novyjIgrokSozdatEl = document.querySelector('#novyjIgrokSozdat');
const igrokiEl = document.querySelector('#igroki');
const igratEl = document.querySelector('#igrat');

const picker = new Picker( novyjIgrokCvetKnopkaEl );
picker.onChange = color => {
    novyjIgrokCvetEl.style.background = color.rgbaString;
    novyjIgrokCvetEl.value = color.hex;
};

NARODY.forEach( (narod, index) => {
    const narodEl = document.createElement( 'div' );
    narodEl.classList.add( 'narod' );
    narodEl.addEventListener( 'click', vybratNarod( narod ) );
    narodEl.addEventListener( 'click', proveritKnopku_SozdatIgroka );
    
    const kartinkaEl = document.createElement( 'div' );
    kartinkaEl.classList.add( 'narod-kartinka' );
    kartinkaEl.style.backgroundImage = `url(./img/${narod.kartinka}.png)`;
    narodEl.appendChild( kartinkaEl );
    
    const imiaEl = document.createElement( 'div' );
    imiaEl.textContent = narod.imia;
    imiaEl.classList.add( 'has-text-centered' );
    narodEl.appendChild( imiaEl );
    
    novyjIgrokNarodyEl.appendChild( narodEl );
    
    narod.el = narodEl;
});

novyjIgrokImiaEl.addEventListener( 'input', proveritKnopku_SozdatIgroka );
novyjIgrokCvetEl.addEventListener( 'input', proveritKnopku_SozdatIgroka );
novyjIgrokSozdatEl.addEventListener( 'click', sozdatIgroka );

function proveritKnopku_SozdatIgroka( e ) {
    novyjIgrokSozdatEl.disabled = 
        novyjIgrokImiaEl.value.length === 0 || 
        novyjIgrokCvetEl.value.length < 3 ||
        !NARODY.find( narod => narod.vybran );
}

function vybratNarod( narod ) {
    return e => {
        NARODY.forEach( narod => narod.vybran = false );
        narod.vybran = true;
    };
}

function sozdatIgroka( e ) {
    const igrok = new Igrok(
        novyjIgrokImiaEl.value,
        novyjIgrokCvetEl.value,
        NARODY.find( narod => narod.vybran )
    );

    igroki.push( igrok );

    dobavitIgrokaVSpisok( igrok );

    novyjIgrokImiaEl.value = '';
    novyjIgrokCvetEl.value = '';
    novyjIgrokCvetEl.style.backgroundColor = '';
    NARODY.forEach( narod => narod.vybran = false );

    proveritKnopku_SozdatIgroka();

    proveritKolichestvoIgrokov();
}

function dobavitIgrokaVSpisok( igrok ) {
    const card = document.createElement( 'div' );
    card.classList.add('card');

    const cardContent = document.createElement( 'div' );
    cardContent.classList.add('card-content');
    card.appendChild( cardContent );

    const cardContentMedia = document.createElement( 'div' );
    cardContentMedia.classList.add('media');
    cardContent.appendChild( cardContentMedia );

    const cardContentMediaLeft = document.createElement( 'div' );
    cardContentMediaLeft.classList.add('media-left');
    cardContentMedia.appendChild( cardContentMediaLeft );

    const cardContentMediaFigure = document.createElement( 'figure' );
    cardContentMediaFigure.classList.add('image');
    cardContentMediaFigure.classList.add('is-64x64');
    cardContentMediaLeft.appendChild( cardContentMediaFigure );

    const cardContentMediaFigureImage = document.createElement( 'img' );
    cardContentMediaFigure.classList.add('avatar-igroka');
    cardContentMediaFigureImage.src = `./img/${igrok.narod.kartinka}.png`;
    cardContentMediaFigure.appendChild( cardContentMediaFigureImage );

    const cardContentMediaContent = document.createElement( 'div' );
    cardContentMediaContent.classList.add('media-content');
    cardContentMediaContent.classList.add('imia-igroka');
    cardContentMedia.appendChild( cardContentMediaContent );

    const cardContentMediaContentTitle = document.createElement( 'div' );
    cardContentMediaContentTitle.classList.add('title');
    cardContentMediaContentTitle.classList.add('is-5');
    cardContentMediaContentTitle.classList.add('imia-igroka');
    cardContentMediaContentTitle.textContent = igrok.imia;
    cardContentMediaContent.appendChild( cardContentMediaContentTitle );

    const cardContentMediaContentColor = document.createElement( 'div' );
    cardContentMediaContentColor.classList.add('cvet-igroka');
    cardContentMediaContentColor.style.backgroundColor = igrok.cvet;
    cardContentMediaContent.appendChild( cardContentMediaContentColor );

    igrokiEl.appendChild( card );
}

function proveritKolichestvoIgrokov() {
    igratEl.disabled = igroki.length < 2;
}

proveritKnopku_SozdatIgroka();
proveritKolichestvoIgrokov();

const callbackCollection = new Map();

const setup = document.querySelector('#setup');
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

    proveritKnopku_SozdatIgroka();
};

NARODY.forEach( narod => {
    const narodEl = document.createElement( 'div' );
    narodEl.classList.add( 'narod' );
    narodEl.addEventListener( 'click', vybratNarod( narod ) );
    
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
igratEl.addEventListener( 'click', igrat );

function proveritKnopku_SozdatIgroka( e ) {
    novyjIgrokSozdatEl.disabled = 
        novyjIgrokImiaEl.value.length === 0 || 
        novyjIgrokCvetEl.value.length < 3 ||
        !NARODY.find( narod => vybranLi( narod ) );
}

function vybratNarod( narod ) {
    const cb = e => {
        NARODY.forEach( narod => narod.el.classList.remove( 'narod-vybran' ) );
        narod.el.classList.add( 'narod-vybran' );

        proveritKnopku_SozdatIgroka();
    };

    callbackCollection.set( narod, cb );
    return cb;
}

function sozdatIgroka( e ) {
    const igrok = new Igrok(
        novyjIgrokImiaEl.value,
        novyjIgrokCvetEl.value,
        NARODY.find( narod => vybranLi( narod ) )
    );

    igroki.push( igrok );

    dobavitIgrokaVSpisokSozdanyh( igrok );

    ochistitPolia( igrok.narod );

    pometitNarodKakIspolzovanyj( igrok.narod );

    proveritKnopku_SozdatIgroka();

    proveritKolichestvoIgrokov();
}

function dobavitIgrokaVSpisokSozdanyh( igrok ) {
    const card = document.createElement( 'div' );
    card.classList.add('card');
    card.classList.add('igrok');

    const cardContent = document.createElement( 'div' );
    cardContent.classList.add('card-content');
    cardContent.classList.add('is-flex');
    cardContent.classList.add('igrok-kartochka');
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

    const cardClose = document.createElement( 'button' );
    cardClose.classList.add('delete');
    cardClose.addEventListener( 'click', udalitIgroka( card, igrok ) );
    cardContent.appendChild( cardClose );

    igrokiEl.appendChild( card );
}

function udalitIgroka( card, igrok ) {
    return e => {
        const index = igroki.indexOf( igrok );
        igroki.splice( index, 1 );

        igrokiEl.removeChild( card );

        sniatPometkuChtoNarodIspolzovan( igrok.narod );

        proveritKolichestvoIgrokov();
    };
}

function ochistitPolia( narod ) {
    novyjIgrokImiaEl.value = '';
    novyjIgrokCvetEl.value = '';
    novyjIgrokCvetEl.style.backgroundColor = '';
    narod.el.classList.remove( 'narod-vybran' );
}

function pometitNarodKakIspolzovanyj( narod ) {
    narod.el.classList.add( 'narod-ispolzovan' );
    narod.el.removeEventListener( 'click', callbackCollection.get( narod ) );
}

function sniatPometkuChtoNarodIspolzovan( narod ) {
    narod.el.classList.remove( 'narod-ispolzovan' );
    narod.el.addEventListener( 'click', vybratNarod( narod ) );
}

function proveritKolichestvoIgrokov() {
    igratEl.disabled = igroki.length < 2;
}

function vybranLi( narod ) {
    return narod.el ? 
        narod.el.classList.contains( 'narod-vybran' ) : 
        false;
}

function igrat( e ) {
    setup.classList.remove( 'is-active' );
    igra.nachat();
}

proveritKnopku_SozdatIgroka();
proveritKolichestvoIgrokov();



// Делаем игроков автоматически
// igroki.push( new Igrok( 'Олег', '#ff0000ff', NARODY[0] ) );
// igroki.push( new Igrok( 'Дима', '#0000ffff', NARODY[1] ) );
// setup.classList.remove( 'is-active' );
// igra.nachat();

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

    proveritGotovnostSozdanijaIgroka();
};

NARODY.forEach( narod => {
    const narodEl = document.createElement( 'div' );
    narodEl.classList.add( 'narod' );
    
    const kartinkaEl = document.createElement( 'div' );
    kartinkaEl.classList.add( 'narod-kartinka' );
    kartinkaEl.style.backgroundImage = `url(./img/${narod.kartinka}.png)`;
    narodEl.appendChild( kartinkaEl );
    
    const imiaEl = document.createElement( 'div' );
    imiaEl.textContent = narod.imia;
    imiaEl.classList.add( 'has-text-centered' );
    narodEl.appendChild( imiaEl );
    
    novyjIgrokNarodyEl.appendChild( narodEl );
    
    narod.bind( narodEl );
    narod.kogdaVybran = vybratNarod( narod );
});

novyjIgrokImiaEl.addEventListener( 'input', proveritGotovnostSozdanijaIgroka );
novyjIgrokCvetEl.addEventListener( 'input', proveritGotovnostSozdanijaIgroka );
novyjIgrokSozdatEl.addEventListener( 'click', sozdatIgroka );
igratEl.addEventListener( 'click', igrat );

function proveritGotovnostSozdanijaIgroka( e ) {
    novyjIgrokSozdatEl.disabled = 
        novyjIgrokImiaEl.value.length === 0 || 
        novyjIgrokCvetEl.value.length < 3 ||
        !NARODY.find( narod => narod.vybran );
}

function vybratNarod( narod ) {
    const cb = e => {
        NARODY.forEach( narod => narod.ubratVyborku() );
        narod.vybrat();

        proveritGotovnostSozdanijaIgroka();
    };

    return cb;
}

function sozdatIgroka( e ) {
    const igrok = new Igrok(
        novyjIgrokImiaEl.value,
        novyjIgrokCvetEl.value,
        NARODY.find( narod => narod.vybran )
    );

    igroki.push( igrok );

    dobavitIgrokaVSpisokSozdanyh( igrok );

    ochistitPolia( igrok.narod );

    igrok.narod.ispolzovat();

    proveritGotovnostSozdanijaIgroka();

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

        igrok.narod.ubratIspolzovanie();

        proveritKolichestvoIgrokov();
    };
}

function ochistitPolia( narod ) {
    novyjIgrokImiaEl.value = '';
    novyjIgrokCvetEl.value = '';
    novyjIgrokCvetEl.style.backgroundColor = '';
    narod.ubratVyborku();
}

function proveritKolichestvoIgrokov() {
    igratEl.disabled = igroki.length < 2;
}

function igrat( e ) {
    setup.classList.remove( 'is-active' );
    igra.nachat();
}

proveritGotovnostSozdanijaIgroka();
proveritKolichestvoIgrokov();



// Делаем игроков автоматически
igroki.push( new Igrok( 'Папа Олег', '#ff0000ff', NARODY[0] ) );
igroki.push( new Igrok( 'Дима', '#0000ffff', NARODY[1] ) );
setup.classList.remove( 'is-active' );
igra.nachat();

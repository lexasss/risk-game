const sdelatHodEl = document.querySelector('#sdelat-hod');
const statusStrokaEl = document.querySelector('.status-stroka');
const spisokIgrokovEl = document.querySelector('.spisok-igrokov');
const kartaEl = document.querySelector('.karta');

status = new Status( statusStrokaEl );

igra.kubikiAtaki = [
    new Kubik( document.querySelector('#kubik-ataki-1') ),
    new Kubik( document.querySelector('#kubik-ataki-2') ),
    new Kubik( document.querySelector('#kubik-ataki-3') ),
];

igra.kubikiZaschity = [
    new Kubik( document.querySelector('#kubik-zaschity-1') ),
    new Kubik( document.querySelector('#kubik-zaschity-2') ),
];

sdelatHodEl.addEventListener( 'click', sdelatHod );

function sozdatKartu() {
    const rootStyle = getComputedStyle( document.documentElement );
    const kletokVshirinu = +rootStyle.getPropertyValue('--razmer-karty-kletok-goriz');
    const kletokVvysotu = +rootStyle.getPropertyValue('--razmer-karty-kletok-vert');
    
    for (let i = 0; i < kletokVvysotu; i++) {
        const stroka = [];
        igra.kletki.push( stroka );
    
        for (let j = 0; j < kletokVshirinu; j++) {
            const kletka = sozdatKletku( i, j );
            stroka.push( kletka );
        }  
    }
}

function sozdatKletku( strochka, stolbik ) {
    const kletkaEl = document.createElement( 'div' );
    kletkaEl.classList.add('kletka');
    kletkaEl.addEventListener( 'click', e => igra.kliknutKletku( strochka, stolbik ) );

    kartaEl.appendChild( kletkaEl );

    return new Kletka( strochka, stolbik, kletkaEl );
}

function dobavitIgrokaVSpisok( igrok ) {
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
    //cardContentMediaLeft.classList.add('media-left');
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

    spisokIgrokovEl.appendChild( card );

    igrok.bind( card );
}

function sdelatHod( nazhatie ) {
    nazhatie.target.disabled = true;

    igra.sdelatHod();
}

function proveritKnopkuHoda() {
    const hodiaschijIgrok = igroki.find( igrok => igrok.hod );
    sdelatHodEl.disabled = !hodiaschijIgrok.kletkaOtkuda || !hodiaschijIgrok.kletkaKuda;
}

function sdelat( dejstvie ) {
    return {
        cherez( sekund ) {
            setTimeout( dejstvie, sekund * 1000 );
        }
    };
}



sozdatKartu();
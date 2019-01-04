const spisokIgrokovEl = document.querySelector('.spisok-igrokov');
const kartaEl = document.querySelector('.karta');

const rootStyle = getComputedStyle( document.documentElement );
const kletokVshirinu = +rootStyle.getPropertyValue('--razmer-karty-kletok-goriz');
const kletokVvysotu = +rootStyle.getPropertyValue('--razmer-karty-kletok-vert');

const kletki = [];

class Kletka {
    constructor( strochka, stolbik, el ) {
        this.strochka = strochka;
        this.stolbik = stolbik;
        this.el = el;

        this.igrok = null;
        this.soldaty = 0;
    }
}

for (let i = 0; i < kletokVvysotu; i++) {
    const stroka = [];
    kletki.push( stroka );

    for (let j = 0; j < kletokVshirinu; j++) {
        const kletkaEl = document.createElement( 'div' );
        kletkaEl.classList.add('kletka');
        kletkaEl.addEventListener( 'click', kletkaKliknuta( i, j ) );
        kartaEl.appendChild( kletkaEl );

        stroka.push( new Kletka( i, j, kletkaEl ) );
    }  
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

    igrok.el = card;
}

function zahvatit( mesto, igrok, chisloSoldat ) {
    const kletka = kletki[ mesto.strochka ][ mesto.stolbik ];
    kletka.igrok = igrok;
    kletka.chisloSoldat = chisloSoldat

    kletka.el.style.backgroundColor = igrok.cvet.substr( 0, 7 ) + '80';
    kletka.el.textContent = chisloSoldat ? chisloSoldat.toString() : '';
}

let kletkaHoditOtkuda = null;
let kletkaHoditKuda = null;
function kletkaKliknuta( strochka, stolbik ) {
    return e => {
        const kletka = kletki[ strochka ][ stolbik ];
        if (!kletkaHoditOtkuda && kletka.igrok && kletka.igrok.hod) {
            kletkaHoditOtkuda = kletka;
            kletka.el.classList.add('kletka-otkuda');
        }
        else if (kletkaHoditOtkuda && kletkaHoditOtkuda.igrok !== kletka.igrok) {
            const dx = kletkaHoditOtkuda.strochka - kletka.strochka;
            const dy = kletkaHoditOtkuda.stolbik - kletka.stolbik;
            console.log(dx, dy);
            if (Math.abs( dx ) < 2 && Math.abs( dy ) < 2) {
                kletkaHoditKuda = kletka;
                kletka.el.classList.add('kletka-kuda');
            }
        }
    };
}
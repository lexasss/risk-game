const sdelatHodEl = document.querySelector('#sdelat-hod');
const statusStrokaEl = document.querySelector('.status-stroka');
const spisokIgrokovEl = document.querySelector('.spisok-igrokov');
const kartaEl = document.querySelector('.karta');

const rootStyle = getComputedStyle( document.documentElement );
const kletokVshirinu = +rootStyle.getPropertyValue('--razmer-karty-kletok-goriz');
const kletokVvysotu = +rootStyle.getPropertyValue('--razmer-karty-kletok-vert');

const kubikiAtaki = [
    new Kubik( document.querySelector('#kubik-ataki-1') ),
    new Kubik( document.querySelector('#kubik-ataki-2') ),
    new Kubik( document.querySelector('#kubik-ataki-3') ),
];

const kubikiZaschity = [
    new Kubik( document.querySelector('#kubik-zaschity-1') ),
    new Kubik( document.querySelector('#kubik-zaschity-2') ),
];

const kletki = [];

sdelatHodEl.addEventListener( 'click', sdelatHod );

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

function zahvatitKletkuPoAdresu( mesto, igrok, chisloSoldat ) {
    const kletka = kletki[ mesto.strochka ][ mesto.stolbik ];
    zahvatitKletku( kletka, igrok, chisloSoldat );
}

function zahvatitKletku( kletka, igrok, chisloSoldat ) {
    kletka.igrok = igrok;
    kletka.soldaty = chisloSoldat;
}

function kletkaKliknuta( strochka, stolbik ) {
    return e => {
        if (igra.sostojanie === SOSTOJANIJA.vojna) {
            return;
        }

        const kletka = kletki[ strochka ][ stolbik ];
        const hodiaschijIgrok = igroki.find( igrok => igrok.hod );

        if (kletka.igrok === hodiaschijIgrok && hodiaschijIgrok.kolichestvoNovyhSoldat > hodiaschijIgrok.kolichestvoNovyhSoldatDobavleno) {
            dobavitSoldat( hodiaschijIgrok, kletka, 1 );
        }
        else if (kletka.igrok === hodiaschijIgrok && !hodiaschijIgrok.kletkaOtkuda && kletka.soldaty > 1) {
            ustanovitKletkuOtkuda( hodiaschijIgrok, kletka );
            sdelat( _ => ustanovitStatus('Куда нападать?') ).cherez( 1 );
        }
        else if (hodiaschijIgrok.kletkaOtkuda) {
            if (kletka.igrok !== hodiaschijIgrok) {
                const dx = hodiaschijIgrok.kletkaOtkuda.strochka - kletka.strochka;
                const dy = hodiaschijIgrok.kletkaOtkuda.stolbik - kletka.stolbik;

                if (Math.abs( dx ) < 2 && Math.abs( dy ) < 2) {
                    hodiaschijIgrok.kletkaKuda = kletka;

                    kletki.forEach( strochka => strochka.forEach( kletka => kletka.sbrositRol( Kletka.ROLI.kuda ) ) );

                    kletka.ustanovitRol( Kletka.ROLI.kuda );

                    ustanovitKubiki( hodiaschijIgrok.kletkaOtkuda, hodiaschijIgrok.kletkaKuda );

                    sdelat( _ => ustanovitStatus('Война!') ).cherez( 1 );
                }
            }
            else if (kletka.igrok === hodiaschijIgrok && kletka.soldaty > 1) {
                ustanovitKletkuOtkuda( hodiaschijIgrok, kletka );
            }
        }

        proveritKnopkuHoda();
    };
}

function ustanovitKletkuOtkuda( igrok, kletka ) {
    igrok.kletkaOtkuda = kletka;

    kletki.forEach( strochka => strochka.forEach( kletka => kletka.sbrositRol( Kletka.ROLI.otkuda ) ) );

    kletka.ustanovitRol( Kletka.ROLI.otkuda );
}


function sdelatHod( e ) {
    sdelatHodEl.disabled = true;

    igra.sostojanie = SOSTOJANIJA.vojna;

    kubikiAtaki.forEach( kubik => kubik.brosit() );
    kubikiZaschity.forEach( kubik => kubik.brosit() );

    sdelat( ocenitBroski ).cherez( 1 );
}

function ocenitBroski() {
    const znachenijaAtaki = kubikiAtaki
        .map( kubik => kubik.znachenie )
        .filter( znachenie => znachenie > 0 )
        .sort( (a, b) => a < b );
    const znachenijaZaschity = kubikiZaschity
        .map( kubik => kubik.znachenie )
        .filter( znachenie => znachenie > 0 )
        .sort( (a, b) => a < b );

    let vyjgryshAtaki = 0;
    let vyjgryshZaschity = 0;
    for (let i = 0; i < znachenijaAtaki.length && i < znachenijaZaschity.length; i++) {
        if (znachenijaAtaki[i] > znachenijaZaschity[i]) {
            vyjgryshAtaki++;
        }
        else {
            vyjgryshZaschity++;
        }
    }

    const hodiaschijIgrok = igroki.find( igrok => igrok.hod );
    if (vyjgryshZaschity !== 0) {
        ubratSoldat( hodiaschijIgrok.kletkaOtkuda, vyjgryshZaschity );
    }
    if (vyjgryshAtaki !== 0) {
        ubratSoldat( hodiaschijIgrok.kletkaKuda, vyjgryshAtaki );
    }

    if (vyjgryshZaschity === 0) {
        ustanovitStatus(`${hodiaschijIgrok.imia} победил`);
    }
    else if (vyjgryshAtaki === 0) {
        const zaschitnik = hodiaschijIgrok.kletkaKuda.igrok;
        ustanovitStatus(zaschitnik ? `${zaschitnik.imia} отбился` : `${hodiaschijIgrok.imia} проиграл`);
    }
    else {
        ustanovitStatus(`по одному`);
    }

    if (hodiaschijIgrok.kletkaOtkuda.soldaty > 1 && hodiaschijIgrok.kletkaKuda.soldaty > 0) {
        ustanovitKubiki( hodiaschijIgrok.kletkaOtkuda, hodiaschijIgrok.kletkaKuda );
        sdelatHodEl.disabled = false;
    }
    else {
        if (hodiaschijIgrok.kletkaOtkuda.soldaty > 1) {
            perejtiSoldatami( hodiaschijIgrok.kletkaOtkuda, hodiaschijIgrok.kletkaKuda, hodiaschijIgrok.kletkaOtkuda.soldaty - 1 );
        }
        zavershitHod();
    }
}

function ubratSoldat( kletka, kolichestvo ) {
    kletka.soldaty = Math.max( 0, kletka.soldaty - kolichestvo );
}

function perejtiSoldatami( otkuda, kuda, kolichestvo ) {
    otkuda.soldaty -= kolichestvo;
    otkuda.el.textContent = otkuda.soldaty.toString();

    zahvatitKletku( kuda, otkuda.igrok, kolichestvo );
}

function zavershitHod() {
    const hodiaschijIgrok = igroki.find( igrok => igrok.hod );

    hodiaschijIgrok.kletkaOtkuda.el.classList.remove('kletka-otkuda');
    hodiaschijIgrok.kletkaOtkuda = null;

    hodiaschijIgrok.kletkaKuda.el.classList.remove('kletka-kuda');
    hodiaschijIgrok.kletkaKuda = null;

    let sledujuschijIndex = igroki.findIndex( igrok => igrok.hod ) + 1;
    if (sledujuschijIndex === igroki.length) {
        sledujuschijIndex = 0;
    }

    ustanovitHodiaschegoIgroka( sledujuschijIndex );

    proveritKnopkuHoda();
}

function proveritKnopkuHoda() {
    const hodiaschijIgrok = igroki.find( igrok => igrok.hod );
    sdelatHodEl.disabled = !hodiaschijIgrok.kletkaOtkuda || !hodiaschijIgrok.kletkaKuda;
}

function ustanovitHodiaschegoIgroka( sledujuschijIndex ) {
    igroki.forEach( igrok => {
        igrok.el.classList.remove('aktivnyj-igrok-v-spiske');
        igrok.hod = false;
    });

    const sledujuchijIgrok = igroki[ sledujuschijIndex ];
    sledujuchijIgrok.el.classList.add('aktivnyj-igrok-v-spiske');
    sledujuchijIgrok.hod = true;
    sledujuchijIgrok.kolichestvoNovyhSoldat = 5;
    sledujuchijIgrok.kolichestvoNovyhSoldatDobavleno = 0;

    igra.sostojanie = SOSTOJANIJA.podgotovka;

    ustanovitStatus( `0/${sledujuchijIgrok.kolichestvoNovyhSoldat}  армий расположено` );
}

function dobavitSoldat( igrok, kletka, kolichestvo ) {
    const ostalosDobavit = igrok.kolichestvoNovyhSoldat - igrok.kolichestvoNovyhSoldatDobavleno;
    const kolichestvoSoldat = Math.min( ostalosDobavit, kolichestvo );
    igrok.kolichestvoNovyhSoldatDobavleno += kolichestvoSoldat;
    kletka.soldaty += kolichestvoSoldat;

    ustanovitStatus( `${igrok.kolichestvoNovyhSoldatDobavleno}/${igrok.kolichestvoNovyhSoldat} армий расположено` );

    if (igrok.kolichestvoNovyhSoldatDobavleno === igrok.kolichestvoNovyhSoldat) {
        sdelat( _ => ustanovitStatus('Откуда нападать?') ).cherez( 1 );
    }
}

function ustanovitStatus( stroka ) {
    statusStrokaEl.textContent = stroka;
}

function ustanovitKubiki( kletkaAtaki, kletkaZaschity ) {
    kubikiAtaki.forEach( (kubik, index) => {
        kubik.aktivnyj = kletkaAtaki.soldaty > (index + 1);
        
    });
    kubikiZaschity.forEach( (kubik, index) => {
        kubik.aktivnyj = kletkaZaschity.soldaty > index;
    });
}

function sdelat( dejstvie ) {
    return {
        cherez( sekund ) {
            setTimeout( dejstvie, sekund * 1000 );
        }
    };
}

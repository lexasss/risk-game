class Igrok {
    constructor( imia, cvet, narod ) {
        this.imia = imia;
        this.cvet = cvet;
        this.narod = narod;

        this.kolichestvoNovyhSoldat = 0;
        this.kolichestvoNovyhSoldatDobavleno = 0;

        this.kletki = new Set();

        this._el = null;
        this._hod = false;

        this._kletkaOtkuda = null;
        this._kletkaKuda = null;
    }

    bind( el ) { this._el = el; }

    get hod() { return this._hod; }
    set hod( znachenie ) {
        this._hod = znachenie;
        if (znachenie === true) {
            this._el.classList.add('aktivnyj-igrok-v-spiske');
            this.kolichestvoNovyhSoldat = 5;
            this.kolichestvoNovyhSoldatDobavleno = 0;
            }
        else {
            this._el.classList.remove('aktivnyj-igrok-v-spiske');
        }
    }

    get kletkaOtkuda() { return this._kletkaOtkuda; }
    set kletkaOtkuda( znachenie ) {
        if (znachenie !== this._kletkaOtkuda && this._kletkaOtkuda) {
            this._kletkaOtkuda.sbrositRoli();
        }
        this._kletkaOtkuda = znachenie;
    }

    get kletkaKuda() { return this._kletkaKuda; }
    set kletkaKuda( znachenie ) {
        if (znachenie !== this._kletkaKuda && this._kletkaKuda) {
            this._kletkaKuda.sbrositRoli();
        }
        this._kletkaKuda = znachenie;
    }
}

class Narod {
    constructor( imia, kartinka, kletkaDoma ) {
        this.imia = imia;
        this.kartinka = kartinka;
        this.kletkaDoma = kletkaDoma;
        
        this._el = null;
        this._kogdaVybranDelat = null;
    } 

    bind( el ) { this._el = el; }

    set kogdaVybran( cb ) {
        this._kogdaVybranDelat = cb;
        this._el.addEventListener( 'click', cb );
    }

    vybrat() {
        this._el.classList.add( 'narod-vybran' );
    }

    ubratVyborku() {
        this._el.classList.remove( 'narod-vybran' );
    }

    ispolzovat() {
        this._el.classList.add( 'narod-ispolzovan' );
        this._el.removeEventListener( 'click', this._kogdaVybranDelat );
    }

    ubratIspolzovanie() {
        this._el.classList.remove( 'narod-ispolzovan' );
        this._el.addEventListener( 'click', this._kogdaVybranDelat );
    }

    get vybran() {
        return this._el ? 
            this._el.classList.contains( 'narod-vybran' ) : 
            false;
    } 
}

class Kletka {
    constructor( strocka, stolbik, el ) {
        this.stolbik = stolbik;
        this.strochka = strocka;
        this._el = el;

        this._igrok = null;
        this._soldaty = 1;

        if (this._el) {
            this._el.textContent = this.soldaty.toString();
        }
    }

    get igrok() { return this._igrok; }
    set igrok( znachenie ) {
        this._igrok = znachenie;
        this._el.style.backgroundColor = this.igrok ? 
            this.igrok.cvet.substr( 0, 7 ) + '80' :
            'rgba(0, 0, 0, 0)';
    }

    get soldaty() { return this._soldaty; }
    set soldaty( znachenie ) {
        this._soldaty = znachenie;
        this._el.textContent = znachenie ? znachenie.toString() : '';
    }

    sbrositRoli() {
        for (let id in Kletka.ROLI) {
            this._el.classList.remove( Kletka.ROLI[ id ] );
        }
    }

    sbrositRol( rol ) {
        this._el.classList.remove( rol );
    }

    ustanovitRol( rol ) {
        this._el.classList.add( rol );
    }

    static get ROLI() {
        return {
            kuda: 'kletka-kuda',
            otkuda: 'kletka-otkuda',
        };
    }
}

class Kubik {
    constructor( el ) {
        this._el = el;
        this._aktivnyj = true;
        this._znachenie = 1;
    }

    brosit() {
        if (this.aktivnyj) {
            this._znachenie = Math.ceil(  Math.random() * 6 );
            this._el.style.backgroundPosition = `${-(this.znachenie - 1) * 28}px 0`;
        }
        else {
            this._znachenie = 0;
        }
    }

    get znachenie() { return this._znachenie; }

    get aktivnyj() { return this._aktivnyj; }
    set aktivnyj( znachenie ) {
        this._aktivnyj = znachenie;
        this._el.style.display = znachenie ? 'block' : 'none';

    }
}

class Status {
    constructor( el ) {
        this._el = el;
    }

    raspolozenoArmij( igrok ) {
        this._el.textContent = `${igrok.kolichestvoNovyhSoldatDobavleno}/${igrok.kolichestvoNovyhSoldat} армий расположено`;
    }

    kudaNapadat() {
        this._el.textContent = 'Куда нападать?';
    }

    nachatHod() {
        this._el.textContent = 'Война!';
    }

    vyborCeli() {
        this._el.textContent = 'Откуда нападать?';
    }

    pobedil( igrok, konec = false ) {
        this._el.textContent = `${igrok.imia} победил` + (konec ? '. Конец игры.' : '');
    }

    otbilsia( zaschitnik, napadajuschij ) {
        this._el.textContent = zaschitnik ? `${zaschitnik.imia} отбился` : `${napadajuschij.imia} проиграл`;
    }

    nichja() {
        this._el.textContent = `по одному`;
    }
};

let igroki = [];
let status;

const NARODY = [
    new Narod( 'Болгары', 'bolgar', new Kletka( 5, 11 ) ),
    new Narod( 'Византийцы', 'vizantiec', new Kletka( 2, 13 ) ),
    new Narod( 'Викинги', 'viking', new Kletka( 6, 2 ) ),
    new Narod( 'Литовцы', 'litovec', new Kletka( 4, 5 ) ),
    new Narod( 'Ливонцы', 'livonec', new Kletka( 4, 3 ) ),
    new Narod( 'Немцы', 'nemec', new Kletka( 9, 6 ) ),
    new Narod( 'Русичи', 'rusich', new Kletka( 1, 7 ) ),
    new Narod( 'Тевтонцы', 'tevtonec', new Kletka( 6, 5 ) ),
];

const SOSTOJANIJA = {
    vybolIgrokov: 'выбор игроков',
    podgotovka: 'подготовка',
    vojna: 'война',
    okoncheno: 'игра окончена',
};

const igra = {
    sostojanie: SOSTOJANIJA.vybolIgrokov,

    kubikiAtaki: null,
    kubikiZaschity: null,

    kletki: [],

    nachat() {
        igroki.forEach( igrok => {
            dobavitIgrokaVSpisok( igrok );
            this.zahvatitKletkuPoAdresu( igrok.narod.kletkaDoma, igrok, 1 );
        });

        this.sostojanie = SOSTOJANIJA.podgotovka;

        this.ustanovitHodiaschegoIgroka( 0 );
    },

    ustanovitHodiaschegoIgroka( sledujuschijIndex ) {
        igroki.forEach( igrok => {
            igrok.hod = false;
        });
    
        const sledujuchijIgrok = igroki[ sledujuschijIndex ];
        sledujuchijIgrok.hod = true;
    
        this.sostojanie = SOSTOJANIJA.podgotovka;
    
        status.raspolozenoArmij( sledujuchijIgrok );
    },

    zahvatitKletkuPoAdresu( mesto, igrok, chisloSoldat ) {
        const kletka = this.kletki[ mesto.strochka ][ mesto.stolbik ];
        this.zahvatitKletku( kletka, igrok, chisloSoldat );
    },
    
    zahvatitKletku( kletka, igrok, chisloSoldat ) {
        kletka.igrok = igrok;
        kletka.soldaty = chisloSoldat;

        igrok.kletki.add( kletka );
    },
    
    ubratSoldat( kletka, kolichestvo ) {
        kletka.soldaty = Math.max( 0, kletka.soldaty - kolichestvo );
    },
        
    perejtiSoldatami( otkuda, kuda, kolichestvo ) {
        otkuda.soldaty -= kolichestvo;
    
        this.zahvatitKletku( kuda, otkuda.igrok, kolichestvo );
    },

    kliknutKletku( strochka, stolbik ) {
        if (this.sostojanie !== SOSTOJANIJA.podgotovka) {
            return;
        }

        const kletka = this.kletki[ strochka ][ stolbik ];
        const hodiaschijIgrok = igroki.find( igrok => igrok.hod );

        if (kletka.igrok === hodiaschijIgrok && hodiaschijIgrok.kolichestvoNovyhSoldat > hodiaschijIgrok.kolichestvoNovyhSoldatDobavleno) {
            this.dobavitSoldat( hodiaschijIgrok, kletka, 1 );
        }
        else if (kletka.igrok === hodiaschijIgrok && !hodiaschijIgrok.kletkaOtkuda && kletka.soldaty > 1) {
            this.ustanovitKletkuOtkuda( hodiaschijIgrok, kletka );
            sdelat( _ => status.kudaNapadat() ).cherez( 1 );
        }
        else if (hodiaschijIgrok.kletkaOtkuda) {
            if (kletka.igrok !== hodiaschijIgrok) {
                const dx = hodiaschijIgrok.kletkaOtkuda.strochka - kletka.strochka;
                const dy = hodiaschijIgrok.kletkaOtkuda.stolbik - kletka.stolbik;

                if (Math.abs( dx ) < 2 && Math.abs( dy ) < 2) {
                    hodiaschijIgrok.kletkaKuda = kletka;

                    this.kletki.forEach( strochka => strochka.forEach( kletka => kletka.sbrositRol( Kletka.ROLI.kuda ) ) );

                    kletka.ustanovitRol( Kletka.ROLI.kuda );

                    this.ustanovitKubiki( hodiaschijIgrok.kletkaOtkuda, hodiaschijIgrok.kletkaKuda );

                    sdelat( _ => status.nachatHod() ).cherez( 1 );
                }
            }
            else if (kletka.igrok === hodiaschijIgrok && kletka.soldaty > 1) {
                this.ustanovitKletkuOtkuda( hodiaschijIgrok, kletka );
            }
        }

        proveritKnopkuHoda();
    },

    dobavitSoldat( igrok, kletka, kolichestvo ) {
        const ostalosDobavit = igrok.kolichestvoNovyhSoldat - igrok.kolichestvoNovyhSoldatDobavleno;
        const kolichestvoSoldat = Math.min( ostalosDobavit, kolichestvo );
        igrok.kolichestvoNovyhSoldatDobavleno += kolichestvoSoldat;
        kletka.soldaty += kolichestvoSoldat;
    
        status.raspolozenoArmij( igrok );
    
        if (igrok.kolichestvoNovyhSoldatDobavleno === igrok.kolichestvoNovyhSoldat) {
            sdelat( _ => status.vyborCeli() ).cherez( 1 );
        }
    },

    ustanovitKletkuOtkuda( igrok, kletka ) {
        igrok.kletkaOtkuda = kletka;
    
        this.kletki.forEach( strochka => strochka.forEach( kletka => kletka.sbrositRol( Kletka.ROLI.otkuda ) ) );
    
        kletka.ustanovitRol( Kletka.ROLI.otkuda );
    },

    ustanovitKubiki( kletkaAtaki, kletkaZaschity ) {
        this.kubikiAtaki.forEach( (kubik, index) => {
            kubik.aktivnyj = kletkaAtaki.soldaty > (index + 1);
            
        });
        this.kubikiZaschity.forEach( (kubik, index) => {
            kubik.aktivnyj = kletkaZaschity.soldaty > index;
        });
    },

    sdelatHod() {
        this.sostojanie = SOSTOJANIJA.vojna;

        this.kubikiAtaki.forEach( kubik => kubik.brosit() );
        this.kubikiZaschity.forEach( kubik => kubik.brosit() );

        sdelat( _ => this.ocenitBroski() ).cherez( 1 );
    },
    
    ocenitBroski() {
        const znachenijaAtaki = this.kubikiAtaki
            .map( kubik => kubik.znachenie )
            .filter( znachenie => znachenie > 0 )
            .sort( (a, b) => a < b );

        const znachenijaZaschity = this.kubikiZaschity
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
            this.ubratSoldat( hodiaschijIgrok.kletkaOtkuda, vyjgryshZaschity );
        }
        if (vyjgryshAtaki !== 0) {
            this.ubratSoldat( hodiaschijIgrok.kletkaKuda, vyjgryshAtaki );
        }
    
        if (vyjgryshZaschity === 0) {
            status.pobedil( hodiaschijIgrok );
        }
        else if (vyjgryshAtaki === 0) {
            const zaschitnik = hodiaschijIgrok.kletkaKuda.igrok;
            status.otbilsia( zaschitnik, hodiaschijIgrok );
        }
        else {
            status.nichja();
        }
    
        if (hodiaschijIgrok.kletkaOtkuda.soldaty > 1 && hodiaschijIgrok.kletkaKuda.soldaty > 0) {
            this.ustanovitKubiki( hodiaschijIgrok.kletkaOtkuda, hodiaschijIgrok.kletkaKuda );
            sdelatHodEl.disabled = false;
        }
        else {
            if (hodiaschijIgrok.kletkaKuda.igrok) {
                hodiaschijIgrok.kletkaKuda.igrok.kletki.delete( hodiaschijIgrok.kletkaKuda );
            }

            if (hodiaschijIgrok.kletkaOtkuda.soldaty > 1) {
                this.perejtiSoldatami( hodiaschijIgrok.kletkaOtkuda, hodiaschijIgrok.kletkaKuda, hodiaschijIgrok.kletkaOtkuda.soldaty - 1 );
            }
            
            this.zavershitHod();
        }
    },
    
    zavershitHod() {
        const hodiaschijIgrok = igroki.find( igrok => igrok.hod );
    
        hodiaschijIgrok.kletkaOtkuda = null;
        hodiaschijIgrok.kletkaKuda = null;
    
        let sledujuschijIndex = igroki.findIndex( igrok => igrok.hod ) + 1;
        if (sledujuschijIndex === igroki.length) {
            sledujuschijIndex = 0;
        }

        igroki = igroki.filter( igrok => igrok.kletki.size > 0 );
    
        if (igroki.length > 1) {
            this.ustanovitHodiaschegoIgroka( sledujuschijIndex );

            proveritKnopkuHoda();
        }
        else {
            this.sostojanie = SOSTOJANIJA.okoncheno;
            
            status.pobedil( hodiaschijIgrok, konec = true );
        }
    }
    
};

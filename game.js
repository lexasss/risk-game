class Igrok {
    constructor( imia, cvet, narod ) {
        this.imia = imia;
        this.cvet = cvet;
        this.narod = narod;

        this.kletki = [];
        this.el = null;
        this.hod = false;

        this.kolichestvoNovyhSoldat = 0;
        this.kolichestvoNovyhSoldatDobavleno = 0;
        this.kletkaOtkuda = null;
        this.kletkaKuda = null;
    }
}

class Narod {
    constructor( imia, kartinka, kletkaDoma ) {
        this.imia = imia;
        this.kartinka = kartinka;
        this.kletkaDoma = kletkaDoma;
        
        this.el = null;
    } 
} 

class Kletka {
    constructor( stolbik, strocka, el ) {
        this.stolbik = stolbik;
        this.strochka = strocka;
        this.el = el;

        this._igrok = null;
        this._soldaty = 1;

        if (this.el) {
            this.el.textContent = this.soldaty.toString();
        }
    }

    get igrok() { return this._igrok; }
    set igrok( znachenie ) {
        this._igrok = znachenie;
        this.el.style.backgroundColor = this.igrok ? 
            this.igrok.cvet.substr( 0, 7 ) + '80' :
            'rgba(0, 0, 0, 0)';
    }

    get soldaty() { return this._soldaty; }
    set soldaty( znachenie ) {
        this._soldaty = znachenie;
        this.el.textContent = znachenie ? znachenie.toString() : '';
    }

    sbrositRol( rol ) {
        this.el.classList.remove( rol );
    }

    ustanovitRol( rol ) {
        this.el.classList.add( rol );
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
        this.el = el;
        this._aktivnyj = true;
        this.znachenie = 1;
    }

    brosit() {
        if (this.aktivnyj) {
            this.znachenie = Math.ceil(  Math.random() * 6 );
            this.el.style.backgroundPosition = `${-(this.znachenie - 1) * 28}px 0`;
        }
        else {
            this.znachenie = 0;
        }
    }

    get aktivnyj() { return this._aktivnyj; }
    set aktivnyj( znachenie ) {
        this._aktivnyj = znachenie;
        this.el.style.display = znachenie ? 'block' : 'none';

    }
}

const igroki = [];

const NARODY = [
    new Narod( 'Болгары', 'bolgar', new Kletka( 11, 5 ) ),
    new Narod( 'Византийцы', 'vizantiec', new Kletka( 13, 2 ) ),
    new Narod( 'Викинги', 'viking', new Kletka( 2, 6 ) ),
    new Narod( 'Литовцы', 'litovec', new Kletka( 5, 4 ) ),
    new Narod( 'Ливонцы', 'livonec', new Kletka( 3, 4 ) ),
    new Narod( 'Немцы', 'nemec', new Kletka( 6, 9 ) ),
    new Narod( 'Русичи', 'rusich', new Kletka( 7, 1 ) ),
    new Narod( 'Тевтонцы', 'tevtonec', new Kletka( 5, 6 ) ),
];

const SOSTOJANIJA = {
    vybolIgrokov: 'выбор игроков',
    podgotovka: 'подготовка',
    vojna: 'война',
};

const igra = {
    sostojanie: SOSTOJANIJA.vybolIgrokov,

    nachat() {
        igroki.forEach( igrok => {
            dobavitIgrokaVSpisok( igrok );
            zahvatitKletkuPoAdresu( igrok.narod.kletkaDoma, igrok, 1 );
        });

        this.sostojanie = SOSTOJANIJA.podgotovka;

        ustanovitHodiaschegoIgroka( 0 );
    }
};








        /*
        igroki.forEach( igrok => {
            dobavitIgrokaVSpisok( igrok );
            zahvatitKletku( igrok.narod.kletkaDoma, igrok, 1 );
        });

        ustanovitHodiaschegoIgroka( 0 );
        */

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

        this.igrok = null;
        this.soldaty = 1;

        if (this.el) {
            this.el.textContent = this.soldaty.toString();
        }
    }
}

class Kubik {
    constructor( el ) {
        this.el = el;
        this.aktivnyj = true;
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
    podgotovka: 'подготовка',
    vojna: 'война',
};

let sostojanie = SOSTOJANIJA.podgotovka;

const igra = {
    nachat() {
        igroki.forEach( igrok => {
            dobavitIgrokaVSpisok( igrok );
            zahvatitKletkuPoAdresu( igrok.narod.kletkaDoma, igrok, 1 );
        });

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

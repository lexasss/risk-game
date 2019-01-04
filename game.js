class Igrok {
    constructor( imia, cvet, narod ) {
        this.imia = imia;
        this.cvet = cvet;
        this.narod = narod;

        this.kletki = [];
        this.el = null;
        this.hod = false;
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

const igroki = [];

const NARODY = [
    new Narod( 'Болгары', 'bolgar', { stolbik: 11, strochka: 5 } ),
    new Narod( 'Византийцы', 'vizantiec', { stolbik: 13, strochka: 2 } ),
    new Narod( 'Викинги', 'viking', { stolbik: 2, strochka: 6 } ),
    new Narod( 'Литовцы', 'litovec', { stolbik: 5, strochka: 4 } ),
    new Narod( 'Ливонцы', 'livonec', { stolbik: 3, strochka: 4 } ),
    new Narod( 'Немцы', 'nemec', { stolbik: 6, strochka: 9 } ),
    new Narod( 'Русичи', 'rusich', { stolbik: 7, strochka: 1 } ),
    new Narod( 'Тевтонцы', 'tevtonec', { stolbik: 5, strochka: 6 } ),
];

const igra = {
    nachat() {
    }
};








        /*
        igroki.forEach( igrok => {
            dobavitIgrokaVSpisok( igrok );
            zahvatit( igrok.narod.kletkaDoma, igrok, 5 );
        });

        igroki[0].el.classList.add('aktivnyj-igrok-v-spiske');
        igroki[0].hod = true;
        */

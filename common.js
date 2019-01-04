class Igrok {
  constructor( imia, cvet, narod ) {
      this.imia = imia;
      this.cvet = cvet;
      this.narod = narod;
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
  new Narod( 'Болгары', 'bolgar', { x: 12, y: 5 } ),
  new Narod( 'Византийцы', 'vizantiec', { x: 13, y: 2 } ),
  new Narod( 'Викинги', 'viking', { x: 2, y: 6 } ),
  new Narod( 'Литовцы', 'litovec', { x: 5, y: 4 } ),
  new Narod( 'Ливонцы', 'livonec', { x: 3, y: 4 } ),
  new Narod( 'Немцы', 'nemec', { x: 6, y: 9 } ),
  new Narod( 'Русичи', 'rusich', { x: 5, y: 0 } ),
  new Narod( 'Тевтонцы', 'tevtonec', { x: 5, y: 6 } ),
];

const igra = {
  nachat() {

  }
};
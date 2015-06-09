import Emitter from "./emitter";

class Camelot extends Emitter {
  constructor() {
    super();

    this.on("arrival", this.eatHam, { context: this });
  }
  eatHam() {
    console.log("We eat ham and jam and spam a lot.");
  }
}

export default Camelot;

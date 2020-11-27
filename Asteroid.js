class Asteroid{
  constructor(xPos, yPos, noiseSeedVal){
    this.x = xPos;
    this.y = yPos;
    this.closest = false;
    this.seed = noiseSeedVal
    this.noiseScale = 0.02;
    this.noiseVal = 0.1;
    this.stepVal = 0.1;

    this.recordRVal = true;
    this.radiusValues = [];
  //  this.arr = [];

    this.index = 0;

  }

  findPeaks() {
    var peak;
    return arr.reduce(function(peaks, val, i) {
      if (this.arr[i+1] > this.arr[i]) {
        peak = arr[i+1];
      } else if ((this.arr[i+1] < arr[i]) && (typeof peak === 'number')) {
        peaks.push(peak);
        peak = undefined;
      }
      return peaks;
    }, []);
  }

/*
  createHitBox(){

    for(let i = 0; i < this.radiusValues; i++){
      if(i === this.radiusValues.length - 1 || i === 0){

      }

      if(this.radiusValues[i].mag()  > this.radiusValues[i-1].mag() && this.radiusValues[i].mag() > this.radiusValues[i+1].mag()){
        this.arr.push(this.radiusValues[i]);
      }
    }

    for(let j = 0; j < this.arr.length; j++){
      push();
      stroke(255, 0, 0);
      strokeWeight(10);
      point(this.arr[j].x, this.arr[i].y);
      pop();
    }

    text("arr.length: " + this.arr.length, 250, 525);
  }

*/

  localMaxMin(returnMax){
    var arr = [];
    var values = arr[0].map(function(elt) { return elt[1]; });
    var max = Math.max.apply(null, values);
    var min = Math.min.apply(null, values);

    if(returnMax)
      return max;
    else
      return min;
  }

  // returns radius value. To get angle at given index value: (index/radiusValues.length)*2pi
  getRadiusValue(){
  //  let index = Math.round((angle/TWO_PI)*this.radiusValues.length);

    //text("Index: " + index + " Size: " + this.radiusValues.length, 250, 550);
    return this.radiusValues;
  }



  show(){

    push();


    translate(this.x, this.y);
    strokeWeight(0);
    if(this.closest){
      stroke(255,255,0);
      strokeWeight(4);
      //fill(this.col);
    }
    //stroke(255,255, 0);
    fill(255);
    let t = 0;
    beginShape();
    noiseSeed(this.seed);
    for(let a = 0; a < TWO_PI; a += this.stepVal){
      let xOff = cos(a) + 1;
      let yOff = sin(a) + 1;
      let r = map(noise(xOff, yOff), 0, 1, 15, 40);
      let x = r*cos(a);
      let y = r*sin(a);

      vertex(x, y);
      if(this.recordRVal){
        this.radiusValues.push(createVector(x + this.x, y + this.y));
      }
    }
    this.recordRVal = false;
    if(this.getValues)
      this.getValues = false;
    endShape(CLOSE);
    //noLopp();


    pop();
  }

}


class Pipe {
  constructor(){
  this.spacing = 170;
  this.top = random(height / 6, 3 / 4 * height);
  this.bottom = (height - (this.top + this.spacing))+10;
  this.x = width;
  this.w = 60;
  this.speed = 6;
  this.highlight = false;
  }

  hits (bird){
    if(bird.y === height - bird.height) return true;
    if (bird.y + bird.height < this.top + 30  || bird.y - bird.height > height - this.bottom + 10) {
      if (bird.x  > this.x && bird.x  < this.x + this.w ) {
        this.highlight = true;
        return true;
      }
    }
    this.highlight = false;
    return false;
  }

  show (){
    stroke(0);
    /*fill(255);
    if (this.highlight) {
      fill(255, 0, 0);
    }*/
    fill(23,175,9);
    rect(this.x, 0, this.w, this.top);
    rect(this.x - 5, this.top, this.w + 10, 20);
    //image(downPipe, this.x, 0, this.w, this.top);
    rect(this.x, height - this.bottom, this.w, this.bottom);
    rect(this.x - 5, height - this.bottom, this.w + 10, 20);
    //image(upPipe, this.x, height - this.bottom, this.w, this.bottom);
  }

  update (){
    this.x -= this.speed;
  }

  offscreen (){
    if (this.x < -this.w) {
      return true;
    } else {
      return false;
    }
  }

}

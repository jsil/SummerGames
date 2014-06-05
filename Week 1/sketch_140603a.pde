class game {
   boolean paused;
   PFont font;
   int menuNum;
  
  game() {//don't use
    paused = false;
    menuNum = 0;
  } 
  
  game(PFont fontSet) {
    paused = false;
    menuNum = 0;
   
    font = fontSet; 
  }
  
  void pause() {
     paused = true; 
  }
  
  void resume() {
     paused = false; 
  }
  
  void togglePause() {
     if(paused)
        paused = false;
     else {
        paused = true; 
        menuNum = 1;
     }
  }
  
  void time() {
    if(!paused) {
        me.move();
    }
    else {
       drawMenu(); 
    }
  }
  
  void drawMenu() {
    if(menuNum == 1) {
       rect((width/2)-150,(height/2)-175,300,350);
       fill(255);
       rect((width/2)-115,(height/2)-33,230,45);
       fill(0);
       textFont(font, 32);
       text("Paused", (width/2)-55, (height/2)-90);
       text("Menu", (width/2)-40, (height/2));
    }
    else if(menuNum == 2) {
       rect((width/2)-150,(height/2)-175,300,350);
       fill(255);
       rect((width/2)-115,(height/2)-33,230,45);
       fill(0);
       textFont(font, 32);
       text("Paused2", (width/2)-55, (height/2)-90);
       text("Menu2", (width/2)-40, (height/2));
    }
  }
  
  int getMenuNum() {
     return menuNum; 
  }
  
  void setMenuNum(int numSetter) {
     menuNum = numSetter; 
  }
  
}






class hero {
  float x;//horizontal location
  float y;//vertical location
  float w;//width
  float h;//height
  
  float upForce;//used when jumping
  boolean isFalling;

  
  boolean movingLeft;
  boolean movingRight;
  
  boolean[] perks = new boolean[2];//array of perks, either locked or unlocked

 
 hero() {
   x = 10;
   y = 300;
   w = 40;
   h = 40;
   upForce = 0;
   movingLeft = false;
   movingRight = false;
   setPerks();
 } 
  
  float getX() {
    return x; 
  }
  
  float getY() {
    return y; 
  }
  
  void moveLeft() {
    if(perks[0] && movingLeft && x>=5 && canMove(false))
      x -= 4; 
  }
  
  void isLeft(boolean isMoving) {
    movingLeft = isMoving;
  }
  
  void moveRight() {
    if(movingRight && canMove(true))
      x += 4; 
  }
  
  void isRight(boolean isMoving) {
    movingRight = isMoving;
  }
  
  void drawObj() {
    rect(x, y, w, h); 
  }
  
  void setPerks() {
    perks[0] = false;//move left
    perks[1] = false;//jump
    unlockAllPerks();
  }
  
  void unlockAllPerks() {
    for(int i=0;i<perks.length;i++)
       perks[i] = true; 
  }
  
  boolean getPerk(int index) {
    return perks[index]; 
  }
  
  void gravity() {
    if(upForce == 0) {
      isFalling = true;
      for(int i=0;i<objList.length;i++) {
         if(objList[i].intersectDown(x,y,x+w,y+h))
           isFalling = false; 
      }
      if(isFalling) {
        y += 5;
//        boolean isStuck = false;
//        for(int i=0;i<objList.length;i++) {
//         if(objList[i].intersect(x,y,x+w,y+h))
//           isStuck = true; 
//        }
//        while(isStuck) {
//           y -= 1; 
//           for(int i=0;i<objList.length;i++) {
//             if(!objList[i].intersect(x,y,x+w,y+h))
//               isStuck = false; 
//           }
//        }
        
      } 
    }
    else {
        boolean hitTop = false;
        for(int i=0;i<objList.length;i++) {
         if(objList[i].intersectUp(x,y,x+w,y+h))
           hitTop = true;
        }
        if(!hitTop) {
          y -= upForce;
          upForce -= 1;
        } 
        else {
          upForce = 0;
        }
    }
  }
  
  boolean canMove(boolean direction) {
    boolean canMove = true;
    for(int i=0;i<objList.length;i++) {
       if((!direction && objList[i].intersectLeft(x,y,x+w,y+h)) || (direction && objList[i].intersectRight(x,y,x+w,y+h)))
         canMove = false;
    } 
    return canMove;
  }
  
  void jump() {
    if(perks[1] && (!isFalling)) {
      upForce = 16;
      isFalling = true; 
    }
  }
  
  void move() {
     gravity();
     moveLeft();
     moveRight();
      
  }
  
}







class object {
  float x;//horizontal location
  float y;//vertical location
  float w;//width
  float h;//height
  
  object() {//don't use this
    x = 0;
    y = 0;
    w = 0;
    h = 0;
  }
  
  object(int xSet, int ySet, int wSet, int hSet) {
    x = float(xSet);
    y = float(ySet);
    w = float(wSet);
    h = float(hSet); 
  }
  
  
  float getX() {
    return x; 
  }
  
  float getY() {
    return y; 
  }
  
  void moveLeft() {
    x -= 3; 
  }
  
  void moveRight() {
    x += 3; 
  }
  
  void drawObj() {
    rect(x, y, w, h); 
  }
  
  boolean intersectDown(float x1, float y1, float x2, float y2) {
     boolean isIntersect = false;
     //check if it is vertically intersecting
     if(x2 >= (x+8) && x1 <= (x + w-8)) {
       //check top of object
       if(y2 >= y && y1 <= (y + h))
         isIntersect = true;
     }
     return isIntersect; 
  }
  
    boolean intersectUp(float x1, float y1, float x2, float y2) {
     boolean isIntersect = false;
     //check if it is vertically intersecting
     if(x2 >= x && x1 <= (x + w)) {
       //check bottom of object
       if(y2 <= y && y1 >= (y + h))
         isIntersect = true;
     }
     return isIntersect; 
  }
  
    boolean intersectLeft(float x1, float y1, float x2, float y2) {
     boolean isIntersect = false;
     //check if it is horizontally intersecting
     if(y2 > (y+8) && y1 < (y + h)) {
       //check left of object
       if(x2 >= (x+8) && x1 <= (x + w))
         isIntersect = true;
     }
     return isIntersect; 
  }
  
    boolean intersectRight(float x1, float y1, float x2, float y2) {
     boolean isIntersect = false;
     //check if it is horizontally intersecting
     if(y2 > (y+8) && y1 < (y + h)) {
       //check right of object
       if(x1 <= (x+w-8) && x2 >= x)
         isIntersect = true;
     }
     return isIntersect; 
  }
  
//    boolean intersectUp(float x1, float y1, float x2, float y2) {
//     boolean isIntersect = false;
//     //check if it is vertically intersecting
//     if(x2 >= x && x1 <= (x + w)) {
//       //check top of object
//       if(y2 >= y && y1 <= (y + h))
//         isIntersect = true;
//       //check bottom of object
//       if(y2 <= y && y1 >= (y + h))
//         isIntersect = true;
//     }
//     //check if it is horizontally intersecting
//     if(y2 >= y && y1 <= (y + h)) {
//       //check left of object
//       if(x2 >= x && x1 <= (x + w))
//         isIntersect = true;
//       //check right of object
//       if(x2 <= x && x1 >= (x + w))
//         isIntersect = true;
//     }
//     return isIntersect; 
//  }

  
  
}

hero me = new hero();
object[] objList = new object[3];
game myGame;

void setup() {
  size(displayWidth, displayHeight-150);//P3D
  
  //test level 1
  objList[0] = new object(0, (height/3)*2, (width/2), height/3);
  objList[1] = new object((width/2)+125, (height/3)*2, (width/2)-125, height/3);
  objList[2] = new object((width/3), (height/2), (width/2),15);
  
  PFont font;
  font = loadFont("Dialog-20.vlw");
  
  myGame = new game(font);

}

void draw(){
  background(128);
  fill(255,255,255);
  for(int i=0;i<objList.length;i++) {
      objList[i].drawObj(); 
  }
  me.drawObj();
  myGame.time();

}

void mouseDragged() {


}

void mouseClicked() {
  //print("x: " + mouseX + "   y = " + mouseY + "\n");
  if(myGame.getMenuNum() == 1) {
    if((mouseX >= (width/2)-115) && (mouseX <= (width/2)+115) && (mouseY >= (height/2)-33) && mouseY <= ((height/2)+12)) {
      myGame.setMenuNum(2);
      
    }
  }

}

void keyPressed() {
  if (key == CODED) {
    if (keyCode == RIGHT) {
      me.isRight(true);
    } 
    else if(keyCode == LEFT) {
      me.isLeft(true);
    }

  }
  else if(key == ' ') {
     me.jump();
  }
  
  else if(key == TAB) {
      myGame.togglePause();
    }
}

void keyReleased() {
    if (key == CODED) {
    if (keyCode == RIGHT) {
      me.isRight(false);
    } 
    else if(keyCode == LEFT) {
      me.isLeft(false);
    }

  }
//  else if(key == ' ') {
//     me.jump();
//  }
}


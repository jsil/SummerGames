class Game {
   boolean paused;
   PFont font;
   int menuNum;
   float levelXMax;
   float levelXCurrent;
  
  Game() {//don't use
    paused = false;
    menuNum = 0;
    font = loadFont("Dialog-20.vlw");
    levelXMax = 0;
    levelXCurrent = 0;
    loadLevel(1);
  } 
  
  Game(PFont fontSet) {
    paused = false;
    menuNum = 0;
   
    font = fontSet; 
//    levelXMax = 0;
//    levelXCurrent = 0;
    loadLevel(3);
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
       fill(255);
       rect((width/2)-150,(height/2)-175,300,350);
       rect((width/2)-115,(height/2)-33,230,45);
       fill(0);
       textFont(font, 32);
       text("Paused", (width/2)-55, (height/2)-90);
       text("Menu", (width/2)-40, (height/2));
    }
    else if(menuNum == 2) {
       fill(255);
       rect((width/2)-150,(height/2)-175,300,350);
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
  
  boolean isPaused() {
     return paused; 
  }
  
  void loadLevel(int levelNum) {
     if(levelNum == 1) {  //test level 1
        levelXMax = 20000;
        levelXCurrent = 0;
        objList = new Object[6];
        objList[0] = new Object(0, (height/3)*2, (width/2), height/3);
        objList[0].setColor(color(29,144,220));
        objList[1] = new Object((width/2)+125, (height/3)*2, (width/2)-125, height/3);
        objList[1].setColor(color(29,144,220));
        objList[2] = new Platform((width/3), (height/2)+100, (width/3)+300, (height/2)+100);
        objList[2].setColor(color(29,144,220));
        objList[3] = new Platform((width/3), (height/2), (width/3)+300, (height/2));
        objList[3].setColor(color(29,144,220));
        objList[4] = new Platform((width/3), (height/2)-100, (width/3)+300, (height/2)-100);
        objList[4].setColor(color(29,144,220));
        objList[5] = new Platform((width/3), (height/2)-200, (width/3)+300, (height/2)-200);
        objList[5].setColor(color(29,144,220));
        me.setLocation(10,(height/3)*2-40);
     } 
     else if(levelNum == 2) {
        levelXMax = 20000;
        levelXCurrent = 0;
        objList = new Object[6];
        objList[0] = new Grass(0, (height/3)*2, (width/2), height/3);
        objList[1] = new Grass((width/2)+125, (height/3)*2, (width/2)+1000, height/3);
        objList[2] = new Platform((width/3), (height/2)+100, (width/3)+300, (height/2)+100);
        objList[2].setColor(color(29,144,220));
        objList[3] = new Platform((width/3), (height/2), (width/3)+300, (height/2));
        objList[4] = new Platform((width/3), (height/2)-100, (width/3)+300, (height/2)-100);
        objList[5] = new Platform((width/3), (height/2)-200, (width/3)+300, (height/2)-200); 
        me.setLocation(10,(height/3)*2-40);
     }
     else if(levelNum == 3) {
        levelXMax = 20000;
        levelXCurrent = 0;
        objList = new Object[2];
        objList[0] = new Grass(0, (height/3), 1000, (height/3)*2-100);
        objList[1] = new Grass(1095, (height/3)*2, 2000, height/3);
        me.setLocation(10,(height/3)-40);
     }
  }
  
  void moveLevelRight(float x) {
     if(canMoveRight()) {
       for(int i=0;i<objList.length;i++) {
          objList[i].shiftLeft(x);
          levelXCurrent += x;
       } 
     }
  }
  
  boolean canMoveRight() {
     return levelXMax > levelXCurrent; 
  }
  
  
  void moveLevelLeft(float x) {
     if(canMoveLeft()) {
       for(int i=0;i<objList.length;i++) {
          objList[i].shiftRight(x);
          levelXCurrent -= x;
       } 
     }
  }
  
  boolean canMoveLeft() {
     return 0 < levelXCurrent; 
  }
  
  void beatLevel() {
    paused = true;
    menuNum = 2;
  }
  
}






class Hero {
  float x;//horizontal location
  float y;//vertical location
  float w;//width
  float h;//height
  
  float upForce;//used when jumping
  boolean isFalling;
  int fallSpeed;
  int runSpeed;

  boolean canWallJump;
  
  boolean movingLeft;
  boolean movingRight;
  boolean isCrouching;
  
  boolean[] perks = new boolean[5];//array of perks, either locked or unlocked

 
 Hero() {
   x = 10;
   y = 300;
   w = 40;
   h = 40;
   upForce = 0;
   fallSpeed = 5;
   runSpeed = 5;
   movingLeft = false;
   movingRight = false;
   canWallJump = true;
   isCrouching = false;
   setPerks();
 } 
  
  float getX() {
    return x; 
  }
  
  float getY() {
    return y; 
  }
  
  void moveLeft() {
    if(perks[0] && movingLeft && x>=5 && canMove(false)) {
      if(x < width * .35 && myGame.canMoveLeft())
         myGame.moveLevelLeft(runSpeed);
      else 
         x -= runSpeed;
    } 
  }
  
  void isLeft(boolean isMoving) {
    movingLeft = isMoving;
  }
  
  void moveRight() {
    if(movingRight && canMove(true)) {
      if(x > width * .65 && myGame.canMoveRight())
        myGame.moveLevelRight(runSpeed);
      else
        x += runSpeed; 
    }
//    if(x >= width * .80) {
//       myGame.beatLevel(); 
//    }
  }
  
  void isRight(boolean isMoving) {
    movingRight = isMoving;
  }
  
  void drawObj() {
    for(int i=0;i<objList.length;i++) {
         if(objList[i].isOnTop(x,y,x+w,y+h)) {
            x += objList[i].xChange();
            y += objList[i].yChange(); 
         }
      }
    fill(255);
    rect(x, y, w, h); 
    if(movingLeft) {
      fill(0);
      line((x+8),(y+8),(x+8),(y+16));
      line((x+16),(y+8),(x+16),(y+16));
      if(!perks[2]) {
        fill(255,0,0);
        quad((x+w-1),(y+4),(x+w-6),(y+12),(x+w-14),(y+4),(x+w-9),(y+2));
        quad((x+w-23),(y-7),(x+w-26),(y+2),(x+w-16),(y+3),(x+w-15),(y));
        ellipse((x+w-14),(y+3),7,7);
      }
    }
    else if(movingRight) {
       fill(0);
       line((x+24),(y+8),(x+24),(y+16));
       line((x+32),(y+8),(x+32),(y+16)); 
       if(!perks[2]) {
         fill(255,0,0);
         quad((x+1),(y+4),(x+6),(y+12),(x+14),(y+4),(x+9),(y+2));
         quad((x+23),(y-7),(x+26),(y+2),(x+16),(y+3),(x+15),(y));
         ellipse((x+14),(y+3),7,7);
       }
    }
    else {
       fill(0);
       line((x+16),(y+8),(x+16),(y+16));
       line((x+24),(y+8),(x+24),(y+16)); 
       if(!perks[2]) {
         fill(255,0,0);
         quad((x+9),(y-7),(x+9),(y+5),(x+17),(y+1),(x+17),(y-3));
         quad((x+w-9),(y-7),(x+w-9),(y+5),(x+w-17),(y+1),(x+w-17),(y-3));
         ellipse((x+20),(y),7,7);
       }
    }
  }
  
  void setPerks() {
    perks[0] = true;//move left
    perks[1] = true;//jump
    perks[2] = false;//gender, 0 = female, 1 = male
    perks[3] = true;//wall jump
    perks[4] = true;//crouch
    //unlockAllPerks();
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
        for(int j=0;j<=fallSpeed;j++) {
           if(objList[i].intersectDown(x,y,x+w,y+h+j)) {
               isFalling = false; 
               canWallJump = true;
               y += j-1;
               break;
           }
         }
      }
      if(isFalling) {
        y += fallSpeed;
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
    } else {
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
    if(!direction) {
      for(int i=0;i<objList.length;i++) {
         if(objList[i].intersectLeft(x,y,x+w,y+h))
           canMove = false;
      } 
    }
    else {
      for(int i=0;i<objList.length;i++) {
         if(objList[i].intersectRight(x,y,x+w,y+h))
           canMove = false;
      } 
    }
    
    return canMove;
  }
  
  void jump() {
    if(perks[1] && (!isFalling)) {
      upForce = 16;
      isFalling = true; 
      crouchOff();
    }
    else if(perks[3] && canWallJump) {
      for(int i=0;i<objList.length;i++) {
         if(objList[i].intersectLeft(x,y,x+w,y+h) || objList[i].intersectRight(x,y,x+w,y+h)) {
           upForce = 16;
           isFalling = true;
           canWallJump = false;
         }
      } 
    } 
  }
  
  void crouchOn() {
    if(perks[4] && !isCrouching && !isFalling) {
        y += 20;
        h -= 20;
        isCrouching = true;
    }
  }
  
  void crouchOff() {
    if(perks[4] && isCrouching) {
       y -= 20;
       h += 20;
       isCrouching = false;
    }
  }
  
  void move() {
     gravity();
     moveLeft();
     moveRight();
      
  }
  
  void setLocation(float xSet, float ySet) {
     x = xSet;
     y = ySet; 
  }
  
}

class Object {
  float x;//horizontal location
  float y;//vertical location
  float w;//width
  float h;//height
  color color1;
  boolean isOnTop;
  
  Object() {//don't use this
    x = 0;
    y = 0;
    w = 0;
    h = 0;
    color1 = color(255);
  }
  
  Object(int xSet, int ySet, int wSet, int hSet) {
    x = float(xSet);
    y = float(ySet);
    w = float(wSet);
    h = float(hSet); 
    color1 = color(255);
  }
  
  
  float getX() {
    return x; 
  }
  
  float getY() {
    return y; 
  }
  
  void shiftLeft(float val) {
    x -= val; 
  }
  
  void shiftRight(float val) {
    x += val; 
  }
  
  void setColor(color colorSet) {
     color1 = colorSet; 
  }
  
  void drawObj() {
    if(isOnScreen()) {
      fill(color1);
      rect(x, y, w, h); 
    }
  }
  
  boolean isOnScreen() {
     if(x+w > 0 && x < width && y+h > 0 && y < height)
        return true;
     else
        return false; 
  }
  
  boolean intersectDown(float x1, float y1, float x2, float y2) {
     boolean isIntersect = false;
     //check if it is vertically intersecting
     if(x2 >= (x) && x1 <= (x + w)) {
       //check top of object
       if(y2 >= y && y1 <= (y-(y2-y1))) {
         isIntersect = true;
         if(y2 == y)
           isOnTop = true;
         else
           isOnTop = false;
       }
       else
         isOnTop = false;
     }
     else
       isOnTop = false;
     return isIntersect; 
  }
  
    boolean intersectUp(float x1, float y1, float x2, float y2) {
     boolean isIntersect = false;
     //check if it is vertically intersecting
     if(x2 >= x && x1 <= (x + w)) {
       //check botto  m of object
       if(y2 <= y && y1 >= (y + h))
         isIntersect = true;
     }
     return isIntersect; 
  }
  
    boolean intersectLeft(float x1, float y1, float x2, float y2) {
     boolean isIntersect = false;
     //check if it is horizontally intersecting
     if(y2 > (y) && y1 < (y + h)) {
       //check left of object
       if(x2 >= (x+1) && x1 <= (x + w))
         isIntersect = true;
     }
     return isIntersect; 
  }
  
    boolean intersectRight(float x1, float y1, float x2, float y2) {
     boolean isIntersect = false;
     //check if it is horizontally intersecting
     if(y2 > (y) && y1 < (y + h)) {
       //check right of object
       if(x1 <= (x+w-1) && x2 >= x)
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

    boolean isOnTop(float x1,float y1, float x2, float y2) {
       return isOnTop;//only applies to moving objects. These objects will have this function overloaded 
    }
    
    float xChange() {
      return 0;//only applies to moving objects. These objects will have this function overloaded 
    }
    
    float yChange() {
       return 0;//only applies to moving objects. These objects will have this function overloaded  
    }

  
  
}

public class Grass extends Object {
  color color2;
  
  Grass() {//don't use this
    x = 0;
    y = 0;
    w = 0;
    h = 0;
    color1 = color(77,184,74);
    color2 = color(138,185,0);
  }
  
  Grass(int xSet, int ySet, int wSet, int hSet) {
    x = float(xSet);
    y = float(ySet);
    w = float(wSet);
    h = float(hSet); 
    color1 = color(77,184,74);
    color2 = color(138,185,0);
  }
  
  void drawObj() {
    if(isOnScreen()) {
        fill(color1);
        rect(x, y, w, h); 
        fill(color2);
        for(int i=35;i<(w);i += 110) {
            if(y+i+20 <= (y+h))
              quad(x+i,y,x+i+50,y,x,y+i+55,x,y+i+5);
            else {
              quad(x+i,y,x+i+50,y,x+i-(h)+50,y+h,x+i-(h),y+h);
            }
        }
        for(int i=(int(y)+35);i<(y+h)-55;i += 110) {
           quad(x+w,i,x+w,i+50,x+(w/1.36)+i-(h)+50,y+h,x+(w/1.36)+i-(h),y+h);
        }
    }
  }
  
}

public class Platform extends Object {
    float xPos1;
    float yPos1;
    float xPos2;
    float yPos2;
    float xRate;
    float yRate;
    boolean direction;
    
    Platform() {//don't use this
      color1 = color(255);
      x = 0;
      y = 0;
      w = 0;
      h = 0;
      xPos1 = 0;
      xPos2 = 0;
      yPos1 = 0;
      yPos2 = 0;
      direction = false;
    }
    
    Platform(int xSet1, int ySet1, int xSet2, int ySet2) {//default platform size
    color1 = color(255);
    x = float(xSet1);
    y = float(ySet1);
    xPos1 = float(xSet1);
    yPos1 = float(ySet1);
    xPos2 = float(xSet2);
    yPos2 = float(ySet2);
    xRate = 2;
    yRate = 2;
    w = 80;
    h = 15;
    direction = false;
  }
  
  void shiftLeft(float val) {
    x -= val; 
    xPos1 -= val;
    xPos2 -= val;
  }
  
  void shiftRight(float val) {
    x += val; 
    xPos1 += val;
    xPos2 += val;
  }
  
  void drawObj() {
    if(isOnScreen()) {
      if(direction == false) {
         if(x<xPos1)
            x += xRate;
         else if(x>xPos1)
            x -= xRate;
         else {
            if(y==yPos1) {
              direction = true;
            }
         }
         if(y<yPos1)
            y += yRate;
         else if(y>yPos1)
            y -= yRate;
      }
      else {
         if(x<xPos2)
            x += xRate;
         else if(x>xPos2)
            x -= xRate;
         else {
            if(y==yPos2) {
              direction = false;
            }
         }
         if(y<yPos2)
            y += yRate;
         else if(y>yPos2)
            y -= yRate;
      }
      fill(color1);
      rect(x, y, w, h); 
    }
  }
  
//    boolean isOnTop(float x1, float y1, float x2, float y2) {
//      boolean onTop = intersectDown(x1,y1,x2,y2);
//      if(onTop)
//        color1 = color(255,0,0);
//      else
//        color1 = color(255);
//      return onTop;
//    }
    
    float xChange() {
       if(!direction) {
         if(x<xPos1)
            return xRate;
         else if(x>xPos1)
            return xRate * -1;
         else
            return 0;
       }
       else {
          if(x<xPos2)
             return xRate;
          else if(x>xPos2)
             return xRate * -1;
          else
            return 0;
       }
    }
    
    float yChange() {
       if(direction == false) {
       if(y<yPos1)
          return yRate;
       else if(y>yPos1)
          return yRate * -1;
       else
          return 0;
       }
       else {
          if(y<yPos2)
             return yRate;
          else if(y>yPos2)
             return yRate * -1;
          else
            return 0;
       }
    }
    
    
  
}

Hero me = new Hero();
Object[] objList = new Object[0];
Game myGame;

void setup() {
  size(displayWidth, displayHeight);//P3D
  

  
  PFont font;
  font = loadFont("Dialog-20.vlw");
  
  myGame = new Game(font);

}

void draw(){
  if(!myGame.isPaused()) {
    background(128);
    fill(255,255,255);
    for(int i=0;i<objList.length;i++) {
          objList[i].drawObj(); 
    }
    me.drawObj();
  }
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
    else if(keyCode == DOWN) {
      me.crouchOn(); 
    }

  }
  else if(key == ' ') {
     me.jump();
  }
  
  else if(key == TAB) {
      myGame.togglePause();
    }
    else if(key == 'A') {
      myGame.moveLevelRight(8); 
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
    else if(keyCode == DOWN) {
      me.crouchOff();  
    }

  }
//  else if(key == ' ') {
//     me.jump();
//  }
}


class Game {
   boolean paused;
   PFont font;
   
   int menuNum;
   int currentLevel;
   
   float levelXMax;
   float levelXCurrent;
   
   float startX;
   float startY;
   
   boolean draw1Frame;
   boolean drawMe;
   
   int selected;
  
  Game() {
    paused = false;
    menuNum = 0;
    draw1Frame = false;
    drawMe = false;
    font = loadFont("Dialog-20.vlw");
    selected = 0;
    levelXMax = 0;
    levelXCurrent = 0;
    currentLevel = 1;
    loadLevel(currentLevel);
  } 
  
  Game(PFont fontSet) {
    paused = false;
    menuNum = 0;
    draw1Frame = false;
    drawMe = false;
    selected = 0;
   
    font = fontSet; 
//    levelXMax = 0;
//    levelXCurrent = 0;
    currentLevel = 1;
    loadLevel(currentLevel);
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
       text("Cheat", (width/2)-45, (height/2));
    }
    else if(menuNum == 2) {
       fill(255);
       rect((width/2)-150,(height/2)-150,300,175);
       rect((width/2)-115,(height/2)-50,230,45);
       fill(0);
       textFont(font, 32);
       text("Level Completed", (width/2)-125, (height/2)-90);
       text("Continue", (width/2)-75, (height/2)-17);
    }
    else if(menuNum == 3) {
       fill(255);
       rect((width/2)-300,(height/2)-175,600,350);
       rect((width/2)-250,(height/2)-50,230,175);
       rect((width/2)+25,(height/2)-50,225,175);
       printIntro();     
    }
    else if(menuNum == 4) {
       fill(255);
       rect((width/2)-150,(height/2)-150,300,175);
       rect((width/2)-115,(height/2)-50,230,45);
       fill(0);
       textFont(font, 32);
       text("Game Over", (width/2)-90, (height/2)-90);
       text("Restart", (width/2)-55, (height/2)-17);
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
     if(levelNum == 1) {
        levelXMax = 3000;
        levelXCurrent = 0;
        objList = new Object[19];
        objList[0] = new Object(0, (height/3)*2, 1000, height/3);
        objList[0].setColor(color(29,144,220));
        objList[1] = new Object(1000, (height/5)*2, 400, (height/5)*3);
        objList[1].setColor(color(29,144,220));
        objList[2] = new Object(1400, (height/4)*3, 850, height/3);
        objList[2].setColor(color(29,144,220));
        objList[3] = new Object(2250, (height/3), 450, (height/3)*2);
        objList[3].setColor(color(29,144,220));
        objList[4] = new Object(2700, (height/4)*3, 950, height/3);
        objList[4].setColor(color(29,144,220));
        objList[5] = new Object(3650, (height/3), 850, (height/3)*2);
        objList[5].setColor(color(29,144,220));
        objList[6] = new Object(800, (height/2), 100, 30);
        objList[7] = new Object(1250, (height/4), 100, 30);
        objList[8] = new Object(1450, (height/8), 100, 30);
        objList[9] = new Object(1850, (height/3), 100, 30);
        objList[10] = new Object(2000, (height/5), 100, 30);
        objList[11] = new Object(1500, (height/4)*2, 100, 30);
        objList[12] = new Object(1650, (height/5)*3, 100, 30);
        objList[13] = new Platform(2750, (height/3), 2750, (height/3)*2);
        objList[14] = new Object(2900, (height/4), 30, 30);
        objList[15] = new Object(3150, (height/4), 30, 30);
        objList[16] = new Object(3300, (height/4), 30, 30);
        objList[17] = new Object(3500, (height/5), 30, 30);
        objList[18] = new Finish(3900,(height/3),250,50);
        
        
//        objList = new Object[7];
//        objList[0] = new Object(0, (height/3)*2, (width/2), height/3);
//        objList[0].setColor(color(29,144,220));
//        objList[1] = new Object((width/2)+125, (height/3)*2, 50000, height/3);
//        objList[1].setColor(color(29,144,220));
//        objList[2] = new Platform((width/3), (height/2)+100, (width/3)+300, (height/2)+100);
//        objList[2].setColor(color(29,144,220));
//        objList[3] = new Platform((width/3), (height/2), (width/3)+300, (height/2));
//        objList[3].setColor(color(29,144,220));
//        objList[4] = new Platform((width/3), (height/2)-100, (width/3)+300, (height/2)-100);
//        objList[4].setColor(color(29,144,220));
//        objList[5] = new Platform((width/3), (height/2)-200, (width/3)+300, (height/2)-200);
//        objList[5].setColor(color(29,144,220));
//        objList[6] = new Finish(1200,(height/3)*2,250,50);
        startX = 10;
        startY = (height/3)*2-40;
        reset();
        startText();
     } 
     else if(levelNum == 2) {
        levelXMax = 20000;
        levelXCurrent = 0;
         objList = new Object[7];
         objList[0] = new Object(0, (height/3)*2, 650, height/3);
         objList[1] = new Object(750, (height/3)*2, 450, height/3);
         objList[2] = new Object(1200, (height/3)*2-100, 100, (height/3)+100);
         objList[3] = new Object(1300, (height/3)*2-200, 200, (height/3)+200);
         objList[4] = new Object(1500, (height/4)*3, 650, height/4);
         objList[5] = new Object(600, (height/11)*6, 200, 30);
         objList[6] = new Finish(1800,(height/4)*3,250,50);
//        objList = new Object[6];
//        objList[0] = new Grass(0, (height/3)*2, (width/2), height/3);
//        objList[1] = new Grass((width/2)+125, (height/3)*2, (width/2)+1000, height/3);
//        objList[2] = new Platform((width/3), (height/2)+100, (width/3)+300, (height/2)+100);
//        objList[2].setColor(color(29,144,220));
//        objList[3] = new Platform((width/3), (height/2), (width/3)+300, (height/2));
//        objList[4] = new Platform((width/3), (height/2)-100, (width/3)+300, (height/2)-100);
//        objList[5] = new Platform((width/3), (height/2)-200, (width/3)+300, (height/2)-200); 
        //me.setLocation(10,(height/3)*2-40);
        startX = 10;
        startY = (height/3)*2-40;
        reset();
     }
     else if(levelNum == 3) {
        levelXMax = 3000-width;
        levelXCurrent = 0;
        objList = new Object[12];
        objList[0] = new Object(0, (height/3)*2, 1425, (height/3)*2);
        objList[0].setColor(color(100));
        objList[1] = new Object(1425, (height/3)*2+25, 50, (height/3)*2-25);
        objList[1].setColor(color(100));
        objList[2] = new Object(1475, (height/3)*2, 1625, (height/3)*2);
        objList[2].setColor(color(100));
        objList[3] = new Object(450, 0, 100, (height/3)*2-60);
        objList[3].setColor(color(100,72,44));
        objList[4] = new Object(750, (height/3)+50, 100, (height/3)-75);
        objList[4].setColor(color(100,72,44));
        objList[5] = new Object(650, (height/3)+50, 100,30);
        objList[5].setColor(color(100,72,44));
        objList[6] = new Object(800, 60, 50, (height/3)-10);
        objList[6].setColor(color(100,72,44));
        objList[7] = new Object(550, (height/3)-125, 150, 30);
        objList[7].setColor(color(100,72,44));
        objList[8] = new Object(850,(height/3)-50,1200,50);
        objList[8].setColor(color(100,72,44));
        objList[9] = new MovingSpikes(850, height/3, 1200, height/3);
        objList[9].setSpeed(2);
        objList[10] = new Object(2050, 60, 50, (height/3)*2-85);
        objList[10].setColor(color(100,72,44));
        objList[11] = new Finish(2650,(height/3)*2,250,50);
        startX = 10;
        startY = (height/3)*2-40;
        reset();
        startText();
     }
     else if(levelNum == 4) {
        levelXMax = 20000;
        levelXCurrent = 0;
        objList = new Object[3];
        objList[0] = new Grass(0, (height/3), 1000, (height/3)*2-100);
        objList[1] = new Grass(1095, (height/3)*2, 2000, height/3);
        objList[2] = new Finish(1500,(height/3)*2,250,50);
        startX = 10;
        startY = (height/3)-40;
        reset();
     }
     else if(levelNum == 5) {
        levelXMax = 20000;
        levelXCurrent = 0;
        objList = new Object[2];
        objList[0] = new Grass(0, (height/3), 1000, (height/3)*2-100);
        objList[1] = new Grass(1095, (height/3)*2, 2000, height/3);
        me.setLocation(10,(height/3)-40);
     }
     else if(levelNum == 6) {
        levelXMax = 20000;
        levelXCurrent = 0;
        objList = new Object[2];
        objList[0] = new Grass(0, (height/3), 1000, (height/3)*2-100);
        objList[1] = new Grass(1095, (height/3)*2, 2000, height/3);
        me.setLocation(10,(height/3)-40);
     }
  }
  
  void drawGame() {
    if(!isPaused() || draw1Frame) {
        background(128);
        fill(255,255,255);
        for(int i=0;i<objList.length;i++) {
              objList[i].drawObj(); 
        }
        if(!draw1Frame || drawMe)
          me.drawObj();
        draw1Frame = false;
        drawMe = false;
      }
      drawHUD();
      time();
    
  }
  
  void drawHUD() {
    fill(255);
     for(int i=0;i<me.getHealth();i++) {
        rect(15+(i*30),15, 25, 25);
     } 
  }
  
  void gameOver() {
     menuNum = 4;
     paused = true; 
  }
  
  void moveLevelRight(float x) {
     if(canMoveRight() && me.canMove(true)) {
       //boolean checkObject = true;
       //for(int i=0;i<objList.length;i++) {
       //   if(objList[i].intersectRight(me.getX1()+x, me.getY1(), me.getX2()+x, me.getY2()))
       //     checkObject = false;
       //} 
       //if(checkObject) {
         for(int i=0;i<objList.length;i++) {
            objList[i].shiftLeft(x);
         } 
       //}
       levelXCurrent += x;
     }
  }
  
  boolean canMoveRight() {
     return levelXMax > levelXCurrent; 
  }
  
  void moveLevelLeft(float x) {
     if(canMoveLeft() && me.canMove(false)) {
       //boolean checkObject = true;
       //for(int i=0;i<objList.length;i++) {
       //   if(objList[i].intersectLeft(me.getX1()-x, me.getY1(), me.getX2()-x, me.getY2()))
       //     checkObject = false;
       //} 
       //if(checkObject) {
         for(int i=0;i<objList.length;i++) {
            objList[i].shiftRight(x);
         } 
       //}
       levelXCurrent -= x;
     }
  }
  
  boolean canMoveLeft() {
     return 0 < levelXCurrent; 
  }
  
  void beatLevel() {
    if(currentLevel == 4)
      gameOver();
    else {
      draw1Frame = true;
      drawMe = true;
      paused = true;
      menuNum = 2;
    }
  }
  
  void nextLevel() {
     currentLevel++;
     loadLevel(currentLevel); 
  }
  
  void startText() {
     menuNum = 3;
     draw1Frame = true;
     paused = true; 
  }
  
  void setSelected(int set) {
     selected = set; 
  }
  
  int getSelected() {
     return selected; 
  }
  
  void pickSelection(int pick) {
     if(menuNum == 2) {
        if(pick == 0) {
           myGame.togglePause();
           nextLevel();
        } 
     }
     else if(menuNum == 3) {
        if(currentLevel == 1) {
            if(pick == 0) {
               me.setGender(true);
               myGame.togglePause();
            } 
            else if(pick == 1) {
               me.setGender(false);
               myGame.togglePause(); 
            }
         }
        else if(currentLevel == 3) {
            if(pick == 0) {
               me.unlockPerk(3);
               myGame.togglePause();
            } 
            else if(pick == 1) {
               me.unlockPerk(4);
               myGame.togglePause(); 
            }
        }
     }
     if(menuNum == 4) {
        if(pick == 0) {
           restart();
        } 
     }
     selected = 0;
  }
  
  void printIntro() {
    if(currentLevel == 1) {
       fill(0);
       textFont(font, 32);
       text("Welcome! Are you a boy or a girl?", (width/2)-250, (height/2)-120);
       text("Boy", (width/2)-160, (height/2));
       text("Girl", (width/2)+108, (height/2));
       Hero boyExample = new Hero();
       boyExample.setLocation((width/2)-155, height/2+40);
       boyExample.drawObj();
       Hero girlExample = new Hero();
       girlExample.setLocation((width/2)+115, height/2+40);
       girlExample.setGender(false);
       girlExample.drawObj();
       fill(255);
       if(selected == 0)
         triangle((width/2)-150, (height/2)-95, (width/2)-115, (height/2)-95, (width/2)-132.5, (height/2)-65);
       else if(selected == 1)
         triangle((width/2)+150, (height/2)-95, (width/2)+115, (height/2)-95, (width/2)+132.5, (height/2)-65);
    }
    else if(currentLevel == 3) {
      fill(0);
       textFont(font, 32);
       text("Level up! Select a new ability!", (width/2)-225, (height/2)-120);
       text("Walljump", (width/2)-205, (height/2));
       text("Crouch", (width/2)+80, (height/2));
       Hero wallJumpExample = new Hero();
       wallJumpExample.setLocation((width/2)-155, height/2+30);
       wallJumpExample.setGender(me.getPerk(2));
       wallJumpExample.drawObj();
       Object wallExample = new Object((width/2)-85, (height/2)+15,65,110);
       wallExample.setColor(color(29,144,220));
       wallExample.drawObj();
       line((width/2)-105, height/2+75, (width/2)-95, height/2+90);
       line((width/2)-105, height/2+60, (width/2)-95, height/2+75);
       
       Object groundExample = new Object((width/2)+25,(height/2)+81,225,44);
       groundExample.setColor(color(29,144,220));
       groundExample.drawObj();
       Hero crouchExample = new Hero();
       crouchExample.setLocation((width/2)+115, height/2+40);
       crouchExample.setGender(me.getPerk(2));
       crouchExample.unlockPerk(4);
       crouchExample.crouchOn();
       crouchExample.drawObj();
       fill(255);
       if(selected == 0)
         triangle((width/2)-150, (height/2)-95, (width/2)-115, (height/2)-95, (width/2)-132.5, (height/2)-65);
       else if(selected == 1)
         triangle((width/2)+150, (height/2)-95, (width/2)+115, (height/2)-95, (width/2)+132.5, (height/2)-65);
    }
   
  }
  
  void reset() {
      me.setLocation(startX,startY); 
  }
  
  void restart() {
     me = new Hero(); 
     currentLevel = 1;
     loadLevel(currentLevel);
  }
  
//  float getStartX() {
//      return start
//  }
//  
//  float getStartY() {
//    
//  }
  
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
  
  int health;

  boolean canWallJump;
  
  boolean movingLeft;
  boolean movingRight;
  boolean isCrouching;
  boolean waitingToUncrouch;
  
  boolean[] perks = new boolean[5];//array of perks, either locked or unlocked

 
 Hero() {
   x = 10;
   y = 300;
   w = 40;
   h = 40;
   health = 3;
   upForce = 0;
   fallSpeed = 5;
   runSpeed = 5;
   movingLeft = false;
   movingRight = false;
   canWallJump = true;
   isCrouching = false;
   waitingToUncrouch = false;
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
  }
  
  void isRight(boolean isMoving) {
    movingRight = isMoving;
  }
  
  void drawObj() {
    if(y>height)
       respawn();
    if(waitingToUncrouch)
       crouchOff();
    for(int i=0;i<objList.length;i++) {
         if(objList[i].isOnTop(x,y,x+w,y+h)) {
            x += objList[i].xChange();
            y += objList[i].yChange(); 
         }
         if(objList[i].isCrushed(x,y,x+w,y+h)) {
            respawn();
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
    perks[2] = true;//gender, 0 = female, 1 = male
    perks[3] = false;//wall jump
    perks[4] = false;//crouch
    //unlockAllPerks();
  }
  
  void unlockAllPerks() {
    for(int i=0;i<perks.length;i++)
       perks[i] = true; 
  }
  
  boolean getPerk(int index) {
    return perks[index]; 
  }
  
  void unlockPerk(int index) {
    perks[index] = true;
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
         if(objList[i].intersectUp(x,y,x+w,y+h)) {
           hitTop = true;
         }
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
      if(!isCrouching) {
        upForce = 16;
        isFalling = true; 
      }
      else {
        upForce = 10;
        isFalling = true; 
      }
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
      boolean canUncrouch = true;
      for(int i=0;i<objList.length;i++) {
         if(objList[i].intersectLeft(x,y-20,x+w,y+h)) {
             canUncrouch = false;
             waitingToUncrouch = true;
         }
       }
       if(canUncrouch) {
           y -= 20;
           h += 20;
           isCrouching = false; 
           waitingToUncrouch = false;
       }
    }
  }
  
  void move() {
     gravity();
     moveLeft();
     moveRight();
      
  }
  
  int getHealth() {
     return health; 
  }
  
  void respawn() {
    health--;
    if(health > 0)
      myGame.reset();
    else
      myGame.gameOver();
  }
  
  void shiftLeft(float shift) {
     x -= shift; 
  }
  
  void shiftRight(float shift) {
     x += shift; 
  }
  
  void setLocation(float xSet, float ySet) {
     x = xSet;
     y = ySet; 
  }
  
  void setGender(boolean gender) {
     perks[2] = gender; 
  }
  
  float getX1() {
     return x;
  }
  float getY1() {
     return y;
  }
  float getX2() {
    return x+w;
  }
  float getY2() {
    return y+h;
  }
}





























class Object {
  float x;//horizontal location
  float y;//vertical location
  float w;//width
  float h;//height
  color color1;
  boolean onTop;
  
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
           onTop = true;
         else
           onTop = false;
       }
       else
         onTop = false;
     }
     else
       onTop = false;
     return isIntersect; 
  }
  
    boolean intersectUp(float x1, float y1, float x2, float y2) {
     boolean isIntersect = false;
     //check if it is vertically intersecting
     if(x2 >= (x + 1) && x1 <= (x + w - 1)) {
       //check bottom of object
       if(y2 >= y && y1 <= (y + h))
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

    boolean isOnTop(float x1,float y1, float x2, float y2) {
       return onTop;//only applies to moving objects. These objects will have this function overloaded 
    }
    
    float xChange() {
      return 0;//only applies to moving objects. These objects will have this function overloaded 
    }
    
    float yChange() {
       return 0;//only applies to moving objects. These objects will have this function overloaded  
    }
    
    boolean isCrushed(float x1, float y1, float x2, float y2) {//only applies to dangerous moving objects. These objects will have this function overloaded  
       return false; 
    }
    
    void setSpeed(int speedSet) {//only applies to moving objects. These objects will have this function overloaded
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
  
  boolean intersectUp(float x1, float y1, float x2, float y2) {
     return false; 
  }
  
  boolean intersectLeft(float x1, float y1, float x2, float y2) {
     return false; 
  }
  
  boolean intersectRight(float x1, float y1, float x2, float y2) {
     return false; 
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
//    boolean hasChanged = false;
    if(isOnScreen()) {
      if(direction == false) {
         if(x<xPos1)
            x += xRate;
         else if(x>xPos1)
            x -= xRate;
         else {
            if(y==yPos1) {
              direction = true;
//              hasChanged = true;
//              if(yPos1 <= yPos2)
//                y += yRate;
//              else if(yPos1 >= yPos2)
//                y -= yRate;
            }
         }
//         if(!hasChanged) {
           if(y<yPos1)
              y += yRate;
           else if(y>yPos1)
              y -= yRate;
//         }
      }
      else {
         if(x<xPos2)
            x += xRate;
         else if(x>xPos2)
            x -= xRate;
         else {
            if(y==yPos2) {
              direction = false;
//              hasChanged = true;
//              if(yPos1 <= yPos2)
//                y -= yRate;
//              else if(yPos1 >= yPos2)
//                y += yRate;
            }
         }
//         if(!hasChanged) {
           if(y<yPos2)
              y += yRate;
           else if(y>yPos2)
              y -= yRate;
//         }
      }
      fill(color1);
      rect(x, y, w, h); 
    }
  }
  
    
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





class MovingSpikes extends Object {
  boolean direction;
  float maxHeight;
  int speed;
  
   MovingSpikes() {//don't use this
    x = 0;
    y = 0;
    w = 0;
    h = 7;
    speed = 1;
    color1 = color(170);
    direction = false;
    maxHeight = 0;
  }
  
  MovingSpikes(int xSet, int ySet, int wSet, int hSet) {
    x = float(xSet);
    y = float(ySet);
    w = float(wSet);
    h = 7; 
    speed = 1;
    color1 = color(170);
    direction = false;
    maxHeight = float(hSet);
  }
  
  void drawObj() {
    if(isOnScreen()) {
      if(direction == false) {
         if(h<maxHeight)
            h += speed;
         else
            direction = true;
      }
       else {
         if(h>7)
            h -= speed;
         else {
            direction = false;
         }
      }
      fill(color1);
      rect(x, y, w, h-7); 
      fill(255);
      for(int i=0;i<w;i+=10) {
         triangle(x+i,y+h-7,x+i+10,y+h-7,x+i+5,y+h); 
      }
    }
  }
  
    boolean isCrushed(float x1, float y1, float x2, float y2) {
     boolean isIntersect = false;
     //check if it is horizontally intersecting
     if(y2 > (y) && y1 < (y + h)) {
       //check left of object
       if(x2 >= (x+1) && x1 <= (x + w-1)) {
         isIntersect = true;
       }
     }
     return isIntersect; 
  }
  
  void setSpeed(int speedSet) {
     speed = speedSet; 
  }
  
}






class Finish extends Object {
  
  Finish() {//don't use this
    x = 0;
    y = 0;
    w = 0;
    h = 0;
    color1 = color(255);
  }
  
  Finish(int xSet, int ySet, int wSet, int hSet) {
    x = float(xSet);
    y = float(ySet);
    w = float(wSet);
    h = float(hSet); 
    color1 = color(255);
  }
  void drawObj() {
    boolean colorPick = false; 
    if(isOnScreen()) {
      for(int i=0;i<=h;i+=15) {
        if(i%2 == 0)
          colorPick = false;
        else
          colorPick = true;
        for(int j=0;j<w;j+=15) {
          if(colorPick) {
            fill(color1);
            colorPick = false;
          }
          else {
            fill(0);
            colorPick = true;
          }
          rect(x+j-40, y+i, 15, 15);
        } 
      }
    }
  }
  
  boolean intersectDown(float x1, float y1, float x2, float y2) {
     boolean isIntersect = false;
     //check if it is vertically intersecting
     if(x2 >= (x) && x1 <= (x + w)) {
       //check top of object
       if(y2 >= y && y1 <= (y-(y2-y1))) {
         isIntersect = true;
         if(y2 == y) {
           me.drawObj();//force character to be redrawn incase character is falling, so it can hit the ground first. fix this eventually
           onTop = true;
           myGame.beatLevel();
         }
         else
           onTop = false;
       }
       else
         onTop = false;
     }
     else
       onTop = false;
     return isIntersect; 
  }
  
   boolean isOnScreen() {
     if(x+w > 0 && x-40 < width && y+h > 0 && y < height)
        return true;
     else
        return false; 
  }
  
}


























Hero me = new Hero();
Object[] objList = new Object[0];
Game myGame;

void setup() {
  size(1280,800);//P3D
  //println("" + displayWidth + " " + displayHeight);
  

  
  PFont font;
  font = loadFont("Dialog-20.vlw");
  
  myGame = new Game(font);

}

void draw(){
  myGame.drawGame();
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
  else if(myGame.getMenuNum() == 2) {
      if((mouseX >= (width/2)-115) && (mouseX <= (width/2)+115) && (mouseY >= (height/2)-50) && mouseY <= ((height/2)-5)) {
        myGame.pickSelection(0);
      }
  }
  else if(myGame.getMenuNum() == 3) {
    if((mouseX >= (width/2)-250 && mouseX <= (width/2)-20 && mouseY >= (height/2)-50 && mouseY <= (height/2)+125)) {
       myGame.pickSelection(0);
    } 
    else if((mouseX >= (width/2)+25 && mouseX <= (width/2)+250 && mouseY >= (height/2)-50 && mouseY <= (height/2)+125)) {
       myGame.pickSelection(1);
    } 
  }
  else if(myGame.getMenuNum() == 4) {
      if((mouseX >= (width/2)-115) && (mouseX <= (width/2)+115) && (mouseY >= (height/2)-50) && mouseY <= ((height/2)-5)) {
        myGame.pickSelection(0);
      }
  }

}

void keyPressed() {
  if(!myGame.isPaused()) {
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
  }
  else if(myGame.getMenuNum() == 2) {
    if(key == ENTER || key == ' ') {
        myGame.pickSelection(0);
    }
  }
  else if(myGame.getMenuNum() == 3) {
    if (key == CODED) {
      if (keyCode == RIGHT) {
        myGame.setSelected(1);
      } 
      else if(keyCode == LEFT) {
        myGame.setSelected(0);
      }
    }
    else if(key == ENTER || key == ' ') {
        myGame.pickSelection(myGame.getSelected());
    }
  }
  else if(myGame.getMenuNum() == 4) {
    if(key == ENTER || key == ' ') {
        myGame.pickSelection(0);
    }
  }
  else {
     if(key == ENTER || key == ' ') {
        myGame.pickSelection(myGame.getSelected());
     }
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


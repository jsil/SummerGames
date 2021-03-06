    var gl;

    function initGL(canvas) {
        try {
            gl = canvas.getContext("experimental-webgl");
            gl.viewportWidth = canvas.width;
            gl.viewportHeight = canvas.height;
        } catch (e) {
        }
        if (!gl) {
            alert("Could not initialise WebGL, sorry :-(");
        }
    }


    function getShader(gl, id) {
        var shaderScript = document.getElementById(id);
        if (!shaderScript) {
            return null;
        }

        var str = "";
        var k = shaderScript.firstChild;
        while (k) {
            if (k.nodeType == 3) {
                str += k.textContent;
            }
            k = k.nextSibling;
        }

        var shader;
        if (shaderScript.type == "x-shader/x-fragment") {
            shader = gl.createShader(gl.FRAGMENT_SHADER);
        } else if (shaderScript.type == "x-shader/x-vertex") {
            shader = gl.createShader(gl.VERTEX_SHADER);
        } else {
            return null;
        }

        gl.shaderSource(shader, str);
        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            alert(gl.getShaderInfoLog(shader));
            return null;
        }

        return shader;
    }


    var shaderProgram;

    function initShaders() {
        var fragmentShader = getShader(gl, "shader-fs");
        var vertexShader = getShader(gl, "shader-vs");

        shaderProgram = gl.createProgram();
        gl.attachShader(shaderProgram, vertexShader);
        gl.attachShader(shaderProgram, fragmentShader);
        gl.linkProgram(shaderProgram);

        if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
            alert("Could not initialise shaders");
        }

        gl.useProgram(shaderProgram);

        shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
        gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);

        shaderProgram.textureCoordAttribute = gl.getAttribLocation(shaderProgram, "aTextureCoord");
        gl.enableVertexAttribArray(shaderProgram.textureCoordAttribute);

        shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
        shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
        shaderProgram.samplerUniform = gl.getUniformLocation(shaderProgram, "uSampler");
    }


    function handleLoadedTexture(textures) {
        //gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);


        gl.bindTexture(gl.TEXTURE_2D, textures[0]);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textures[0].image);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);

        gl.bindTexture(gl.TEXTURE_2D, textures[1]);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textures[1].image);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

        gl.bindTexture(gl.TEXTURE_2D, textures[2]);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textures[2].image);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
        gl.generateMipmap(gl.TEXTURE_2D);

        gl.bindTexture(gl.TEXTURE_2D, null);
    }


    var floorTextures = Array();
    var bushTextures = Array();
    var wallTextures = Array();
    var heroTextures = Array();
    var enemyTextures = Array();
    var grassTexturesArray = Array();
    var indicatorTextures = Array();

    function initTexture() {
        var floorImage = new Image();

        for (var i=0; i < 3; i++) {
            var texture = gl.createTexture();
            texture.image = floorImage;
            floorTextures.push(texture);
        }

        floorImage.onload = function () {
            handleLoadedTexture(floorTextures)
        }
        floorImage.src = "./img/path.png";

        var bushImage = new Image();

        for (var i=0; i < 3; i++) {
            var texture = gl.createTexture();
            texture.image = bushImage;
            bushTextures.push(texture);
        }

        bushImage.onload = function () {
            handleLoadedTexture(bushTextures)
        }
        bushImage.src = "./img/bush.png";


        var wallImage = new Image();

        for (var i=0; i < 3; i++) {
            var texture = gl.createTexture();
            texture.image = wallImage;
            wallTextures.push(texture);
        }

        wallImage.onload = function () {
            handleLoadedTexture(wallTextures)
        }
        wallImage.src = "./img/floor.png";

        var heroImage = new Image();

        for (var i=0; i < 3; i++) {
            var texture = gl.createTexture();
            texture.image = heroImage;
            heroTextures.push(texture);
        }

        heroImage.onload = function () {
            handleLoadedTexture(heroTextures)
        }
        heroImage.src = "./img/hero.png";

        var enemyImage = new Image();

        for (var i=0; i < 3; i++) {
            var texture = gl.createTexture();
            texture.image = enemyImage;
            enemyTextures.push(texture);
        }

        enemyImage.onload = function () {
            handleLoadedTexture(enemyTextures)
        }
        enemyImage.src = "./img/master.png";//TODO: figure out how to get this from game

        var grassImages = [];
        for(var i=0;i<7;i++) {
            grassTexturesArray[i] = [];
            var pointer = grassTexturesArray[i];

            grassImages[i] = new Image();
            grassImages[i].pointer = pointer;

            var pointer2 = grassImages[i];

            for (var j=0; j < 3; j++) {
                var texture = gl.createTexture();
                texture.image = pointer2;
                pointer.push(texture);
            }

            pointer2.onload = function () {
                handleLoadedTexture(this.pointer);
            }
            pointer2.src = "./img/grass/sprite_" + (i+1) + ".png";
        }



        var indicatorImage = new Image();

        for (var i=0; i < 3; i++) {
            var texture = gl.createTexture();
            texture.image = indicatorImage;
            indicatorTextures.push(texture);
        }

        indicatorImage.onload = function () {
            handleLoadedTexture(indicatorTextures)
        }
        indicatorImage.src = "./img/indicator.png";
    }


    var mvMatrix = mat4.create();
    var mvMatrixStack = [];
    var pMatrix = mat4.create();

    function mvPushMatrix() {
        var copy = mat4.create();
        mat4.set(mvMatrix, copy);
        mvMatrixStack.push(copy);
    }

    function mvPopMatrix() {
        if (mvMatrixStack.length == 0) {
            throw "Invalid popMatrix!";
        }
        mvMatrix = mvMatrixStack.pop();
    }


    function setMatrixUniforms() {
        gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pMatrix);
        gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, mvMatrix);
    }


    function degToRad(degrees) {
        return degrees * Math.PI / 180;
    }


    var xRot = 0;
    var xSpeed = 0;

    var yRot = 0;
    var ySpeed = 0;

    var z = 0.0;

    var filter = 0;

    var zoom = 0.0;

    var currentlyPressedKeys = {};


    function handleKeyDown(event) {
        currentlyPressedKeys[event.keyCode] = true;

        if (String.fromCharCode(event.keyCode) == "F") {
            filter += 1;
            if (filter == 3) {
                filter = 0;
            }
        }
    }


    function handleKeyUp(event) {
        currentlyPressedKeys[event.keyCode] = false;
    }


    function handleKeys() {
        if (currentlyPressedKeys[90]) {
            // Page Up
            z -= 0.05;
        }
        if (currentlyPressedKeys[88]) {
            // Page Down
            z += 0.05;
        }
        if (currentlyPressedKeys[37]) {
            // Left cursor key
            ySpeed -= 1;
        }
        if (currentlyPressedKeys[39]) {
            // Right cursor key
            ySpeed += 1;
        }
        if (currentlyPressedKeys[38]) {
            // Up cursor key
            xSpeed -= 1;
        }
        if (currentlyPressedKeys[40]) {
            // Down cursor key
            xSpeed += 1;
        }
        if (currentlyPressedKeys[13] && zoom >= -3.375) {
            // Down cursor key
            zoom -= 0.075;
            console.log(zoom);
        }
    }


    var squareVertexPositionBuffer;
    var bushVertexPositionBuffer;
    var wallVertexPositionBuffer;
    var heroVertexPositionBuffer;
    var grassVertexPositionBuffer;
    var indicatorVertexPositionBuffer;


    function initBuffers() {

        squareVertexPositionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexPositionBuffer);
        var vertices = [
            -11.0, -4.5,  0.0,
             11.0, -4.5,  0.0,
            -11.0,  5.5,  0.0,
             11.0,  5.5,  0.0
            ];
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        squareVertexPositionBuffer.itemSize = 3;
        squareVertexPositionBuffer.numItems = 4;

        squareVertexTextureCoordBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexTextureCoordBuffer);
        var textureCoords = [
            0.0, 1.15,
            2.2, 1.15,
            0.0, 0.0,
            2.2, 0.0
            ];
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoords), gl.STATIC_DRAW);
        squareVertexTextureCoordBuffer.itemSize = 2;
        squareVertexTextureCoordBuffer.numItems = 4;




        //bush

        bushVertexPositionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, bushVertexPositionBuffer);
        vertices = [
            -1.5, 0.0,  0.0,
             1.5,  0.0,  0.0,
            -1.5,  1.5,  0.0,
             1.5,  1.5,  0.0
            ];
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        bushVertexPositionBuffer.itemSize = 3;
        bushVertexPositionBuffer.numItems = 4;

        bushVertexTextureCoordBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, bushVertexTextureCoordBuffer);
        textureCoords = [
            0.0, 1.0,
            1.0, 1.0,
            0.0, 0.2,
            1.0, 0.2
            ];
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoords), gl.STATIC_DRAW);
        bushVertexTextureCoordBuffer.itemSize = 2;
        bushVertexTextureCoordBuffer.numItems = 4;


        //grass

        grassVertexPositionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, grassVertexPositionBuffer);
        vertices = [
            -0.35, 0.0,  0.0,
             0.35,  0.0,  0.0,
            -0.35,  0.75,  0.0,
             0.35,  0.75,  0.0
            ];
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        grassVertexPositionBuffer.itemSize = 3;
        grassVertexPositionBuffer.numItems = 4;

        grassVertexTextureCoordBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, grassVertexTextureCoordBuffer);
        textureCoords = [
            0.0, 1.0,
            1.0, 1.0,
            0.0, 0.0,
            1.0, 0.0
            ];
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoords), gl.STATIC_DRAW);
        grassVertexTextureCoordBuffer.itemSize = 2;
        grassVertexTextureCoordBuffer.numItems = 4;



        //wall


        wallVertexPositionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, wallVertexPositionBuffer);
        vertices = [
            -11.0, -0.15,  0.0,
             11.0,  -0.15,  0.0,
            -11.0,  6.5,  0.0,
             11.0,  6.5,  0.0
            ];
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        wallVertexPositionBuffer.itemSize = 3;
        wallVertexPositionBuffer.numItems = 4;

        wallVertexTextureCoordBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, wallVertexTextureCoordBuffer);
        textureCoords = [
            0.0, 3.0,
            3.9, 3.0,
            0.0, 0.0,
            3.9, 0.0
            ];
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoords), gl.STATIC_DRAW);
        wallVertexTextureCoordBuffer.itemSize = 2;
        wallVertexTextureCoordBuffer.numItems = 4;


        //hero


        heroVertexPositionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, heroVertexPositionBuffer);
        vertices = [
            -0.5,  0.0,  0.0,
             0.5,  0.0,  0.0,
            -0.5,  2.2,  0.0,
             0.5,  2.2,  0.0
            ];
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        heroVertexPositionBuffer.itemSize = 3;
        heroVertexPositionBuffer.numItems = 4;

        heroVertexTextureCoordBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, heroVertexTextureCoordBuffer);
        textureCoords = [
            0.25, 1.0,
            0.75, 1.0,
            0.25, 0.0,
            0.75, 0.0
            ];
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoords), gl.STATIC_DRAW);
        heroVertexTextureCoordBuffer.itemSize = 2;
        heroVertexTextureCoordBuffer.numItems = 4;

        
        //enemy


        enemyVertexPositionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, enemyVertexPositionBuffer);
        vertices = [
            -1.0,  0.0,  0.0,
             1.0,  0.0,  0.0,
            -1.0,  2.2,  0.0,
             1.0,  2.2,  0.0
            ];
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        enemyVertexPositionBuffer.itemSize = 3;
        enemyVertexPositionBuffer.numItems = 4;

        enemyVertexTextureCoordBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, enemyVertexTextureCoordBuffer);
        textureCoords = [
            0.0, 1.0,
            1.0, 1.0,
            0.0, 0.0,
            1.0, 0.0
            ];
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoords), gl.STATIC_DRAW);
        enemyVertexTextureCoordBuffer.itemSize = 2;
        enemyVertexTextureCoordBuffer.numItems = 4;


        //indicator

        indicatorVertexPositionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, indicatorVertexPositionBuffer);
        vertices = [
            -1.0, 0.0,  0.0,
             1.0,  0.0,  0.0,
            -1.0,  1.0,  0.0,
             1.0,  1.0,  0.0
            ];
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        indicatorVertexPositionBuffer.itemSize = 3;
        indicatorVertexPositionBuffer.numItems = 4;

        indicatorVertexTextureCoordBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, indicatorVertexTextureCoordBuffer);
        textureCoords = [
            0.0, 1.0,
            1.0, 1.0,
            0.0, 0.0,
            1.0, 0.0
            ];
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoords), gl.STATIC_DRAW);
        indicatorVertexTextureCoordBuffer.itemSize = 2;
        indicatorVertexTextureCoordBuffer.numItems = 4;


    }

    var canIdle = false;
    var idleLoop = 0;
    var horizontalIdle = 0;
    var verticleIdle = 0;

    function moveIdle() {
        if(canIdle) {
            if(idleLoop < 25) {
                horizontalIdle = horizontalIdle + 0.01;
            }
            else if(idleLoop < 50) {
                verticleIdle = verticleIdle + 0.01;
            }
            else if(idleLoop < 75) {
                horizontalIdle = horizontalIdle - 0.01;
            }
            else {
                verticleIdle = verticleIdle - 0.01;
            }
            idleLoop++;
            if(idleLoop > 100)
                idleLoop = 0;
        }
        else {
            horizontalIdle = 0;
            verticleIdel = 0;
        }
    }

    var heroX = 0;
    var heroY = 0;

    var enemyX = 0;
    var enemyY = 0;

    var showIndicator = false;
    var whosTurn = false;

    var grassLoop = 0;

    var waitLoop = 0;


    function drawScene() {
        gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        mat4.perspective(45, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0, pMatrix);

        mat4.identity(mvMatrix);

        mat4.translate(mvMatrix, [0.0, 0.0, zoom]);
        mat4.translate(mvMatrix, [0.0, 0.0, z]);

        mat4.translate(mvMatrix, [0.0, -1.5, -5.5]);

        mat4.rotate(mvMatrix, degToRad(280), [1, 0, 0]);

        mat4.rotate(mvMatrix, degToRad(xRot), [1, 0, 0]);
        mat4.rotate(mvMatrix, degToRad(yRot), [0, 1, 0]);

        //wall

        mvPushMatrix();
        mat4.rotate(mvMatrix, degToRad(90), [1, 0, 0]);
        //mat4.rotate(mvMatrix, degToRad(5), [0, 1, 0]);
        mat4.translate(mvMatrix, [0.0, 0.0, -5.5]);

        gl.bindBuffer(gl.ARRAY_BUFFER, wallVertexPositionBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, wallVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, wallVertexTextureCoordBuffer);
        gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, wallVertexTextureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);


        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, wallTextures[filter]);
        gl.uniform1i(shaderProgram.samplerUniform, 0);


        setMatrixUniforms();
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, wallVertexPositionBuffer.numItems);

        mvPopMatrix();


        //floor

         mvPushMatrix();
        // mat4.rotate(mvMatrix, degToRad(rSquare), [1, 0, 0]);

        gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexPositionBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, squareVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexTextureCoordBuffer);
        gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, squareVertexTextureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);


        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, floorTextures[filter]);
        gl.uniform1i(shaderProgram.samplerUniform, 0);

        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        gl.uniform1f(shaderProgram.alphaUniform, 0.6);
        gl.enable(gl.BLEND);
        gl.depthFunc(gl.LESS);
        gl.disable(gl.DEPTH_TEST);



        setMatrixUniforms();
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, squareVertexPositionBuffer.numItems);

        mvPopMatrix();



        //grass


        for(var i=0;i<56;i++) {

            mvPushMatrix();
            // mat4.rotate(mvMatrix, degToRad(rSquare), [1, 0, 0]);
            mat4.rotate(mvMatrix, degToRad(90), [1, 0, 0]);
            mat4.translate(mvMatrix, [(11-(i*.4)), -0.25, -5.4]);

            gl.bindBuffer(gl.ARRAY_BUFFER, grassVertexPositionBuffer);
            gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, grassVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

            gl.bindBuffer(gl.ARRAY_BUFFER, grassVertexTextureCoordBuffer);
            gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, grassVertexTextureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);


            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, grassTexturesArray[((grassLoop+(i*2))%7)][filter]);
            gl.uniform1i(shaderProgram.samplerUniform, 0);

            gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
            gl.uniform1f(shaderProgram.alphaUniform, 0.6);
            gl.enable(gl.BLEND);
            gl.depthFunc(gl.LESS);
            gl.disable(gl.DEPTH_TEST);



            setMatrixUniforms();
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, grassVertexPositionBuffer.numItems);

            mvPopMatrix();


        }

        for(var i=0;i<3;i++) {
            mvPushMatrix();
            // mat4.rotate(mvMatrix, degToRad(rSquare), [1, 0, 0]);
            mat4.rotate(mvMatrix, degToRad(90), [1, 0, 0]);
            mat4.translate(mvMatrix, [(3.5-(i*.4)), -0.25, 1.25]);

            gl.bindBuffer(gl.ARRAY_BUFFER, grassVertexPositionBuffer);
            gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, grassVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

            gl.bindBuffer(gl.ARRAY_BUFFER, grassVertexTextureCoordBuffer);
            gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, grassVertexTextureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);

            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, grassTexturesArray[((grassLoop+(i*2))%7)][filter]);
            gl.uniform1i(shaderProgram.samplerUniform, 0);

            gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
            gl.uniform1f(shaderProgram.alphaUniform, 0.6);
            gl.enable(gl.BLEND);
            gl.depthFunc(gl.LESS);
            gl.disable(gl.DEPTH_TEST);

            setMatrixUniforms();
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, grassVertexPositionBuffer.numItems);

            mvPopMatrix();
        }

        for(var i=0;i<4;i++) {
            mvPushMatrix();
            // mat4.rotate(mvMatrix, degToRad(rSquare), [1, 0, 0]);
            mat4.rotate(mvMatrix, degToRad(90), [1, 0, 0]);
            mat4.translate(mvMatrix, [(-2.5-(i*.4)), -0.25, 1.0]);

            gl.bindBuffer(gl.ARRAY_BUFFER, grassVertexPositionBuffer);
            gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, grassVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

            gl.bindBuffer(gl.ARRAY_BUFFER, grassVertexTextureCoordBuffer);
            gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, grassVertexTextureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);

            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, grassTexturesArray[((grassLoop+(i*2))%7)][filter]);
            gl.uniform1i(shaderProgram.samplerUniform, 0);

            gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
            gl.uniform1f(shaderProgram.alphaUniform, 0.6);
            gl.enable(gl.BLEND);
            gl.depthFunc(gl.LESS);
            gl.disable(gl.DEPTH_TEST);

            setMatrixUniforms();
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, grassVertexPositionBuffer.numItems);

            mvPopMatrix();
        }

        waitLoop++;
        if(waitLoop === 50){
            grassLoop++;
            if(grassLoop >= 7)
                grassLoop = 0;
            waitLoop = 0;
        }



        //bushes

        mvPushMatrix();
        mat4.rotate(mvMatrix, degToRad(90), [1, 0, 0]);
        mat4.rotate(mvMatrix, degToRad(-5), [0, 1, 0]);
        mat4.translate(mvMatrix, [4.0, 0.0, -5.0]);

        gl.bindBuffer(gl.ARRAY_BUFFER, bushVertexPositionBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, bushVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, bushVertexTextureCoordBuffer);
        gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, bushVertexTextureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);


        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, bushTextures[filter]);
        gl.uniform1i(shaderProgram.samplerUniform, 0);

        setMatrixUniforms();
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, bushVertexPositionBuffer.numItems);

        mvPopMatrix();

        mvPushMatrix();
        mat4.rotate(mvMatrix, degToRad(90), [1, 0, 0]);
        mat4.rotate(mvMatrix, degToRad(5), [0, 1, 0]);
        mat4.translate(mvMatrix, [-4.0, 0.0, -5.0]);

        gl.bindBuffer(gl.ARRAY_BUFFER, bushVertexPositionBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, bushVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, bushVertexTextureCoordBuffer);
        gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, bushVertexTextureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);


        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, bushTextures[filter]);
        gl.uniform1i(shaderProgram.samplerUniform, 0);


        setMatrixUniforms();
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, bushVertexPositionBuffer.numItems);

        mvPopMatrix();


        //hero

        moveIdle();

        mvPushMatrix();

        mat4.rotate(mvMatrix, degToRad(90), [1, 0, 0]);
        mat4.translate(mvMatrix, [-3.5, 0.0, -0.5]);
        if(canIdle)
            mat4.translate(mvMatrix, [horizontalIdle, verticleIdle, 0.0]);
        mat4.translate(mvMatrix, [heroX,heroY, 0.0]);

        gl.bindBuffer(gl.ARRAY_BUFFER, heroVertexPositionBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, heroVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, heroVertexTextureCoordBuffer);
        gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, heroVertexTextureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);


        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, heroTextures[filter]);
        gl.uniform1i(shaderProgram.samplerUniform, 0);

        setMatrixUniforms();
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, heroVertexPositionBuffer.numItems);

        mvPopMatrix();

        //enemy

        mvPushMatrix();

        mat4.rotate(mvMatrix, degToRad(90), [1, 0, 0]);
        mat4.translate(mvMatrix, [3.5, 0.0, -0.5]);
        // mat4.translate(mvMatrix, [horizontalIdle, verticleIdle, 0.0]);
         mat4.translate(mvMatrix, [0-(enemyX),enemyY, 0.0]);

        gl.bindBuffer(gl.ARRAY_BUFFER, enemyVertexPositionBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, enemyVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, enemyVertexTextureCoordBuffer);
        gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, enemyVertexTextureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);


        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, enemyTextures[filter]);
        gl.uniform1i(shaderProgram.samplerUniform, 0);

        setMatrixUniforms();
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, enemyVertexPositionBuffer.numItems);

        mvPopMatrix();

        //indicator

        if(showIndicator) {
            mvPushMatrix();

            mat4.rotate(mvMatrix, degToRad(90), [1, 0, 0]);
            if(whosTurn)
                mat4.translate(mvMatrix, [3.5, 2.5, -0.5]);
            else
                mat4.translate(mvMatrix, [-3.5, 2.5, -0.5]);

            gl.bindBuffer(gl.ARRAY_BUFFER, indicatorVertexPositionBuffer);
            gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, indicatorVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

            gl.bindBuffer(gl.ARRAY_BUFFER, indicatorVertexTextureCoordBuffer);
            gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, indicatorVertexTextureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);


            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, indicatorTextures[filter]);
            gl.uniform1i(shaderProgram.samplerUniform, 0);

            setMatrixUniforms();
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, indicatorVertexPositionBuffer.numItems);

            mvPopMatrix();
        }


    }


    var lastTime = 0;

    function animate() {
        var timeNow = new Date().getTime();
        if (lastTime != 0) {
            var elapsed = timeNow - lastTime;

            xRot += (xSpeed * elapsed) / 1000.0;
            yRot += (ySpeed * elapsed) / 1000.0;
        }
        lastTime = timeNow;
    }


    function tick() {
        requestAnimFrame(tick);
        handleKeys();
        drawScene();
        animate();
    }

    var isInitialized = false;

    function webGLStart() {
        if(!isInitialized) {
            var canvas = document.getElementById("battleCanvas");
            initGL(canvas);
            initShaders();
            initBuffers();
            initTexture();

            gl.clearColor(0.0, 0.0, 0.0, 1.0);
            gl.enable(gl.DEPTH_TEST);

            document.onkeydown = handleKeyDown;
            document.onkeyup = handleKeyUp;

            tick();

            isInitialized = true;
        }
    }
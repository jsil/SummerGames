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


    function zoomOut() {
        if(zoom >= -3.375) {
            zoom -= 0.075;
            setTimeout(function(){zoomOut()}, 10);
        }
    }

    function zoomIn() {
        if(zoom <= 0.0) {
            zoom += 0.075;
            setTimeout(function(){zoomIn()}, 10);
        }
    }

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
        

    }


    function drawScene() {
        gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        mat4.perspective(45, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0, pMatrix);

        mat4.identity(mvMatrix);

        mat4.translate(mvMatrix, [0.0, 0.0, zoom]);
        mat4.translate(mvMatrix, [0.0, 0.0, z]);

        mat4.translate(mvMatrix, [0.0, -1.5, -4.6]);

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



    function webGLStart() {
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
    }
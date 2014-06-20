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
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);


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


    var crateTextures = Array();

    function initTexture() {
        var crateImage = new Image();

        for (var i=0; i < 3; i++) {
            var texture = gl.createTexture();
            texture.image = crateImage;
            crateTextures.push(texture);
        }

        crateImage.onload = function () {
            handleLoadedTexture(crateTextures)
        }
        crateImage.src = "./img/grass.gif";
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

    var z = -5.0;

    var filter = 0;


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
        if (currentlyPressedKeys[33]) {
            // Page Up
            z -= 0.05;
        }
        if (currentlyPressedKeys[34]) {
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
    }


    var squareVertexPositionBuffer;
    // var squareVertexColorBuffer;
    var cubeVertexTextureCoordBuffer;
    var cubeVertexIndexBuffer;


    function initBuffers() {

        squareVertexPositionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexPositionBuffer);
        vertices = [
            -10.0, -5.0,  0.0,
             10.0, -5.0,  0.0,
            -10.0,  5.0,  0.0,
             10.0,  5.0,  0.0
            ];
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        squareVertexPositionBuffer.itemSize = 3;
        squareVertexPositionBuffer.numItems = 4;

        squareVertexTextureCoordBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexTextureCoordBuffer);
        var textureCoords = [
            0.0, 4.0,
            4.0, 4.0,
            0.0, 0.0,
            4.0, 0.0
            ];
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoords), gl.STATIC_DRAW);
        squareVertexTextureCoordBuffer.itemSize = 2;
        squareVertexTextureCoordBuffer.numItems = 4;

        // squareVertexIndexBuffer = gl.createBuffer();
        // gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, squareVertexIndexBuffer);
        // var squareVertexIndices = [
        //     1,2,3,4
        // ]
        // gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(squareVertexIndices), gl.STATIC_DRAW);
        // squareVertexIndexBuffer.itemSize = 1;
        // squareVertexIndexBuffer.numItems = 4;
        

    }


    function drawScene() {
        gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        mat4.perspective(45, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0, pMatrix);

        mat4.identity(mvMatrix);

        mat4.translate(mvMatrix, [0.0, -1.0, -7.0]);

        mat4.rotate(mvMatrix, degToRad(90), [1, 0, 0]);

        mat4.rotate(mvMatrix, degToRad(xRot), [1, 0, 0]);
        mat4.rotate(mvMatrix, degToRad(yRot), [0, 1, 0]);

        mvPushMatrix();
        // mat4.rotate(mvMatrix, degToRad(rSquare), [1, 0, 0]);

        gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexPositionBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, squareVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexTextureCoordBuffer);
        gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, squareVertexTextureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);


        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, crateTextures[filter]);
        gl.uniform1i(shaderProgram.samplerUniform, 0);


        setMatrixUniforms();
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, squareVertexPositionBuffer.numItems);

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
























    // var gl;

    // function initGL(canvas) {
    //     try {
    //         gl = canvas.getContext("experimental-webgl");
    //         gl.viewportWidth = canvas.width;
    //         gl.viewportHeight = canvas.height;
    //     } catch (e) {
    //     }
    //     if (!gl) {
    //         alert("Could not initialise WebGL, sorry :-(");
    //     }
    // }


    // function getShader(gl, id) {
    //     var shaderScript = document.getElementById(id);
    //     if (!shaderScript) {
    //         return null;
    //     }

    //     var str = "";
    //     var k = shaderScript.firstChild;
    //     while (k) {
    //         if (k.nodeType == 3) {
    //             str += k.textContent;
    //         }
    //         k = k.nextSibling;
    //     }

    //     var shader;
    //     if (shaderScript.type == "x-shader/x-fragment") {
    //         shader = gl.createShader(gl.FRAGMENT_SHADER);
    //     } else if (shaderScript.type == "x-shader/x-vertex") {
    //         shader = gl.createShader(gl.VERTEX_SHADER);
    //     } else {
    //         return null;
    //     }

    //     gl.shaderSource(shader, str);
    //     gl.compileShader(shader);

    //     if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    //         alert(gl.getShaderInfoLog(shader));
    //         return null;
    //     }

    //     return shader;
    // }


    // var shaderProgram;

    // function initShaders() {
    //     var fragmentShader = getShader(gl, "shader-fs");
    //     var vertexShader = getShader(gl, "shader-vs");

    //     shaderProgram = gl.createProgram();
    //     gl.attachShader(shaderProgram, vertexShader);
    //     gl.attachShader(shaderProgram, fragmentShader);
    //     gl.linkProgram(shaderProgram);

    //     if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    //         alert("Could not initialise shaders");
    //     }

    //     gl.useProgram(shaderProgram);

    //     shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
    //     gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);

    //     shaderProgram.vertexColorAttribute = gl.getAttribLocation(shaderProgram, "aVertexColor");
    //     gl.enableVertexAttribArray(shaderProgram.vertexColorAttribute);

    //     shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
    //     shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
    // }


    // var mvMatrix = mat4.create();
    // var mvMatrixStack = [];
    // var pMatrix = mat4.create();

    // function mvPushMatrix() {
    //     var copy = mat4.create();
    //     mat4.set(mvMatrix, copy);
    //     mvMatrixStack.push(copy);
    // }

    // function mvPopMatrix() {
    //     if (mvMatrixStack.length == 0) {
    //         throw "Invalid popMatrix!";
    //     }
    //     mvMatrix = mvMatrixStack.pop();
    // }


    // function setMatrixUniforms() {
    //     gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pMatrix);
    //     gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, mvMatrix);
    // }


    // function degToRad(degrees) {
    //     return degrees * Math.PI / 180;
    // }


    // // var triangleVertexPositionBuffer;
    // // var triangleVertexColorBuffer;
    // var squareVertexPositionBuffer;
    // var squareVertexColorBuffer;

    // function initBuffers() {
    //     // triangleVertexPositionBuffer = gl.createBuffer();
    //     // gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexPositionBuffer);
    //     // var vertices = [
    //     //      0.0,  1.0,  0.0,
    //     //     -1.0, -1.0,  0.0,
    //     //      1.0, -1.0,  0.0
    //     // ];
    //     // gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    //     // triangleVertexPositionBuffer.itemSize = 3;
    //     // triangleVertexPositionBuffer.numItems = 3;

    //     // triangleVertexColorBuffer = gl.createBuffer();
    //     // gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexColorBuffer);
    //     // var colors = [
    //     //     1.0, 0.0, 0.0, 1.0,
    //     //     0.0, 1.0, 0.0, 1.0,
    //     //     0.0, 0.0, 1.0, 1.0,
    //     // ];
    //     // gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
    //     // triangleVertexColorBuffer.itemSize = 4;
    //     // triangleVertexColorBuffer.numItems = 3;


    //     squareVertexPositionBuffer = gl.createBuffer();
    //     gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexPositionBuffer);
    //     vertices = [
    //          5.0,  0.0,  -10.0,
    //         -5.0,  0.0,  -10.0,
    //          5.0, -1.0,  0.0,
    //         -5.0, -1.0,  0.0
    //         ];
    //     gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    //     squareVertexPositionBuffer.itemSize = 3;
    //     squareVertexPositionBuffer.numItems = 4;

    //     squareVertexColorBuffer = gl.createBuffer();
    //     gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexColorBuffer);
    //     colors = [
    //         0.05, 0.05, 0.05, 1.0,
    //         0.05, 0.05, 0.05, 1.0,
    //         0.25, 0.25, 0.25, 1.0,
    //         0.25, 0.25, 0.25, 1.0
    //         ];
    //     gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
    //     squareVertexColorBuffer.itemSize = 4;
    //     squareVertexColorBuffer.numItems = 4;
    // }

    // var currentlyPressedKeys = {};

    // function handleKeyDown(event) {
    //     currentlyPressedKeys[event.keyCode] = true;

    //     if (String.fromCharCode(event.keyCode) == "F") {
    //         filter += 1;
    //         if (filter == 3) {
    //             filter = 0;
    //         }
    //     }
    // }

    // function handleKeyUp(event) {
    //     currentlyPressedKeys[event.keyCode] = false;
    // }

    // function handleKeys() {
    //     // if (currentlyPressedKeys[33]) {
    //     //     // Page Up
    //     //     z -= 0.05;
    //     // }
    //     // if (currentlyPressedKeys[34]) {
    //     //     // Page Down
    //     //     z += 0.05;
    //     // }
    //     // if (currentlyPressedKeys[37]) {
    //     //     // Left cursor key
    //     //     console.log("left");
    //     // }
    //     // if (currentlyPressedKeys[39]) {
    //     //     // Right cursor key
    //     //     console.log("right");
    //     // }
    //     // if (currentlyPressedKeys[38]) {
    //     //     // Up cursor key
    //     //     console.log("up");
    //     // }
    //     // if (currentlyPressedKeys[40]) {
    //     //     // Down cursor key
    //     //     console.log("down");
    //     // }
    // }


    // // var rTri = 0;
    // // var rSquare = 0;

    // function drawScene() {
    //     handleKeys();
    //     gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    //     gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    //     mat4.perspective(45, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0, pMatrix);

    //     mat4.identity(mvMatrix);

    //     //mat4.translate(mvMatrix, [-1.5, 0.0, -7.0]);

    //     // mvPushMatrix();
    //     // mat4.rotate(mvMatrix, degToRad(rTri), [0, 1, 0]);

    //     // gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexPositionBuffer);
    //     // gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, triangleVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

    //     // gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexColorBuffer);
    //     // gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, triangleVertexColorBuffer.itemSize, gl.FLOAT, false, 0, 0);

    //     // setMatrixUniforms();
    //     // gl.drawArrays(gl.TRIANGLES, 0, triangleVertexPositionBuffer.numItems);
    //     // mvPopMatrix();


    //     //mat4.translate(mvMatrix, [0.0, 0.0, 0.0]);

    //     mvPushMatrix();
    //     //mat4.rotate(mvMatrix, degToRad(rSquare), [1, 0, 0]);

    //     gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexPositionBuffer);
    //     gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, squareVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

    //     gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexColorBuffer);
    //     gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, squareVertexColorBuffer.itemSize, gl.FLOAT, false, 0, 0);

    //     setMatrixUniforms();
    //     gl.drawArrays(gl.TRIANGLE_STRIP, 0, squareVertexPositionBuffer.numItems);

    //     mvPopMatrix();
    // }


    // var lastTime = 0;

    // function animate() {
    //     var timeNow = new Date().getTime();
    //     if (lastTime != 0) {
    //         var elapsed = timeNow - lastTime;

    //         //rTri += (90 * elapsed) / 1000.0;
    //         //rSquare += (75 * elapsed) / 1000.0;
    //     }
    //     lastTime = timeNow;
    // }


    // function tick() {
    //     requestAnimFrame(tick);
    //     drawScene();
    //     animate();
    // }


    // function webGLStart() {
    //     var canvas = document.getElementById("battleCanvas");
    //     initGL(canvas);
    //     initShaders()
    //     initBuffers();

    //     document.onkeydown = handleKeyDown;
    //     document.onkeyup = handleKeyUp;

    //     gl.clearColor(0.0, 0.0, 0.0, 1.0);
    //     gl.enable(gl.DEPTH_TEST);

    //     tick();
    // }


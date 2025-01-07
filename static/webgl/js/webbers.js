import { WebGL } from './WebGL';
import { initBuffers } from './init-buffers';
import { drawScene } from './draw-scene';

function main(parent) {
    // let parent = document.getElementById('webGL');
    let webGL = new WebGL(parent);
    let gl = webGL.getGL();
    let cubeRotation = 0.0;
    let deltaTime = 0;

    if (gl === null) {
        alert('Failed to initialize WebGL. Your browser or machine may not support it.');
        return;
    }

    const parentStyles = getComputedStyle(parent);
    const bgColor = parentStyles.backgroundColor;
    console.log(bgColor);
    const rgba = bgColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+),?\s*([\d.]*)\)/);
    if (rgba) {
        const r = parseInt(rgba[1], 10) / 255;
        const g = parseInt(rgba[2], 10) / 255;
        const b = parseInt(rgba[3], 10) / 255;
        const a = rgba[4] ? parseFloat(rgba[4]) : 1.0;
        console.log(r, g, b, a);
        gl.clearColor(r, g, b, a);
    } else {
        gl.clearColor(0.0, 0.0, 0.0, 1.0); // Fallback to black
    }

    // gl.clearColor(0.0, 0.0, 0.0, 1.0); // Clear to black, fully opaque
    gl.clear(gl.COLOR_BUFFER_BIT); // Clear everything

    const vsSource = `
        attribute vec4 aVertexPosition;
        attribute vec4 aVertexColor;

        uniform mat4 uModelViewMatrix;
        uniform mat4 uProjectionMatrix;

        varying lowp vec4 vColor;

        void main() {
            gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
            vColor = aVertexColor;
        }
    `;

    const fsSource = `
        varying lowp vec4 vColor;

        void main(void) {
            gl_FragColor = vColor;
        }
    `;

    const shaderProgram = initShaderProgram(gl, vsSource, fsSource);

    const programInfo = {
        program: shaderProgram,
        attribLocations: {
            vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
            vertexColor: gl.getAttribLocation(shaderProgram, 'aVertexColor'),
        },
        uniformLocations: {
            projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
            modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
        },
    };

    const buffers = initBuffers(gl);
    // drawScene(gl, programInfo, buffers);
    let then = 0;

    function render(now) {
        now *= 0.001; // Convert to seconds
        deltaTime = now - then;
        then = now;

        drawScene(gl, programInfo, buffers, cubeRotation);
        cubeRotation += deltaTime;

        requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
}

function initShaderProgram(gl, vsSource, fsSource) {
    const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

    // Create shader program
    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader); // Attach vertex shader
    gl.attachShader(shaderProgram, fragmentShader); // Attach fragment shader
    gl.linkProgram(shaderProgram); // Link program
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    // Check if linking failed
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert(`Unable to initialize the shader program: ${gl.getProgramInfoLog(shaderProgram)}`);
        return null;
    }

    return shaderProgram;
}

// Create a shader of the given type, upload the source and compile it
function loadShader(gl, type, source) {
    const shader = gl.createShader(type); // Create shader object
    gl.shaderSource(shader, source); // Send source to shader object
    gl.compileShader(shader); // Compile shader program

    // Check if compilation failed
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert(`An error occurred compiling the shaders: ${gl.getShaderInfoLog(shader)}`);
        gl.deleteShader(shader);
        return null;
    }

    return shader;
}

// main();

export { main };
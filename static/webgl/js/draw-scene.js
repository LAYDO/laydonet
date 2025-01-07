import { mat4 } from 'gl-matrix';

function drawScene(gl, programInfo, buffers, cubeRotation) {
    gl.clearColor(0.0, 0.0, 0.0, 1.0); // Clear to black, fully opaque
    gl.clearDepth(1.0); // Clear everything
    gl.enable(gl.DEPTH_TEST); // Enable depth testing
    gl.depthFunc(gl.LEQUAL); // Near things obscure far things

    // Clear the canvas before we start drawing on it
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // Create perspective matrix, a special matrix that is
    // used to simulate the distortion of perspective in a camera.
    // Our field of view is 45 degrees, with a width/height
    // ratio that matches the display size of the canvas
    // and we only want to see objects between 0.1 units
    // and 100 units away from the camera.

    const fieldOfView = 45 * Math.PI / 180; // In radians
    const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    const zNear = 0.1;
    const zFar = 100;
    const projectionMatrix = mat4.create();

    // note: glmatrix.js always has the first argument
    // as the destination to receive the result.
    mat4.perspective(projectionMatrix, fieldOfView, aspect, zNear, zFar);

    // Set drawing position to center of the scene
    const modelViewMatrix = mat4.create();

    // Move drawing position a bit to where we want to start drawing the square
    mat4.translate(modelViewMatrix, modelViewMatrix, [-0.0, 0.0, -6.0]);

    mat4.rotate(
        modelViewMatrix, // destination matrix
        modelViewMatrix, // matrix to rotate
        cubeRotation, // amount to rotate in radians
        [0, 0, 1],
    ); // axis to rotate around (Z)
    mat4.rotate(
        modelViewMatrix, // destination matrix
        modelViewMatrix, // matrix to rotate
        cubeRotation * 0.7, // amount to rotate in radians
        [0, 1, 0],
    ); // axis to rotate around (Y)
    mat4.rotate(
        modelViewMatrix, // destination matrix
        modelViewMatrix, // matrix to rotate
        cubeRotation * 0.3, // amount to rotate in radians
        [1, 0, 0],
    ); // axis to rotate around (X)


    // Tell WebGL how to pull out the positions from the position buffer
    // into the vertexPosition attribute
    setPositionAttribute(gl, buffers, programInfo);

    setColorAttribute(gl, buffers, programInfo);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices);

    // Tell WebGL to use our program when drawing
    gl.useProgram(programInfo.program);

    // Set shader uniforms
    gl.uniformMatrix4fv(programInfo.uniformLocations.projectionMatrix, false, projectionMatrix);
    gl.uniformMatrix4fv(programInfo.uniformLocations.modelViewMatrix, false, modelViewMatrix);

    {
        const offset = 0;
        const type = gl.UNSIGNED_SHORT;
        const vertexCount = 36;
        gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
    }
}

function setPositionAttribute(gl, buffers, programInfo) {
    const numComponents = 3; // Pull out 2 values per iteration
    const type = gl.FLOAT; // The data in the buffer is 32bit floats
    const normalize = false; // Don't normalize
    const stride = 0; // How many bytes to get from one set of values to the next
    // 0 = use type and numComponents above
    const offset = 0; // How many bytes inside the buffer to start from

    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
    gl.vertexAttribPointer(programInfo.attribLocations.vertexPosition, numComponents, type, normalize, stride, offset);
    gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
}

function setColorAttribute(gl, buffers, programInfo) {
    const numComponents = 4; // Pull out 4 values per iteration
    const type = gl.FLOAT; // The data in the buffer is 32bit floats
    const normalize = false; // Don't normalize
    const stride = 0; // How many bytes to get from one set of values to the next
    // 0 = use type and numComponents above
    const offset = 0; // How many bytes inside the buffer to start from

    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.color);
    gl.vertexAttribPointer(programInfo.attribLocations.vertexColor, numComponents, type, normalize, stride, offset);
    gl.enableVertexAttribArray(programInfo.attribLocations.vertexColor);
}

export { drawScene };
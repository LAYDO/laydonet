export class WebGL {
    private canvas: HTMLCanvasElement;
    private gl: WebGLRenderingContext;

    constructor(parent: HTMLElement) {
        this.canvas = document.createElement('canvas');
        this.canvas.width = 960;
        this.canvas.height = 540;
        this.gl = this.canvas.getContext('webgl') as WebGLRenderingContext;
        parent.appendChild(this.canvas);
    }

    public getGL(): WebGLRenderingContext {
        return this.gl;
    }
}
export class WebGL {
    private canvas: HTMLCanvasElement;
    private gl: WebGLRenderingContext;

    constructor(parent: HTMLElement) {
        if (!parent) {
            throw new Error('Parent element is required');
        }
        this.canvas = document.createElement('canvas');
        this.canvas.width = parent.clientWidth ? parent.clientWidth : 960;
        this.canvas.height = parent.clientHeight ? parent.clientHeight : 540;
        const parentStyles = getComputedStyle(parent);
        this.canvas.style.borderRadius = parentStyles.borderRadius;
        this.canvas.style.backgroundColor = 'transparent';
        this.gl = this.canvas.getContext('webgl', { alpha: true}) as WebGLRenderingContext;
        parent.appendChild(this.canvas);
    }

    public getGL(): WebGLRenderingContext {
        return this.gl;
    }
}
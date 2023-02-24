import { Container, Sprite } from "pixi.js";

export class Scene extends Container {
    private clampy: Sprite;
    constructor(screenWidth: number, screenHeight: number) {
        super();

        // Clampy has nothing to do here, but I couldn't left it outside, poor thing
        this.clampy = Sprite.from("clampy.png");
        this.clampy.anchor.set(0.5);
        this.clampy.x = screenWidth / 2;
        this.clampy.y = screenHeight / 2;
        this.addChild(this.clampy);

        // No pixi here, All HTML DOM baby!
        document.addEventListener("keydown", this.onKeyDown.bind(this));
        document.addEventListener("keyup", this.onKeyUp.bind(this));
    }

    private onKeyDown(e: KeyboardEvent): void {
        console.log("KeyDown event fired!", e);

        // Most likely, you will switch on this:
        // e.code // if you care about the physical location of the key
        // e.key // if you care about the character that the key represents
    }

    private onKeyUp(e: KeyboardEvent): void {
        console.log("KeyUp event fired!", e);

        // Most likely, you will switch on this:
        // e.code // if you care about the physical location of the key
        // e.key // if you care about the character that the key represents
    }
}


import { AnimatedSprite, Container, Texture, TextureSource } from "pixi.js";

export class Scene extends Container {
    constructor() {
        super();

        const clampyFrames: Array<TextureSource> = [
          "clampy_sequence_01.png",
          "clampy_sequence_02.png",
          "clampy_sequence_03.png",
          "clampy_sequence_04.png"
        ];

        const animatedClampy: AnimatedSprite = new AnimatedSprite(clampyFrames.map((stringy) => Texture.from(stringy)));

        this.addChild(animatedClampy);

        animatedClampy.onFrameChange = this.onClampyFrameChange.bind(this);
    }

    private onClampyFrameChange(currentFrame: number): void {
        console.log("Clampy's current frame is", currentFrame);
    }
}

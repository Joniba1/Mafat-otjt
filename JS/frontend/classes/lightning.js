class Lightning extends Sprite {
    constructor(position, imageSrc, framesMax = 1, scale = 1) {
        super({
            position,
            imageSrc,
            framesMax,
            scale,
        });

        this.framesElapsed = 0;
        this.framesHold = 4; // Animation's speed
    }
}
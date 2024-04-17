class Firework extends Sprite {
    constructor(position, imageSrc, framesMax = 4, scale = 1) {
        super({
            position,
            imageSrc,
            framesMax,
            scale,
        });

        this.framesElapsed = 0;
        this.framesHold = 9; // Animation's speed
    }

    update(posX, posY) {
        this.position.x = posX;
        this.position.y = posY;
        this.draw();
        this.animateFrames();
    }
}
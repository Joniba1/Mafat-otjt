class Fireball extends Sprite {
    constructor(position, velocity, imageSrc, framesMax = 1, scale = 1) {
        super({
            position,
            imageSrc,
            framesMax,
            scale,
        });

        this.velocity = velocity;
        this.framesElapsed = 0;
        this.framesHold = 9; // Animation's speed
    }

    move() {
        this.position.x += this.velocity;
        this.position.y += this.velocity;
    }
}
class Knight extends Sprite {
    constructor(index, { position, velocity, imageSrc, scale = 1, framesMax = 1, sprites }) {

        super({
            position,
            imageSrc,
            scale,
            framesMax,
        });

        this.index = index;
        this.velocity = velocity;

        this.health = 100;
        this.isAttacking = false;

        this.framesCurrent = 0;
        this.framesElapsed = 0;
        this.framesHold = 9; //Animation's speed
        this.sprites = sprites;

        for (const sprite in sprites) {
            sprites[sprite].image = new Image();
            sprites[sprite].image.src = sprites[sprite].imageSrc;
        }
    }

    update(targetX, targetY) {
        this.draw();
        this.animateFrames();

        const dx = targetX - this.position.x;
        const dy = targetY - this.position.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        const threshold = 2; // Set threshold value

        if (distance > threshold) {
            const vx = (dx / distance) * this.velocity.x;
            const vy = (dy / distance) * this.velocity.y;

            this.position.x += vx;
            this.position.y += vy;
        } else {
            this.position.x = targetX;
            this.position.y = targetY;
        }
    }
}


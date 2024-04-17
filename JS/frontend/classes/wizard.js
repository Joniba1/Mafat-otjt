class Wizard extends Sprite {
    constructor(index, { position, imageSrc, scale = 1, framesMax = 1, sprites, fireballSrc }) {
        super({
            position,
            imageSrc,
            scale,
            framesMax,
        });

        this.index = index;
        this.position = position;
        this.health = 70;

        this.framesCurrent = 0;
        this.framesElapsed = 0;
        this.framesHold = 9; // Animation's speed
        this.sprites = sprites;
        this.fireballSrc = fireballSrc;

        // You can create a fireball instance when needed
        this.fireball = new Fireball(
            { x: this.position.x, y: this.position.y }, //Start position
            10, //Velocity
            this.fireballSrc, //ImageSrc
            5, //FramesMax
            0.5)   //Scale

        for (const sprite in sprites) {
            sprites[sprite].image = new Image();
            sprites[sprite].image.src = sprites[sprite].imageSrc;
        }
    }


    fire(targetX, targetY, drawFireball) {
        const dx = targetX - this.fireball.position.x;
        const dy = targetY - this.fireball.position.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const threshold = 5; // Set threshold value

        if (distance > threshold) {

            const vx = (dx / distance) * this.fireball.velocity;
            const vy = (dy / distance) * this.fireball.velocity;

            if (drawFireball) {
                this.fireball.position.x += vx;
                this.fireball.position.y += vy;
                this.fireball.update();
            }
        } else {
            this.fireball.position.x = targetX;
            this.fireball.position.y = targetY;
        }
    }
}
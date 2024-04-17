class Sprite {
    constructor({ position, imageSrc, scale = 1, framesMax = 1 }) {
        this.position = position;
        this.width = 40;
        this.height = 60;
        this.image = new Image();
        this.image.src = imageSrc;
        this.scale = scale;
        this.framesMax = framesMax;
        this.framesCurrent = 0;
        this.framesElapsed = 0;
        this.framesHold = 1; //Animation's speed
        this.thrustFramesElapsed = 0;
        this.currentSprite = 'idle';
    }

    switchSprites(sprite) {
        switch (sprite) {
            case 'idle':
                if (this.image !== this.sprites.idle.image) {
                    this.image = this.sprites.idle.image;
                    this.framesMax = this.sprites.idle.framesMax;
                    this.framesCurrent = 0;
                    this.currentSprite = 'idle';

                }
                break;
            case 'walk':
                if (this.image !== this.sprites.walk.image) {
                    this.image = this.sprites.walk.image;
                    this.framesMax = this.sprites.walk.framesMax;
                    this.framesCurrent = 0;
                    this.currentSprite = 'walk';

                }
                break;
            case 'thrust':
                if (this.image !== this.sprites.thrust.image) {
                    this.image = this.sprites.thrust.image;
                    this.framesMax = this.sprites.thrust.framesMax;
                    this.framesElapsed = 0;
                    this.thrustFramesElapsed = 0;
                    this.framesHold = 5; //Animation's speed
                    this.currentSprite = 'thrust';
                }
                break;
            case 'stomping':
                if (this.image !== this.sprites.stomping.image) {
                    this.image = this.sprites.stomping.image;
                    this.framesMax = this.sprites.stomping.framesMax;
                    this.framesCurrent = 0;
                    this.currentSprite = 'stomping';
                    this.scale = 0.6;
                    this.position.y = this.position.y + 30;
                }
                break;
        }
    }

    draw() {
        ctx.drawImage(
            this.image,
            this.framesCurrent * (this.image.width / this.framesMax),
            0,
            this.image.width / this.framesMax,
            this.image.height,
            this.position.x,
            this.position.y,
            (this.image.width / this.framesMax) * this.scale,
            this.image.height * this.scale);
    }

    update() {
        this.draw();
        this.animateFrames();
    }

    animateFrames() {
        this.framesElapsed++;
        // Check if it's time to change frames
        if (this.framesElapsed % this.framesHold === 0) {
            // Change frames
            if (this.framesCurrent < this.framesMax - 1) {
                this.framesCurrent++;
            } else {
                this.framesCurrent = 0;
            }
        }
    }
}


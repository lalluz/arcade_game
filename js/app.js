var score = 0;
var record = 0;
var scoreSpan = document.querySelector('#score');
var recordSpan = document.querySelector('#record');

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // Ensure the game runs at the same speed for all computers.
    this.x += this.speed * dt;
    this.resetPosition();
    this.checkCollision();
};

// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Reset enemy's position when reaches canvas end
Enemy.prototype.resetPosition = function() {
    if (this.x > 550) {
        this.x = -100;
        this.speed = 100 + Math.floor(Math.random() * 200);
    }
};

// Check for collision between player and enemies
Enemy.prototype.checkCollision = function() {
    if (player.x < this.x + 50 &&
        player.x > this.x - 50 &&
        player.y < this.y + 70 &&
        player.y > this.y - 70) {
            player.x = 200;
            player.y = 380;
            // Update score
            score = 0;
            scoreSpan.textContent = score;
    }
};

// Player that has to reach the water
var Player = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/char-boy.png';
};

// Update the enemy's position, required method for game
Player.prototype.update = function() {
    // Prevent player from moving out of canvas
    if (this.x > 400) {
        this.x = 400;
    }
    if (this.x < 0) {
        this.x = 0;
    }
    if (this.y > 380) {
        this.y = 380;
    }
    // Check if player reaches top of canvas
    if (this.y < -15) {
        this.x = 200;
        this.y = 380;
        // Update score and record
        score += 1;
        scoreSpan.textContent = score;
        if (score > record) {
            record += 1;
            recordSpan.textContent = record;
        }
    }
};

// Draw the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Handle player moves
Player.prototype.handleInput = function(keyPress) {
    switch (keyPress) {
        case 'left':
            this.x -= this.speed + 15;
            break;
        case 'up':
            this.y -= this.speed + 15;
            break;
        case 'right':
            this.x += this.speed + 15;
            break;
        case 'down':
            this.y += this.speed + 15;
            break;
    }
};

// Create objects
var player = new Player(200, 380, 50);

var enemy1 = new Enemy(0, 60, 200);
var enemy2 = new Enemy(0, 140, 150);
var enemy3 = new Enemy(0, 220, 100);

var allEnemies = [enemy1, enemy2, enemy3];


// This listens for key presses and sends the keys to
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

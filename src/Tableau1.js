class Tableau1 extends Phaser.Scene {


    preload() {
        // carré
        this.load.image('carre', 'assets/carre.png')
        // cercle
        this.load.image('cercle', 'assets/cercle.png')
    }

    create() {
        this.hauteur = 500
        this.largeur = 1000

        // Barre du haut
        this.haut = this.physics.add.image(0, 0, 'carre').setOrigin(0, 0);
        this.haut.setDisplaySize(this.largeur, 20)
        this.haut.body.setAllowGravity(false)
        this.haut.setImmovable(true)
        // Barre du bas
        this.bas = this.physics.add.image(0, this.hauteur - 20, 'carre').setOrigin(0, 0);
        this.bas.setDisplaySize(this.largeur, 20)
        this.bas.body.setAllowGravity(false)
        this.bas.setImmovable(true)
        // Balle
        this.balle = this.physics.add.image(this.largeur / 2, this.hauteur / 2, 'cercle').setOrigin(0, 0);
        this.balle.setDisplaySize(20, 20)
        this.balle.body.setBounce(1.5, 1.5)
        this.balle.setVelocityX(Phaser.Math.Between(200, -200))
        this.balle.setVelocityY(Phaser.Math.Between(0, 10))
        this.balle.body.setMaxVelocity(500, 500)

        // Raquette droite
        this.droite = this.physics.add.image(0, this.hauteur / 2 - 50, 'carre').setOrigin(0, 0);
        this.droite.setDisplaySize(20, 100)
        this.droite.body.setAllowGravity(false)
        this.droite.setImmovable(true)
        this.droite.body.setMaxVelocityY(200, -200)

        // Raquette gauche
        this.gauche = this.physics.add.image(this.largeur - 20, this.hauteur / 2 - 50, 'carre').setOrigin(0, 0);
        this.gauche.setDisplaySize(20, 100)
        this.gauche.body.setAllowGravity(false)
        this.gauche.setImmovable(true)
        this.gauche.body.setMaxVelocityY(200, -200)

        let me = this;
        this.physics.add.collider(this.balle, this.bas)
        this.physics.add.collider(this.balle, this.haut)
        this.physics.add.collider(this.balle, this.droite, function () {
            console.log("touchedroit")
            me.rebond(me.droite);
        });
        this.physics.add.collider(this.balle, this.gauche, function (){
            console.log("touchegauche")
            me.rebond(me.gauche);
        });
        this.physics.add.collider(this.droite, this.bas)
        this.physics.add.collider(this.haut, this.droite)


        this.initKeyboard();

    }

    rebond(raquette)
    {
        let hauteurRaquette = raquette.displayHeight;

        let positionRelativeRaquette = (this.balle.y - raquette.y);

        positionRelativeRaquette = (positionRelativeRaquette / hauteurRaquette)
        positionRelativeRaquette = positionRelativeRaquette*2-1;

        this.balle.setVelocityY(this.balle.body.velocity.y + positionRelativeRaquette * 50);

    }


    initKeyboard() {
        let me = this;
        this.input.keyboard.on('keyup', function (kevent) {
            switch (kevent.keyCode) {
                // J1 = A pour allez vers le haut et Q pour allez vers le bas
                // J2 = P pour allez vers le haut et M pour allez vers le bas
                case Phaser.Input.Keyboard.KeyCodes.A:
                    me.droite.setVelocityY(0)
                    break;

                case Phaser.Input.Keyboard.KeyCodes.Q:
                    me.droite.setVelocityY(0)
                    break;

                case Phaser.Input.Keyboard.KeyCodes.P:
                    me.gauche.setVelocityY(0)
                    break;

                case Phaser.Input.Keyboard.KeyCodes.M:
                    me.gauche.setVelocityY(0)
                    break;

            }
        });
        this.input.keyboard.on('keydown', function (kevent) {
            switch (kevent.keyCode) {
                case Phaser.Input.Keyboard.KeyCodes.A:
                    me.droite.setVelocityY(-200)
                    break;

                case Phaser.Input.Keyboard.KeyCodes.Q:
                    me.droite.setVelocityY(200)
                    break;

                case Phaser.Input.Keyboard.KeyCodes.P:
                    me.gauche.setVelocityY(-200)
                    break;

                case Phaser.Input.Keyboard.KeyCodes.M:
                    me.gauche.setVelocityY(200)
                    break;

            }
        });

    }

    update() {
        if (this.balle.x > this.largeur) {
            this.balle.x = 0
        }
        if (this.balle.y < 0) {
            this.balle.y = 0
        }
        if (this.balle.y > this.hauteur) {
            this.balle.y = this.hauteur
        }

        /**
         * if(this.droite.x < 0){
            this.droite.x = 0
        }
         if(this.droite.x > this.longeur-70){
            this.droite.x = this.longeur-70
        }
         */

    }
}

import * as p5 from 'p5';
import { World, Bodies, Engine, Body } from 'matter-js';


class Player {
    s: p5;
    body: Body;
    Grounded: boolean;
    Spiked: boolean;

    constructor(s: p5, engine: Engine, posx: number, posy: number, width: number, height: number) {
        this.s = s;
        this.body = Bodies.rectangle(posx, posy, width, height);

        //makes the player stay upright
        Body.setInertia(this.body, Infinity);
        this.Grounded = true
        this.Spiked = false

        World.add(engine.world, [this.body]);
    }


    update() {
        // WASD keys move the player
        if (this.s.keyIsDown(87) && this.Grounded == true) {
            Body.applyForce(this.body, this.body.position, { x: 0, y: -0.075 });
        } 
        if (this.s.keyIsDown(65)) {
            Body.applyForce(this.body, this.body.position, { x: -0.005, y: 0 });
        }
        if (this.s.keyIsDown(68)) {
            Body.applyForce(this.body, this.body.position, { x: +0.005, y: 0 });
        }   
        if (this.s.keyIsDown(83)) {
            Body.applyForce(this.body, this.body.position, { x: 0, y: +0.1})
        }
        if (this.Spiked == true){
          Body.setPosition(this.body, {x: -150, y: 700});
         }
            
            
    }

    draw() {
        this.s.fill('green');

        this.s.beginShape()
        this.body.vertices.forEach(vertex => {
            this.s.vertex(vertex.x, vertex.y);
        })
        this.s.endShape(this.s.CLOSE);
    }
}
export default Player;
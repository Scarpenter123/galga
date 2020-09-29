info.setLife(3)
let Spaceplane = sprites.create(img`
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . 6 6 . . . . . . . . . . .
    2 4 2 6 6 6 6 6 6 6 f . . . . .
    2 4 4 6 6 6 6 6 6 6 6 6 . . . .
    4 4 2 6 . . . 7 7 7 . . . . . .
    . . . . . . 7 7 7 . . . . . . .
    . . . . . . 7 7 . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
`)
Spaceplane.setKind(SpriteKind.Player)
Spaceplane.setFlag(SpriteFlag.StayInScreen, true)
controller.moveSprite(Spaceplane, 200, 200)
controller.A.onEvent(ControllerButtonEvent.Pressed, function on_a_pressed() {
    let dart = sprites.createProjectileFromSprite(img`
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . f f f f 2 2 . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    `, Spaceplane, 200, 0)
})
game.onUpdateInterval(500, function on_update_interval() {
    let bogey = sprites.create(img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . 6 6 6 6 . . . . . .
        . . . . . . 6 6 6 6 6 6 . . . .
        . . . . . 6 6 6 6 6 6 6 . . . .
        . . . . . . . 6 6 6 6 6 6 . . .
        . . . . . . . . 6 6 6 6 6 6 . .
        . . . . . . . 6 6 6 6 6 6 . . .
        . . . . . 6 6 6 6 6 6 6 . . . .
        . . . . . . 6 6 6 6 6 6 . . . .
        . . . . . . 6 6 6 6 . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
    `)
    bogey.setKind(SpriteKind.Enemy)
    bogey.setVelocity(-100, 0)
    bogey.setPosition(180, randint(0, 120))
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function on_on_overlap(sprite: Sprite, otherSprite: Sprite) {
    otherSprite.destroy()
    info.changeLifeBy(-1)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function on_overlap(sprite: Sprite, otherSprite: Sprite) {
    otherSprite.destroy()
    sprite.destroy(effects.fire, 100)
    info.changeScoreBy(1)
})

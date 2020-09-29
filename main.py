info.set_life(3)

Spaceplane = sprites.create(img("""
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
"""))
Spaceplane.set_kind(SpriteKind.player)
Spaceplane.set_flag(SpriteFlag.STAY_IN_SCREEN, True)
controller.move_sprite(Spaceplane, 200, 200)

def on_a_pressed():
    dart = sprites.create_projectile_from_sprite(img("""
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
    """), Spaceplane, 200, 0)     
controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed)

def on_update_interval():
    bogey = sprites.create(img("""
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
    """))
    bogey.set_kind(SpriteKind.enemy)
    bogey.set_velocity(-100,0)
    bogey.set_position(180, randint(0, 120))
game.on_update_interval(500, on_update_interval)

def on_on_overlap(sprite, otherSprite):
    otherSprite.destroy()
    info.change_life_by(-1)
sprites.on_overlap(SpriteKind.player, SpriteKind.enemy, on_on_overlap)

def on_overlap(sprite, otherSprite):
    otherSprite.destroy()
    sprite.destroy(effects.fire, 100)
    info.change_score_by(1)
sprites.on_overlap(SpriteKind.projectile, SpriteKind.enemy, on_overlap)


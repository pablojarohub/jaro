/**
 * ============================================================
 * BULLETS - Moduł logiki pocisków
 * ============================================================
 * 
 * Odpowiada za tworzenie, aktualizację i rysowanie pocisków.
 */

const Bullets = (function () {
    // Prywatne zmienne
    let canvas = null;
    let ctx = null;
    let bullets = [];
    let utils = null;
    let player = null;
    let shootCooldown = 0;
    const SHOOT_COOLDOWN_MAX = 15;    // minimalny odstęp między strzałami (w klatkach)

    /**
     * Inicjalizuje moduł pocisków
     * @param {HTMLCanvasElement} canvasElement - Element canvas
     * @param {CanvasRenderingContext2D} context - Kontekst 2D canvas
     * @param {Object} utilsModule - Moduł z funkcjami pomocniczymi
     * @param {Object} playerModule - Moduł gracza
     */
    function init(canvasElement, context, utilsModule, playerModule, keysObject) {
        canvas = canvasElement;
        ctx = context;
        utils = utilsModule;
        player = playerModule;
        keys = keysObject;
    }

    /**
     * Tworzy nowy pocisk wystrzelony ze środka statku gracza.
     * Pociski lecą do góry (ujemny speed.y).
     */
    function spawn() {
        bullets.push({
            x: player.getPlayer().x + player.getPlayer().width / 2 - 3,  // środek statku, minus połowa szerokości pocisku
            y: player.getPlayer().y,                          // od górnej krawędzi statku
            width: 6,
            height: 14,
            speed: 10                                        // prędkość w pikselach/klatkę (do góry)
        });
    }

    /**
     * Aktualizuje pozycję wszystkich pocisków.
     * Usuwa te, które wyleciały poza górną krawędź ekranu.
     */
    function update() {
        for (let i = bullets.length - 1; i >= 0; i--) {
            bullets[i].y -= bullets[i].speed;

            // Usuń pocisk, jeśli wyleciał poza ekran
            if (bullets[i].y + bullets[i].height < 0) {
                bullets.splice(i, 1);
            }
        }
    }

    /**
     * Rysuje wszystkie pociski jako małe, jasne prostokąty.
     */
    function draw() {
        ctx.fillStyle = '#ffff00';   // żółty kolor pocisków
        for (const bullet of bullets) {
            ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
        }
    }

    /**
     * Obsługuje strzelanie – tworzy pocisk, jeśli spacja jest wciśnięta
     * i minął już cooldown od poprzedniego strzału.
     * @param {Object} keys - Obiekt ze stanem klawiszy
     */
    function handleShooting() {
        if (shootCooldown > 0) {
            shootCooldown--;
        }

        if (keys.Space && shootCooldown <= 0) {
            spawn();
            shootCooldown = SHOOT_COOLDOWN_MAX;
        }
    }

    /**
     * Sprawdza kolizję każdego pocisku z każdym wrogiem.
     * Przy trafieniu: usuwa zarówno pocisk, jak i wroga,
     * oraz zwiększa wynik gracza.
     * @param {Array} enemies - Tablica wrogów
     * @returns {number} - Liczba trafień (do aktualizacji wyniku)
     */
    function handleBulletEnemyCollisions(enemies) {
        let hitCount = 0;
        
        for (let b = bullets.length - 1; b >= 0; b--) {
            let bulletHit = false;

            for (let e = enemies.length - 1; e >= 0; e--) {
                if (utils.checkCollision(bullets[b], enemies[e])) {
                    // Trafienie! Usuń wroga i oznacz pocisk do usunięcia
                    enemies.splice(e, 1);
                    bulletHit = true;
                    hitCount++;   // +1 trafienie
                    break;        // jeden pocisk niszczy tylko jednego wroga
                }
            }

            if (bulletHit) {
                bullets.splice(b, 1);
            }
        }
        
        return hitCount;
    }

    /**
     * Czyści tablicę pocisków
     */
    function clear() {
        bullets = [];
    }

    /**
     * Resetuje cooldown strzelania
     */
    function resetCooldown() {
        shootCooldown = 0;
    }

    /**
     * Zwraca tablicę pocisków
     * @returns {Array}
     */
    function getBullets() {
        return bullets;
    }

    /**
     * Zwraca liczbę aktywnych pocisków
     * @returns {number}
     */
    function getBulletCount() {
        return bullets.length;
    }

    // Publiczne API
    return {
        init,
        spawn,
        update,
        draw,
        handleShooting,
        handleBulletEnemyCollisions,
        clear,
        resetCooldown,
        getBullets,
        getBulletCount
    };
})();
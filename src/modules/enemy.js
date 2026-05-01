/**
 * ============================================================
 * ENEMY - Moduł logiki przeciwników
 * ============================================================
 * 
 * Odpowiada za tworzenie, aktualizację i rysowanie wrogów.
 */

const Enemy = (function () {
    // Prywatne zmienne
    let canvas = null;
    let ctx = null;
    let enemies = [];
    let utils = null;

    /**
     * Inicjalizuje moduł wrogów
     * @param {HTMLCanvasElement} canvasElement - Element canvas
     * @param {CanvasRenderingContext2D} context - Kontekst 2D canvas
     * @param {Object} utilsModule - Moduł z funkcjami pomocniczymi
     */
    function init(canvasElement, context, utilsModule) {
        canvas = canvasElement;
        ctx = context;
        utils = utilsModule;
    }

    /**
     * Tworzy nowego wroga na losowej pozycji X u góry ekranu.
     * Kolor jest losowy spośród kilku neonowych odcieni.
     */
    function spawn() {
        const enemyWidth = 35;
        const enemyHeight = 35;
        const colors = ['#ff3366', '#ff6633', '#ffcc00', '#ff33cc', '#33ff66', '#ff6600'];

        enemies.push({
            x: utils.randomInt(0, canvas.width - enemyWidth),
            y: -enemyHeight,                           // start powyżej ekranu
            width: enemyWidth,
            height: enemyHeight,
            speed: utils.randomInt(2, 5),               // losowa prędkość opadania
            color: colors[utils.randomInt(0, colors.length - 1)]
        });
    }

    /**
     * Aktualizuje pozycję wszystkich wrogów (lecą w dół).
     * Jeśli wróg dotknie gracza → Game Over.
     * Jeśli wróg wyleci poza dół ekranu → usuwamy go (bez kary).
     * @param {Object} player - Obiekt gracza do sprawdzania kolizji
     * @returns {boolean} - true jeśli doszło do kolizji z graczem
     */
    function update(player) {
        for (let i = enemies.length - 1; i >= 0; i--) {
            enemies[i].y += enemies[i].speed;

            // Sprawdź kolizję wroga z graczem
            if (utils.checkCollision(enemies[i], player)) {
                enemies.splice(i, 1);
                return true;   // kolizja z graczem
            }

            // Usuń wroga, który wyleciał poza dół ekranu
            if (enemies[i].y > canvas.height + 50) {
                enemies.splice(i, 1);
            }
        }
        return false;   // brak kolizji
    }

    /**
     * Rysuje wszystkich wrogów jako kolorowe prostokąty z dodatkowym
     * mniejszym prostokątem wewnątrz (efekt "oka" wroga).
     */
    function draw() {
        for (const enemy of enemies) {
            // Główny korpus wroga
            ctx.fillStyle = enemy.color;
            ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);

            // Wewnętrzny detal – ciemniejszy rdzeń (oko)
            ctx.fillStyle = '#111122';
            ctx.fillRect(
                enemy.x + enemy.width * 0.25,
                enemy.y + enemy.height * 0.25,
                enemy.width * 0.5,
                enemy.height * 0.5
            );

            // Poświata wokół wroga (dla efektu neon)
            ctx.strokeStyle = enemy.color;
            ctx.lineWidth = 2;
            ctx.globalAlpha = 0.5;
            ctx.strokeRect(enemy.x - 2, enemy.y - 2, enemy.width + 4, enemy.height + 4);
            ctx.globalAlpha = 1.0;
            ctx.lineWidth = 1;
        }
    }

    /**
     * Czyści tablicę wrogów
     */
    function clear() {
        enemies = [];
    }

    /**
     * Zwraca tablicę wrogów
     * @returns {Array}
     */
    function getEnemies() {
        return enemies;
    }

    /**
     * Zwraca liczbę aktywnych wrogów
     * @returns {number}
     */
    function getEnemyCount() {
        return enemies.length;
    }

    // Publiczne API
    return {
        init,
        spawn,
        update,
        draw,
        clear,
        getEnemies,
        getEnemyCount
    };
})();
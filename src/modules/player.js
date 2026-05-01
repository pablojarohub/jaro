/**
 * ============================================================
 * PLAYER - Moduł logiki gracza (statku kosmicznego)
 * ============================================================
 * 
 * Odpowiada za ruch statku, sterowanie i rysowanie gracza.
 */

const Player = (function () {
    // Prywatne zmienne
    let canvas = null;
    let ctx = null;
    let player = null;
    let keys = {};
    let frameCount = 0;

    /**
     * Inicjalizuje moduł gracza
     * @param {HTMLCanvasElement} canvasElement - Element canvas
     * @param {CanvasRenderingContext2D} context - Kontekst 2D canvas
     * @param {Object} keysState - Obiekt ze stanem klawiszy
     */
    function init(canvasElement, context, keysState) {
        canvas = canvasElement;
        ctx = context;
        keys = keysState;
        
        // Inicjalizacja obiektu gracza
        player = {
            x: canvas.width / 2,         // pozycja startowa: środek u góry
            y: canvas.height - 80,       // blisko dołu ekranu
            width: 40,                   // szerokość statku
            height: 50,                  // wysokość statku
            speed: 7,                    // prędkość ruchu w pikselach/klatkę
            color: '#00ccff'             // kolor statku (cyjan)
        };
    }

    /**
     * Aktualizuje pozycję statku na podstawie wciśniętych klawiszy.
     * Statek nie może wyjechać poza krawędzie ekranu.
     */
    function update() {
        // Ruch w lewo: strzałka w lewo LUB klawisz A
        if (keys.ArrowLeft || keys.KeyA) {
            player.x -= player.speed;
        }
        // Ruch w prawo: strzałka w prawo LUB klawisz D
        if (keys.ArrowRight || keys.KeyD) {
            player.x += player.speed;
        }

        // Ograniczenie pozycji – statek nie może wyjechać poza canvas
        if (player.x < 0) player.x = 0;
        if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;
    }

    /**
     * Rysuje statek gracza jako kształt złożony z kilku prostokątów
     * (kadłub, skrzydła, kokpit) – wszystko zbudowane z prostych figur.
     */
    function draw() {
        const { x, y, width, height, color } = player;

        // --- Kadłub (główny korpus) ---
        ctx.fillStyle = color;
        ctx.fillRect(x + width * 0.3, y, width * 0.4, height * 0.7);

        // --- Skrzydła (lewe i prawe) ---
        ctx.fillStyle = '#0099cc';
        // Lewe skrzydło (trapez z prostokątów)
        ctx.fillRect(x, y + height * 0.2, width * 0.3, height * 0.35);
        // Prawe skrzydło
        ctx.fillRect(x + width * 0.7, y + height * 0.2, width * 0.3, height * 0.35);

        // --- Działko (wystający element u góry kadłuba) ---
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(x + width * 0.42, y - 8, width * 0.16, 12);

        // --- Kokpit (mały jasny prostokąt) ---
        ctx.fillStyle = '#aaffff';
        ctx.fillRect(x + width * 0.35, y + height * 0.1, width * 0.3, height * 0.2);

        // --- Silnik (dolna część) ---
        ctx.fillStyle = '#ff6600';
        ctx.fillRect(x + width * 0.25, y + height * 0.7, width * 0.5, height * 0.3);

        // --- Płomień z silnika (efekt animacji) ---
        const flameHeight = 8 + Math.sin(frameCount * 0.5) * 4;  // pulsujący płomień
        ctx.fillStyle = '#ffaa00';
        ctx.fillRect(x + width * 0.3, y + height, width * 0.4, flameHeight);
        ctx.fillStyle = '#ffff00';
        ctx.fillRect(x + width * 0.35, y + height, width * 0.3, flameHeight * 0.6);
    }

    /**
     * Resetuje pozycję gracza do wartości początkowych
     */
    function reset() {
        player.x = canvas.width / 2;
        player.y = canvas.height - 80;
    }

    /**
     * Zwraca obiekt gracza
     * @returns {Object}
     */
    function getPlayer() {
        return player;
    }

    /**
     * Ustawia licznik klatek do animacji
     * @param {number} count - Licznik klatek
     */
    function setFrameCount(count) {
        frameCount = count;
    }

    // Publiczne API
    return {
        init,
        update,
        draw,
        reset,
        getPlayer,
        setFrameCount
    };
})();
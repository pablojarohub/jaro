/**
 * ============================================================
 * UTILS - Moduł z funkcjami pomocniczymi
 * ============================================================
 * 
 * Zawiera uniwersalne funkcje używane w całej grze,
 * takie jak sprawdzanie kolizji i generowanie liczb losowych.
 */

const Utils = (function () {
    // Prywatne zmienne
    let canvas = null;
    let ctx = null;

    /**
     * Inicjalizuje moduł z kontekstem canvas
     * @param {HTMLCanvasElement} canvasElement - Element canvas
     * @param {CanvasRenderingContext2D} context - Kontekst 2D canvas
     */
    function init(canvasElement, context) {
        canvas = canvasElement;
        ctx = context;
    }

    /**
     * Sprawdza kolizję między dwoma prostokątami (AABB – Axis-Aligned Bounding Box).
     * Zwraca true, jeśli prostokąty nachodzą na siebie.
     * @param {Object} a - Pierwszy prostokąt {x, y, width, height}
     * @param {Object} b - Drugi prostokąt {x, y, width, height}
     * @returns {boolean}
     */
    function checkCollision(a, b) {
        return (
            a.x < b.x + b.width &&
            a.x + a.width > b.x &&
            a.y < b.y + b.height &&
            a.y + a.height > b.y
        );
    }

    /**
     * Generuje losową liczbę całkowitą z przedziału [min, max].
     * @param {number} min - Minimalna wartość
     * @param {number} max - Maksymalna wartość
     * @returns {number}
     */
    function randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * Rysuje statyczne "gwiazdy" w tle – małe białe kropki.
     * Pozycje są deterministyczne na podstawie canvas.width/height,
     * aby uniknąć migotania.
     * @param {number} frameCount - Licznik klatek do animacji migotania
     */
    function drawStars(frameCount) {
        ctx.fillStyle = '#ffffff';
        // Używamy stałego rozkładu gwiazd (co 40px w poziomie i pionie,
        // z lekkim losowym przesunięciem opartym na funkcji sinus dla efektu migotania)
        for (let sx = 0; sx < canvas.width; sx += 35) {
            for (let sy = 0; sy < canvas.height; sy += 40) {
                // Pseudolosowe migotanie na podstawie numeru klatki i pozycji
                const brightness = 0.3 + 0.7 * Math.abs(Math.sin((sx * sy + frameCount) * 0.001));
                if (brightness > 0.5) {
                    ctx.globalAlpha = brightness;
                    ctx.fillRect(sx + (sy % 17), sy + (sx % 13), 2, 2);
                }
            }
        }
        ctx.globalAlpha = 1.0;
    }

    /**
     * Zwraca aktualny kontekst canvas
     * @returns {CanvasRenderingContext2D}
     */
    function getContext() {
        return ctx;
    }

    /**
     * Zwraca element canvas
     * @returns {HTMLCanvasElement}
     */
    function getCanvas() {
        return canvas;
    }

    // Publiczne API
    return {
        init,
        checkCollision,
        randomInt,
        drawStars,
        getContext,
        getCanvas
    };
})();
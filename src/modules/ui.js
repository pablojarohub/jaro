/**
 * ============================================================
 * UI - Moduł interfejsu użytkownika
 * ============================================================
 * 
 * Odpowiada za rysowanie elementów UI, takich jak HUD i ekran Game Over.
 */

const UI = (function () {
    // Prywatne zmienne
    let canvas = null;
    let ctx = null;

    /**
     * Inicjalizuje moduł UI
     * @param {HTMLCanvasElement} canvasElement - Element canvas
     * @param {CanvasRenderingContext2D} context - Kontekst 2D canvas
     */
    function init(canvasElement, context) {
        canvas = canvasElement;
        ctx = context;
    }

    /**
     * Rysuje wynik w lewym górnym rogu.
     * @param {number} score - Aktualny wynik gracza
     * @param {number} difficultyLevel - Poziom trudności
     */
    function drawHUD(score, difficultyLevel) {
        ctx.fillStyle = '#ffffff';
        ctx.font = '18px "Courier New", monospace';
        ctx.textAlign = 'left';
        ctx.fillText('WYNIK: ' + score, 15, 30);

        // Aktualny poziom trudności (opcjonalnie)
        ctx.fillStyle = '#888888';
        ctx.font = '12px "Courier New", monospace';
        ctx.fillText('Poziom trudności: ' + difficultyLevel, 15, 50);
    }

    /**
     * Rysuje ekran Game Over z wynikiem i instrukcją restartu.
     * @param {number} score - Końcowy wynik gracza
     */
    function drawGameOver(score) {
        // Półprzezroczysta nakładka
        ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Napis "GAME OVER"
        ctx.fillStyle = '#ff3366';
        ctx.font = 'bold 48px "Courier New", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2 - 40);

        // Wynik końcowy
        ctx.fillStyle = '#ffffff';
        ctx.font = '24px "Courier New", monospace';
        ctx.fillText('Twój wynik: ' + score, canvas.width / 2, canvas.height / 2 + 20);

        // Instrukcja restartu
        ctx.fillStyle = '#00ccff';
        ctx.font = '18px "Courier New", monospace';
        ctx.fillText('Naciśnij [R] aby zagrać ponownie', canvas.width / 2, canvas.height / 2 + 60);
    }

    /**
     * Rysuje prosty tekst na ekranie
     * @param {string} text - Tekst do narysowania
     * @param {number} x - Pozycja X
     * @param {number} y - Pozycja Y
     * @param {string} color - Kolor tekstu
     * @param {string} font - Czcionka
     * @param {string} align - Wyrównanie tekstu
     */
    function drawText(text, x, y, color = '#ffffff', font = '16px "Courier New", monospace', align = 'left') {
        ctx.fillStyle = color;
        ctx.font = font;
        ctx.textAlign = align;
        ctx.fillText(text, x, y);
    }

    /**
     * Rysuje prosty prostokąt
     * @param {number} x - Pozycja X
     * @param {number} y - Pozycja Y
     * @param {number} width - Szerokość
     * @param {number} height - Wysokość
     * @param {string} color - Kolor
     */
    function drawRect(x, y, width, height, color = '#ffffff') {
        ctx.fillStyle = color;
        ctx.fillRect(x, y, width, height);
    }

    /**
     * Rysuje linię
     * @param {number} x1 - Początek X
     * @param {number} y1 - Początek Y
     * @param {number} x2 - Koniec X
     * @param {number} y2 - Koniec Y
     * @param {string} color - Kolor
     * @param {number} lineWidth - Grubość linii
     */
    function drawLine(x1, y1, x2, y2, color = '#ffffff', lineWidth = 1) {
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }

    /**
     * Czyści cały ekran
     * @param {string} color - Kolor tła
     */
    function clearScreen(color = '#0a0a1a') {
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    // Publiczne API
    return {
        init,
        drawHUD,
        drawGameOver,
        drawText,
        drawRect,
        drawLine,
        clearScreen
    };
})();
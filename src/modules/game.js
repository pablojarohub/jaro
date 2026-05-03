/**
 * ============================================================
 * GAME - Główny moduł gry
 * ============================================================
 * 
 * Orkiestrator całej aplikacji - łączy wszystkie moduły
 * i zarządza główną pętlą gry.
 */

const Game = (function () {
    // Prywatne zmienne
    let canvas = null;
    let ctx = null;
    let gameRunning = true;
    let score = 0;
    let difficultyTimer = 0;
    let enemySpawnRate = 60;
    let frameCount = 0;
    let keys = {};

    // Stałe gry
    const DIFFICULTY_INTERVAL = 300; // co ile klatek rośnie trudność (~5s przy 60fps)

    // Moduły gry
    let utils = null;
    let player = null;
    let enemy = null;
    let bullets = null;
    let ui = null;

    /**
     * Inicjalizuje grę i wszystkie moduły
     */
    function init() {
        // Pobierz element canvas i kontekst
        canvas = document.getElementById('gameCanvas');
        ctx = canvas.getContext('2d');

        // Ustaw wymiary canvasa
        canvas.width = 500;
        canvas.height = 700;

        // Inicjalizuj moduły
        utils = Utils;
        utils.init(canvas, ctx);

        player = Player;
        player.init(canvas, ctx, keys);

        enemy = Enemy;
        enemy.init(canvas, ctx, utils);

        bullets = Bullets;
        bullets.init(canvas, ctx, utils, player, keys);

        ui = UI;
        ui.init(canvas, ctx);

        // Inicjalizacja sterowania
        setupControls();

        // Uruchom grę
        console.log('🚀 Kosmiczna Strzelanka – gotowa do gry!');
        console.log('Sterowanie: Strzałki Lewo/Prawo lub A/D, Spacja – strzał, R – restart');
        requestAnimationFrame(gameLoop);
    }

    /**
     * Ustawia sterowanie klawiszami
     */
    function setupControls() {
        // Nasłuchiwanie na keydown – ustaw flagę na true
        document.addEventListener('keydown', (e) => {
            // Zapobiegamy przewijaniu strony spacją i strzałkami
            if (e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'ArrowDown' ||
                e.code === 'ArrowLeft' || e.code === 'ArrowRight') {
                e.preventDefault();
            }

            // Restart gry klawiszem R – tylko gdy gra jest zakończona
            if (e.code === 'KeyR' && !gameRunning) {
                restartGame();
                return;
            }

            // Zapisujemy stan klawisza
            keys[e.code] = true;
        });

        // Nasłuchiwanie na keyup – ustaw flagę na false
        document.addEventListener('keyup', (e) => {
            if (e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'ArrowDown' ||
                e.code === 'ArrowLeft' || e.code === 'ArrowRight') {
                e.preventDefault();
            }

            keys[e.code] = false;
        });
    }

    /**
     * Główna funkcja wywoływana co klatkę przez requestAnimationFrame.
     * Odpowiada za aktualizację logiki i renderowanie wszystkich elementów.
     */
    function gameLoop() {
        // --- Czyszczenie ekranu ---
        ui.clearScreen();

        // Proste gwiazdy w tle (statyczne, rysowane co klatkę)
        utils.drawStars(frameCount);

        if (gameRunning) {
            // --- Aktualizacja logiki gry ---
            frameCount++;
            player.update();
            bullets.handleShooting();
            bullets.update();

            // Spawn wrogów zgodnie z aktualnym spawn rate
            if (frameCount % enemySpawnRate === 0) {
                enemy.spawn();
            }

            const playerHit = enemy.update(player.getPlayer());  // może ustawić gameRunning = false
            if (playerHit) {
                gameRunning = false;
            }

            const hits = bullets.handleBulletEnemyCollisions(enemy.getEnemies());
            score += hits * 10;   // +10 punktów za każdego zniszczonego wroga

            updateDifficulty();

            // --- Rysowanie wszystkich elementów ---
            bullets.draw();
            enemy.draw();
            player.draw();
            ui.drawHUD(score, Math.floor((60 - enemySpawnRate) / 4 + 1));
        } else {
            // --- Gra zakończona – rysujemy stan końcowy + Game Over ---
            bullets.draw();
            enemy.draw();
            player.draw();
            ui.drawHUD(score, Math.floor((60 - enemySpawnRate) / 4 + 1));
            ui.drawGameOver(score);
        }

        // Kontynuuj pętlę animacji
        requestAnimationFrame(gameLoop);
    }

    /**
     * Stopniowo zwiększa trudność gry:
     * - Zmniejsza odstęp między pojawianiem się wrogów (enemySpawnRate)
     * - Minimum to 20 klatek (~3 wrogów na sekundę przy 60fps)
     */
    function updateDifficulty() {
        difficultyTimer++;

        if (difficultyTimer >= DIFFICULTY_INTERVAL && enemySpawnRate > 20) {
            difficultyTimer = 0;
            enemySpawnRate -= 4;   // co ~5 sekund wróg pojawia się o 4 klatki szybciej
            if (enemySpawnRate < 20) enemySpawnRate = 20;  // dolny limit
        }
    }

    /**
     * Resetuje wszystkie zmienne do wartości początkowych
     * i uruchamia grę od nowa.
     */
    function restartGame() {
        // Reset stanu gry
        gameRunning = true;
        score = 0;
        difficultyTimer = 0;
        enemySpawnRate = 60;
        frameCount = 0;

        // Reset modułów
        player.reset();
        enemy.clear();
        bullets.clear();
        bullets.resetCooldown();

        // Reset stanu klawiszy (na wypadek przytrzymanych podczas Game Over)
        for (const key in keys) {
            keys[key] = false;
        }
    }

    /**
     * Zwraca aktualny stan gry
     * @returns {Object}
     */
    function getGameState() {
        return {
            running: gameRunning,
            score: score,
            frameCount: frameCount,
            enemySpawnRate: enemySpawnRate
        };
    }

    // Publiczne API
    return {
        init,
        restartGame,
        getGameState
    };
})();

// Uruchomienie gry po załadowaniu wszystkich modułów
document.addEventListener('DOMContentLoaded', function() {
    Game.init();
});
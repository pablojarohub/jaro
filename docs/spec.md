# Specyfikacja techniczna projektu Jaro

## 1. Przegląd

**Jaro** to przeglądarkowa gra 2‑D napisana w czystym JavaScript (ES6). Projekt jest podzielony na moduły, które są importowane w pliku `index.html` przy użyciu tagu `<script type="module">`. Gra działa w przeglądarce bez potrzeby serwera.

## 2. Architektura

### 2.1 Struktura katalogów

```
├─ index.html                # Strona startowa, ładuje moduły gry
├─ src/                      # Źródła JavaScript
│   └─ modules/              # Moduły gry
│       ├─ game.js           # Główna pętla i zarządzanie stanem
│       ├─ player.js         # Logika gracza i sterowanie
│       ├─ enemy.js          # Logika wrogów i ich zachowanie
│       ├─ bullets.js        # Obsługa pocisków
│       ├─ ui.js             # Interfejs użytkownika (wynik, życie)
│       └─ utils.js          # Funkcje pomocnicze (np. kolizje)
└─ docs/                     # Dokumentacja
    └─ spec.md               # Niniejsza specyfikacja techniczna
```

### 2.2 Moduły

* **`game.js`** – inicjalizuje grę, uruchamia pętlę `requestAnimationFrame`, zarządza aktualizacją i renderowaniem wszystkich obiektów.
* **`player.js`** – definiuje klasę `Player`, obsługuje wejścia klawiatury, ruch oraz tworzenie pocisków.
* **`enemy.js`** – definiuje klasę `Enemy`, losowo generuje wrogów i aktualizuje ich pozycję w kierunku gracza.
* **`bullets.js`** – definiuje klasę `Bullet`, aktualizuje pozycję pocisków i sprawdza kolizje z wrogami.
* **`ui.js`** – zarządza wyświetlaniem informacji (punkty, liczba żyć) w elemencie `<div id="ui">`.
* **`utils.js`** – zawiera funkcje pomocnicze, takie jak `detectCollision(rect1, rect2)` oraz `randomRange(min, max)`.

## 3. Technologia

* **Język** – JavaScript (ES6+), wykorzystuje klasy, moduły i `let/const`.
* **Renderowanie** – Canvas 2D (`<canvas id="gameCanvas">`).
* **Budowanie** – Brak procesu budowania; projekt jest statyczny i może być uruchomiony bezpośrednio w przeglądarce.
* **Zależności** – Brak zewnętrznych bibliotek; wszystkie funkcje są implementowane ręcznie.

## 4. Interfejs API (publiczne klasy)

### 4.1 `Player`

```javascript
class Player {
    constructor(x, y, width, height, speed)
    update(input)          // przetwarza wejście i aktualizuje pozycję
    draw(context)          // rysuje gracza na canvasie
    shoot()                // zwraca nowy obiekt `Bullet`
}
```

### 4.2 `Enemy`

```javascript
class Enemy {
    constructor(x, y, width, height, speed)
    update(player)          // podąża w kierunku gracza
    draw(context)
}
```

### 4.3 `Bullet`

```javascript
class Bullet {
    constructor(x, y, width, height, speed)
    update()                // przesuwa pocisk w górę
    draw(context)
}
```

## 5. Mechanika gry

* Gracz porusza się w lewo/prawo oraz może strzelać w górę.
* Wrogowie pojawiają się losowo na górze ekranu i podążają w dół w kierunku gracza.
* Kolizja pocisku z wrogiem usuwa wroga i zwiększa wynik.
* Kolizja wroga z graczem zmniejsza liczbę żyć.
* Gra kończy się, gdy liczba żyć spadnie do zera.

## 6. Rozszerzenia (pomysły na rozwój)

* Dodanie różnych typów wrogów z unikalnym zachowaniem.
* System poziomów i zwiększającej się trudności.
* Dźwięki i efekty graficzne (animacje, sprite’y).
* Obsługa dotyku dla urządzeń mobilnych.

---

*Dokumentacja została wygenerowana automatycznie w ramach zadania.*


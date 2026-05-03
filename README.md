# Projekt Jaro

**Jaro** to prosty, przeglądarkowy silnik gry napisany w JavaScript. Projekt demonstruje podstawowe elementy gry 2‑D, takie jak:

* **Gracz** – sterowany przy pomocy klawiatury, porusza się po ekranie i strzela pociskami.
* **Wrogowie** – losowo generowane jednostki, które podążają w kierunku gracza.
* **Pociski** – obiekty poruszające się w linii prostej, które niszczą wrogów po kolizji.
* **Interfejs UI** – wyświetla informacje o stanie gry (punkty, liczba żyć, itp.).

Projekt jest podzielony na moduły znajdujące się w katalogu `src/modules/`:

* `game.js` – główna pętla gry i zarządzanie stanem.
* `player.js` – logika gracza.
* `enemy.js` – logika wrogów.
* `bullets.js` – obsługa pocisków.
* `ui.js` – elementy interfejsu użytkownika.
* `utils.js` – pomocnicze funkcje używane w całym projekcie.

## Uruchomienie

1. Sklonuj repozytorium.
2. Otwórz plik `index.html` w przeglądarce (projekt nie wymaga serwera, działa jako statyczna strona).
3. Gra zostanie automatycznie uruchomiona.

## Budowa i rozwój

Projekt jest skonstruowany w czystym JavaScript (ES6) i nie posiada zewnętrznych zależności. Aby rozbudować grę, można:

* Dodać nowe typy wrogów lub poziomy.
* Rozszerzyć system punktacji i wprowadzić power‑upy.
* Zaimplementować obsługę dźwięku i animacji.

## Licencja

Projekt udostępniony na licencji MIT – zobacz plik `LICENSE` w repozytorium.

# Mit kell csinálnom — lépésről lépésre

Saját jegyzet a spike méréshez. Az angol `README.md` ugyanezt írja le, ez a
változat csak magyarul.

## A kérdés

> Mennyibe kerül egy valódi ruhadarab — percben és tárolt bájtban —, és hány
> fér be, mielőtt a localStorage feladja?

Három szám kell: **perc/darab**, **kilobájt/darab**, és **hányadik darabnál
hasal el** — a README-ben állított 50-60-hoz képest.

## Előkészület

Egy terminálban, a projekt mappájában:

```
python -m http.server 8123
```

Böngészőben: <http://127.0.0.1:8123/index.html>

Nyisd meg a fejlesztői konzolt: **F12**, aztán a *Console* fül.

## 1. A mérő bekapcsolása — még a fotózás előtt!

Nyisd meg a `spike/measure.js` fájlt, másold ki a **teljes tartalmát**, és
illeszd be a konzolba, majd Enter.

Ezt kell látnod:

```
measure.js is listening. Add your pieces one at a time.
```

Ha ezt nem látod, ne kezdd el a fotózást — szólj.

## 2. Tíz saját ruhadarab

Darabonként így:

1. **Indítsd a stoppert**, amikor kézbe veszed a ruhát
2. Fotózd le
3. Töltsd fel az oldal alján, az *Add a piece* űrlapon (név, kategória,
   meleg szint, ha vízálló akkor *rain ok*, és a fotó)
4. **Állítsd meg a stoppert**, amikor a darab megjelenik a ruhatárban
5. Egy ablak feldob egy kérdést: írd be a **másodperceket** (nem percet!)

Amire figyelj, különben a mérés torz lesz:

- **Ugyanaz a háttér** mind a tíznél (fehér lepedő, fal)
- **Ugyanaz a távolság** és ugyanaz a telefon
- **Ne szerkeszd** a képeket, ne vágd körbe — az app úgyis kicsinyíti
- A stopper a **ruha kézbevételétől** menjen, ne csak a fotózástól

## 3. Mentés

Ha megvan a tíz, a konzolba:

```
spikeSave()
```

Letölt egy `spike-adds.json` fájlt. Tedd be a `spike/data/` mappába.

## 4. A kapacitás-teszt

Másold be a `spike/capacity.js` teljes tartalmát a konzolba.

Írogatni fog, amíg a böngésző meg nem tagadja, aztán kiírja a választ:

```
ANSWER: N pieces fit; storing #N+1 threw QuotaExceededError
```

**Csinálj róla képernyőképet** — ez a bizonyíték. Utána:

```
spikeSaveCapacity()
```

A letöltött `spike-capacity.json` is a `spike/data/` mappába megy.

A szkript a végén **visszaállítja a ruhatáradat** úgy, ahogy volt, szóval a
tíz darabod nem vész el.

## 5. Szólj nekem

Innen átveszem: lefuttatom a `node spike/analyse.js`-t, beírom a három számot
a naplóba, javítom a README hibás állítását, és nyitom a pull requestet.

---

## Ha valami félrement

- **Nem jött fel a kérdés a stopperről:** a `measure.js` nem futott le a
  bevitel előtt. Töltsd újra az oldalt, másold be újra, és kezdd elölről.
- **Véletlen bezártad a konzolt:** a mért sorok elvesztek. Újra kell kezdeni,
  de a már feltöltött darabokat előbb töröld ki a ruhatárból.
- **A kapacitás-teszt sokáig fut:** ez normális, 10-60 másodperc. Ne zárd be
  a fület közben, mert akkor nem áll vissza a ruhatárad.

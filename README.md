

# CodersCamp2020.GradeBook

### Demo

https://radekwojpl2.github.io/Gradebook/.

### Gradebook skład

    a. Klient -> Radek
    b. Tech Lead -> Marta, Wiktoria
    c. Product Owner -> Kinga, Justyna
    d. Development Manager -> Mateusz , Radek


### Konfiguracja projektu

Projekt został skonfigurowany przy użyciu Webpacka i Jest jako środowiska testowego. Do skonfigurowania Webpack użyte zostały następujące wtyczki:

- style-loader i css-loader dla plików css,
- ts-loader dla plików TypeScript,
- html webpack plugin,
- webpack dev server.

#### Komendy do uruchamiania skryptów

W celu uruchomienia aplikacji w etapie jej rozwoju należy użyć komendy:

```
npm run serve
```

W celu uruchomienia testów należy użyć komendy:

```
npm run test
```

#### Dodawanie nowych plików do aplikacji

1. Pliki .html powinny być tworzone w lokalizacji './src i posiadać podłączony plik .js zgodnie ze wzorem:

```
assets/js/NAZWA.js
```

2. Główne pliki .ts powinny być tworzone w lokalizacji './src/assets/ts' i posiadać taką samą nazwę jak odpowiadający im plik .html
3. Pliki .css powinny być tworzone w lokalizacji './src/assets/css', a następnie zaimportowane do plików .ts przy pomocy:

```
import '../css/NAZWA.css'
```

4. Pliki testowe powinny być tworzone w lokalizacji './src/test'
5. W celu prawidłowego działania serwera konieczne jest dodanie plików do webpack.cofig.js zgodnie z poniższym wzorem
   a. Dodanie nazwy pliku do tablicy htmlPageNames (bez rozszerzenia)
   ```
   let htmlPageNames = ['NAZWA']
   ```
   b. W module.export dodanie do plików wejściowych ścieżki do pliku .ts
   ```
   entry: {
        main: './src/assets/ts/main.ts',
        NAZWA: './src/assets/ts/NAZWA.ts
    },
   ```

#### Firebase RealTime Database

Dla ułatwienia komunikacji z bazą danych zaimplementowany został pakiet axios (`https://www.npmjs.com/package/axios`).
W celu wysłania zapytania do bazy należy zaimportować plik "axios.ts" zawierający dane konfiguracyjne, który znajduje się w folderze "src".

Przykład pobierania danych z bazy:

```
axios.get('NAZWA_KOLEKCJI'.json)
.then( response => ...)
.catch( error => ...)

```

Przykład wysyłania danych do bazy:

```
const user = {
   firstName: 'Przykład',
   lastName: 'Przykładowy'
}

axios.post('NAZWA_KOLEKCJI'.json, user)
.then( response => ...)
.catch( error => ...)

```

### Komponent TopPanel

TopPanel został stworzony jako reużywalny komponent możliwy do zaimplementowania na każdej podstronie. Użytkownik może zdecydować, czy chce przeglądać stronę z pozycji studenta czy nauczyciela. Opcję należy wybrać z rozwijanej listy. Po wyborze następuje przeładowanie strony do widoku strony głównej, a do pozycji w menu są przypisywane ścieżki przekierowujące na odpowiednie podstrony.

Aby zaimplementować komponent należy zaimportować i uruchomić funkcję TopPanel z pliku TopPanel.ts w odpowiednim pliku .ts

```
import {TopPanel} from './TopPanel'
TopPanel()
```

### MainPage

Na stronie głównej użyty został pakiet [Chart.js](https://www.chartjs.org/) w celu zaimplementowania wykresów. Na podstawie tego pakietu stworzona została klasa Charts, która ma na celu generowanie wyłącznie jednego z dwóch typów wykresu:

- polarArea
![polarArea](/dist/assets/static/wykres2.PNG)

- radar
![radar](/dist/assets/static/wykres1.PNG)

Na stronie znajduje się również kalendarz, który został zbudowany przy użyciu pakietu [Moment.js](https://momentjs.com/). 
![calendar](/dist/assets/static/kalendarz.PNG)


Zmiana wyświetlango miesiąca możliwa jest po naciśnięciu strzałek. Na kalendarzu zostały zaznaczone dwa rodzaje zdarzeń:

- egzaminy, testy (kolor różowy),
- święta (kolor niebieski).
  Po najechaniu rodzaj wydarzenia wyświetla się poniżej kalendarza.

### Panel Announcements - Student

Panel z ogłoszeniami jest tworzony dynamicznie. Sekcja jest tworzona za pomocą funkcji createAnnouncementsSection. Zawiera przyciski funkcyjne oraz kontener z ogłoszeniami.

Ogłoszenia są zaciągane z bazy Firebase RealTime Database, za pomocą pakietu axios.

Domyślnie zostają wyświetlone wszystkie ogłoszenia w kolejności od najnowszego. Istnieje możliwość filtrowania ogłoszeń w zależności od rodzaju (normal, important, exam). Można również sortować ogłoszenia po dacie oraz stopniu ważności.

### Panel Announcements - Teacher

Formularz służący do wysłania ogłoszenia tworzony jest dynamicznie w pliku 'teacherForm.ts'. Do wyboru są trzy typy ogłoszeń 'normal', 'important' i 'exam'. W każdym z typów ogłoszeń należy wypełnić pola 'name' (imię wystawiającego ogłoszenie), 'title' (tytuł ogłoszenia), 'message' (treść ogłoszenia) oraz dodatkowo dla typu 'exam' pole 'date' (z datą egzaminu). Po kliknięciu przycisku 'Submit' dane z formularza pobierane są za pomocą funkcji w pliku 'submitAnnouncementForm.ts', a następnie zostają wysłane za pomocą axios - klienta HTTP opartego na Promise.

Do przechowywania ogłoszeń wykorzystana jest nierelacyjna baza danych Firebase - Realtime Database, w której do rekordów dodawane jest dodatkowo pole 'timestamp' ze znacznikiem czasowym, kiedy ogłoszenie zostało wysłane. Umożliwia to później łatwiejsze filtrowanie ogłoszeń po czasie ich dodania.

## Grades - Teacher's Panel

Panel zawierający listę uczniów oraz ocen jest tworzony dynamicznie za pomocą funkcji. Dane są zaciągane z bazy Firebase RealTime Database, za pomocą pakietu axios. Otrzymane dane są filtrowane i umieszczane w mapie, gdzie kluczem jest User a wartością przefiltrowane  oceny. 

```bash
let userMap: Map<User,Array<Grade>> = new Map()
function createUserGradeMap (user:User) {
    userMap.set( user, grades.filter(grade => grade.user_id === user.user_id ))
```
Ponadto oceny można filtrować w zależności od przedmiotu z którego zostały wystawione. Istnieje możliwość dodania nowej oceny wraz z jej opisem. Nowa ocena zostaje przesłana do bazy, a strona zostaje na nowo załadowana.

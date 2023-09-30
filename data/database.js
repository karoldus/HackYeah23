function Project(id, name, cathegory, description, allCosts, EUcosts, date, url) {
    this.id=id;
    this.name=name;
    this.cathegory=cathegory;
    this.description=description;
    this.allCosts=allCosts;
    this.EUcosts=EUcosts;
    this.cost=cost;
    this.date=date;
    this.url=url;
}

var allProjects = {
    projects : [
        {
            id: 1,
            name: "Przeszłość przyszłości – remont i wyposażenie Muzeum Książąt Czartoryskich - Muzeum Narodowe w Krakowie w celu udostępnienia unikatowej kolekcji",
            cathegory: "kultura i sztuka",
            description: "dlugi malo interesujacy opis tego co zostalo zrobione",
            allCosts: "56 372 531,50 PLN",
            EUcosts: "37 124 075,43 PLN",
            date: "2014 - 2020",
            url: "https://mapadotacji.gov.pl/projekty/774725/"
          },
          {
            id: 2,
            name: "Budowa ścieżki rowerowej od kładki na Wiśle łączącej Kazimierz z Ludwinowem wzdłuż ul. M. Konopnickiej do Ronda Matecznego, następnie wzdłuż ul. Kamieńskiego (wraz z kładką na ul. Kamieńskiego) w Krakowie",
            cathegory: "transport",
            description: "dlugi malo interesujacy opis tego co zostalo zrobione",
            allCosts: "21 747 095,71 PLN",
            EUcosts: "17 472 426,99 PLN",
            date: "2014 - 2020",
            url: "https://mapadotacji.gov.pl/projekty/761835/"
          },
          {
            id: 3,
            name: "Modernizacja Teatru Groteska w Krakowie - etap IV – końcowy",
            cathegory: "kultura i sztuka",
            description: "dlugi malo interesujacy opis tego co zostalo zrobione",
            allCosts: "5 979 373,94 PLN",
            EUcosts: "4 116 320,52 PLN",
            date: "2014 - 2020",
            url: "https://mapadotacji.gov.pl/projekty/747085/"
          },
          {
            id: 4,
            name: "Park Zabłocie - Stacja Wisła",
            cathegory: "rewitalizacja",
            description: "dlugi malo interesujacy opis tego co zostalo zrobione",
            allCosts: "2 670 882,14 PLN",
            EUcosts: "1 441 823,82 PLN",
            date: "2014 - 2020",
            url: "https://mapadotacji.gov.pl/projekty/780045/"
          }
    ]
}

function getRandomProject(allProjects) {
    var randomIndex = Math.floor(Math.random() * allProjects.length);
    return allProjects[randomIndex];
}


import NewsPreview from "@components/news-preview/news-preview";
import "./news.scss";

export default function News() {
  return (
    <div className="news-page-container">
      <div className="articles-container">
        <NewsPreview
          date={new Date("2025-04-22")}
          title="Takmičenje iz programiranja"
          description="Učenici naše škole 22. aprila imaju priliku da se takmiče u programiranju i pokažu svoje tehničke veštine. Takmičenje će obuhvatiti različite izazove u kodiranju i rešavanju algoritamskih problema, a učesnici će imati šansu da pokažu svoje kreativne pristupe i inovacije u svetu tehnologije. 'Ovo takmičenje je prilika da naši učenici pokažu svoje znanje i strast prema tehnologiji, koja je ključ za budućnost', ističe direktorka škole."
          image="/images/events/programming-contests.png"
        />

        <NewsPreview
          date={new Date("2025-02-10")}
          title="Dan škole 2025"
          description="Svečana sala škole 2. februara pretvoriće se u scenu na kojoj će naši talentovani učenici pokazati svoje umetničke sposobnosti. Kroz kombinovanu predstavu, od klasičnih pozorišnih scena do savremenih koreografija i pesama u izvođenju školskog hora, učenici će proslaviti Dan škole. Program će uključiti i multimedijalne projekcije, kroz koje ćemo oživeti istoriju škole i njene vrednosti. 'Ovaj dan je prilika da pokažemo sve ono što čini našu školu posebnom, a naši učenici su njen ponos', ističe direktorka škole."
          image="/images/news/school-day.jpg"
        />

        <NewsPreview
          date={new Date("2025-1-28")}
          title="Beograd ispod Beograda"
          description="Odeljenje 2/4 sa razrednim starešinom Marinom Ristanović danas je istražilo tajne podzemnog Beograda. U pratnji stručnog vodiča, posetili su Karađorđevu kapiju, bunker iz 1948, Rimski bunar i barutanu sa rimskim sarkofazima. Obilazak je započet kod spomenika Francuskoj na Kalemegdanu, a završen u Donjem gradu uz priču o majoru Gavriloviću i Fransisu Makenziju. Nezaboravno putovanje kroz istoriju!"
          image="/images/news/underground.jpg"
        />

        <NewsPreview
          date={new Date("2024-10-15")}
          title="Dan škole 2024"
          description="Svečana sala škole pretvorila se 5. oktobra u pozornicu mladih umetnika. Učenici su kroz kombinovanu predstavu — od klasičnih pozorišnih scena do modernih koreografija i horskog pevanja — proslavili Dan škole. Nastup je uključivao i multimedijalne projekcije, oslikavajući istoriju škole i njene vrednosti. 'Ovo je dan kada škola sija kroz svoje učenike', istakla je direktorka."
          image="/images/news/school-day.jpg"
        />

        <NewsPreview
          date={new Date("2024-05-15")}
          title="Takmičenje u fudbalu"
          description="Na sportskom terenu naše škole 15. maja biće održano takmičenje u fudbalu, na kojem će se susresti najbolji fudbalski timovi naših učenika. Očekuju nas uzbudljive utakmice, timska borbenost i pokazivanje veština na terenu. Učestvovaće ekipe različitih uzrasta, a sve utakmice će biti prilika da se proslavi sportski duh i prijateljstvo među učenicima. 'Takmičenje u fudbalu je pravi način da pokažemo kako sport ujedinjuje i motiviše naše učenike na zajednički rad i istrajnost', naglašava direktorka škole."
          image="/images/events/football-event.png"
        />

        <NewsPreview
          date={new Date("2024-02-24")}
          title="Poezija uživo!"
          description="Šesti ciklus 'Poezija uživo!' Radio Beograda 2 i Zadužbine Kolarca posvećen je Srđanu Gagiću, pesniku i profesoru. U subotu, 24. februara u 19:00, u Kolarčevoj zadužbini oživeće njegove stihove uz direktan prenos na radiju. Gagić, dobitnik Brankove nagrade za knjigu Deca u izlogu, deliće svoju poeziju sa publikom. Ulaznice su dostupne na blagajni Zadužbine."
          image="/images/news/live-poetry.jpg"
        />
      </div>
    </div>
  );
}


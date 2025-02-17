import { useState } from "react";

export default function StudentsPageMentalHealth() {
  return (
    <div className="mental-health">
      <FrequentlyAskedQuestion
        question="Šta je mentalno zdravlje?"
        answer="Mentalno zdravlje odnosi se na naše emocionalno, psihološko i socijalno blagostanje. Utiče na način na koji razmišljamo, osećamo i ponašamo se. Mentalno zdravlje je ključno za razvijanje svesti o sebi, donošenje odluka, izgradnju odnosa i prevazilaženje svakodnevnih izazova. Ono podrazumeva da koristimo svoje sposobnosti i potencijale – da se nosimo s teškoćama, upravljamo stresom, održavamo pozitivnu sliku o sebi. Kod adolescenata, mentalno zdravlje može značajno uticati na samopouzdanje, školski uspeh i opštu dobrobit."
      />

      <FrequentlyAskedQuestion question="Koji je značaj mentalnog zdravlja za adolescente?">
        <p>
          <span>
            Mentalno zdravlje je izuzetno važno za adolescente iz više razloga.
            U ovom periodu života, mladi se suočavaju s brojnim promenama i
            izazovima, kao što su formiranje identiteta, socijalizacija i
            stresovi u školi. Dobro mentalno zdravlje pomaže im da:
          </span>

          <ul>
            <li>
              Izgrade samopouzdanje: Zdravo mentalno stanje podstiče adolescente
              da veruju u svoje sposobnosti, što im omogućava da se lakše suoče
              sa izazovima.
            </li>
            <li>
              Upravljaju stresom: Razumevanje i upravljanje stresom ključno je
              za uspeh u školi i životu.
            </li>
            <li>
              Razvijaju odnose: Razvijeno mentalno zdravlje pomaže u izgradnji i
              održavanju pozitivnih odnosa sa vršnjacima i porodicom.
            </li>
            <li>
              Postignu uspeh u školi: Adolescenti s dobrim mentalnim zdravljem
              su skloniji boljim školskim uspesima, jer mogu da se fokusiraju i
              aktivno uče.
            </li>
          </ul>

          <span>
            Podrška mentalnom zdravlju može sprečiti razvoj ozbiljnijih
            mentalnih problema, kao što su depresija ili anksioznost. Održavanje
            dobrog mentalnog zdravlja u adolescenciji ne samo da poboljšava
            kvalitet života mladih, već i postavlja osnove za zdraviji i
            uspešniji odrasli život.
          </span>
        </p>
      </FrequentlyAskedQuestion>

      <div className="understanding">
        <h1>Razumevanje adolescentnog perioda</h1>

        <p>
          Adolescencija je period intenzivnih promena koji obuhvata fizički,
          emocionalni i socijalni razvoj.
        </p>

        <p>
          <strong>Fizičke promene:</strong> U tinejdžerskim godinama, telo
          prolazi kroz značajne promene, uključujući rast, razvoj seksualnih
          karakteristika i hormonske promene. Ove promene mogu dovesti do
          osećaja nesigurnosti i samokritike. Treba se navići na „izmenjenu“
          telesnu šemu. Ne postoji adolescent koji je u potpunosti zadovoljan
          svojim izgledom!
        </p>

        <p>
          <strong>Emocionalne promene:</strong> Adolescenti često doživljavaju
          intenzivne emocije i promene raspoloženja, osetljivost, preteranu
          samokritičnost, ponekad sklonost depresivnom raspoloženju, kao i
          sanjarenja i povlačenja u svoj svet. Ovo je period istraživanja
          sopstvenog identiteta, što može dovesti do konflikata unutar sebe i sa
          drugima. Često se suočavaju sa strahom od odbacivanja i potrebom za
          pripadnošću.
        </p>

        <p>
          <strong>Socijalne promene:</strong> Tinejdžeri počinju da razvijaju
          složenije socijalne odnose. Vršnjaci i romantični odnosi postaju
          ključni. Adolescenti uče kako da komuniciraju, sarađuju i upravljaju
          konfliktima u situacijama u kojima se ranije nisu nalazili. Ove
          promene mogu biti izazovne i dovesti do stresa, ali i do razvoja novih
          socijalnih veština.
        </p>
      </div>

      <div className="stress">
        <h1>
          Adolescencija nosi brojne izazove i stresore koji mogu uticati na
          mentalno zdravlje:
        </h1>

        <ul>
          <li>
            Socijalni pritisak: Tinejdžeri često osećaju pritisak da se uklope u
            grupu ili ispune očekivanja vršnjaka. Ovaj pritisak može dovesti do
            anksioznosti i neprijatnosti.
          </li>
          <p className="advice">
            Nisi sam/sama! I drugi vršnjaci oko tebe slično osećaju i prolaze
            kroz iste dileme iako se to možda po njihovom ponašanju ne vidi na
            prvi pogled!
          </p>

          <li>
            Akademski stres: Školski zahtevi, ispiti i konkurencija mogu biti
            veliki izvor stresa. Strah od neuspeha može uticati na samopouzdanje
            i mentalno zdravlje.
          </li>
          <p className="advice">
            Daš sve od sebe i uradiš ono što je u tvojoj moći da nešto savladaš
            – pitaš za podršku u učenju, bolje organizuješ obaveze i vreme.
            Bitna je tvoja unutrašnja motivacija da nešto postigneš i mera koju
            ti odrediš i za koju si spreman/spremna da preuzmeš odgovornost.
          </p>

          <li>
            Problemi u porodici: Konflikti u porodici, razvodi, bolesti ili
            promene u porodici mogu uticati na emocionalno blagostanje
            adolescenata.
          </li>
          <p className="advice">
            Traži podršku i pomoć od odrasle osobe od poverenja ili drugara koji
            može da te sasluša. Mnogi oko nas prolaze kroz slične dileme i
            „krize“ i tek kada se otvorimo i kažemo, možemo da dobijemo pomoć.
            Nisu svi ljudi oko nas, ma koliko bili bliski, senzibilisani da
            „čitaju“ naše misli ili osećanja…
          </p>

          <li>
            Formiranje identiteta i samorazumevanje: Proces otkrivanja
            sopstvenog identiteta može biti zbunjujući i emocionalno izazovan,
            što može dovesti do osećaja usamljenosti ili nesigurnosti.
          </li>
          <p className="advice">
            Otkrivanje ko smo, šta volimo, čemu težimo… u nekim segmentima će
            trajati ceo život J. Prava je mudrost zavoleti sebe onakvima kakvi
            jesmo! To je proces.
          </p>

          <li>
            Tehnološki uticaji: Upotreba društvenih medija može biti dvostruki
            mač, pružajući podršku, ali i donoseći poređenja i opterećenje, što
            može uticati na samopoštovanje.
          </li>
          <p className="advice">
            Budite kritični prema informacijama koje pronađete na internetu.
            Proveravajte iz više izvora, upoređujte, vežbajte moć svoj zdravog
            razuma J Nezaboravite da i oni koji na društvene mreže postavljaju
            svoje fotografije u „najboljim“ i „najsrećnijim“ izdanjima, takođe
            imaju „teške“ dane, trenutke i krize, samo što je malo onih koji to
            podele na društvenim mrežama…
          </p>
        </ul>

        <p>
          Upravo su ove promene i izazovi u adolescenciji kritični za razvoj
          mentalnog zdravlja i mogu imati dugoročne posledice na život mladih.
          Podrška iz okruženja – roditelja, nastavnika i vršnjaka – može
          značajno uticati na prevazilaženje ovih izazova.
        </p>
      </div>

      <div className="symptoms">
        <h1>Znakovi i simptomi problema mentalnog zdravlja</h1>

        <ul>
          <li>
            Anksioznost: Simptomi anksioznosti mogu uključivati stalni osećaj
            zabrinutosti, napetost, nervozu i fizičke simptome kao što su
            tahikardija, znojenje ili tresenje. Adolescenti mogu imati poteškoća
            u fokusiranju, izbegavati socijalne situacije ili doživljavati
            panične napade.
          </li>
          <li>
            Depresija: Depresivni simptomi mogu obuhvatati osećaj tuge, beznađa,
            gubitak interesovanja za aktivnosti koje su nekada bile zabavne, kao
            i promene u apetitu i spavanju. Adolescenti mogu postati povučeni,
            pokazivati malu energiju i imati probleme s koncentracijom.
          </li>
          <li>
            Zamka: U adolescenciji se nekada dešava da se depresivni simptomi
            ispolje na način na koji to nikada ne bismo mogli da pretpostavimo –
            kroz hiperaktivnost, pričljivost, preterano eksponiranje… Ovakva
            ponašanja su, u tom slučaju, neka vrsta brane ili zaštite koju osoba
            postavi da bi joj se moglo prići…
          </li>
          <li>
            Stres: Stres može proizilaziti iz različitih izvora, uključujući
            školske obaveze, probleme u odnosima ili porodici. Simptomi stresa
            mogu uključivati razdražljivost, probleme sa spavanjem, fizičke
            simptome poput glavobolje ili stomačnih problema i opšti osećaj
            preopterećenosti.
          </li>
        </ul>
      </div>

      <div className="signs">
        <h1>
          Prepoznavanje problema mentalnog zdravlja kod adolescenata može biti
          izazovno, ali postoje znakovi na koje treba obratiti pažnju:
        </h1>

        <ul>
          <li>
            Promene u ponašanju: Iznenadne promene u ponašanju, kao što su
            povlačenje iz društvenih aktivnosti, gubitak interesovanja za hobije
            ili aktivnosti koje su nekada voleli, mogu ukazivati na probleme.
          </li>

          <li>
            Promene u raspoloženju: Česte oscilacije, kao što su prekidi
            raspoloženja, bes, ili konstantna tuga, mogu biti znak problema.
          </li>

          <li>
            Lošiji uspah u školi: problemi s koncentracijom i opšta
            nezainteresovanost za učenje mogu ukazivati na dublje probleme.
          </li>

          <li>
            Fizički simptomi: Česti fizički problemi bez medicinskog
            objašnjenja, kao što su glavobolje, stomačni bolovi ili umor, mogu
            biti znaci stresa ili anksioznosti.
          </li>

          <li>
            Izolacija: Izolacija od prijatelja i porodice, izbegavanje
            društvenih situacija i osećaj usamljenosti mogu ukazivati na
            probleme mentalnog zdravlja.
          </li>

          <li>
            Govor o samoubilačkim mislima ili samopovređivanju: Svaka izjava o
            samoubilačkim mislima ili samopovređivanju zahteva hitnu pažnju i
            pomoć.
          </li>
        </ul>

        <p>
          Važno je da roditelji, nastavnici i druge odrasle osobe budu pažljivi
          i otvoreni za razgovor o mentalnom zdravlju, kako bi pružili podršku
          adolescentima koji se suočavaju s problemima. Rano prepoznavanje i
          intervencija mogu značajno uticati na ishod i oporavak. Nekada je reč
          o normalnoj razvojnoj fazi, a nekada se može raditi i o ozbiljnijim
          naznakama koje treba prevenirati na vreme.
        </p>
      </div>

      <div className="impact">
        <h1>Uticaj na svakodnevni život</h1>

        <div className="behaviour">
          <h2>Ponašanje u školi i kod kuće</h2>
          <p>
            Problemi mentalnog zdravlja mogu značajno uticati na ponašanje
            adolescenata u različitim okruženjima, uključujući školu i dom.
          </p>

          <ul>
            <li>
              Ponašanje u školi: Adolescenti koji se bore s mentalnim problemima
              mogu pokazivati smanjenu motivaciju za učenje, često izbegavaju
              školske obaveze ili izostaju. Mogu biti razdražljivi, imati
              poteškoća s koncentracijom i izvršavanjem zadataka, što može
              dovesti do pada školskog uspeha. Ponekad, anksioznost ili stres
              mogu prouzrokovati fizičke simptome, kao što su glavobolje ili
              stomačni bolovi, što dodatno otežava prisustvovanje nastavi.
            </li>

            <li>
              Ponašanje kod kuće: Kod kuće, adolescenti mogu postati povučeni,
              zatvoreni ili se sukobljavati sa članovima porodice. Roditelji
              mogu primetiti promene u raspoloženju, česti konflikt ili
              nedostatak interesovanja za porodične aktivnosti. Ova dinamika
              može stvoriti napetu atmosferu, što dodatno pogoršava mentalno
              zdravlje adolescenta.
            </li>
          </ul>
        </div>

        <div className="relationships">
          <h2>Odnosi s vršnjacima i porodicom</h2>

          <p>
            Mentalno zdravlje adolescenata u velikoj meri utiče i na njihove
            odnose s vršnjacima i članovima porodice.
          </p>

          <ul>
            <li>
              Odnosi s vršnjacima: Adolescenti koji se suočavaju s anksioznošću,
              depresijom ili drugim problemima mogu imati poteškoća u održavanju
              odnosa s vršnjacima. Oni mogu izbegavati društvene interakcije,
              što može dovesti do osećaja usamljenosti i izolacije. Ova
              izolacija može pogoršati simptome, stvarajući začarani krug.
              Takođe, mogu se osećati nesigurno u socijalnim situacijama, što
              može dovesti do konfliktnih situacija ili problema s prijateljima.
            </li>

            <li>
              Odnosi s porodicom: Stres i problemi mentalnog zdravlja mogu
              prouzrokovati konflikte u porodici. Adolescenti mogu biti
              razdražljivi ili povučeni, što može stvoriti distancu između njih
              i roditelja. Nepravilna komunikacija i nedostatak razumevanja mogu
              dovesti do nedorazumevanja i sukoba. Međutim, otvorena
              komunikacija i podrška od strane članova porodice mogu pomoći u
              prevazilaženju ovih problema i ojačati odnose.
            </li>
          </ul>
        </div>

        <p>
          Problemi mentalnog zdravlja mogu imati dubok uticaj na svakodnevni
          život adolescenata, uključujući njihovo ponašanje u školi i kod kuće,
          kao i odnose s vršnjacima i porodicom. Rano prepoznavanje i podrška
          mogu značajno pomoći u ublažavanju ovih problema.
        </p>
      </div>

      <div className="support">
        <h1>Kako podržati adolescente?</h1>

        <div className="parent-support">
          <h2>Uloga roditelja</h2>

          <p>
            Roditelji igraju ključnu ulogu u podršci adolescentima tokom ovog
            važnog razvojnog perioda. Podrška može uključivati:
          </p>

          <FrequentlyAskedQuestion
            question="Stvaranje podsticajnog okruženja"
            answer="Roditelji mogu pomoći adolescentima da se osećaju sigurno i prihvaćeno, podstičući ih da istražuju svoje interese i hobije. Ovo može pomoći u razvoju samopouzdanja i nezavisnosti."
          />

          <FrequentlyAskedQuestion question="Pružanje emocionalne podrške">
            <p>
              Budite dostupni za razgovor i ohrabrujte adolescente da dele svoje
              misli i osećanja. Često slušanje i razumevanje mogu značajno
              pomoći u ublažavanju stresa i anksioznosti.
            </p>

            <p className="advice">
              Savet: Kad god vam se ukaže prilika slušajte svoje dete šta vam
              govori i razgovarajte sa njim. Nekada će to biti u pola noći,
              nekada u tramvaju, nekada kada ste umorni… Smognite snage, ne
              odlažite za sledeći put jer vam se dete možda neće otvoriti
              sledeći put – možda je baš sada smoglo snage da vam nešto važno
              kaže.
            </p>
          </FrequentlyAskedQuestion>

          <FrequentlyAskedQuestion question="Omogućavanje samostalnosti">
            <p>
              Davanje adolescentima mogućnosti da donose odluke i preuzmu
              odgovornosti može ih osnažiti i pripremiti za odrasle obaveze.
            </p>

            <p>
              Savet: Pustite ih da pogreše, uče iz svojih grešaka i budu
              odgovorni za sebe. Naravno, govorimo o životno bezazlenim
              situacijama.
            </p>
          </FrequentlyAskedQuestion>

          <h2>Važnost otvorene komunikacije</h2>
          <p>
            Otvorena komunikacija je od suštinskog značaja u odnosima između
            roditelja i adolescenata. Ona podrazumeva:
          </p>

          <ul>
            <li>
              Postavljanje osnova za dijalog: Roditelji treba da stvore
              atmosferu u kojoj adolescenti mogu slobodno da izraze svoje
              osećaje i brige bez straha od kritike ili osude.
            </li>

            <li>
              Aktivno slušanje: Pokazivanje interesovanja za ono što adolescenti
              govore i razumevanje njihovih osećaja može pomoći u izgradnji
              poverenja.
            </li>

            <li>
              Razgovor o mentalnom zdravlju: Otvorena diskusija o temama
              mentalnog zdravlja, kao što su stres, anksioznost i depresija,
              može ohrabriti adolescente da potraže pomoć ako im je potrebna.
            </li>
          </ul>

          <h2>Prepoznavanje znakova i reagovanje</h2>

          <p>
            Roditelji bi trebalo da budu svesni znakova koji mogu ukazivati na
            probleme mentalnog zdravlja kod adolescenata:
          </p>

          <ul>
            <li>
              Obratite pažnju na promene: Budite oprezni na značajne promene u
              ponašanju, raspoloženju ili školskim postignućima. Ovo može
              uključivati povlačenje, razdražljivost ili pad u učenju.
            </li>

            <li>
              Reagovanje na znake: Ako primetite znakove problema, važno je da
              reagujete odmah. Pogovorite s adolescentom o vašim zabrinutostima
              i ohrabrite ih da potraže stručnu pomoć ako je potrebno.
            </li>

            <li>
              Podrška: Informišite se o dostupnim resursima, kao što su školski
              psiholozi ili terapeuti, savetovališta za mlade i sl.
            </li>
          </ul>

          <p>
            Aktivna uloga roditelja u podršci adolescentima, otvorena
            komunikacija i pravovremeno reagovanje na znakove problema mentalnog
            zdravlja mogu značajno uticati na dobrobit mladih.
          </p>
        </div>

        <div className="teacher-support">
          <h1>Uloga nastavnika</h1>

          <p>
            Nastavnici mogu imati važnu ulogu u podršci mentalnom zdravlju
            učenika kroz praćenje, stvaranje podržavajućeg okruženja i saradnju
            s roditeljima i stručnjacima. Njihova uloga može značajno uticati na
            dobrobit i razvoj adolescenata.
          </p>

          <FrequentlyAskedQuestion question="Pratiti promene u ponašanju učenika">
            <p>
              Nastavnici igraju važnu ulogu u prepoznavanju promena u ponašanju
              učenika. Pažljivo posmatranje učenika može pomoći u
              identifikovanju znakova problema mentalnog zdravlja. Ključni
              aspekti uključuju:
            </p>

            <ul>
              <li>
                Identifikovanje znakova: Promene kod učinka, izostanaci,
                nedostatak interesovanja za učenje ili povlačenje iz društvenih
                aktivnosti. Ove promene mogu ukazivati na dublje probleme.
              </li>

              <li>
                Razgovaranje s učenicima: Stvaranje poverenja i otvorene
                komunikacije može ohrabriti učenike da dele svoje brige ili
                probleme. Nastavnici mogu biti prva osoba s kojom učenik
                razgovara o svojim osećanjima.
              </li>

              <li>
                Prijavljivanje zabrinutosti: Kada nastavnici primete znake
                problema, važno je da o tome obaveste nadležne osobe u školi,
                odeljenjske starešine, školskog psihologa ili pedagoga, koji
                mogu pružiti dodatnu podršku.
              </li>
            </ul>
          </FrequentlyAskedQuestion>

          <FrequentlyAskedQuestion question="Kreiranje podržavajućeg okruženja">
            <p>
              Nastavnici mogu značajno uticati na mentalno zdravlje učenika
              stvaranjem podržavajućeg okruženja:
            </p>

            <ul>
              <li>
                Promovisanje inkluzije: Svi učenici treba da se osećaju
                prihvaćeno i vrednovano. Nastavnici mogu podsticati saradnju i
                podršku među učenicima.
              </li>

              <li>
                Ohrabrivanje otvorenog dijaloga: Kreiranje prostora u kojem
                učenici mogu slobodno izraziti svoje misli i osećanja može
                pomoći u smanjenju stigme oko mentalnog zdravlja.
              </li>

              <li>
                Pružanje resursa: Nastavnici mogu informisati učenike o
                resursima za podršku, kao što su školski psiholozi, i
                ohrabrivati ih da potraže pomoć kada je potrebno.
              </li>
            </ul>
          </FrequentlyAskedQuestion>

          <FrequentlyAskedQuestion question="Saradnja s roditeljima i stručnjacima">
            <p>
              Saradnja s roditeljima i stručnjacima ključna je za pružanje
              sveobuhvatne podrške učenicima:
            </p>

            <ul>
              <li>
                Komunikacija s roditeljima: Redovna komunikacija s roditeljima o
                učinku i ponašanju učenika, deljenje svojih utisaka i
                ohrabrivanje roditelje da se uključe u proces podrške.
              </li>
              <li>
                Saradnja sa stručnjacima: Nastavnici / odeljenjske starešine,
                mogu sarađivati sa školskim psihologom, pedagogom i drugim
                stručnjacima da bi osigurali da učenici dobiju odgovarajuću
                pomoć i podršku.
              </li>

              <li>
                Timski pristup: Uvek je korisno raditi u timu kako bi se razvili
                individualni planovi podrške za učenike koji se suočavaju s
                mentalnim zdravstvenim problemima. Ovaj pristup osigurava da svi
                uključeni imaju jasnu strategiju za pomoć.
              </li>
            </ul>
          </FrequentlyAskedQuestion>
        </div>
      </div>

      <div className="self-help">
        <h1>Strategije za poboljšanje mentalnog zdravlja</h1>

        <p>
          Praktikovanje samopomoći ključno je za poboljšanje mentalnog zdravlja
          i dobrobiti. To podrazumeva aktivnosti i navike koje adolescenti mogu
          uključiti u svoje svakodnevne rutine:
        </p>

        <ul>
          <li>
            Samosvest: Razumevanje i prepoznavanje svojih emocija i potreba
            važan je korak u samoodržavanju. Ovo može uključivati vođenje
            dnevnika, gde adolescenti mogu zapisivati svoje osećaje i iskustva.
          </li>

          <li>
            Upravljanje stresom: Učenje tehnika za upravljanje stresom, kao što
            su planiranje i organizovanje obaveza, može značajno smanjiti osećaj
            preopterećenosti.
          </li>

          <li>
            Postavljanje granica: Razumevanje važnosti postavljanja granica u
            odnosima i obavezama može pomoći u očuvanju mentalnog zdravlja.
          </li>
        </ul>

        <FrequentlyAskedQuestion question="Vežbe opuštanja i meditacija su efikasni alati za poboljšanje mentalnog zdravlja">
          <ul>
            <li>
              Tehnike dubokog disanja: Praktikovanje dubokog disanja može pomoći
              u smanjenju anksioznosti i stresa. Ove tehnike uključuju polagano
              i duboko udahivanje, čime se aktivira parasimpatički nervni sistem
              i podstiče opuštanje.
            </li>

            <li>
              Meditacija: Meditacija, uključujući vođene meditacije i tehnike
              usmeravanja pažnje, može poboljšati koncentraciju i smanjiti
              stres. Čak i kratke sesije meditacije mogu biti korisne.
            </li>

            <li>
              Joga: Joga kombinuje fizičke vežbe, disanje i meditaciju, što je
              idealno za opuštanje uma i tela. Pružanje fleksibilnosti i fizičke
              snage istovremeno pozitivno utiče na mentalno zdravlje.
            </li>
          </ul>
        </FrequentlyAskedQuestion>

        <FrequentlyAskedQuestion question="Fizička aktivnost i zdrave navike u ishrani igraju značajnu ulogu u održavanju mentalnog zdravlja">
          <ul>
            <li>
              Fizička aktivnost: Redovna fizička aktivnost oslobađa endorfine,
              hormone koji poboljšavaju raspoloženje. Čak i kratke šetnje ili
              vežbe u prirodi mogu značajno poboljšati mentalno stanje.
            </li>

            <li>
              Zdrava ishrana: Uravnotežena ishrana, koja uključuje voće, povrće,
              cela zrna i zdrave masti, važna je za mentalno zdravlje. Neke
              studije ukazuju na vezu između ishrane i raspoloženja, te je važno
              izbegavati prerađenu hranu i prekomerni šećer.
            </li>

            <li>
              Hidratacija: Dovoljan unos vode takođe igra važnu ulogu u
              održavanju energije i koncentracije. Dehidratacija može negativno
              uticati na raspoloženje i kognitivne funkcije.
            </li>
          </ul>
        </FrequentlyAskedQuestion>

        <p>
          Primenom strategija za samopomoć, vežbama opuštanja i redovnom
          fizičkom aktivnošću, adolescenti mogu značajno poboljšati svoje
          mentalno zdravlje i dobrobit. Ove strategije pružaju osnovne alate za
          upravljanje stresom i poboljšanje kvaliteta života.
        </p>
      </div>

      <div className="help">
        <h1>Kome se obratiti za pomoć</h1>

        <p>
          Kada se adolescenti suočavaju s problemima mentalnog zdravlja, važno
          je znati gde mogu potražiti pomoć. Neke od mogućih opcija uključuju:
        </p>

        <ul>
          <li>
            Školski psiholozi i pedagozi: Mogu pomoći u rešavanju problema ili
            uputiti na dalje resurse.
          </li>

          <li>
            Lekari i terapeuti: Pedijatri u Domu zdravlja lekari mogu biti prva
            tačka kontakta. Oni mogu uputiti na specijaliste za mentalno
            zdravlje, kao što su psihijatri, psiholozi, psihoterapeuti.
          </li>

          <li>
            Institut za mentalno zdravlje – Savetovalište za mlade, Milana
            Kašanina 3, 11000 Beograd (poznatija kao Palmotićeva)
          </li>

          <li>
            Klinika za neurologiju, Klinički Centar Srbije, Dr. Subotića
            Starijeg 6
          </li>

          <li>NADEL – Nacionalna dečija linija 166111</li>
        </ul>

        <p>
          Svi činioci — roditelji, nastavnici, vršnjaci i zajednica u celini —
          imaju važnu ulogu u stvaranju podržavajućeg okruženja za adolescente.
          Kroz otvorenu komunikaciju, aktivnu podršku i dostupnost resursa,
          možemo zajedno pomoći mladima da se osećaju prihvaćeno. Pružanjem
          podrške i razumevanja, stvara se prostor u kojem adolescenti mogu
          uspešno da upravljaju izazovima i razvijaju svoje mentalno zdravlje.
        </p>
      </div>
    </div>
  );
}

type FAQProps = {
  readonly question: string;
} & (
  | { readonly answer: string; children?: never }
  | { readonly children: React.ReactNode; answer?: never }
);

function FrequentlyAskedQuestion({ question, answer, children }: FAQProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="faq">
      <button onClick={() => setOpen(!open)}>
        <p className="question">{question}</p>
      </button>

      {open && (
        <div className="answer">
          {typeof answer === "string" ? <p>{answer}</p> : children}
        </div>
      )}
    </div>
  );
}


import Icon from "@components/icon/icon";

export default function StudentsPageAntiBullying() {
  return (
    <div className="anti-bullying">
      <h1>Nasilje</h1>

      <div className="anti-bullying-description">
        <p>
          Ukoliko ti trpiš vršnjačko nasilje, ili neko iz tvoje okoline, prijavi
          ga odeljenskom starešini, PP službi ili Timu za zaštitu učenika i,
          naravno, svojim roditeljima.
        </p>

        <p>
          U našoj školi postoji Tim za zaštitu učenika od diskriminacije,
          nasilja, zlostavljanja, zanemarivanja. Od nastavnika koji čine ovaj
          Tim u svakom trenutku u školi možete dobiti savet i uput šta da
          uradite ukoliko trpite nasilje ili ste svedok nasilja.
        </p>

        <a
          className="anti-bullying-link"
          href="/documents/prijava-nasilja.pdf"
          target="_blank"
        >
          <p>Prijava nasilja PDF</p>
          <Icon name="arrow-right" />
        </a>
      </div>

      <h2>SOS telefoni</h2>
      <ul>
        <li>
          Prijava digitalnog nasilja – Nacionalni kontakt centar za bezbednost
          dece na internetu – 19833
        </li>
        <li>Nacionalna SOS linija za prevenciju suicida – 011 7777 000</li>
        <li>Prijava nasilja u porodici – 0800 100 600</li>
        <li>Nacionalna dečija linija Srbije NADEL – 116111</li>
        <li>SOS telefonska linija za psihosocijalnu podršku – 0800-200-201</li>
        <li>
          Centar za zaštitu žrtava trgovine ljudima – broj telefona: +381 63 610
          590.
        </li>
      </ul>

      <h2>Šta je to školsko nasilje</h2>
      <div className="anti-bullying-description">
        <p>
          Školsko nasilje je nasilje koje se dešava u školi, s ciljem da se
          namerno nanese šteta drugome. Međutim, nasilje se može dešavati i
          izvan škole a da se i dalje smatra školskim. Ono se može dešavati u
          školskom dvorištu nakon nastave ili na putu od kuće do škole, ali i
          onlajn, preko društvenih mreža na kojima su deca iz istih ili
          različitih škola međusobno povezana.
        </p>
        <br />
        <p>
          Najčešći oblici nasilja u školama su verbalno nasilje (psovanje,
          ismevanje, ogovaranje, pretnje), društveno isključivanje (vršenje
          pritiska na vršnjake da se ne druže i ne komuniciraju sa nekim
          konkretnim detetom iz škole), ali i fizičko nasilje (udaranja, tuče) i
          seksualno nasilje (davanje lascivnih nadimaka, nedozvoljena
          dodirivanja između vršnjaka, nedozvoljeno deljenje fotografija sa
          društvenih mreža i njihovo komentarisanje u seksualnom smislu).
          Nažalost, izloženost nasilju ne prestaje odlaskom iz škole, već se
          nastavlja i onlajn – digitalno nasilje.
        </p>
        <br />
        <p>
          U školi nasilje učenici mogu da trpe i od svojih vršnjaka i od
          nastavnika, kao što i učenici mogu da vrše nasilje i nad vršnjacima i
          nad nastavnicima (najčešće su u pitanju provokacije i vređanja od
          strane učenika, ali ima i pretnji, pa i fizičkih napada na
          nastavnike).
        </p>
        <br />
        <p>
          Osnov za vršenje nasilja počinioci nasilja najčešće vide u
          materijalnom i intelektualnom statusu, u nacionalnoj i seksualnoj
          pripadnosti žrtve – dakle u osnovi nasilja je skoro uvek
          diskriminacija, po kojoj se vršnjaci i nastavnici nužno ne moraju
          mnogo razlikovati. (tekst preuzet sa sajta Čuvam te)
        </p>
      </div>

      <h2>Platforme</h2>
      <ul>
        <li>Nacionalni kontakt centar za bezbednost dece na internetu</li>
        <li>Nacionalna platforma za prevenciju nasilja koje uključuje decu</li>
        <li>
          <a
            href="https://cuvamte.gov.rs/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <p>Čuvam te Platforma</p>
            <Icon name="arrow-right" />
          </a>
        </li>
      </ul>

      <h2>PODRŠKA ŠKOLAMA U KRIZNIM INERVENCIJAMA</h2>
      <ul>
        <li>
          <a href="/documents/support/1.pdf" target="_blank">
            <p>
              Kako se suočiti sa događajem u kojem je više osoba povređeno ili
              ubijeno
            </p>
            <Icon name="arrow-right" />
          </a>
        </li>

        <li>
          <a href="/documents/support/2.pdf" target="_blank">
            <p>Kako pomoći deci da se vrate u školu nakon tragičnog događaja</p>
            <Icon name="arrow-right" />
          </a>
        </li>

        <li>
          <a href="/documents/support/3.pdf" target="_blank">
            <p>Kako brinuti o sebi tokom kriznih situacija</p>
            <Icon name="arrow-right" />
          </a>
        </li>

        <li>
          <a href="/documents/support/4.pdf" target="_blank">
            <p>Delotvorna komunikacija sa decom tokom kriznih situacija</p>
            <Icon name="arrow-right" />
          </a>
        </li>

        <li>
          <a href="/documents/support/5.pdf" target="_blank">
            <p>
              Razgovor sa decom o terorističkim napadima i pucnjavi u školama i
              zajednici o kojima se izveštava u vestima
            </p>
            <Icon name="arrow-right" />
          </a>
        </li>

        <li>
          <a href="/documents/support/6.pdf" target="_blank">
            <p>Uobičajeni znakovi psihosocijalnog distresa dece</p>
            <Icon name="arrow-right" />
          </a>
        </li>
      </ul>
    </div>
  );
}


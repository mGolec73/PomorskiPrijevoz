import React from "react";
import styled from "styled-components";



const Home = (props) => {

  return (
    <>
      <CustomDiv>
      <CustomDiv2>
      <h1 id="pomorskiprijevoz">PomorskiPrijevoz</h1>
      <a href="/datatable"> Tablica</a>
      <a id="exportCSV" href="./linijeHome.csv" download="linije" target="_blank"> Download CSV </a>
      <a id="exportJSON" href="./linijeHome.json" download="linije" target="_blank">Download JSON </a>
      </CustomDiv2>
      <div>
        <p>Podaci o državnom pomorskom prometu, linijama i brodovima koji prevoze do određenih destinacija dostupni u formatima JSON i csv.</p>
        <p>Autor: Mateja Golec</p>
        <p>Jezik: hrvatski</p>
        <p> Verzija: 1.0 Datum objave: 2.11.2022.</p>
        <p>Licencija: GNU General Public License v3.0</p>
        <p> Opis licencije: Ova licencija omogućava dijeljenje, modificiranje te korištenje podataka u sve svrhe, čak i komercijalne pod istim uvjetima uz daljnje korištenje licencije i navođenje izvora te zadržavanje autorskih prava.</p>
      </div>
      
      <div>
        <h2>Opis atributa entiteta u bazi podataka</h2>
        <h4>Entitet linija</h4>
        <ol>
          <li>oznakaLinije (int) - jedinstvena brojčana oznaka pomorske linije</li>
          <li>tipLinije (varchar) - vrsta linije gledano obzirom na područje plovidbe (međunarodna ili lokalna)</li>
          <li>polazište (varchar) - polazišna luka</li>
          <li>odredište (varchar) - odredišna luka</li>
          <li>stajališta (varchar) - ostale luke u kojima brodovi pristaju između polazišta i odredišta, pojedine linije su izravne i nemaju stajališta</li>
          <li>okružje (varchar) - geografsko područje u kojem brodovi plove (uglavnom vezano uz polazišnu luku)</li>
          <li>vrijemeVožnje (float) - vremensko trajanje plovidbe u jednom smjeru iskazano u minutama</li>
          <li>cijena (int) - cijena vožnje za jednu osobu u sezonskom razdolju izražena u kunama</li>
          <li>brojPolazakaUDanu (int) - broj koliko puta svi brodovi zajedno plove s polazišne na odredišnu poziciju određenom linijom u jednom danu</li>
          <li>dodatniSadržaj (varchar) - jednostavna da/ne vrijednost vezana uz postojanje dodatnog sadržaja prilikom plovidbe određenom linijom</li>
          <li>opis (varchar) - rečenicom opisana vrsta linije te otoci/gradovi između kojih se odvija plovidba</li>
        </ol>
      </div>
      <div>
        <h4>Entitet brod</h4>
        <ol>
        <li>nazivBroda (varchar) - jedinstveno ime broda</li>
        <li>vrstaBroda (varchar) - brodovi se dijele na katamarane i trajekte</li>
        <li>vlasnikBroda (varchar) - vlasnička tvrtka broda</li>
        <li>kapacitet (int) - brojčani kapacitet odraslih osoba za pojedini brod</li>
        </ol>
      </div>
      <div>
        <h4>Entitet prevozi</h4>
        <ol>
        <li>oznakaLinije (int) - strani ključ preuzet iz entiteta linija</li>
        <li>nazivBroda (varchar) - strani ključ preuzet iz eniteta brod</li>
        <p>Ova tablica predstavlja vezu između brodova koji putuju na pojedinim linijama. Na određenoj liniji može putovati više brodova. </p>
        </ol>
      </div>
      <CustomDiv2>
      <div>
        <h2>Ostale informacije</h2>
        <p>Podaci su dostupni u formatima JSON i csv koji su pogodni za stojnu obradu te su lako čitljivi i ljudima. Unutar repositorija uz same podatke nalazi i dump baze podataka.</p>
      </div>
      </CustomDiv2>
    </CustomDiv>

    
    </>
  );
  
};

export default Home;

const CustomDiv= styled.div`
  widith: 95%;
  margin: 20px;
  h4{
    color:rgba(255, 7, 0, 0.65);
  }
  h2{
    font-size:1.2rem
  }
  a{
    color:black;
    font-size:1.2rem
  }
  div{
    padding-left:15px;
  }
`;
const CustomDiv2= styled.div`
  background:rgba(255, 7, 0, 0.49);
  h1{
    font-size: 2rem;
  }
`;

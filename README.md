# PomorskiPrijevoz
Podaci o državnom pomorskom prometu, linijama i brodovima koji prevoze do određenih destinacija dostupni u formatima **JSON** i **csv**.  
**Autor**: Mateja Golec  
**Jezik**: hrvatski  
**Verzija**: 1.0
**Datum objave**: 2.11.2022.
**Licencija**: GNU General Public License v3.0  
**Opis licencije**: Ova licencija omogućava dijeljenje, modificiranje te korištenje podataka u sve svrhe, čak i komercijalne pod istim uvjetima uz daljnje korištenje licencije i navođenje izvora te zadržavanje autorskih prava.  

### Opis atributa entiteta u bazi podataka

#### Entitet linija
1. **oznakaLinije** *(int)* - jedinstvena brojčana oznaka pomorske linije  
2. **tipLinije** *(varchar)* - vrsta linije gledano obzirom na područje plovidbe (međunarodna ili lokalna)  
3. **polazište** *(varchar)* - polazišna luka   
4. **odredište** *(varchar)* - odredišna luka  
5. **stajališta** *(varchar)* - ostale luke u kojima brodovi pristaju između polazišta i odredišta, pojedine linije su izravne i nemaju stajališta
6. **okružje** *(varchar)* - geografsko područje u kojem brodovi plove (uglavnom vezano uz polazišnu luku)  
7. **vrijemeVožnje** *(float)* - vremensko trajanje plovidbe u jednom smjeru iskazano u minutama  
8. **cijena** *(int)* - cijena vožnje za jednu osobu u sezonskom razdolju izražena u kunama  
9. **brojPolazakaUDanu** *(int)* - broj koliko puta svi brodovi zajedno plove s polazišne na odredišnu poziciju određenom linijom u jednom danu   
10. **dodatniSadržaj** *(varchar)* - jednostavna da/ne vrijednost vezana uz postojanje dodatnog sadržaja prilikom plovidbe određenom linijom  
11. **opis** *(varchar)* - rečenicom opisana vrsta linije te otoci/gradovi između kojih se odvija plovidba  

#### Entitet brod
1. **nazivBroda** *(varchar)* - jedinstveno ime broda  
2. **vrstaBroda** *(varchar)* - brodovi se dijele na katamarane i trajekte  
3. **vlasnikBroda** *(varchar)* - vlasnička tvrtka broda  
4. **kapacitet** *(int)* - brojčani kapacitet odraslih osoba za pojedini brod  

#### Entitet prevozi
1. **oznakaLinije** *(int)* - strani ključ preuzet iz entiteta linija  
2. **nazivBroda** *(varchar)* - strani ključ preuzet iz eniteta brod  
Ova tablica predstavlja vezu između brodova koji putuju na pojedinim linijama. Na određenoj liniji može putovati više brodova.  

### Ostale informacije
Podaci su dostupni u formatima **JSON** i **csv** koji su pogodni za stojnu obradu te su lako čitljivi i ljudima. Unutar repositorija uz same podatke nalazi i dump baze podataka. Podaci i informacije preuzeti su sa stranice https://www.jadrolinija.hr/.

--
-- PostgreSQL database dump
--

-- Dumped from database version 14.2
-- Dumped by pg_dump version 14.2

-- Started on 2022-11-01 19:42:54

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'WIN1250';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 210 (class 1259 OID 41809)
-- Name: brod; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.brod (
    nazivbroda character varying NOT NULL,
    vrstabroda character varying NOT NULL,
    vlasnikbroda character varying NOT NULL,
    kapacitet integer NOT NULL
);


ALTER TABLE public.brod OWNER TO postgres;

--
-- TOC entry 209 (class 1259 OID 41802)
-- Name: linija; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.linija (
    tiplinije character varying NOT NULL,
    cijena character varying NOT NULL,
    "dodatansadržaj" character varying NOT NULL,
    "okružje" character varying NOT NULL,
    "vrijemevožnje" double precision NOT NULL,
    "odredište" character varying NOT NULL,
    "polazište" character varying NOT NULL,
    oznakalinije integer NOT NULL,
    opis character varying,
    "stajališta" character varying,
    brojpolazakaudanu integer NOT NULL
);


ALTER TABLE public.linija OWNER TO postgres;

--
-- TOC entry 211 (class 1259 OID 41816)
-- Name: prevozi; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.prevozi (
    oznakalinije integer NOT NULL,
    nazivbroda character varying NOT NULL
);


ALTER TABLE public.prevozi OWNER TO postgres;

--
-- TOC entry 212 (class 1259 OID 41838)
-- Name: putuju; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.putuju AS
 SELECT prevozi.nazivbroda,
    prevozi.oznakalinije,
    brod.vrstabroda,
    brod.vlasnikbroda,
    brod.kapacitet
   FROM (public.prevozi
     JOIN public.brod USING (nazivbroda));


ALTER TABLE public.putuju OWNER TO postgres;

--
-- TOC entry 213 (class 1259 OID 41857)
-- Name: pomorskiprijevoz; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.pomorskiprijevoz AS
 SELECT linija.oznakalinije,
    linija.tiplinije,
    linija."polazište",
    linija."odredište",
    linija."stajališta",
    linija."okružje",
    linija."vrijemevožnje",
    linija.cijena,
    linija.brojpolazakaudanu,
    linija."dodatansadržaj",
    linija.opis,
    ( SELECT json_agg(row_to_json(brod.*)) AS json_agg
           FROM (public.brod
             JOIN public.putuju USING (nazivbroda, vrstabroda, vlasnikbroda, kapacitet))
          WHERE (linija.oznakalinije = putuju.oznakalinije)
          GROUP BY putuju.oznakalinije) AS brodovi
   FROM public.linija;


ALTER TABLE public.pomorskiprijevoz OWNER TO postgres;

--
-- TOC entry 3329 (class 0 OID 41809)
-- Dependencies: 210
-- Data for Name: brod; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.brod (nazivbroda, vrstabroda, vlasnikbroda, kapacitet) FROM stdin;
Olea	katamaran	Jadrolinija	218
Silba	katamaran	Jadrolinija	310
Adriana	katamaran	Jadrolinija	356
Judita	katamaran	Jadrolinija	316
Dubravka	katamaran	Jadrolinija	306
Karolina	katamaran	Jadrolinija	316
Bartol Kašiæ	trajekt	Jadrolinija	500
Petar Hektoroviæ	trajekt	Jadrolinija	1080
Laslovo	trajekt	Jadrolinija	150
Ston	trajekt	Jadrolinija	150
Hanibal Luciæ	trajekt	Jadrolinija	360
Tin Ujeviæ	trajekt	Jadrolinija	1000
Juraj Dalmatinac	trajekt	Jadrolinija	1200
Bol	trajekt	Jadrolinija	600
Dubrovnik	trajekt	Jadrolinija	1757
Marko Polo	trajekt	Jadrolinija	1647
Mljet	trajekt	Jadrolinija	616
Ilovik	trajekt	Jadrolinija	500
Cres	trajekt	Jadrolinija	600
Faros	trajekt	Jadrolinija	650
\.


--
-- TOC entry 3328 (class 0 OID 41802)
-- Dependencies: 209
-- Data for Name: linija; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.linija (tiplinije, cijena, "dodatansadržaj", "okružje", "vrijemevožnje", "odredište", "polazište", oznakalinije, opis, "stajališta", brojpolazakaudanu) FROM stdin;
lokalna	78	da	Splitsko	185	Ubli	Split	9604	brzobrodska linija koja polazi iz Splita na otoke Hvar,Korèulu i Lastovo	Vela Luka, Hvar	6
lokalna	63	da	Splitsko	90	Jelsa	Split	9603	brzobrodska linija koja polazi iz Splita na otoke Braè i hvar	Bol	4
lokalna	280	da	Dubrovaèko	180	Split	Dubrovnik	9811	brzobrodska linija koja polazi iz Dubrovnika na otoke Hvar,Korèulu i Braè	Vela Luka,Hvar,Bol	8
lokalna	36	ne	Dubrovaèko	45	Sobra	Prapratno	832	trajektna linija koja polazi iz Pelješca na otok Mljet		4
lokalna	45	da	Rijeèko	80	Lopar	Valbiska	338	trajektna linija koja polazi s otoka Krka na otok Rab		4
lokalna	26	ne	Rijeèko	25	Merag	Valbiska	332	trajektna linija koja polazi s otoka Krka na otok Cres		13
lokalna	22	ne	Zadarsko	20	Tkon	Biograd	432	trajektna linija koja polazi iz Biograda na otok Pašman		13
meðunarodna	363	da	Splitsko	570	Ancona	Split	53	meðunarodna linija koja polazi iz Splita za Anconu		1
meðunarodna	287	da	Durovaèko	600	Bari	Dubrovnik	54	meðunarodna linija koja polazi iz Dubrovnika za Bari		1
lokalna	24	ne	Splitsko	35	Suæuraj	Drvenik	632	trajektna linija koja polazi iz Drvenika na otok Hvar		11
lokalna	55	da	Splitsko	120	Stari Grad	Split	635	trajektna linija koja polazi iz Splita na otok Hvar		6
\.


--
-- TOC entry 3330 (class 0 OID 41816)
-- Dependencies: 211
-- Data for Name: prevozi; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.prevozi (oznakalinije, nazivbroda) FROM stdin;
9604	Judita
9604	Adriana
9811	Olea
832	Hanibal Luciæ
9603	Karolina
9603	Silba
338	Bol
632	Ston
632	Laslovo
635	Tin Ujeviæ
635	Petar Hektoroviæ
338	Cres
338	Mljet
332	Mljet
432	Faros
53	Marko Polo
54	Dubrovnik
\.


--
-- TOC entry 3182 (class 2606 OID 41815)
-- Name: brod brod_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.brod
    ADD CONSTRAINT brod_pkey PRIMARY KEY (nazivbroda);


--
-- TOC entry 3180 (class 2606 OID 41808)
-- Name: linija linija_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.linija
    ADD CONSTRAINT linija_pkey PRIMARY KEY (oznakalinije);


--
-- TOC entry 3184 (class 2606 OID 41822)
-- Name: prevozi prevozi_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.prevozi
    ADD CONSTRAINT prevozi_pkey PRIMARY KEY (oznakalinije, nazivbroda);


--
-- TOC entry 3186 (class 2606 OID 41828)
-- Name: prevozi prevozi_nazivbroda_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.prevozi
    ADD CONSTRAINT prevozi_nazivbroda_fkey FOREIGN KEY (nazivbroda) REFERENCES public.brod(nazivbroda);


--
-- TOC entry 3185 (class 2606 OID 41823)
-- Name: prevozi prevozi_oznakalinije_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.prevozi
    ADD CONSTRAINT prevozi_oznakalinije_fkey FOREIGN KEY (oznakalinije) REFERENCES public.linija(oznakalinije);


-- Completed on 2022-11-01 19:42:54

--
-- PostgreSQL database dump complete
--


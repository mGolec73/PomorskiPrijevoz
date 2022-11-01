PGDMP         "            
    z            PomorskiPrijevoz    14.2    14.2                0    0    ENCODING    ENCODING     !   SET client_encoding = 'WIN1250';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    41801    PomorskiPrijevoz    DATABASE     q   CREATE DATABASE "PomorskiPrijevoz" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'Croatian_Croatia.1250';
 "   DROP DATABASE "PomorskiPrijevoz";
                postgres    false            �            1259    41809    brod    TABLE     �   CREATE TABLE public.brod (
    nazivbroda character varying NOT NULL,
    vrstabroda character varying NOT NULL,
    vlasnikbroda character varying NOT NULL,
    kapacitet integer NOT NULL
);
    DROP TABLE public.brod;
       public         heap    postgres    false            �            1259    41802    linija    TABLE     �  CREATE TABLE public.linija (
    tiplinije character varying NOT NULL,
    cijena character varying NOT NULL,
    "dodatansadr�aj" character varying NOT NULL,
    "okru�je" character varying NOT NULL,
    "vrijemevo�nje" double precision NOT NULL,
    "odredi�te" character varying NOT NULL,
    "polazi�te" character varying NOT NULL,
    oznakalinije integer NOT NULL,
    opis character varying,
    "stajali�ta" character varying,
    brojpolazakaudanu integer NOT NULL
);
    DROP TABLE public.linija;
       public         heap    postgres    false            �            1259    41816    prevozi    TABLE     n   CREATE TABLE public.prevozi (
    oznakalinije integer NOT NULL,
    nazivbroda character varying NOT NULL
);
    DROP TABLE public.prevozi;
       public         heap    postgres    false            �            1259    41838    putuju    VIEW     �   CREATE VIEW public.putuju AS
 SELECT prevozi.nazivbroda,
    prevozi.oznakalinije,
    brod.vrstabroda,
    brod.vlasnikbroda,
    brod.kapacitet
   FROM (public.prevozi
     JOIN public.brod USING (nazivbroda));
    DROP VIEW public.putuju;
       public          postgres    false    210    210    210    210    211    211            �            1259    41857    pomorskiprijevoz    VIEW     g  CREATE VIEW public.pomorskiprijevoz AS
 SELECT linija.oznakalinije,
    linija.tiplinije,
    linija."polazi�te",
    linija."odredi�te",
    linija."stajali�ta",
    linija."okru�je",
    linija."vrijemevo�nje",
    linija.cijena,
    linija.brojpolazakaudanu,
    linija."dodatansadr�aj",
    linija.opis,
    ( SELECT json_agg(row_to_json(brod.*)) AS json_agg
           FROM (public.brod
             JOIN public.putuju USING (nazivbroda, vrstabroda, vlasnikbroda, kapacitet))
          WHERE (linija.oznakalinije = putuju.oznakalinije)
          GROUP BY putuju.oznakalinije) AS brodovi
   FROM public.linija;
 #   DROP VIEW public.pomorskiprijevoz;
       public          postgres    false    209    212    212    212    212    212    210    210    210    210    209    209    209    209    209    209    209    209    209    209                      0    41809    brod 
   TABLE DATA           O   COPY public.brod (nazivbroda, vrstabroda, vlasnikbroda, kapacitet) FROM stdin;
    public          postgres    false    210                     0    41802    linija 
   TABLE DATA           �   COPY public.linija (tiplinije, cijena, "dodatansadr�aj", "okru�je", "vrijemevo�nje", "odredi�te", "polazi�te", oznakalinije, opis, "stajali�ta", brojpolazakaudanu) FROM stdin;
    public          postgres    false    209                    0    41816    prevozi 
   TABLE DATA           ;   COPY public.prevozi (oznakalinije, nazivbroda) FROM stdin;
    public          postgres    false    211          n           2606    41815    brod brod_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.brod
    ADD CONSTRAINT brod_pkey PRIMARY KEY (nazivbroda);
 8   ALTER TABLE ONLY public.brod DROP CONSTRAINT brod_pkey;
       public            postgres    false    210            l           2606    41808    linija linija_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.linija
    ADD CONSTRAINT linija_pkey PRIMARY KEY (oznakalinije);
 <   ALTER TABLE ONLY public.linija DROP CONSTRAINT linija_pkey;
       public            postgres    false    209            p           2606    41822    prevozi prevozi_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public.prevozi
    ADD CONSTRAINT prevozi_pkey PRIMARY KEY (oznakalinije, nazivbroda);
 >   ALTER TABLE ONLY public.prevozi DROP CONSTRAINT prevozi_pkey;
       public            postgres    false    211    211            r           2606    41828    prevozi prevozi_nazivbroda_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.prevozi
    ADD CONSTRAINT prevozi_nazivbroda_fkey FOREIGN KEY (nazivbroda) REFERENCES public.brod(nazivbroda);
 I   ALTER TABLE ONLY public.prevozi DROP CONSTRAINT prevozi_nazivbroda_fkey;
       public          postgres    false    3182    211    210            q           2606    41823 !   prevozi prevozi_oznakalinije_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.prevozi
    ADD CONSTRAINT prevozi_oznakalinije_fkey FOREIGN KEY (oznakalinije) REFERENCES public.linija(oznakalinije);
 K   ALTER TABLE ONLY public.prevozi DROP CONSTRAINT prevozi_oznakalinije_fkey;
       public          postgres    false    211    3180    209               �   x�}�MN�0FיS��i��-m�JZD�ͤ�±둦N�9SvH��{��oޒ�*b�+2�Ş)����!u_��z�U�qЎ}(z	��c���X�}�We�\(�~��0>�?Rc-�|A6{A�4)bm��xK4Ѽ�X8�*�c&s/J�������>�܎B�����7bn(�B'�0M9���f�ȑ̉���{'��7��H^J�{�[�7u�g��B%�� ���.          �  x���Mn�0�ףS� A!��,/�H�8��Y݌b"�ɐ%y�䀅�=B����I�nH�{��I�*�aV�a�Ӳ������G���	̋8��l��Vȴ4r�LY��ƃd���02��6V	�u���ֺc�[&����-<�l�*�
PD�SQ���y߄�qP��C������������]�����w��N�T0/��l��� ������+*{E� #Ƃ��FX9�9l�����8�
՘�Ĭ�ފ��^
���F�ic�~/��c����(�ԕ$��y�>�#�u�cv���;gH�Ýp�4�|`埐/N� 	0����:_�4���XH��p��u�d��/h�E�i���V4����<Zs.i�a4�~E��ږ0JZ�N�<נ�cX���Z���Q)	v T�[�s�p�Z������텇D��х�����ӟк!-���)�����_v�)�_��(�\��         �   x�-�M�0�u���Kb�B$Awn��t�R8��p��7�yS��T\�A{�2�08��C��nB!Q��=��^�����#�-�R�M� e!�d �Γ�P�lh%v&�F�Q�\b�<��R�'Ga
NN�3*�J�JY�:C&E�n��%C����\`�� |�-=^     
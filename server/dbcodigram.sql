PGDMP     	                	    {            codigram    13.3    15.3     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    19581    codigram    DATABASE        CREATE DATABASE codigram WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_Indonesia.1252';
    DROP DATABASE codigram;
                postgres    false                        2615    2200    public    SCHEMA     2   -- *not* creating schema, since initdb creates it
 2   -- *not* dropping schema, since initdb creates it
                postgres    false            �           0    0    SCHEMA public    ACL     Q   REVOKE USAGE ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO PUBLIC;
                   postgres    false    4            �            1259    19598    posts    TABLE     �   CREATE TABLE public.posts (
    id integer NOT NULL,
    user_id integer NOT NULL,
    caption text NOT NULL,
    image text NOT NULL,
    createdat timestamp without time zone,
    updatedat timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.posts;
       public         heap    postgres    false    4            �            1259    19596    posts_id_seq    SEQUENCE     �   CREATE SEQUENCE public.posts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.posts_id_seq;
       public          postgres    false    203    4            �           0    0    posts_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.posts_id_seq OWNED BY public.posts.id;
          public          postgres    false    202            �            1259    19584    users    TABLE     @  CREATE TABLE public.users (
    id integer NOT NULL,
    nama character varying NOT NULL,
    username character varying NOT NULL,
    password character varying NOT NULL,
    image text NOT NULL,
    createdat timestamp without time zone NOT NULL,
    updatedat timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.users;
       public         heap    postgres    false    4            �            1259    19582    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    4    201            �           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    200            ,           2604    19601    posts id    DEFAULT     d   ALTER TABLE ONLY public.posts ALTER COLUMN id SET DEFAULT nextval('public.posts_id_seq'::regclass);
 7   ALTER TABLE public.posts ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    203    202    203            *           2604    19587    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    201    200    201            �          0    19598    posts 
   TABLE DATA           R   COPY public.posts (id, user_id, caption, image, createdat, updatedat) FROM stdin;
    public          postgres    false    203          �          0    19584    users 
   TABLE DATA           Z   COPY public.users (id, nama, username, password, image, createdat, updatedat) FROM stdin;
    public          postgres    false    201   {       �           0    0    posts_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.posts_id_seq', 62, true);
          public          postgres    false    202            �           0    0    users_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.users_id_seq', 12, true);
          public          postgres    false    200            /           2606    19595    users username_unique 
   CONSTRAINT     T   ALTER TABLE ONLY public.users
    ADD CONSTRAINT username_unique UNIQUE (username);
 ?   ALTER TABLE ONLY public.users DROP CONSTRAINT username_unique;
       public            postgres    false    201            1           2606    19593    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    201            2           2606    19606    posts relation_post_user    FK CONSTRAINT     w   ALTER TABLE ONLY public.posts
    ADD CONSTRAINT relation_post_user FOREIGN KEY (user_id) REFERENCES public.users(id);
 B   ALTER TABLE ONLY public.posts DROP CONSTRAINT relation_post_user;
       public          postgres    false    203    201    2865            �   j  x��X����_���P� 0qr�'�6�I|��(=�z���l����mJ�A�{f ~�7��������s��]χӰ_>>
t��H�%%o�u��Ǝ�Wr�r�\�}��۬�����a��%��y?�cu��k�>��YIz���X����ț�o+QtٻreO���,��J�'�h<V�.�X|�X�.�Sܬ�v��DU<�z�M w��N����A�S�|�3i�s�3��%�
'G䃉X���1��t��t^���n:�.�2��p�nw��q�������<-�n��w�aZm���p���n޻�i�Q�?�x8�e<���8�K9�yB�u<�O��w@�:�������z^�����u��kw�4�Z���x�O�xZ��b���؍C�=_����<^&l_.��ߐ�����/uY�C��$���L� �V��EA�BOd�\�6}�'�����8�ӷox<t?���2�Q�6y��z�K��x@�����O�ݴ�cw��N�۰��<������aƯ�zP?�?��w�a��_�߰��w�u�!��֙e�nT	�(�D6��q��ؤ���3�ٹ���jL�%,�X��R6L��Ŕ8e/��xʽ�rz��,�\3zH�W����M���(�^$9���R#�E��uuYq3zRaα���&�;�A}DtiR4��*��M�h�/pR0�[����Ԓ��V3����B�4'U�S%�w��8��W�l�\�sI=�\��Cj�x��h;�p&�R�<W�O<E&C�^"DC�5r�w�|����P۱"�V�°���uy�Ź7�JCɅP=ٛu��-��gG���倓�Z��$��F�p��EC6ܴl�70r�T�{�6��px�웞���X#'�.Z	�?p��nz��y�1�<�0"���������i��@벿U�P�x$'E9MӢMi�������D�
Ǳn�[]_�&��s���5�d��UJh$�ԣ�F˲)	��Fo��ٌ��V���h��f�����#MϒW�0$TU��xV݆���4-��K+	U�qU��F6�T3i;V$xL+��?�2�|�&+�&��B�7̠޺Rr%Va/�#i�XN�A��P����Uq�	����ׄ�D	�o�A��4�x�m�Hۯ�bƀ��#_f�7��ܕ�4�*_ԥ��r��bL�XX�q��d�iX(x]��%���0/�d�4�&���wk)�ɕI�x�cpI�7�"s}�6��"@��8*B0�=���3i�vYtj���MSW�g�Ʒu�9�Cڎ��JyN��7sV㛲.��5�"�ƴ���gOl|S����Pȩ�ϸ|@�Ϧ��1��T}fM���3�L��6�?����O^8$�}9�>��O����h|�Ki�����^Ja�5K���O<y��Mh_q����Zx�A�\5�о��4l��E�h��< )��
�&�O5��6=��?pAk6�٨0	�[U�-{�/�RfM�o�e�U��H����?I�x��&�;��@�5]����:���&4=+�f�T�7�0���d�S.�;;*������O)<��3S��gA�����ܣdr-z�������u�ޫ(a|��}�ꠁb��c���Ƙ�g�      �     x���Is�@���)<�:M�7�k\���� "~�A�T��9̥����_?�#��ܙe��yA�"Lh��^|��:��nX�R���$��f�qc��g�	Muo��d���.K\J�~hZ��gۇ�c�Ŝ0�ߔ0����0+#n`ic�u)���Eeo�������3F}�E6˼@I҃��A��-xz�. <Ft<N>�t)-�1S?��/<UF���`(���c�ƞ�Ⱦ�Ԉ���u�E��3�$���l�tS�vF���������z��z;�,�I0W�)��I��e z.S(x�#�����!t<߾�A�=�!���9F�Z\j{��Z�;C=7(��V��B�3I�|��~�W��
S�0��N��Z�+k���Ķ���\��]ON}8���9[�~��~}���ӓKV�=9�T =�L���P(��z�"��`��&GQ���	�ߤ��{���������f�VP�ډ�>έ��2�_#x�'{8j����\�ɟ�"����]D���.����kqR�^���j������.t7��$��7�׍̲������ҏbn�,4��^AƠb��Ȫ0.�r �#��e�3�ɟ����Elץܽgos���Xl��y��ۮ��f'�;Y���5Ue��Y�h��S"1�T�{T^.�05(��I�A�1�
i��E+�/g����w�
�o�	:�ػNkbU�i��@+��GV�+�`Fw�͇h/�$�ݽ�}BEH�'#���	4M�:i�     
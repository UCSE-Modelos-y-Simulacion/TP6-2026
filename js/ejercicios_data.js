// Datos de Asignaciones y Rúbrica Criptográfica TP6 (Zero-Knowledge)
// Cátedra: Modelos y Simulación - UCSE 2026

const TP6_RUBRIC = {
    "asignacion_1": {
        "titulo": "Asignaci\u00f3n 1 (Alumno #1)",
        "caso": "Mercado Flash (Fulfillment)",
        "contexto": "Centro de fulfillment principal de Mercado Flash. En el sector de empaque y clasificaci\u00f3n se presentan cuellos de botella en la cinta transportadora antes del despacho.",
        "ejA": {
            "tipo": "mm1",
            "sector": "Estaci\u00f3n de pesaje y etiquetado previo (M/M/1)",
            "desc": "Los paquetes recolectados llegan a una balanza con etiquetado autom\u00e1tico atendida por un \u00fanico operador. La llegada sigue un proceso de Poisson con lambda = 18 paquetes/hora. El tiempo de pesaje y colocado de r\u00f3tulo sigue una distribuci\u00f3n exponencial con tasa media mu = 24 paquetes/hora.",
            "lam": 18,
            "mu": 24,
            "c": 1,
            "hashes": {
                "rho": "78a8340c739cda620598589cdfbc09d9624b4cff76ee8e4f20425d89293bd6bd",
                "p0": "cabc936856626d3ab4938baacb3fb21224da85c7ac5d93ced6d55c440719bc2f",
                "p_wait": "1884ac1807ec0792d425bd286a53439eff7f2445a575788f4b336772d9bb55f2",
                "Lq": "2c32f0f2a7d7ae5caab72fc8a04e06f63b8d0937080336bbff09eaae745a00b8",
                "L": "b601e7e9f01e92202dc5e7fd2118a6e7e927b25f30cd2c9f3618489847ae1a9a",
                "Wq_min": "eeac7e8bc84354ac3de65569a71daaec7f768c9dbe6a38b7bedb2a645e8d43c6",
                "W_min": "94361c33f0b1df071b7be2f2ad5abacb9c57e33308961aa7d217428c7377ab16"
            }
        },
        "ejB": {
            "tipo": "mm2",
            "sector": "Mesa de empaque final y embalaje (M/M/2)",
            "desc": "Los paquetes etiquetados pasan a la mesa de empaque final atendida por c = 2 operarios id\u00e9nticos con una cola \u00fanica previa. Llegan a raz\u00f3n de lambda = 24 paquetes/hora (Poisson) y cada operario tarda en promedio 3.75 minutos (mu = 16 paquetes/hora por operario, distribuci\u00f3n exponencial).",
            "lam": 24,
            "mu": 16,
            "c": 2,
            "hashes": {
                "rho": "c16196e8bd52baf4317e1d438a68ee40e9a2aff6717d1c800d5c34c25a7498ee",
                "p0": "c84259148f671de58d3444fccab6ce64fad5f851dfd9c578450bdc8ea9ae7e7e",
                "p_wait": "9c5f5269dd19f53109a85488d130ad4e7b4f44a3ad0837130981dad019774358",
                "Lq": "067499027966c86e088b7fde9dbd1ab8c58e4d2e3c73b62a9493ecf49b075246",
                "L": "d790fd71ead9bc37688a6c1b9d198139302961f0a4883d3377befca4820a79fa",
                "Wq_min": "f1242e88b9f80370cb7ae94b1c70b97d52eec5c8252fb2c0f61f73da0047b421",
                "W_min": "4f291dec8ff46687387a942f8f5183007b712c65360b24f780c0ee1964d058e4"
            }
        }
    },
    "asignacion_2": {
        "titulo": "Asignaci\u00f3n 2 (Alumno #2)",
        "caso": "Peaje Ruta 9 (Concesiones Viales)",
        "contexto": "Estaci\u00f3n troncal de peaje en autopista. Durante la tarde del fin de semana, el tr\u00e1nsito en las cabinas manuales genera demoras considerables.",
        "ejA": {
            "tipo": "mm1",
            "sector": "Cabina exclusiva para motocicletas y tele-pase (M/M/1)",
            "desc": "Las motocicletas y veh\u00edculos livianos especiales llegan a una cabina \u00fanica con lambda = 45 motos/hora (Poisson). El cajero despacha cada veh\u00edculo en un tiempo exponencial con media mu = 60 motos/hora (1 minuto por moto).",
            "lam": 45,
            "mu": 60,
            "c": 1,
            "hashes": {
                "rho": "bfcf08dcc8aff56e51b2b3e3382859088d076174989e43dc051f7c5873cd4e57",
                "p0": "1899ea4cc1fe2ddcaf18a3e662e423e83cb644aa9d960989c8e52fa43411fc14",
                "p_wait": "c96a07fd987b7d4ab9a119f8a07741e3a5c6a33096a82b19dd0475240505e32f",
                "Lq": "d3e8a28beea0cd15225e47bdd5a7b8bfba8e07ce6409923bc2729890af606c57",
                "L": "fdb17feaf1ae028de7d6e52ae05f695297d07e99edcb04a68fed01b34a7a8fa0",
                "Wq_min": "2614721dac471fc3c8a9c11ef5cbf996f6c51af94edceb4f4b4b281c8776773a",
                "W_min": "efafd3cb2193f8add6f9415d20a036cec6da55737ff3b42a9beaeb016cdbc580"
            }
        },
        "ejB": {
            "tipo": "mm3",
            "sector": "Plaza de cobro manual para autom\u00f3viles (M/M/3)",
            "desc": "Los autom\u00f3viles llegan a la plaza de peaje manual a raz\u00f3n de lambda = 120 veh\u00edculos/hora (Poisson). Se tienen c = 3 cabinas manuales en paralelo con una cola \u00fanica de aproximaci\u00f3n. Cada cabina atiende a una tasa exponencial de mu = 50 veh\u00edculos/hora (1.2 min/veh\u00edculo).",
            "lam": 120,
            "mu": 50,
            "c": 3,
            "hashes": {
                "rho": "3a50ef1d3bdeaab3201f47d3c0f0d2b5761dce58f3ceecee2cf86067e39ebffc",
                "p0": "534bc993f64e50299bf018d60e27f192d031c0dc6288be8113ab1839e345074f",
                "p_wait": "b36b9ecae2ca955bfa142c419a47f81be81f26b1e58890a8a65f2d0cc60edf44",
                "Lq": "16371c36f2a01f7a0c7c75a25105ac7821ce7dbac244a2b3c6bab89319cbea23",
                "L": "9452dfbfcd1f9fa5c338ba6e1e653bbb1210b99b15013219715c5097fd71cd17",
                "Wq_min": "a71d0e7e34a818e930c427d6b68e9d0e9ba32381eba2b17d64a359f2a7bfa5d9",
                "W_min": "d1eb55cb654d35a8530bddbb9a7ac9e85234c16cde5234aa9dd0efca6eb0747c"
            }
        }
    },
    "asignacion_3": {
        "titulo": "Asignaci\u00f3n 3 (Alumno #3)",
        "caso": "StarCoffee Nieva (Cafeter\u00eda)",
        "contexto": "Sucursal c\u00e9ntrica de cafeter\u00eda de especialidad con gran afluencia de clientes en el turno ma\u00f1ana.",
        "ejA": {
            "tipo": "mm1",
            "sector": "Caja de cobro y registro de comandas (M/M/1)",
            "desc": "Los clientes ingresan a pedir y abonar en la caja a raz\u00f3n de lambda = 40 pedidos/hora (Poisson). El cajero opera a una tasa exponencial de mu = 50 pedidos/hora (1.2 min por pedido).",
            "lam": 40,
            "mu": 50,
            "c": 1,
            "hashes": {
                "rho": "d25c491857fb16c50a787571e26bc0e8648bac6dbcfd996c0838a8cbf8e25633",
                "p0": "555edc0ef720050d4a0963561cdaa956ea06b21ddc74a69886051065e89edec8",
                "p_wait": "b4ba574d4cba1db5ad35d710fe81b51a20041280bed92442c36f305bfdcf3cae",
                "Lq": "1a39fa02367dc5c6db4d9e4973be4e062cef4f9c06aa55b3f036d64ab4f3b82b",
                "L": "555d6e3e7e44d85fe5594009264d1515830ccb2cf72fb86ca156f9cff74b43bc",
                "Wq_min": "dac6f2f45f716e2a8568b1b65db8d5d97ee9a4238710f2bfc2515127e8635e5a",
                "W_min": "40786250e7c7a7d947244997624cd8ac47a589afadd0a03b3814e42240d9fe4e"
            }
        },
        "ejB": {
            "tipo": "mm2",
            "sector": "Mostrador de preparaci\u00f3n de caf\u00e9 con baristas (M/M/2)",
            "desc": "Las \u00f3rdenes pasan al mostrador donde atienden c = 2 baristas en paralelo con fila \u00fanica de espera. Llegan a raz\u00f3n de lambda = 30 caf\u00e9s/hora (Poisson) y cada barista prepara en promedio en 3 minutos (mu = 20 caf\u00e9s/hora por barista, exponencial).",
            "lam": 30,
            "mu": 20,
            "c": 2,
            "hashes": {
                "rho": "9fbcc9959aeea5b64936cde40bcaf06d527df74950f2e26e52b9f7a28b5bba3d",
                "p0": "6407d900a3f95a1391472926a053fdc6425d8aaa5337553d4f1bdbfba896d0e4",
                "p_wait": "d1522af4a94c9dc69662f114c9c7c7c5c5685c519cab4c33acecb35ba78632e9",
                "Lq": "32c7f17a41c21d8ccd63752e0b098268fa122333a83d47c1170bf746ff615a2b",
                "L": "1ab873bcf25894fd8133a55bb23db7aeedfc3b500ea3cc95a46aac2fa07d5664",
                "Wq_min": "cca50aa8eb0258fbfcf5ace992d6d82982aed6e5db70c0e36a6faba55da16815",
                "W_min": "13ba9fb4ca372f2d72474cdd966174da1a1753ca519d0fa4a677f3c077d2b21b"
            }
        }
    },
    "asignacion_4": {
        "titulo": "Asignaci\u00f3n 4 (Alumno #4)",
        "caso": "CallCenter BGH (Soporte T\u00e9cnico)",
        "contexto": "Centro de soporte t\u00e9cnico y administraci\u00f3n de reclamos de equipos inform\u00e1ticos de BGH.",
        "ejA": {
            "tipo": "mm1",
            "sector": "Operador de triage y clasificaci\u00f3n de incidentes (M/M/1)",
            "desc": "Las llamadas entrantes son recibidas inicialmente por un operador de triage con lambda = 25 llamadas/hora (Poisson). El operador tarda en clasificar y derivar un tiempo exponencial con media mu = 35 llamadas/hora.",
            "lam": 25,
            "mu": 35,
            "c": 1,
            "hashes": {
                "rho": "4e18e35175888bca95133d1184c31e51dea5d9e07fec56f9090e6c163c2cb971",
                "p0": "2bc7b9b4bf7579c07a058dd8c525c73933a969e78b06cde4c0c3bfc18664a3df",
                "p_wait": "612b0e61961b283b56e9bca6cb7cd6c2afe0d8995a1cee4859f947d69c64d1c7",
                "Lq": "4445de812e3b12e7d9074576a722fdaddf23409175152a936b9e28b27d01c006",
                "L": "b1ca84766789a4f40379c14fa06c3e992bb2789bf8195f240a80094d842484d4",
                "Wq_min": "f422f007545609e97cb9ed4db7d532d3412446a1f13271f3bde20c05a5bed7bd",
                "W_min": "79f4ae4f5473ba5d2bfb4b5967170d36edf31170f84b5366f06ef69387e8fa52"
            }
        },
        "ejB": {
            "tipo": "mm3",
            "sector": "Mesa de soporte de segundo nivel para fallas complejas (M/M/3)",
            "desc": "Los incidentes derivados entran a una cola telef\u00f3nica com\u00fan atendida por c = 3 especialistas. La tasa de arribo es lambda = 18 incidentes/hora (Poisson) y cada especialista resuelve a raz\u00f3n de mu = 8 incidentes/hora (exponencial, media 7.5 min).",
            "lam": 18,
            "mu": 8,
            "c": 3,
            "hashes": {
                "rho": "a8c69c0fa39ae2be44b9a39c781a5d2c4999a16e5754d46e32fc3b4a2523d73f",
                "p0": "7c2a2fbf656ca6d5c21684c728f04cb4e6d58a11ac799347bcdd763fc1db41bc",
                "p_wait": "7abf599be6d4c34340ebee1580f7faa91917c9551f04e593bd96484a20655caf",
                "Lq": "fe61704860ac86974a07c2a5741cd1a17f9865e65926c5c2d7912fe0caa1eebf",
                "L": "16402eaacdf6309379be9cf9b7ea9cf09c32569ee84ed6efead521b6693df824",
                "Wq_min": "ed1168ecb6c95f4b4d11a4ef54e85eff5bd897e51d0b211c0d59c8b5ce5608b8",
                "W_min": "e0fd7552fd261227a565eefbacd1a9ceb89d42630fcfbc89f2765a0377482a46"
            }
        }
    },
    "asignacion_5": {
        "titulo": "Asignaci\u00f3n 5 (Alumno #5)",
        "caso": "Banco Santander (Sucursal C\u00e9ntrica)",
        "contexto": "Sucursal bancaria de atenci\u00f3n al p\u00fablico con sistema de turnero electr\u00f3nico.",
        "ejA": {
            "tipo": "mm1",
            "sector": "Ventanilla r\u00e1pida de entrega de tarjetas y chequeras (M/M/1)",
            "desc": "Clientes que solo retiran credenciales y documentaci\u00f3n llegan con lambda = 15 clientes/hora (Poisson). El empleado entrega en un tiempo exponencial con media mu = 20 clientes/hora (3 min por tr\u00e1mite).",
            "lam": 15,
            "mu": 20,
            "c": 1,
            "hashes": {
                "rho": "1ecab1baf47f550ba230b6b46f735dfd20ca8acba8ebb23632a839b8af39eab7",
                "p0": "4a8f7011202eda64dbe1fbb0aebf389cfd7dcedc31e110a14f82377944c8cf18",
                "p_wait": "5019f7de7890f6d2ca217941042c010074a90eb246a2fb2353d5ba904b9dda6f",
                "Lq": "3b2ec90a1addfd43ab8f988ff6c38c5ad3b8744244af3e7ddad2449c9739d069",
                "L": "5011eba238e0c66824bb958d2ff4e2ad670575e2a2e990d2071dbf05c8f55ea7",
                "Wq_min": "6277446d1fbea944ba1e69f06bf077d277bdcc8a1eae8989ca6eca108fe192b8",
                "W_min": "23ea2bf8608a05ff9f13f45dd447dcbaaf1282dc1b8b85f92c51424850844b1d"
            }
        },
        "ejB": {
            "tipo": "mm2",
            "sector": "Cajas de dep\u00f3sito y cobro por ventanilla (M/M/2)",
            "desc": "Los clientes para operaciones monetarias arriban a raz\u00f3n de lambda = 20 clientes/hora (Poisson). Hay c = 2 cajeros en paralelo compartiendo la fila del turnero. Cada cajero atiende a raz\u00f3n de mu = 14 clientes/hora (exponencial).",
            "lam": 20,
            "mu": 14,
            "c": 2,
            "hashes": {
                "rho": "2f81a65bc9160daed3e51577450407a8e31d08f56a90de8a3d6048d0f4f6e956",
                "p0": "2ac48e0264a1971b57a3e2410dc909aae6d44ff86fa5eb93c7dd22899e2b62f4",
                "p_wait": "a49d8e97a6b2c1344d96dc9a62a04eff478e776cbda0a5160504fd9273e07ffa",
                "Lq": "c5bef0843d7b6020ef52e6aef875b3dc7f34f4335a6be37cd4fdc92f013ce5ac",
                "L": "27c8afcb9782ec42da1c894b439190da31717c67286752d5c3cc429c1788cda8",
                "Wq_min": "099178c0e0b8bc22fdb551c2961a93ac786c31e22735470b4961361d8a089924",
                "W_min": "15180aa09b2b46c8a17e20a685c0ee6b43386d43ad3837de68810f6c9d245d58"
            }
        }
    },
    "asignacion_6": {
        "titulo": "Asignaci\u00f3n 6 (Alumno #6)",
        "caso": "CyberShop Express (Cross-docking)",
        "contexto": "Dep\u00f3sito log\u00edstico de transbordo r\u00e1pido de encomiendas y despacho a \u00faltima milla.",
        "ejA": {
            "tipo": "mm1",
            "sector": "Puesto de pesaje y lectura \u00f3ptica de bultos (M/M/1)",
            "desc": "Los paquetes arriban por cinta transportadora a un esc\u00e1ner atendido por un \u00fanico operador con lambda = 50 bultos/hora (Poisson). La tasa media de servicio es mu = 70 bultos/hora (exponencial).",
            "lam": 50,
            "mu": 70,
            "c": 1,
            "hashes": {
                "rho": "1b39d72f74b412f1dfd535b8f084b869adf0884fba3e21b7ca21cf79eb89c429",
                "p0": "3f1c92e300877f713a3ceb7e776066fa2ccdfa71fa0d5dc9b20ee4e344a8452b",
                "p_wait": "b937203919d97672b3081338a528ca86a8f30d24ec5266d1d226d3759435228c",
                "Lq": "f7bbcfaa3a61b4e53817ab585e09ece7125f577ea8a6dfec6901e7e8d9d726d8",
                "L": "9ae05ad42d02f5b040af3a2119d8a7e6c95a552d14b3f26c48f414697a48aeef",
                "Wq_min": "ba27897662af7e3c0b69c9aee8ebb389eef2f30f8afea6f54dc7384be9d3bd6a",
                "W_min": "d595e136efb9651ddf18ee85a0b2bece84053174be16c6f4ef7dc762d767fd8e"
            }
        },
        "ejB": {
            "tipo": "mm3",
            "sector": "Bah\u00eda de carga a furgones de distribuci\u00f3n (M/M/3)",
            "desc": "Los bultos clasificados llegan a la bah\u00eda de estiba a raz\u00f3n de lambda = 42 bultos/hora (Poisson). Se dispone de c = 3 operarios de carga en paralelo con fila com\u00fan. Cada uno carga a una tasa exponencial de mu = 18 bultos/hora.",
            "lam": 42,
            "mu": 18,
            "c": 3,
            "hashes": {
                "rho": "9f3c702fb33269dd326c4d45937ed557862ff714292adce7fecd4dd002156bc3",
                "p0": "d783925146bae2f665a4780a22513f7466cda1b97f4fea63fe8b105887d3abb2",
                "p_wait": "64aaf0b2338854a46bc346b15c3e1b6d890370587dfcf63cfe4d70b86081304e",
                "Lq": "12cb6d37a38c02f64cba84fdd90793c55318682c0d23fb10307668cab46bdcb7",
                "L": "216704e2370ab3bd885014319b0ff1169656e7b280071f876ab1e4d424ed7912",
                "Wq_min": "01f95b9a1f165710d3cef88fb3a5dd544cff343e5cd9f2dfedd0eae1ed92d5da",
                "W_min": "795ef7ff50e53b34d9ead183f2022cbeb93ba5f5f7cff061e78c5e1a5c5866b7"
            }
        }
    },
    "asignacion_7": {
        "titulo": "Asignaci\u00f3n 7 (Alumno #7)",
        "caso": "AutoTech Motores (Ensamble Industrial)",
        "contexto": "Planta de producci\u00f3n de componentes automotrices y control de calidad de precisi\u00f3n.",
        "ejA": {
            "tipo": "mm1",
            "sector": "Estaci\u00f3n de calibraci\u00f3n l\u00e1ser de inyectores (M/M/1)",
            "desc": "Las piezas mecanizadas llegan a la estaci\u00f3n de calibraci\u00f3n con lambda = 28 piezas/hora (Poisson). La m\u00e1quina l\u00e1ser calibra cada inyector a una tasa exponencial de mu = 35 piezas/hora.",
            "lam": 28,
            "mu": 35,
            "c": 1,
            "hashes": {
                "rho": "39b02f9cac94998c350e873f35a07242a6f301cbbdcccb01c40d5235ebee2203",
                "p0": "71432eab2c640166f87cde851548b345ecc63d0ee84f58b6565e1d2918dcad74",
                "p_wait": "f9b2308d59cae9cb173eae2cf662d0f662dfbcbcffd9e9f7c0c6bcf536b29c38",
                "Lq": "c75bfa550d4fb62a97d15876681801edbc79879839ed29e9ecbf3a0e4567c320",
                "L": "36f141868c3ab62fe047ef7b71206b79cdb36e0edaeaa25392e2857127180fb8",
                "Wq_min": "5d79a61d9180111c9e7002555ce9794d910457340bf09d18fd9f42d7cbc67d19",
                "W_min": "78cc1b67c7eba1a53a64e7513b0df6ce6fed9e9d799db251e20b3087785b5f80"
            }
        },
        "ejB": {
            "tipo": "mm2",
            "sector": "Banco de ensayo y prueba hidrost\u00e1tica (M/M/2)",
            "desc": "Los inyectores calibrados pasan al banco de prueba donde c = 2 inspectores prueban las piezas en paralelo desde una tarima com\u00fan. Arriban a raz\u00f3n de lambda = 16 piezas/hora (Poisson) y cada inspector procesa con tasa exponencial mu = 10 piezas/hora.",
            "lam": 16,
            "mu": 10,
            "c": 2,
            "hashes": {
                "rho": "0224f6f4d50f72b0ed88497a9a08626499f8bc75ea538ef714bdb419f3c8b601",
                "p0": "a27ddaaee47c845e90a3398124d9ac32ee93d5f28783f907c76d40714db76125",
                "p_wait": "e83218a6f554e524cd1a5bd742c83f882b31a095409d971774794e00a537cb70",
                "Lq": "d01f18a270d391c7c2a376ef07c7ac6c56c79e95788fdf96ff176234238214fd",
                "L": "1de8816a602b686e7a4392f6aa351de1345a516d0dab41c5d86dbaa710d49b3e",
                "Wq_min": "2f9393d7e2bb7a93233a35c53bdbf96244098a98449a26c347a46abb9270c1d5",
                "W_min": "fe7ad85a6b0671facd5c99556c97e0a34230dc276dfe5446de3b4a86189b30d9"
            }
        }
    },
    "asignacion_8": {
        "titulo": "Asignaci\u00f3n 8 (Alumno #8)",
        "caso": "FarmaSalud 24hs (Farmacia Central)",
        "contexto": "Farmacia de guardia m\u00e9dica y mostrador ambulatorio de alta demanda.",
        "ejA": {
            "tipo": "mm1",
            "sector": "Ventanilla nocturna de entrega express de urgencias (M/M/1)",
            "desc": "Durante el horario nocturno, las recetas de urgencia llegan a ventanilla \u00fanica a raz\u00f3n de lambda = 12 recetas/hora (Poisson). El farmac\u00e9utico despacha a una tasa media exponencial de mu = 16 recetas/hora.",
            "lam": 12,
            "mu": 16,
            "c": 1,
            "hashes": {
                "rho": "3d52449fbd012ceb1fb6e8da03a540b710038856b49ccda4f244438750de31a2",
                "p0": "5e974339dc2371924374d366e18d58e78126940a3758f5ce179c1f364aa617e7",
                "p_wait": "66136813a56b131aa96ea5d2f188fe3cf2520d90dc17789ccbd274705aa06156",
                "Lq": "e4133dc891d3fe65f89cae7efb47a8c02a0915addc09283d98dc813fe13a3d09",
                "L": "99903516fa3b4284af9f2391cc54077b0e1533536a8a9265feea9353069e0059",
                "Wq_min": "97f435899629c92a9c4edd3b5bd455644d71feade45536aca734a216c0e1a6cf",
                "W_min": "aadacfe51a07ed60d779363cf5ed0dcee1bb1df8af76638177f5a14bad299a1a"
            }
        },
        "ejB": {
            "tipo": "mm3",
            "sector": "Mostrador diurno de atenci\u00f3n de obras sociales (M/M/3)",
            "desc": "Durante la tarde, los afiliados llegan a raz\u00f3n de lambda = 36 clientes/hora (Poisson). Se dispone de c = 3 puestos de farmacia en paralelo con fila \u00fanica. Cada farmac\u00e9utico atiende a una tasa exponencial de mu = 15 clientes/hora.",
            "lam": 36,
            "mu": 15,
            "c": 3,
            "hashes": {
                "rho": "6879f7b8f0316ee1620e5ea774635fbdafe1e2f6244eb8fdd8d923d368dddff4",
                "p0": "ff4f0b09324ad9c1cd7ab0d89de4dda7b5dfa2f7d1f5782fb6402654dd980efa",
                "p_wait": "cd93be8ae568dca43226a1ece955282e2d67d1deb254ba3167a9a02f62e813c7",
                "Lq": "a95f69f2c0bbc0a6680d8ca728ca8723097130f186ef6bb1dd4d0d4824d6f314",
                "L": "29f293953647e6c443275466ca8755d4d4c658df0218f430f0c8570688e2fe0a",
                "Wq_min": "94c50fdee7424f9a282dfb89dbf27ccd63746b98551bd9a8a12160d14005b638",
                "W_min": "9153073b6dfdd014d9b0d04a32907a229765e8fecef106e7657f1948dca783f7"
            }
        }
    }
};

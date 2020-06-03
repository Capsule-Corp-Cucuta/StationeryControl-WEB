export class Constants {
  public static ROUTES = {
    SECURITY: 'seguridad',
    CHANGE_PASS: 'cambiar-clave',
    RECOVER_PASS: 'recuperar-clave',
    PRINCIPAL: 'inicio',
    USER: 'usuario',
    CERTIFICATE: 'certificado',
    DELIVERY: 'entrega-devolucion',
    LIST: 'lista',
    CREATE: 'registrar',
    UPDATE: 'editar',
  };

  public static LABELS = {
    PRINCIPAL: {
      TITLE: 'Control de Papelería',
      PRINCIPAL: 'Estadísticas',
      USERS: 'Usuarios',
      CERTIFICATES: 'Certificados',
      DELIVERIES: 'Entregas y Devoluciones',
      CHANGE_PASS: 'Cambiar Contraseña',
      SIGN_OUT: 'Salir',
    },
    LOGIN: {
      TITLE: 'Inicio de Sesión',
      SUBTITLE: 'Instituto Departamental de Salud',
      PLACEHOLDER: {
        USER: 'Cédula:',
        PASS: 'Contraseña:',
      },
      BUTTON: 'Iniciar Sesión',
      LINK: '¿Has olvidado tu Contraseña?',
    },
    CHANGE_PASSWORD: {
      TITLE: 'Cambiar Contraseña',
      PLACEHOLDER: {
        OLD_PASS: 'Antigua contraseña:',
        NEW_PASS: 'Nueva contraseña:',
      },
      BUTTON: 'Cambiar',
    },
    RECOVER_PASSWORD: {
      TEXT: 'Escribe aquí tu cédula para buscar tu usuario y enviarte un correo de recuperación de contraseña:',
      PLACEHOLDER: {
        ID: 'Cédula:',
      },
      BUTTON: 'Enviar correo de recuperación',
      LINK: 'Iniciar Sesión',
    },
    DASHBOARD: {
      CHART_TYPES: {
        TITLE: 'Gráfico de los certificados segmentados por sus tipos:',
        ID: 'types',
      },
      CHART_STATES: {
        TITLE: 'Gráfico de los certificados segmentados por sus estados:',
        ID: 'states',
      },
      CHART_TYPES_AND_ATTENDANT: {
        TITLE: 'Gráfico de los certificados segmentados por sus tipos y su correspondiente usuario responsable:',
        ID: 'typeAndAttendant',
        PLACEHOLDER: 'Cédula del usuario responsable:',
        BUTTON: 'Buscar',
      },
      CHART_TYPES_AND_INSTITUTION: {
        TITLE: 'Gráfico de los certificados segmentados por sus tipos y la instituciónn en donde se encuentran:',
        ID: 'typeAndInstitution',
        PLACEHOLDER: 'Nombre de la institución:',
        BUTTON: 'Buscar',
      },
      CHART_STATES_AND_ATTENDANT: {
        TITLE: 'Gráfico de los certificados segmentados por sus estados y su correspondiente usuario responsable:',
        ID: 'stateAndAttendant',
        PLACEHOLDER: 'Cédula del usuario responsable:',
        BUTTON: 'Buscar',
      },
      CHART_STATES_AND_INSTITUTION: {
        TITLE: 'Gráfico de los certificados segmentados por sus estados y la instituciónn en donde se encuentran:',
        ID: 'stateAndInstitution',
        PLACEHOLDER: 'Nombre de la institución:',
        BUTTON: 'Buscar',
      },
    },
    USER: {
      FORM: {
        TITLE: 'Registrar Usuario',
        USER_TYPE: 'Tipo de Usuario',
        PLACEHOLDER: {
          ID: 'Cédula:',
          NAME: 'Nombre completo:',
          EMAIL: 'Correo electrónico:',
          PHONE: 'Número telefónico:',
          TYPE: 'Tipo de Usuario:',
        },
        REGISTER_BUTTON: 'Registrar',
        UPDATE_BUTTON: 'Actualizar',
        DELETE_BUTTON: 'Eliminar',
      },
      LIST: {
        COLUMNS: ['identificationCard', 'name', 'email', 'phone', 'userType', 'actions'],
        CELLS: {
          ID: 'Cédula:',
          NAME: 'Nombre completo:',
          EMAIL: 'Correo electrónico:',
          PHONE: 'Número telefónico:',
          TYPE: 'Tipo de Usuario:',
        },
      },
    },
    CERTIFICATE: {
      FORM: {
        TITLE: 'Registrar Certificado',
        PLACEHOLDER: {
          ID: 'Número:',
          CODE: 'Código de Verificación:',
          ATTENDANT: 'Cédula:',
          TYPE: 'Tipo del Certificado:',
          STATE: 'Estado del Certificado:',
          DEPARTMENT: 'Departamento:',
          TOWNSHIP: 'Municipio:',
          INSTITUTION: 'Institución:',
        },
        ATTACH_FILE: {
          TITLE: 'Adjuntar un archivo:',
          TEXT: 'Selecciona el archivo',
          NAME_OF_FILE: 'Nombre del arhivo: ',
        },
        REGISTER_BUTTON: 'Registrar',
        UPDATE_BUTTON: 'Actualizar',
        MULTIPLE: {
          TITLE: 'Registrar múltiples Certificados',
          BUTTON: 'Registrar',
        },
      },
      LIST: {
        COLUMNS: ['number', 'type', 'state', 'stateDate', 'department', 'township', 'institution', 'actions'],
        CELLS: {
          NUMBER: 'Número:',
          TYPE: 'Tipo de Certificado:',
          STATE: 'Estado del Certificado:',
          DATE: 'Última fecha de modificación:',
          DEPARTMENT: 'Departamento:',
          TOWNSHIP: 'Municipio:',
          INSTITUTION: 'Institución:',
        },
        TOOLTIP: {
          CREATE: 'Registrar certificado',
          SHOW: 'Ver archivo',
        },
      },
    },
    DELIVERY: {
      FORM: {
        TITLE: 'Entregas y Devoluciones',
        PLACEHOLDER: {
          NUMBER: 'Número de Oficio:',
          INITIAL: 'Número de Certificado Inicial sin Código de Verificación:',
          FINAL: 'Número de Certificado Final sin Código de Verificación:',
          SENDER: 'Cédula del Remitente:',
          RECEIVER: 'Cédula del Receptor:',
          TYPE: 'Tipo (Entrega/Devolución):',
        },
        BUTTON: 'Registrar',
      },
      LIST: {
        COLUMNS: [
          'tradeNumber',
          'deliveryType',
          'firstCertificate',
          'lastCertificate',
          'sender',
          'receiver',
          'actions',
        ],
        CELLS: {
          NUMBER: 'Número de Oficio:',
          INITIAL: 'Número de Certificado Inicial sin Código de Verificación:',
          FINAL: 'Número de Certificado Final sin Código de Verificación:',
          SENDER: 'Cédula del Remitente:',
          RECEIVER: 'Cédula del Receptor:',
          TYPE: 'Tipo (Entrega/Devolución):',
        },
        TOOLTIP: 'Asginar Certificados',
      },
    },
  };

  public static ICONS = {
    ADD: 'add',
    MENU: 'menu',
    SAVE: 'save',
    LOCK: 'lock',
    EVENT: 'event',
    CREATE: 'create',
    PERSON: 'person',
    VPN_KEY: 'vpn_key',
    DASHBOARD: 'dashboard',
    ASSIGNMENT: 'assignment',
    PEOPLE_ALT: 'people_alt',
    VISIBILITY: 'visibility',
    ACCOUNT_BOX: 'account_box',
    CLOUD_UPLOAD: 'cloud_upload',
    LIBRARY_BOOKS: 'library_books',
    ACCOUNT_CIRCLE: 'account_circle',
    ASSIGNMENT_IND: 'assignment_ind',
    POWER_SETTINGS_NEW: 'power_settings_new',
    ENHANCED_ENCRYPTION: 'enhanced_encryption',
  };

  public static LINKS = {
    AVATAR: 'https://svgsilh.com/svg/1633250.svg',
    LOGO_IDS: 'https://ids.gov.co/web/wp-content/uploads/2018/01/images_favicons_favicon114.png',
  };

  public static CHARTS = {
    TYPES: {
      BAR: 'bar',
      DOUGHNUT: 'doughnut',
    },
    COLORS: {
      TYPES: ['#8DE114', '#108FC2', '#FF5733', '#FB7D07'],
      STATES: ['#EEEE2A', '#108FC2', '#8DE114', '#E166EE', '#FF5733', '#FB7D07'],
    },
  };

  public static USER_TYPES_MAPPER = [
    { id: 0, value: 'ADMINISTRATOR' },
    { id: 1, value: 'IDS' },
    { id: 2, value: 'DANE' },
    { id: 3, value: 'DEPARTMENTAL' },
    { id: 4, value: 'MUNICIPAL' },
    { id: 5, value: 'INSTITUTIONAL' },
  ];

  public static CERTIFICATES_TYPES_MAPPER = [
    { id: 0, value: 'CA_NV' },
    { id: 1, value: 'NV' },
    { id: 2, value: 'CA_DEF' },
    { id: 3, value: 'DEF' },
  ];

  public static CERTIFICATES_STATES_MAPPER = [
    { id: 0, value: 'IDLE' },
    { id: 1, value: 'ASSIGNED' },
    { id: 2, value: 'GUARDED' },
    { id: 3, value: 'STRAY' },
    { id: 4, value: 'ANNULLED' },
    { id: 5, value: 'WITH_INCONGRUENCES' },
  ];

  public static DELIVERIES_TYPES_MAPPER = [
    { id: 0, value: 'DEPARTURE' },
    { id: 1, value: 'REGRESS' },
  ];

  public static DEPARTMENT = 'NORTE DE SANTANDER';

  public static TOWNSHIPS = [
    'Abrego',
    'Arboledas',
    'Bochalema',
    'Bucarasica',
    'CÁCHIRA',
    'Cacota',
    'Chinacota',
    'Chitaga',
    'Convencion',
    'CÚCUTA',
    'Cucutilla',
    'Durania',
    'El Carmen',
    'El Tarra',
    'El Zulia',
    'Gramalote',
    'Hacari',
    'Herran',
    'La Esperanza',
    'La Playa de Belen',
    'Labateca',
    'Los Patios',
    'Lourdes',
    'Mutiscua',
    'Ocaña',
    'Pamplona',
    'Pamplonita',
    'Puerto Santander',
    'Ragonvalia',
    'SALAZAR DE LAS PALMAS',
    'San Calixto',
    'San Cayetano',
    'Santiago',
    'Santo Domingo de Silos',
    'Sardinata',
    'Teorama',
    'Tibu',
    'Toledo',
    'Villa Caro',
    'Villa del Rosario',
  ];
}

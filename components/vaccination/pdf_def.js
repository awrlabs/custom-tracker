function valOrEmpty(val) {
    return val || "";
}

function getColorDef(certNo, name, gender, age, address, nic, dose1, dose2) {
    return {
        pageSize: 'A4',
        pageMargins: [30, 25, 30, 0],
        watermark: 'Not Valid',
        background: function (currentPage, pageSize) {
            return [
                { image: 'bg', width: pageSize.width, absolutePosition: { x: 0, y: 0 } },
            ]
        },
        images: {
            // Replace urls with saved resource or user uploaded assets
            logo: 'https://i.imgur.com/ZVHwUVl.png',
            bg: 'https://i.imgur.com/UsesT6T.jpg',
            qr: 'https://i.imgur.com/bbtBMCR.png'
        },
        header: {
            columns: [
                {
                    text: 'Confidencial / Confidential / Konfidensiál',
                    style: 'header'
                },
                {
                    text: [
                        'No.',
                        certNo
                    ],
                    style: 'header',
                    alignment: 'right',
                    bold: true,
                    fontSize: 16
                }
            ]
        },
        content: [
            {
                image: 'logo',
                fit: [300, 80],
                absolutePosition: { x: 300, y: 5 }
            },
            {
                text: 'Ministério da Saúde - Ministry of Health – Timor-Leste',
                style: 'heading',
                margin: [0, 65, 0, 5]

            },
            {
                text: 'Ceritificado de vacinação da COVID-19 / Certificate of COVID19 Vaccination / Sertifikadu Vasina COVID-19',
                style: 'heading',
                fontSize: 11
            },
            { canvas: [{ type: 'line', x1: 0, y1: 5, x2: 595 - 2 * 30, y2: 5, lineWidth: 2, lineColor: '#548235' }], margin: [0, 5, 0, 10] },
            {
                image: 'qr',
                fit: [170, 170],
                absolutePosition: { x: 400, y: 310 }
            },
            {
                ol: [
                    [
                        { text: 'Nome / Name / Naran', style: 'detailKey' },
                        { text: name, style: 'detailValue' }
                    ],
                    [
                        { text: 'Residēncia / Address / Hela fatin', style: 'detailKey' },
                        { text: address, style: 'detailValue' }
                    ],
                    [
                        { text: 'Sexo / Sexr / Sexu', style: 'detailKey' },
                        { text: gender, style: 'detailValue' }
                    ],
                    [
                        { text: 'Idade / Age / Tinan', style: 'detailKey' },
                        { text: age + " years", style: 'detailValue' }
                    ],
                    [
                        { text: 'Número Identidade / Identity Number / Númeru Identidde', style: 'detailKey' },
                        { text: nic, style: 'detailValue' }
                    ],
                    [
                        { text: 'Número telemovel / Phone Number / Númeru telefone', style: 'detailKey' },
                        { text: '12345678', style: 'detailValue' }
                    ],
                    [
                        { text: 'Detalhes da Vacinação / Vaccination Details / Detalles vasinasaun', style: 'detailKey' },
                        {
                            table: {
                                headerRows: 1,
                                widths: ['*', 'auto', 'auto'],
                                body: [
                                    ['', { text: '1st Dose', bold: true }, { text: '2nd Dose', bold: true }],
                                    [{ text: '1. Data / Date / Loron', bold: true }, valOrEmpty(dose1.date), valOrEmpty(dose2.date)],
                                    [{ text: '2. Produto / Product / Produtu', bold: true }, valOrEmpty(dose1.product), valOrEmpty(dose2.product)],
                                    [{ text: '3. Número go lote / Batch Number / Númeru kodigu ', bold: true }, valOrEmpty(dose1.batch), valOrEmpty(dose2.batch)]
                                ]
                            },
                            style: 'detailTable'
                        }
                    ],
                    [
                        { text: 'Estado de vacinação / Vaccination Status / Estatus vasina', style: 'detailKey' },
                        { text: 'Completed', style: 'detailValue' }
                    ],

                ],
                margin: [0, 0, 0, 6]
            },
            {
                text: [
                    '.............................................................\n',
                    'General Director Health Servises MOH\n',
                    'Dra. Odete da Silva Viegas, Dermatologist'
                ],
                style: 'signature',
                margin: [0, 0, 0, 0]
            },
            { canvas: [{ type: 'line', x1: 0, y1: 5, x2: 600 - 2 * 30, y2: 5, lineWidth: 2, lineColor: '#548235' }], margin: [0, 5, 0, 5] },
            { text: 'Ministrio da Saude, Rua de Caicoli, Caixa Postal 374, Dili, Timor-Leste', style: 'footerText' },
            { text: 'Tel: +670 333 1113, +670 33 XXX XXX | Fax: +670 33 XXX XXX | Email: xxxxxxxxxxx@ms.gov.tl', style: 'footerText' }
        ],

        styles: {
            header: {
                fontSize: 12,
                lineHeight: 1,
                margin: [20, 5]
            },
            heading: {
                fontSize: 18,
                alignment: 'center',
                lineHeight: 1,
                bold: true
            },
            detailKey: {
                bold: true,
                lineHeight: 1.7
            },
            detailValue: {
                margin: [40, 0, 10, 10],
                lineHeight: 1.7
            },
            detailTable: {
                fontSize: 12,
                lineHeight: 1.5,
                margin: [10, 0, 10, 10]
            },
            signature: {
                bold: true,
                alignment: 'center',
                lineHeight: 1
            },
            stamp: {
                bold: true,
                alignment: 'right',
                lineHeight: 1
            },
            footerText: {
                fontSize: 11,
                lineHeight: 1.2
            }
        },
        defaultStyle: {
            fontSize: 12,
            lineHeight: 2
        }
    }
}

function getTextDef(certNo, name, gender, age, address, nic, dose1, dose2) {
    return {
        pageSize: 'A4',
        pageMargins: [30, 25, 30, 30],
        images: {
            // Replace urls with saved resource or user uploaded assets
            logo: 'https://i.imgur.com/pRgwLtx.png',
            bg: 'https://i.imgur.com/CnXLb3l.jpg',
        },
        header: {
            columns: [
                {
                    text: '',
                    style: 'header'
                },
                {
                    text: [
                        certNo
                    ],
                    style: 'header',
                    alignment: 'right'
                }
            ]
        },
        content: [
            {

                image: 'logo',

                fit: [0.001, 80],

                alignment: 'center',

            },

            {

                text: 'Ministry of Health - Sri Lanka',

                style: 'heading',

                bold: true,
                color: 'white'



            },

            {

                text: 'Certificate of COVID19 Immunisation',

                style: 'heading',
                color: 'white'

            },

            { canvas: [{ type: 'line', x1: 0, y1: 5, x2: 595 - 2 * 40, y2: 5, lineWidth: 2, lineColor: 'white' }], margin: [0, 5, 0, 30] },

            {

                columns: [

                    {

                        width: 'auto',

                        bold: true,
                        color: 'white',

                        text: [

                            '\n',

                            '\n',

                            '\n',

                            '\n',

                            'NIC/Passport/DL number'

                        ]

                    },

                    {

                        width: 20,

                        alignment: 'center',

                        text: '\n\n\n\n'

                    },

                    {

                        width: '*',

                        text: [
                            name + '\n',
                            gender + '\n',
                            age + ' years\n',
                            address + '\n',
                            nic
                        ]

                    }

                ],

                margin: [60, 0, 60, 10]

            },

            {

                text: 'First Dose',

                style: 'dosehead',
                color: 'white'

            },

            {

                columns: [

                    {

                        width: 'auto',

                        bold: true,
                        color: 'white',

                        text: [

                            'Date\n',

                            'Vaccine Centre\n',

                            'Product & Batch'

                        ]

                    },

                    {

                        width: 20,

                        alignment: 'center',

                        bold: true,

                        text: '\n\n'

                    },

                    {

                        width: '*',

                        text: [
                            dose1.date + '\n',
                            dose1.place + '\n',
                            dose1.type + ' - ' + dose1.batch
                        ]

                    }

                ],

                margin: [90, 0, 90, 10]

            },

            {

                text: 'Booster Dose',

                style: 'dosehead',
                color: 'white'

            },

            {

                columns: [

                    {

                        width: 'auto',

                        bold: true,
                        color: 'white',

                        text: [

                            'Date\n',

                            'Vaccine Centre\n',

                            'Product & Batch'

                        ]

                    },

                    {

                        width: 20,

                        alignment: 'center',

                        bold: true,

                        text: '\n\n'

                    },

                    {

                        width: '*',

                        text: [
                            dose2.date + '\n',
                            dose2.place + '\n',
                            dose2.type + ' - ' + dose2.batch
                        ]

                    }

                ],

                margin: [90, 0, 90, 90]

            },

            {

                columns: [

                    {

                        width: 'auto', color: 'white',

                        text: [

                            'Date of issue',

                            // 'Place of issue'

                        ]

                    },

                    {

                        width: 20,

                        alignment: 'center',

                        text: '\n'

                    }
                    ,

                    {

                        width: '*',
                        color: "transparent",
                        text: [
                            new Date().toISOString().substring(0, 10)
                        ]

                    }

                ],

                margin: [60, 0]

            },

            {

                text: 'This is a computer-generated document.',

                bold: true,

                margin: [60, 0]

            }

        ],

        styles: {

            header: {

                fontSize: 12,

                lineHeight: 1,

                margin: [20, 10]

            },

            heading: {

                fontSize: 18,

                alignment: 'center',

                lineHeight: 1

            },

            dosehead: {

                decoration: 'underline',

                bold: true,

                margin: [60, 0, 60, 10],

                lineHeight: 1

            }

        },

        defaultStyle: {

            fontSize: 14,

            lineHeight: 2

        }

    }
}

function getPdfDef(certNo, name, gender, age, address, nic, dose1, dose2) {
    return [
        getColorDef(certNo, name, gender, age, address, nic, dose1, dose2),
        getTextDef(certNo, name, gender, age, address, nic, dose1, dose2)
    ];
}



export default getPdfDef;
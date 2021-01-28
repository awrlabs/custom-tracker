function getColorDef(certNo, name, gender, age, address, nic, dose1, dose2) {
    return {
        pageSize: 'A4',
        pageMargins: [30, 25, 30, 30],
        background: function (currentPage, pageSize) {
            return [
                { image: 'bg', width: pageSize.width, absolutePosition: { x: 0, y: 0 } },
            ]
        },
        images: {
            // Replace urls with saved resource or user uploaded assets
            logo: 'https://i.imgur.com/pRgwLtx.png',
            bg: 'https://i.imgur.com/DTdqVHj.jpg',
            // bg: 'https://i.imgur.com/CnXLb3l.jpg',
        },
        header: {
            columns: [
                {
                    text: 'Confidential',
                    style: 'header'
                },
                {
                    text: [
                        'No.',
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

                fit: [300, 80],

                alignment: 'center'

            },

            {

                text: 'Ministry of Health - Sri Lanka',

                style: 'heading',

                bold: true



            },

            {

                text: 'Certificate of COVID19 Immunisation',

                style: 'heading'

            },

            { canvas: [{ type: 'line', x1: 0, y1: 5, x2: 595 - 2 * 40, y2: 5, lineWidth: 2, lineColor: '#bf9000' }], margin: [0, 5, 0, 30] },

            {

                columns: [

                    {

                        width: 'auto',

                        bold: true,

                        text: [

                            'Name\n',

                            'Gender\n',

                            'Age\n',

                            'Residential Address\n',

                            'NIC/Passport/DL number'

                        ]

                    },

                    {

                        width: 20,

                        alignment: 'center',

                        text: ':\n:\n:\n:\n:'

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

                style: 'dosehead'

            },

            {

                columns: [

                    {

                        width: 'auto',

                        bold: true,

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

                        text: ':\n:\n:'

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

            },

            {

                columns: [

                    {

                        width: 'auto',

                        bold: true,

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

                        text: ':\n:\n:'

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

                        width: 'auto',

                        text: [

                            'Date of issue\n',

                            // 'Place of issue'

                        ]

                    },

                    {

                        width: 20,

                        alignment: 'center',

                        text: ':'

                    },

                    {

                        width: '*',
                        color:"transparent",
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
                        color:"transparent",
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
import { PosPrintData } from "@plick/electron-pos-printer";
import OSApi from "renderer/os-api";

/**
 * Method to convert colis to a printable data
 * @param id colis id
 * @returns Array
 */
export const getPrintableData =  (colis: Colis, locations: Location[]) => {
    const imgUri = OSApi.ipcRenderer.sendSync('config:get-favicon-path');
    try {
        
        const data: PosPrintData[] = [
            {
                // FOR HEADER
                type: 'text',
                value: `
                    <div style="display: flex; width: 100%; gap: 8px;">
                        <img src="${imgUri}" width="80px" alt="img">
                        <div>
                        <p style="margin: 0; padding: 0;"><b>Bureau</b>:</p>
                        ${
                            locations.map(location => `
                            <p style="margin: 0; padding: 0; display: flex; justify-content: space-between; gap: 5px;">
                                ${location.name}: <span>${location.tel}</span>
                            </p>`).join('')
                        }
                        </div>
                    </div>
                `,
                style: {
                    fontSize: '12px',
                    marginBottom: "2px",
                    fontFamily: 'monospace, cursive'
                }
            },
            {
                type: 'divider'
            },
            {
                // NUMERO
                type: 'text',
                value: `N°: ${colis.id.toString().padStart(8, '0')}`,
                position: 'right',
                style: {
                    textAlign: 'right',
                    fontSize: '12px',
                    fontFamily: 'monospace, cursive'
                }
            },
            {
                type: 'table',
                // style the table
                style: {border: '1px solid #e5e5e5'},
                // list of the columns to be rendered in the table header
                // tableHeader: ['Animal', 'Age'],
                // multi dimensional array depicting the rows and columns of the table body
                tableBody: [
                    [
                        {
                            type: 'text',
                            value: 'Colis:',
                            style: {
                            textAlign: 'left'
                            }
                        },
                        {
                            type: 'text',
                            value: colis.name!,
                            style: {
                            textAlign: 'left'
                            }
                        },
                    ],
                    
                    [
                        {
                            type: 'text',
                            value: 'Quantité:',
                            style: {
                            textAlign: 'left'
                            }
                        },
                        {
                            type: 'text',
                            value: colis.quantity.toString(),
                            style: {
                            textAlign: 'left'
                            }
                        },
                    ],

                    
                    
                    [
                        {
                            type: 'text',
                            value: 'Date et heure:',
                            style: {
                                textAlign: 'left',
                                alignmentBaseline: 'top'
                            }
                        },
                        {
                            type: 'text',
                            value: `${new Date(colis.date).toLocaleString('fr')}`,
                            style: {
                                textAlign: 'left'
                            }
                        },
                    ],
                    
                    [
                        {
                            type: 'text',
                            value: 'Destination:',
                            style: {
                                textAlign: 'left',
                                alignmentBaseline: 'top'
                            }
                        },
                        {
                            type: 'text',
                            value: `${colis.from?.name} vers ${colis.to?.name}`,
                            style: {
                            textAlign: 'left'
                            }
                        },
                    ],
                    [

                        {
                            type: 'text',
                            value: 'Voiture:',
                            style: {
                                textAlign: 'left',
                                alignmentBaseline: 'top'
                            }
                        },
                        {
                            type: 'text',
                            value: `${colis.car}`,
                            style: {
                            textAlign: 'left'
                            }
                        },
                    ],
                    
                    [
                        {
                            type: 'text',
                            value: 'Expéditeur:',
                            style: {
                                textAlign: 'left',
                                alignmentBaseline: 'top'
                            }
                        },
                        {
                            type: 'text',
                            value: `<div>
                                <p>Nom: ${colis.expName}</p>
                                <p>Tel: ${colis.expPhone}</p>
                            </div>`,
                            style: {
                            textAlign: 'left'
                            }
                        },
                    ],
                    
                    [
                        {
                            type: 'text',
                            value: 'Récepteur:',
                            style: {
                                textAlign: 'left',
                                alignmentBaseline: 'top'
                            }
                        },
                        {
                            type: 'text',
                            value: `<div>
                                <p style="margin: 0; padding: 0;">Nom: ${colis.recName}</p>
                                <p style="margin: 0; padding: 0;">Tel: ${colis.recPhone}</p>
                            </div>`,
                            style: {
                            textAlign: 'left'
                            }
                        },
                    ],
                    // Status paiement
                    [
                        {
                            type: 'text',
                            value: 'Status paiement:',
                            style: {
                                textAlign: 'left',
                                alignmentBaseline: 'top'
                            }
                        },
                        {
                            type: 'text',
                            value: colis.paid ? 'Payé' : 'Non payé',
                            style: {
                            textAlign: 'left'
                            }
                        },
                    ]
                ],
                // list of columns to be rendered in the table footer
                // tableFooter: ['Animal', 'Age'],
                // custom style for the table header
                tableHeaderStyle: { backgroundColor: '#000', color: 'white'},
                // custom style for the table body
                tableBodyStyle: {'border': '0.5px solid #e5e5e5'},
                tableBodyCellStyle: {
                    verticalAlign: 'text-top'
                },
                // custom style for the table footer
                tableFooterStyle: {backgroundColor: '#000', color: 'white'},
            },
            {
                type: 'text',
                value: `Frais: ${colis.fees} Ariary`,
                position: "right",
                style: {
                    fontSize: '12px',
                    fontFamily: 'monospace, cursive',
                    marginTop: '6px'
                }
            }
        ];

        return data;

    } catch (error) {
        console.log(error);
        return [];
    }
}

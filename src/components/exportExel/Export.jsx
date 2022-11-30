'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './styles.css';

const GridExample = (props) => {
    const gridRef = useRef();
    const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
    const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
    const [rowData, setRowData] = useState(props.dataConfiguration);
    const [columnDefs, setColumnDefs] = useState([
        {
            field: 'age',
            minWidth: 200,
        },
        {
            field: 'email',
            minWidth: 200,
        },
        {
            field: 'phone',
            minWidth: 200,
        },

    ]);
    const defaultColDef = useMemo(() => {
        return {
            cellClassRules: {
                darkGreyBackground: (params) => {
                    return (params.node.rowIndex || 0) % 2 == 0;
                },
            },
            sortable: true,
            filter: true,
            resizable: true,
            minWidth: 100,
            flex: 1,
        };
    }, []);
    const excelStyles = useMemo(() => {
        return [
            {
                id: 'cell',
                alignment: {
                    vertical: 'Center',
                },
            },
            {
                id: 'greenBackground',
                interior: {
                    color: '#b5e6b5',
                    pattern: 'Solid',
                },
            },
            {
                id: 'redFont',
                font: {
                    fontName: 'Calibri Light',
                    underline: 'Single',
                    italic: true,
                    color: '#ff0000',
                },
            },
        ];
    }, []);

    const onGridReady = useCallback((params) => {
        fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
            .then((resp) => resp.json())
            .then((data) => console.log(data));
    }, []);

    const onBtnExportDataAsExcel = useCallback(() => {
        gridRef.current.api.exportDataAsExcel();
    }, []);

    console.log(props)
    return (
        <div style={containerStyle}>
            <div className="page-wrapper">
                <div>
                    <button
                        onClick={onBtnExportDataAsExcel}
                        style={{ marginBottom: '5px', fontWeight: 'bold' }}
                    >
                        Export to Excel
                    </button>
                </div>

                <div className="grid-wrapper">
                    <div style={gridStyle} className="ag-theme-alpine">
                        <AgGridReact
                            ref={gridRef}
                            rowData={rowData}
                            columnDefs={columnDefs}
                            defaultColDef={defaultColDef}
                            excelStyles={excelStyles}
                            onGridReady={onGridReady}
                        ></AgGridReact>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GridExample;
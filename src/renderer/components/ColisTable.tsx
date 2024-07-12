/* eslint-disable prettier/prettier */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/button-has-type */
import {
  MagnifyingGlassIcon,
  PencilIcon,
  PrinterIcon,
} from '@heroicons/react/24/outline';
import React, { useEffect, useMemo, useState } from 'react';
import DataTable, { ExpanderComponentProps, TableColumn } from 'react-data-table-component';
import { getLocations } from 'renderer/api/toelectron';
import OSApi from 'renderer/os-api';
import { getPrintableData } from 'renderer/utils/methods';

type Props = {
  onEdit: (data: Colis) => void;
  data: Colis[];
};

const ColisTable = ({ onEdit, data }: Props) => {
  const [colis, setColis] = useState(data);

  useEffect(() => {
    setColis(data);
  }, [data]);


  // function to handle print
  async function handlePrint(data: Colis) {
    // get locations
    const locations = await getLocations() as unknown as Location[];
    const printableData = getPrintableData(data, locations);
    console.log(locations)
    OSApi.ipcRenderer.send('print:colis', JSON.stringify(printableData));
  }

  const columns: TableColumn<Colis>[] = [
    { name: 'N°', selector: (row) => row.id.toString().padStart(8, '0') ?? '', width: "90px" },
    { name: 'Colis', selector: (row) => row.name!, width: "220px"  },
    { name: 'Quantité', selector: (row) => row.quantity, width: '80px' },
    {
      name: 'Destination',
      selector: (row) => `${row.from?.name} - ${row.to?.name}`,
      wrap: true,
      width: "auto"
    },
    {
      name: 'Date/Horaire',
      selector: (row) => new Date(row.date).toLocaleString("fr"),
      hide: 'lg',
    },
    { name: 'Voiture', selector: (row) => row.car, hide: 'lg' },
    {
      name: 'Action',
      button: true, 
      selector: (row) => (
        <div className="flex items-center gap-2">
          <button
            className="btn text-gray-500 hover:text-dark focus:ring-0"
            onClick={() => onEdit(row)}
          >
            <PencilIcon className="w-4" />
          </button>
          <button className="btn text-warning hover:text-orange focus:ring-0 "
            onClick={() => handlePrint(row)}
          >
            <PrinterIcon className="w-4" />
          </button>
        </div>
      ),
    },
  ];

  const ExpandedComponent:React.FC<ExpanderComponentProps<Colis>> = (item) => {
    const colis= item.data;
    return (
      <div className="w-full py-1 pl-16 pb-2 border-b border-gray-200 bg-gray-100">
        <h1 className='text-xs font-semibold text-gray-500 mb-1'>Plus de détails:</h1>
        <div className='w-full grid grid-cols-3 px-2 table-more-details'>
          <ul className="w-full flex flex-col gap-1">
            <li><span>Expéditeur:</span> {colis.expName}</li>
            <li><span>Tel:</span> {colis.expPhone}</li>
          </ul>
          <ul className="w-full flex flex-col gap-1">
            <li><span>Récepteur:</span> {colis.recName}</li>
            <li><span>Tel:</span> {colis.recPhone}</li>
          </ul>
          <ul className="w-full flex flex-col gap-1">
            <li><span>Status:</span> <span className={`${colis.paid ? 'paid' : 'nonpaid'}`}>{colis.paid ? "Payé" : "Non payé"}</span></li>
            <li><span>Frais:</span> {colis.fees} Ar</li>
          </ul>
        </div>
      </div>
    );
  };

  const paginationComponentOptions = {
    rowsPerPageText: 'Ligne par page',
    rangeSeparatorText: 'sur',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Tous',
  };

  const [filterText, setFilterText] = useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const filteredItems = colis.filter(
    (item) =>
      item.name && item.name.toLowerCase().includes(filterText.toLowerCase())
  );
  const subHeaderComponentMemo = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText('');
      }
    };
    return (
      <div className="flex items-center gap-2 border border-light rounded-md p-2 text-sm focus-within:border-warning">
        <MagnifyingGlassIcon className="w-4 text-gray-300" />
        <input
          type="search"
          placeholder="Chercher"
          className="outline-none"
          onChange={(e) => setFilterText(e.target.value)}
          onReset={handleClear}
          value={filterText}
        />
      </div>
    );
  }, [filterText, resetPaginationToggle]);

  return (
    <DataTable
      columns={columns}
      data={filteredItems}
      expandableRows
      expandableRowsComponent={ExpandedComponent}
      pagination
      paginationComponentOptions={paginationComponentOptions}
      fixedHeader
      fixedHeaderScrollHeight="420px"
      subHeader
      subHeaderComponent={subHeaderComponentMemo}
      paginationResetDefaultPage={resetPaginationToggle}
      persistTableHead
    />
  );
};

export default ColisTable;

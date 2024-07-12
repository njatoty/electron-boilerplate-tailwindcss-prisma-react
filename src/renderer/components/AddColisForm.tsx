/* eslint-disable prettier/prettier */
import {
  ArrowRightIcon,
  ChevronUpIcon,
  PlusCircleIcon,
  PrinterIcon,
} from '@heroicons/react/24/outline';
import { useEffect, useState, useMemo, FormEvent } from 'react';
import { createColis, getDefaultUser, getLocations } from '../api/toelectron';

const yyymmdd = (date = new Date()) => {
  return `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, '0')}-${date.getDay().toString().padStart(2, '0')}`;
};
const hhmm = (date = new Date()) => {
  return `${date.getHours().toString().padStart(2, '0')}:${date
    .getMinutes()
    .toString()
    .padStart(2, '0')}`;
};
const currency = (n: number, local = 'en-US') => {
  return n.toLocaleString(local, {
    currency: 'MGA',
    style: 'currency'
  });
};

type Props = {
    onSubmit: (data: any) => Promise<boolean>,
    onCancel: (isCanceled: boolean) => void,
    trigger: boolean
}

const AddColisForm = ({ onSubmit, onCancel, trigger } : Props) => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [car, setCar] = useState('');
  // Expéditeur
  const [expName, setExpName] = useState('');
  const [expPhone, setExpPhone] = useState('');
  // Récepteur
  const [recName, setRecName] = useState('');
  const [recPhone, setRecPhone] = useState('');

  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const [fees, setFees] = useState(0);

  const [paid, setPaid] = useState(false);
  const [print, setPrint] = useState(false);

  const [locations, setLocations] = useState<Location[]>([]);
  const [defaultLocation, setDefaultLocation] = useState<Location>();

  const availableLocations = useMemo(
    () => locations.filter((l) => l.id !== from),
    [locations, from]
  );

  async function init() {
    const d = new Date();
    setDate(yyymmdd(d));
    setTime(hhmm(d));

    const allLocations = await getLocations();
    setLocations(allLocations as unknown as Location[]);
    // default location
    const user = await getDefaultUser();
    if (user) {
      setDefaultLocation(user.location as unknown as Location);
      setFrom(user.location.id);
    }
    
  }

  // trigger is used to show current date (realtime display)
  useEffect(() => {
    init();
  }, [trigger]);

  // to change to value
  useEffect(() => {
    if (availableLocations.length !== 0) setTo(availableLocations[0].id);
  }, [availableLocations]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const data = {
        name,
        quantity: +quantity,
        expName,
        expPhone,
        recName,
        recPhone,
        date: new Date(`${date} ${time}`),
        fees,
        fromLocationId: from,
        toLocationId: to,
        paid,
        car,
    };

    // create colis
    const created = await createColis(data);

    onSubmit(created);
    // reset form
    setName(''); setPaid(false); setCar(''); setQuantity(1);
    setExpName(''); setExpPhone(''); setRecName(''); setRecPhone('');
    setFees(0);
  }

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3 pt-2">
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-5">
          <div className="form-group">
            <label htmlFor="name">
                Colis:
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.currentTarget.value)}
                    required
                />
            </label>
            <span>Nom du colis</span>
          </div>
        </div>
        <div className="col-span-2">
          <div className="form-group">
            <label htmlFor="qt">
                Quantité:
                <input
                    type="number"
                    id="qt"
                    min={0}
                    value={quantity}
                    onChange={(e) => setQuantity(+e.currentTarget.value)}
                    required
                />
            </label>
            <span>Quantité du colis</span>
          </div>
        </div>
        <div className="col-span-5">
          <div className="form-group">
            <label htmlFor="car">
                Voiture:
                <input
                    type="text"
                    id="car"
                    value={car}
                    onChange={(e) => setCar(e.currentTarget.value)}
                    required
                />
            </label>
            <span>Numéro de la voiture</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-5">
          <div className="form-group">
            <label htmlFor="date">
                Date:
                <input
                    type="date"
                    value={date}
                    id="date"
                    onChange={(e) => setDate(e.currentTarget.value)}
                    required
                />
            </label>
            <span>Date d&apos;envoie</span>
          </div>
        </div>
        <div className="col-span-2">
          <div className="form-group">
            <label htmlFor="qt">
                Horaire:
                <input
                type="time"
                    value={time}
                    id="qt"
                    onChange={(e) => setTime(e.currentTarget.value)}
                    required
                />
            </label>
            <span>Heure et minute</span>
          </div>
        </div>
        <div className="col-span-5">
          <div className="form-group">
            <label htmlFor="fees">
                Frais en Ariary:
                <input
                    type="text"
                    value={fees}
                    id="fees"
                    onChange={(e) => setFees(+e.currentTarget.value ?? 0)}
                />
            </label>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-7">
          <div className="w-full flex items-center justify-between">
            <div className="form-group flex-grow">
                <label htmlFor="from">
                    Destination (départ et arrivé):
                    <div className="flex items-center">
                        <select
                          defaultValue={defaultLocation?.id}
                          value={from}
                          id="from"
                          onChange={(e) => setFrom(e.currentTarget.value)}
                          required
                        >
                          {
                            locations.map((locat) => (
                              <option
                                key={`from-${locat.id}`}
                                value={locat.id}
                                // selected={defaultLocation?.id === locat.id}
                              >
                                {locat.name}
                              </option>
                            ))
                          }
                        </select>
                        <div className="px-2">
                          <ArrowRightIcon className="w-5 text-gray-400" />
                        </div>
                        <select
                          value={to}
                          id="to"
                          onChange={(e) => setTo(e.currentTarget.value)}
                          required
                        >
                        {
                          availableLocations.map((locat) => (
                            <option key={`to-${locat.id}`} value={locat.id}>
                              {locat.name}
                            </option>
                          ))
                        }
                        </select>
                    </div>
                </label>
            </div>
          </div>
        </div>
        <div className="col-span-5">
          <div className="form-group">
            <label htmlFor="paid">
              Status de paiement:
              <input
                type="checkbox"
                name='paid'
                id="paid"
                onChange={(e) => setPaid(e.currentTarget.checked)}
                checked={paid}
                className='w-fit block mt-2 text-2xl'
              />
            </label>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-6">
          <div className="form-group">
            <label htmlFor="expName">
                Nom de l&apos;expéditeur:
                <input
                type="text"
                value={expName}
                id="expName"
                onChange={(e) => setExpName(e.currentTarget.value)}
                />
            </label>
          </div>
        </div>
        <div className="col-span-6">
          <div className="form-group">
            <label htmlFor="expPhone">
                Téléphone:
                <input
                    type="tel"
                    value={expPhone}
                    id="expPhone"
                    onChange={(e) => setExpPhone(e.currentTarget.value)}
                />
            </label>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-6">
          <div className="form-group">
            <label htmlFor="recName">
                Nom du récepteur:
                <input
                    type="text"
                    value={recName}
                    id="recName"
                    onChange={(e) => setRecName(e.currentTarget.value)}
                />
            </label>
          </div>
        </div>
        <div className="col-span-6">
          <div className="form-group">
            <label htmlFor="recPhone">
                Téléphone:
                <input
                    type="tel"
                    value={recPhone}
                    id="recPhone"
                    onChange={(e) => setRecPhone(e.currentTarget.value)}
                    required
                />
            </label>
          </div>
        </div>
      </div>

      <div className="w-full flex items-center justify-center gap-4 mt-2">
        <button
          type="submit"
          className="btn btn-gold btn-sm"
          onClick={() => setPrint(false)}
        >
          <PlusCircleIcon className="icon" />
          Enregistrer
        </button>
        <button
          type="submit"
          className="btn btn-gold btn-sm"
          onClick={() => setPrint(true)}
        >
          <PrinterIcon className="icon" />
          Enregistrer et Imprimer
        </button>
        <button
          type="button"
          className="btn btn-gray btn-sm"
          onClick={() => onCancel(false)}
        >
          <ChevronUpIcon className="icon" />
          Annuler
        </button>
      </div>
    </form>
  );
};

export default AddColisForm;

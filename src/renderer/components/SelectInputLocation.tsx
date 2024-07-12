import { ChevronUpDownIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

type Props = {
  id?: string;
  data?: Location[];
  onChange: (locationId: string) => void;
}

const SelectInputLocation = ({ id = 'loc', data = [], onChange }: Props) => {
  const [isOpen, setOpen] = useState(true);
  const [locations, setLocations] = useState(data);
  const [location, setLocation] = useState<Location>();

  // useEffect(() => {
  //     setLocations();
  // }, [data]);

  function handleChange(loc: Location) {
    setLocation(loc);
    onChange && onChange(loc.id);
    setOpen(false);
  }

  return (
    <div className="login-form-group mb-3 relative !overflow-visible">
      <MapPinIcon className="icon" />
      <input
        type="text"
        id={id}
        placeholder="Votre location"
        className="login-input"
        value={location?.name ?? ''}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        required
        name={id}
      />
      <label
        htmlFor={id}
        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
      >
        <ChevronUpDownIcon className="w-5" />
      </label>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute -bottom-1 translate-y-full z-50 left-0 w-full rounded shadow-sm bg-white flex flex-col p-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="overflow-y-auto max-h-[200px] w-full">
              {locations.length > 0 ? (
                locations.map((loc, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 cursor-pointer hover:bg-warning/10 py-2"
                    onClick={() => handleChange(loc)}
                  >
                    <MapPinIcon className="icon" />
                    <span>{loc.name}</span>
                  </div>
                ))
              ) : (
                <p className="text-center">Aucunes options</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SelectInputLocation;

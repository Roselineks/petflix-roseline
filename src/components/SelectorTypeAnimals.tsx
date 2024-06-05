import React, { useEffect, ChangeEvent } from 'react';
import { useAppSelector, useAppDispatch } from '../store'
import { getAnimalTypesAsync } from '../store/slices/animalTypeSlice';
import * as animalType from '../store/slices/animalTypeSlice';

interface SelectorTypeAnimalsProps {
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const SelectorTypeAnimals: React.FC<SelectorTypeAnimalsProps> = ({ onChange }) => {
    // Use the RootState and the specific slice state to correctly type the return of useSelector
    const animalTypes = useAppSelector((state) => state.animalTypeSlice.data);
    
    const dispatch = useAppDispatch()
    
    useEffect(() => {
      dispatch(getAnimalTypesAsync());
  }, [dispatch]);

  const styles: { [key: string]: React.CSSProperties } = {
    input: {
      width: '100%',
      marginTop: '5px',
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      boxSizing: 'border-box',
      resize: 'vertical',
    },
  }

  return (
        <div>
          <select style={styles.input}>
          {animalTypes?.map((type) => (
              <option key={type.id_type} value={type.id_type}>
                {type.nom_type}
              </option>
            ))}
          </select>
        </div>
  );
};

export default SelectorTypeAnimals;

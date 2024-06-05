import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../store'
import { getRefugeTypesAsync } from '../store/slices/refugeTypeSlice';
import * as refugeType from '../store/slices/refugeTypeSlice';

const SelectorTypeRefuges = () => {
    // Use the RootState and the specific slice state to correctly type the return of useSelector
    const refugeTypes = useAppSelector((state) => state.refugeTypeSlice.data);
    
    const dispatch = useAppDispatch()
    
    useEffect(() => {
      dispatch(getRefugeTypesAsync());
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
            {refugeTypes?.map((type) => (
              <option value={type.nom_refuge}>
                {type.nom_refuge}
              </option>
            ))}
          </select>
        </div>
  );
};

export default SelectorTypeRefuges;

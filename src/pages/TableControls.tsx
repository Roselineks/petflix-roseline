import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../store'
import { getControlsAsync } from '../store/slices/controlSlice';
import * as controlType from '../store/slices/controlSlice';

const TableControls = () => {
    // Use the RootState and the specific slice state to correctly type the return of useSelector
    const controlTypes = useAppSelector((state) => state.controlSlice.data);
    
    const dispatch = useAppDispatch()
    
    useEffect(() => {
      dispatch(getControlsAsync());
  }, [dispatch]);
return(
  <tbody>
  {controlTypes.map((control, index) => (
    <tr key={index}>
      <td>{control.date_controle}</td>
      <td>{control.nom_animal}</td>
      <td>{control.nom_adoptant}</td>
      <td>{control.adresse_adoptant}</td>
      <td>{control.nom_membre}</td>
    </tr>
  ))}
</tbody>
)
  
};

export default TableControls;

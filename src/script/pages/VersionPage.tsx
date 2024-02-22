import { useContext } from 'react';
import { ThemeContext } from '../../App';

function VersionPage() {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`page version-page ${theme}`}>
      <table className='version-table'>
        <thead className='version-table__head'>
          <tr className='version-table__row'>
            <th className='version-table__cell version-table__head-cell'>Display name</th>
            <th className='version-table__cell version-table__head-cell'>Version</th>
          </tr>
        </thead>
        <tbody className='version-table__body'>
          <tr className='version-table__row'>
            <td className='version-table__cell'>Backend</td>
            <td className='version-table__cell'>0.0.3</td>
          </tr>
          <tr className='version-table__row'>
            <td className='version-table__cell'>Frontend</td>
            <td className='version-table__cell'>0.0.3</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default VersionPage;

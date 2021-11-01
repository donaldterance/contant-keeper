import * as React from 'react';
import AlertContext from '../../context/alert/AlertContext';

const Alerts = () => {
  const alertData = React.useContext(AlertContext);

  return (
    alertData.alerts.length > 0 &&
    alertData.alerts.map((alert: { msg: string; type: string; id: string }) => {
      console.log(`made it to alerts.tsx`);
      return (
        <div key={alert.id} className={`alert alert-${alert.type}`}>
          <i className='fas fa-info-circle'>{alert.msg}</i>
        </div>
      );
    })
  );
};

export default Alerts;

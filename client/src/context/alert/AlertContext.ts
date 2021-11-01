//initialize context
import { createContext } from 'react';
interface AlertInferface {
  msg: string;
  type: string;
  id: string;
}
const AlertContext = createContext<any>(null);

export default AlertContext;

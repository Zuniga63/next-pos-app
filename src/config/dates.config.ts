import dayjs from 'dayjs';
import 'dayjs/locale/es-mx';
import relativeTime from 'dayjs/plugin/relativeTime';
import isToday from 'dayjs/plugin/isToday';

import { setDefaultLocale, registerLocale } from 'react-datepicker';
import es from 'date-fns/locale/es';
registerLocale('es', es);
setDefaultLocale('es');

dayjs.locale('es-mx');
dayjs.extend(relativeTime);
dayjs.extend(isToday);

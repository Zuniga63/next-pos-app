import dayjs from 'dayjs';
import 'dayjs/locale/es-mx';
import relativeTime from 'dayjs/plugin/relativeTime';
import isToday from 'dayjs/plugin/isToday';

dayjs.locale('es-mx');
dayjs.extend(relativeTime);
dayjs.extend(isToday);

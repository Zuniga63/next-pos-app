import dayjs from 'dayjs';
import 'dayjs/locale/es-mx';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.locale('es-mx');
dayjs.extend(relativeTime);

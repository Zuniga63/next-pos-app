import { getMinorBoxes } from '@/services/boxes.service';
import { ServerStateKeysEnum } from '@/utils/server-state-key.enum';
import { useQuery } from '@tanstack/react-query';

export function useGetMinorBoxes() {
  return useQuery({
    queryKey: [ServerStateKeysEnum.MinorBoxes],
    queryFn: getMinorBoxes,
  });
}

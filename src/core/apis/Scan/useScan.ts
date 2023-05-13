import {useMutation} from '@tanstack/react-query';
import request from '../../http/request';
import url, {baseUrl} from '../../http/url';

const scanKey = {
  scan: url(baseUrl, 'upload'),
};

interface ParamsType {
  onSuccess?: () => void;
  onSettled?: () => void;
  onError?: () => void;
}
const useScan = (params: ParamsType) => {
  const result = useMutation(
    async data =>
      await request(scanKey.scan, {
        method: 'POST',
        data,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data;',
        },
      }),
    params,
  );

  return result;
};

export default useScan;

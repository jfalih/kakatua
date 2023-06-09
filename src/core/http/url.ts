import qs from 'query-string';

const url = (
  host: string | undefined,
  path: string,
  query?: Record<string, any>,
): string => qs.stringifyUrl({url: new URL(path, host).toString(), query});

export const baseUrl = 'https://kakatua-ai-landmark.azurewebsites.net/';

export default url;

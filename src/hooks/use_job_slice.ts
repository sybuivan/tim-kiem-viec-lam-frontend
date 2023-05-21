import { IJob } from 'src/types/job';

export const useJobSlice = (array: IJob[], chunkSize: number) => {
  var result = [];
  for (var i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }

  return result;
};

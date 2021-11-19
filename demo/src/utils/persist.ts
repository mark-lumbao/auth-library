import fs from 'fs';
import { promisify } from 'util';

const asyncReadFile = promisify(fs.readFile);
const asyncAccessFile = promisify(fs.access);
const asyncWriteFile = promisify(fs.writeFile);

export interface DataInterface {
  username: string;
}

const DATAFILENAME = 'data.json';

const checkDataFile = async () => {
  try {
    await asyncAccessFile(DATAFILENAME);
  } catch (e) {
    await asyncWriteFile(DATAFILENAME, JSON.stringify([]));
  }
};

export const save = async (object: DataInterface) => {
  await checkDataFile();
  const parsedData = JSON.parse(
    await asyncReadFile(DATAFILENAME, { encoding: 'utf8' }),
  ) as unknown as DataInterface[];
  const targetData = parsedData.find(
    ({ username }) => username === object.username,
  );
  if (!targetData) {
    parsedData.push(object);
    await asyncWriteFile(DATAFILENAME, JSON.stringify(parsedData));
    return object;
  }
  return undefined;
};

export const get = async (object: DataInterface) => {
  await checkDataFile();
  const parsedData = JSON.parse(
    await asyncReadFile(DATAFILENAME, { encoding: 'utf8' }),
  ) as unknown as DataInterface[];
  const targetData = parsedData.find(
    ({ username }) => username === object.username,
  );
  return targetData;
};

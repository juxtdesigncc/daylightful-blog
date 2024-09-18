/* DO NOT EDIT: this file was automatically generated by airtable-ts-codegen */
/* eslint-disable */
import type { Item, Table } from 'airtable-ts';

export interface Route extends Item {
  id: string,
  routeId: string,
  fromPier: string[],
  toPier: string[],
  operator: string,
  // Unsupported field Image of type multipleAttachments
  timetables: string[],
  oppositeRoute: string[],
  status: string,
  region: string,
}

export const routesTable: Table<Route> = {
  name: 'Routes',
  baseId: 'apptMnvklTfJjWxc5',
  tableId: 'tblO7ZE69L5g8XrMO',
  mappings: {
    routeId: 'fldm8zMiJBsVvUhad',
    fromPier: 'fldYP2gOE3fkNDFHk',
    toPier: 'fldcndmWx1tzjGILA',
    operator: 'fldMAiFhvrZ8ewtek',
    // Unsupported field Image: fldisp8UTKHChc9Ni
    timetables: 'flddcmC9SdRyQWjbU',
    oppositeRoute: 'fldxaaA2ltrAAkuwt',
    status: 'fld9JftRKhs0k4l6b',
    region: 'fldeKVgowSoA8yMyS',
  },
  schema: {
    routeId: 'string',
    fromPier: 'string[]',
    toPier: 'string[]',
    operator: 'string',
    timetables: 'string[]',
    oppositeRoute: 'string[]',
    status: 'string',
    region: 'string',
  },
};

export interface Pier extends Item {
  id: string,
  pierName: string,
  address: string,
  gPSLocation: string,
  region: string,
  routesFromPier: string[],
  routesToPier: string[],
  timetables: string[],
  status: string,
}

export const piersTable: Table<Pier> = {
  name: 'Piers',
  baseId: 'apptMnvklTfJjWxc5',
  tableId: 'tblsTo8OmAtcnQQIt',
  mappings: {
    pierName: 'fldMegJNNHZVGypVu',
    address: 'fldVQfFNqsISCnKQG',
    gPSLocation: 'fldO85CaIrnIpEYc3',
    region: 'fldzRwcrPooygwABi',
    routesFromPier: 'fldkTMWNbpA6EHxdn',
    routesToPier: 'fld4nrdS5iYNfR145',
    timetables: 'fldonMrMAD3LXrm1u',
    status: 'fldyRfAwA7TZF1yUM',
  },
  schema: {
    pierName: 'string',
    address: 'string',
    gPSLocation: 'string',
    region: 'string',
    routesFromPier: 'string[]',
    routesToPier: 'string[]',
    timetables: 'string[]',
    status: 'string',
  },
};

export interface Timetable extends Item {
  id: string,
  time: string,
  additionalRemarks: string,
  pierID: string[],
  routeID: string[],
  frequency: string,
  shipType: string,
}

export const timetableTable: Table<Timetable> = {
  name: 'Timetable',
  baseId: 'apptMnvklTfJjWxc5',
  tableId: 'tblLP3nxgAFYk07AE',
  mappings: {
    time: 'fldwqaIwtv59wwZXP',
    additionalRemarks: 'fldZ6ZSGpwODLv04V',
    pierID: 'fldHaBdF8AunQyMaY',
    routeID: 'fldgDAtRV3ObvDVWg',
    frequency: 'fldFwra7ZgmC1C203',
    shipType: 'fldUbCpTLjrn6U57o',
  },
  schema: {
    time: 'string',
    additionalRemarks: 'string',
    pierID: 'string[]',
    routeID: 'string[]',
    frequency: 'string',
    shipType: 'string',
  },
};
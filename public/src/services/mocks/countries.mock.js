const countries = [
  { id: 'CRI', nombre: 'COSTA RICA' },
  { id: 'HRV', nombre: 'CROACIA' },
  { id: 'CUB', nombre: 'CUBA' },
  { id: 'DNK', nombre: 'DINAMARCA' },
  { id: 'DMA', nombre: 'DOMINICA' },
  { id: 'DOM', nombre: 'REPÚBLICA DOMINICANA' },
  { id: 'ECU', nombre: 'ECUADOR' },
  { id: 'EGY', nombre: 'EGIPTO' },
  { id: 'SLV', nombre: 'EL SALVADOR' },
  { id: 'ARE', nombre: 'EMIRATOS ÁRABES UNIDOS' },
  { id: 'ERI', nombre: 'ERITREA' },
  { id: 'SVK', nombre: 'ESLOVAQUIA' },
  { id: 'SVN', nombre: 'ESLOVENIA' },
  { id: 'ESP', nombre: 'ESPAÑA' },
  { id: 'USA', nombre: 'ESTADOS UNIDOS' },
  { id: 'EST', nombre: 'ESTONIA' }
];

export const countriesMockRequest = (config = {}) =>
  Promise.resolve({
    data: countries,
    status: 200,
    statusText: 'OK',
    headers: {},
    config
  });

export default countries;
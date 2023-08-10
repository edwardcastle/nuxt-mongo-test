import { describe, test, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useGatewayStore } from '../store/gateways';
import { GatewayType } from '~/types';

beforeAll(() => {
  setActivePinia(createPinia());
  // @ts-ignore
  global.$fetch = (): Promise<GatewayType[]> => {
    // @ts-ignore
    return [
      {
        _id: '64d4ffff64439fdb1931e915',
        serialNumber: 'N18M',
        name: 'gate-1',
        ipv4: '127.0.0.1',
        peripheralDevices: [],
      },
    ];
  };
  // @ts-ignore
});

afterAll(() => {
  global.$fetch = $fetch;
});

describe('Gateways table', () => {
  let store: ReturnType<typeof useGatewayStore>;
  beforeEach(() => {
    store = useGatewayStore();
  });

  afterEach(() => {
    store.$dispose();
  });

  test('Gateways should be empty by default', () => {
    expect(store.gateways.length).toEqual(0);
  });

  test('Get all gateway', async () => {
    // call method
    await store.getAll();
    // expect
    expect(store.gateways).toEqual([
      {
        _id: '64d4ffff64439fdb1931e915',
        serialNumber: 'N18M',
        name: 'gate-1',
        ipv4: '127.0.0.1',
        peripheralDevices: [],
      },
    ]);
  });

  test('Get a gateway by id', async () => {
    // call method
    await store.get('64d4ffff64439fdb1931e915');
    // expect
    expect(store.gateways).toEqual([
      {
        _id: '64d4ffff64439fdb1931e915',
        serialNumber: 'N18M',
        name: 'gate-1',
        ipv4: '127.0.0.1',
        peripheralDevices: [],
      },
    ]);
  });

  test('Add a new Gateway', async () => {
    // having
    const newGateway: GatewayType = {
      _id: '64d4ffff64439fdb1931e916',
      serialNumber: 'XGRH',
      name: 'gate-2',
      ipv4: '192.168.9.4',
      peripheralDevices: [
        {
          uid: 27,
          vendor: 'Apple',
          status: true,
          createdDate: expect.any(Date),
        },
      ],
    };

    // call method
    await store.create(newGateway);
    store.gateways.push(newGateway);

    // expect
    expect(store.gateways).toEqual([
      {
        _id: '64d4ffff64439fdb1931e915',
        serialNumber: 'N18M',
        name: 'gate-1',
        ipv4: '127.0.0.1',
        peripheralDevices: [],
      },
      {
        _id: '64d4ffff64439fdb1931e916',
        serialNumber: 'XGRH',
        name: 'gate-2',
        ipv4: '192.168.9.4',
        peripheralDevices: [
          {
            uid: 27,
            vendor: 'Apple',
            status: true,
            createdDate: expect.any(Date),
          },
        ],
      },
    ]);
  });

  test('Update a Gateway', async () => {
    // having
    const body: GatewayType = {
      _id: '64d4ffff64439fdb1931e915',
      serialNumber: 'BHJDSIBU',
      name: 'gate-3',
      ipv4: '192.168.9.4',
      peripheralDevices: [],
    };

    // call method
    await store.update('64d4ffff64439fdb1931e915', body);
    const index: number = store.gateways.findIndex(
      (item) => item._id === body._id,
    );
    if (index !== -1) store.gateways[index] = body;

    // expect
    expect(store.gateways).toEqual([
      {
        _id: '64d4ffff64439fdb1931e915',
        serialNumber: 'BHJDSIBU',
        name: 'gate-3',
        ipv4: '192.168.9.4',
        peripheralDevices: [],
      },
      {
        _id: '64d4ffff64439fdb1931e916',
        serialNumber: 'XGRH',
        name: 'gate-2',
        ipv4: '192.168.9.4',
        peripheralDevices: [
          {
            uid: 27,
            vendor: 'Apple',
            status: true,
            createdDate: expect.any(Date),
          },
        ],
      },
    ]);
  });

  test('Delete a Gateway with correct id', async () => {
    // having
    const id = '64d4ffff64439fdb1931e915';
    // call method
    await store.remove(id);

    const index: number = store.gateways.findIndex((item) => item._id === id);
    if (index !== -1) store.gateways.splice(index, 1);
    // expect
    expect(store.gateways).toEqual([]);
  });

  test('Delete a Gateway with incorrect id', async () => {
    // having
    const id = '123456789';
    // call method
    await store.remove(id);

    const index: number = store.gateways.findIndex((item) => item._id === id);
    if (index !== -1) store.gateways.splice(index, 1);
    // expect
    expect(store.gateways).toEqual([
      {
        _id: '64d4ffff64439fdb1931e915',
        ipv4: '127.0.0.1',
        name: 'gate-1',
        peripheralDevices: [],
        serialNumber: 'N18M',
      },
    ]);
  });
});

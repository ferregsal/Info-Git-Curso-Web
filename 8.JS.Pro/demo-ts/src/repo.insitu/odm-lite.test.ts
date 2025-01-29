import { ODMLite } from './odm-lite';
import { vi } from 'vitest';
import { readFromDisk, writeToDisk } from './helpers';

vi.mock('./helpers');

const DB = {
    items: [
        { id: '1', name: 'item1' },
        { id: '2', name: 'item2' },
    ],
};

describe('Given a instance of ODMLite', () => {
    test('It should be created', () => {
        const odm = new ODMLite('file.json');
        expect(odm).toBeDefined();
    });

    let odm: ODMLite<(typeof DB.items)[0]>;
    beforeEach(() => {
        odm = new ODMLite('file.json');
        vi.mocked(readFromDisk).mockReturnValue(JSON.stringify(DB));
        vi.mocked(writeToDisk).mockImplementation(() => {});
    });

    describe('When run method read with a collection name', () => {
        test('Then result should be all data collection', () => {
            const data = odm.read('items');
            expect(data).toStrictEqual(DB.items);
        });
    });
    describe('When run method readById with a collection name and one id ', () => {
        test('Then result should be the item with this id', () => {
            const item = odm.readById('items', '1');
            expect(item).toStrictEqual(DB.items[0]);
        });
    });

    describe('When run method create with a collection name and data', () => {
        test('Then result should be the item created', () => {
            const newItem = { name: 'item3' };
            const item = odm.create('items', newItem);
            expect(item).toStrictEqual({ id: expect.any(String), ...newItem });
            // expect(item.id).toHaveLength(8);
            // expect(item.name).toBe('item3');
            expect(writeToDisk).toHaveBeenCalledWith(
                expect.stringContaining('item3'),
            );
        });
    });

    describe('When run method updateById with a collection name, id and data', () => {
        test('Then result should be the item updated', () => {
            const item = odm.updateById('items', '1', {
                name: 'item1-updated',
            });
            expect(item).toStrictEqual({ id: '1', name: 'item1-updated' });
            expect(writeToDisk).toHaveBeenCalledWith(
                expect.stringContaining('item1-updated'),
            );
        });
    });

    describe('When run method deleteById with a collection name and id', () => {
        test.skip('Then result should be the item deleted', () => {
            const item = odm.deleteById('items', '1');
            expect(item).toStrictEqual({ id: '1', name: 'item1' });
            expect(writeToDisk).not.toHaveBeenCalledWith(
                expect.stringContaining('item1'),
            );
        });
    });
});

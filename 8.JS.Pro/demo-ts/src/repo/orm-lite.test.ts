import { ORMLite } from './orm-lite';
import { readFromDisk, writeToDisk } from './helpers';
import { vi } from 'vitest';

type Item = {
    id: string;
    title: string;
};

vi.mock('./helpers');

const ITEMS = [
    { id: '1', title: 'Item 1' },
    { id: '2', title: 'Item 2' },
];

describe('Given a instance of class ORMLite', () => {
    let ormLite: ORMLite<Item>;
    beforeEach(() => {
        ormLite = new ORMLite('file.json');

        vi.mocked(readFromDisk).mockReturnValue(
            JSON.stringify({
                items: ITEMS,
            }),
        );

        vi.mocked(writeToDisk).mockImplementation(() => {});
    });

    test('Should be defined', () => {
        expect(ormLite).toBeDefined();
    });

    describe('When we use read method for a collection', () => {
        test('Should be returned all collection data', () => {
            const items = ormLite.read('items');
            expect(items).toStrictEqual(ITEMS);
        });
    });

    describe('When we use readById method for a collection and id', () => {
        test('Should be returned all collection data', () => {
            const collection = 'items';
            const id = '1';
            const item = ormLite.readById(collection, id);
            expect(item).toStrictEqual(ITEMS[0]);
        });
    });

    describe('When we use create method for a collection and initial data', () => {
        test('Should be created a new item', () => {
            const collection = 'items';
            const initialData = { title: 'Item 3' };
            const item = ormLite.create(collection, initialData);
            expect(item).toStrictEqual({
                id: expect.any(String),
                title: 'Item 3',
            });
        });
    });

    describe('When we use updateById method for a collection, id and data', () => {
        test('Should be updated the item', () => {
            const collection = 'items';
            const id = '1';
            const data = { title: 'Item 1 Updated' };
            const item = ormLite.updateById(collection, id, data);
            expect(item).toStrictEqual({
                id: '1',
                title: 'Item 1 Updated',
            });
            expect(writeToDisk).toHaveBeenCalledWith(
                expect.stringContaining('Updated'),
            );
        });
    });

    describe('When we use deleteById method for a collection and id', () => {
        test('Should be deleted the item', () => {
            const collection = 'items';
            const id = '1';
            const item = ormLite.deleteById(collection, id);
            expect(item).toStrictEqual(ITEMS[0]);
            expect(writeToDisk).toHaveBeenCalledWith(
                expect.not.stringContaining('1'),
            );
        });
    });
});

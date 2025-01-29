import { readFromDisk, writeToDisk } from './helpers';
import { WithId, TypeODM } from './types';

export class ODMLite<T extends WithId> implements TypeODM<T> {
    file: string;
    constructor(file: string) {
        this.file = file;
    }

    private readDB(): Record<string, T[]> {
        const txtData = readFromDisk(this.file);
        const allData = JSON.parse(txtData);
        return allData;
    }

    private writeDB(data: Record<string, T[]>): void {
        writeToDisk(this.file, JSON.stringify(data));
    }

    read(collection: string): T[] {
        const allData = this.readDB();
        const collectionData = allData[collection];
        return collectionData;
    }

    readById(collection: string, id: string): T {
        const allData = this.readDB();
        const collectionData = allData[collection];
        const item = collectionData.find((item: T) => item.id === id);
        if (item === undefined) {
            throw new Error(`Item with id ${id} not found`);
        }
        return item;
    }

    create(collection: string, data: Omit<T, 'id'>): T {
        const allData = this.readDB();
        const collectionData = allData[collection];

        const itemData = {
            ...data,
            id: crypto.randomUUID().substring(0, 8),
        } as T;
        collectionData.push(itemData);
        this.writeDB(allData);
        return itemData;
    }

    updateById(
        collection: string,
        id: string,
        data: Omit<Partial<T>, 'id'>,
    ): T {
        const allData = this.readDB();
        const collectionData = allData[collection];
        let item = collectionData.find((item: T) => item.id === id);
        if (item === undefined) {
            throw new Error(`Item with id ${id} not found`);
        }
        item = Object.assign(item, data);
        // item = { ...item, ...data }; // Otra forma de hacerlo
        this.writeDB(allData);
        return item;
    }

    deleteById(collection: string, id: string): T {
        const allData = this.readDB();
        const collectionData = allData[collection];
        const item = collectionData.find((item: T) => item.id === id);
        if (item === undefined) {
            throw new Error(`Item with id ${id} not found`);
        }
        // const item = collectionData.splice(itemIndex, 1)[0];
        allData[collection] = allData[collection].filter(
            (item: T) => item.id !== id,
        );
        this.writeDB(allData);
        return item;
    }
}

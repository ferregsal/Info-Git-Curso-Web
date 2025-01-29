import { readFromDisk, writeToDisk } from './helpers';

export class ORMLite<T extends { id: string }> implements TypeORM<T> {
    file: string;
    constructor(file: string) {
        this.file = file;
    }

    private readDB(): Record<string, T[]> {
        const txtData = readFromDisk();
        return JSON.parse(txtData);
    }

    private writeDB(data: Record<string, T[]>): void {
        writeToDisk(JSON.stringify(data));
    }

    read(collection: string): T[] {
        // const txtData = readFromDisk();
        // const allData = JSON.parse(txtData);
        const allData = this.readDB();
        return allData[collection];
    }

    readById(collection: string, id: string): T {
        // const txtData = readFromDisk();
        // const allData = JSON.parse(txtData);
        const allData = this.readDB();
        const item = allData[collection].find((item: T) => item.id === id);
        if (item === undefined) {
            throw new Error(`Item with id ${id} not found`);
        }
        return item;
    }

    create(collection: string, initialData: Omit<T, 'id'>): T {
        // const txtData = readFromDisk();
        // const allData = JSON.parse(txtData);
        const allData = this.readDB();
        const itemData = {
            ...initialData,
            id: crypto.randomUUID().substring(0, 8),
        } as T;
        allData[collection].push(itemData);
        // writeToDisk(JSON.stringify(allData));
        this.writeDB(allData);
        return itemData;
    }

    updateById(collection: string, id: string, data: Partial<T>) {
        // const txtData = readFromDisk();
        // const allData = JSON.parse(txtData);
        const allData = this.readDB();
        let item = allData[collection].find((item: T) => item.id === id);
        if (item === undefined) {
            throw new Error(`Item with id ${id} not found`);
        }
        item = Object.assign(item, data);
        // item = { ...item ...data }; // Otra forma de hacerlo
        // writeToDisk(JSON.stringify(allData));
        this.writeDB(allData);
        return item;
    }

    deleteById(collection: string, id: string) {
        // const txtData = readFromDisk();
        // const allData = JSON.parse(txtData);
        const allData = this.readDB();
        const item = allData[collection].find((item: T) => item.id === id);
        if (item === undefined) {
            throw new Error(`Item with id ${id} not found`);
        }
        allData[collection] = allData[collection].filter(
            (item: T) => item.id !== id,
        );
        // writeToDisk(JSON.stringify(allData));
        this.writeDB(allData);
        return item;
    }
}

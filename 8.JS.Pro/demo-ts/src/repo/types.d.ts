interface TypeORM<T> {
    read(collection: string): T[];
    readById(collection: string, id: string): T;
    create(collection: string, data: Omit<T, 'id'>): T;
    updateById(collection: string, id: string, data: Partial<T>): T;
    deleteById(collection: string, id: string): T;
}

interface Repository<T> {
    read: () => T[];
    readById: (id: string) => T;
    create: (data: Omit<T, 'id'>) => T;
    update: (id: string, data: Partial<T>) => T;
    delete: (id: string) => T;
}

type Item = {
    id: string;
    title: string;
};

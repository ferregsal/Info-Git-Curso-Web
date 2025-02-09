import { ODMLite } from '../odm/odm-lite.js';
import type { TypeODM } from '../odm/odm.type.js';
import type { Animal } from './animal.type.js';
import type { Repository } from './repository.type.js';

export class RepoAnimalFile implements Repository<Animal> {
    odm: TypeODM<Animal>;
    collection: string;
    constructor(file = 'db.json', collection = 'animals') {
        this.odm = new ODMLite<Animal>(file, collection);
        this.collection = collection;
    }

    async read(): Promise<Animal[]> {
        const data = await this.odm.read();
        return data;
    }
    async readById(id: string): Promise<Animal> {
        return await this.odm.readById(id);
    }
    async create(data: Omit<Animal, 'id'>): Promise<Animal> {
        return await this.odm.create(data);
    }
    async update(
        id: string,
        data: Partial<Omit<Animal, 'id'>>,
    ): Promise<Animal> {
        return await this.odm.updateById(id, data);
    }
    async delete(id: string): Promise<Animal> {
        return await this.odm.deleteById(id);
    }
}

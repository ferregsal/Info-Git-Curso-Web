import { ORMLite } from './orm-lite';

export class RepoItemFile implements Repository<Item> {
    orm: TypeORM<Item> = new ORMLite<Item>('items.json');
    collection = 'items';
    read() {
        return this.orm.read(this.collection);
    }
    readById(id: string) {
        return this.orm.readById(this.collection, id);
    }
    create(data: Partial<Item>) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return this.orm.create(this.collection, data as any);
    }
    update(id: string, data: Partial<Item>) {
        return this.orm.updateById(this.collection, id, data);
    }
    delete(id: string) {
        return this.orm.deleteById(this.collection, id);
    }
}

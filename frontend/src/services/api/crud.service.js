import { ApiService } from "@/services/api/api.service";

export class CrudService extends ApiService {
    constructor(resource) {
        super();
        this.resource = resource;
    }

    post(entity) {
        return this.$post(this.resource, entity);
    }

    get() {
        return this.$get(this.resource);
    }

    put(entity) {
        return this.$put(`${this.resource}/${entity.id}`, entity);
    }

    delete(id) {
        return this.$delete(`${this.resource}/${id}`);
    }
}
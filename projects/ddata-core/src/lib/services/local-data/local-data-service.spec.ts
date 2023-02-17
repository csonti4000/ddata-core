import { ID } from '../../models/base/base-data.type';
import { BaseModel } from '../../models/base/base-model.model';
import { LocalDataServiceInterface } from './local-data-service.interface';
import { LocalDataService } from './local-data.service';

class FakeClass extends BaseModel {
    id: ID;
    value: string;
    // tslint:disable-next-line: variable-name
    model_name = 'FakeClass';

    init(data: any): this {
        this.id = data.id;
        this.value = data.value;
        return this;
    }

    prepareToSave(): any {
        return {
            id: this.id,
            value: this.value
        };
    }
}

describe('LocalDataService', () => {
    const service: LocalDataServiceInterface<FakeClass> = new LocalDataService<FakeClass>(new FakeClass());
    const datas = [new FakeClass().init({id: 1, value: 'test 1'}), new FakeClass().init({id: 2, value: 'test 2'})];

    beforeEach(() => {
        localStorage.clear();
    });

    it('should update multiple times', () => {
        localStorage.setItem('fake_classes', JSON.stringify(datas));

        service.allFromLocal();

        datas[0].value = 'test new 1';
        service.save(datas[0], datas[0].id);

        datas[1].value = 'test new 2';
        service.save(datas[1], datas[1].id);

        const newLocalStorageData = JSON.parse(localStorage.getItem('fake_classes'));

        expect(newLocalStorageData[0].value).toEqual('test new 1');
    });
});

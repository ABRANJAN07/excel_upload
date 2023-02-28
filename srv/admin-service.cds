using emp as db from '../db/data-model';

service emp_srv {
    entity EMPLOYEE as projection on db.EMPLOYEE;
}
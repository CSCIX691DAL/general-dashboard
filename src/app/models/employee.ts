export class Employee {
    empID: string;
    birthDate: Date;
    firstName: string;
    lastName: string;
    gender: string;
    hireDate: Date;

    constructor(arr) {
        if (arr.length == 6) {
            this.empID = arr[0];
            this.birthDate = arr[1];
            this.firstName = arr[2];
            this.lastName = arr[3];
            this.gender = arr[4];
            this.hireDate = arr[5];
        }
    }

    public getEmpID(){
        return this.empID;
    }

    public getBirthDate(){
        return this.birthDate;
    }

    public getFirstName(){
        return this.firstName;
    }

    public getLastName(){
        return this.lastName;
    }

    public getGender(){
        return this.gender;
    }

    public getHireDate(){
        return this.hireDate;
    }
    
}
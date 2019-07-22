# typescript-practice

## 1.Typescript Types

### string number type declaration
~~~
let stringone:string
let numberone:number
~~~
### array type declaration
~~~
let arrayone:number[];
let arraytwo:Array<number>;
let arraythree:any[];
~~~
### enum type declaration
~~~
enum Flag {success=0, error=1};
const statusOne:Flag = Flag.error;
console.log(status)
~~~
### any type
~~~
const oBox:any = document.getElementById('root')
oBox.style.color = 'red;'
~~~
### compound type
~~~
let numbertwo: number | null | undefined;
numbertwo = 3;
~~~
### void type
~~~
function run():void {
    console.log('return nothing')
}
~~~
### never type
~~~
let aaa:undefined;
let bbb: null;
let ccc:never;

aaa = undefined;
bbb = null;
~~~

## 2.Typescript Function
~~~
function run():string {
    return 'string';
}

const run = function(name: string, age: number):number {
    return 123;
}
~~~
### option arguments, should be at the end of arguments
~~~
function getInfo(name:string, age?:number):string{
    return `${name} with ${age}`;
}
~~~
### default arguments
~~~
function getInfo(name:string, age:number=20):string{
    return `${name} with ${age}`;
}
~~~
### rest arguments
~~~
function sum(...result:number[]):number{
    let sum = 0;
    result.forEach(item => sum += item)
    return sum;
}
~~~

## 3.Class

### es5 inheritance
~~~
function People(name) {
    this.name = name;
}
People.prototype.run = function() {
    console.log('people is runing')
}

People.mark = function() {
    console.log('People mark');
}

function Child(name) {
    People.call(this, name);
}
Child.prototype = People.prototype;
~~~
### typescript inheritance
~~~
class Person() {
    name:string;

    constructor(n:string) {
        this.name = n;
    }

    run():void{
        console.log(this.name);
    }
}

class Child extends Person {
    static print() {
        console.log('this is a static mathod');
    }

    constructor(name:string) {
        super(name);
    }

    work():void {
        console.log('children are working')
    }
}
~~~
#### *public:  can be used in class subclass and outside of class
#### *private: can only be used in class
#### *protect: can be used in class and subclass but not outside of class

#### *abstract class only provide the schema of the class,  needs subclass to implement the concrete implementations.
~~~
abstract class Animal{
    abstract eat(): any;
}
~~~
## 4.Interface
### contrains for object
~~~
function printLabel(labelInfo: {labelName: string}):void{
    console.log(labelInfo.labelName);
}

printLabel({labelName: 'slogan'})
~~~
### define interface
~~~
interface FullName {
    firstName: string;
    lastName: string;
}

function printName(name:FullName):void {
    print(name.firstName);
}
~~~
### optional interface arguments
~~~
interface OtherName {
    firstName: string;
    lastName?: string;
}

function printOtherName(name:OtherName):void {
    print(`${name.firstName}`);
}
printOtherName({firstName: 'sun'})
~~~

### function type interface
~~~
interface encrypt {
    (key:string, value:string):string
}

const md5:encrypt = function(key:string, value:string):string{
    return key + value;
} 
~~~
### indexed interface, mostly used in array
~~~
interface UserArr {
    [index:number]:string;
}

let arr:UserArr = ['123','456']
~~~
### constrains for object
~~~
inteface UserObj {
    [index:string]:string
}

let obj:UserObj = {
    'name': 'min'
}
~~~
### constrains for class
~~~
interface Animal {
    name: string;
    eat(str:string):void;
}

class Dog implements Animal {
    name: string;
    constructor(name: string) {
        this.name = name;
    }

    eat(something:string){
        console.log(something);
    }
}
~~~
## 5.Generic Paradigm
~~~
//input and output are the same type,
in the following example, T could be replace by other letter, only if
three of those are the same
function getData<T>(value: T): T {
    return value
}

getData<string>('this is a string')

class MinClass<T> {
    public list:T[] = [];

    add(value:T):void {
        this.list.push(value);
    }

    min():T{
        let minNum = this.list[0];
        this.list.forEach(item => {
            if (minNum > item) minNum = item;
        });
        return minNum;
    }
}

//instantiate the class with type
let m1 = new MinClass<number>()
let m1 = new MinClass<string>()
~~~

### generic interface
~~~
interface ConfigFn{
    <T>(value:T, value2:T):T;
}

const getData:ConfigFn = function<T>(value: T, value2: T):T{
    return value + value2;
}

getData<string>('supeng','sunminjuan')

//alternative way
interface ConfigFn<T>{
    (value:T, value2:T):T
}

function getData<T>(value:T, value2:T):T{
    return value + value2;
}

const myGetData:ConfigFn<string> = getData;

myGetData('s', 's')
~~~

~~~
class MySqlDb<T>{
    add(info:T):boolean{
        console.log(info)
        return true;
    }
}

class User{
    name:string | undefined;
    password:string | undefined;
}

var u = new User();
u.name = 'su';
u.password = '123';
var Db = new MySqlDb<User>();
Db.add(u);
~~~

~~~
interface DBI<T> {
    add(info:T): boolean;
    update(info:T, id:number): boolean;
    delete(id:number): boolean;
    get(id:number): any[];
}

class MysqlDb <T> implements DBT<T>{
    add(info:T): boolean {

    };
    update(info:T, id:number): boolean {

    };
    delete(id:number): boolean {

    };
    get(id:number): any[] {

    };
}

const oMysql = new MysqlDb<User>();
oMysql.add(u)

~~~
### export inport 
~~~
//only one was exported
export default function aaa ():void{

}
import default from 'xxxx'

//multiple were exported
export function aaa ():void{

}
export function bbb ():void{
    
}
import {aaa, bbb} from 'xxxx'

//alternative multiple were exported
function aaa ():void{

}
function bbb ():void{
    
}
export {aaa, bbb};
import {aaa, bbb} from 'xxxx'

export nameSpace A {
    put all your implementations with same names here, and export them
}
~~~
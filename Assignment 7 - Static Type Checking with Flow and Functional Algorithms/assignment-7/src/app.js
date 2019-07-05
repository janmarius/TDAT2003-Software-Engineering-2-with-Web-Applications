// @flow

let v1 = [1, 2, 3];
let v2 = [4, 5, 6];

console.log("Exercise 1");
console.log("2 + v1: ", v1.map(num => (num + 2)));
console.log("2 * v1: ", v1.map(num => (num * 2)));
console.log("mean of v1: ", (v1.reduce((acc, e) => acc + e))/v1.length);
console.log("v1 dot v2: ", v1.reduce((r, a, i) =>  r + a * v2[i], 0));
console.log("sum of v1 + 2 * v2: ", (v1.reduce((acc, e) => acc + e) + v2.map(num => num * 2).reduce((acc, e) => acc + e)));
console.log("v1 as string:", v1.map((item, index) => " v1[" + index + "] = " + item + "").toString());




class Complex {
  real: number;
  imag: number;

  constructor(real: number, img: number) {
    this.real = real;
    this.imag = img;
  }
}

let v = [new Complex(2, 2), new Complex(1, 1)];

console.log();
console.log("Exercise 2");
console.log("v elements as strings: [", v.map((item) => " \'" + item.real.toString() + " + " +item.imag.toString() + "i\'").toString(), " ]");
console.log("magnitude of v elements: ", v.map(item => " " + Math.sqrt((Math.pow(item.real, 2) + Math.pow(item.imag, 2)))));
console.log("sum of v: ", v.reduce((res, e) => new Complex(res.real + e.real, res.imag + e.imag)));




let students = [{ name: 'Ola', grade: 'A' }, { name: 'Kari', grade: 'C' }, { name: 'Knut', grade: 'C' }];

console.log();
console.log("Exercise 3");
console.log("students elements as strings: [", students.map(item => " \'" + item.name + " got " + item.grade + "\'").toString(), " ]");
console.log("How many got C: ", students.filter(e => e.grade === 'C').length);
console.log("Percentage of C grades: ", students.filter(e => e.grade === 'C').length / students.length);
console.log("Did anyone get A: ", students.some(e => e.grade === 'A') ? "Yes" : "No");
console.log("Did anyone get F: ", students.some(e => e.grade === 'F') ? "Yes" : "No");

let input: number [] = [1,2,3,4,5,6];

let squareOfNumbers:number[] = input.map(x=>x*x);
console.log(squareOfNumbers);

let evenNumbers:number[] = input.filter(x=>x%2===0);
console.log(evenNumbers);

input.forEach(x=>console.log(x));





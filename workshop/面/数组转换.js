function convert(obj) {
  console.log(
    Array.from({ length: 12 }).map((item, index) => obj[index] || null)
  );

  return Array.from({ length: 12 })
    .map((item, index) => obj[index] || null)
    .slice(1);
}
let ki = convert({ 1: 22, 3: 55, 8: 23 });
console.log(ki);

console.log(Array.from({ length: 12 }));

i = 0;
console.log('')
setInterval(() => {
  console.log("\u001b[1A" + i++ + "%")
}, 500)
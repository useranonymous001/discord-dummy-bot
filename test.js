let query = "!Play on the floor";

const args = query.slice(1).trim().split(" ");
const command = args[0].toLowerCase();
const string = args.slice(1).join(" ");

console.log(args);
console.log(command);
console.log(string);



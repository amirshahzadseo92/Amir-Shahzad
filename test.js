const str = "A".repeat(1500000);
const CHUNK_SIZE = 900000;
const chunks = [];
for (let i = 0; i < str.length; i += CHUNK_SIZE) {
  chunks.push(str.substring(i, i + CHUNK_SIZE));
}
console.log(chunks.length);
console.log(chunks[0].length, chunks[1].length);
let full = "";
for (let i = 0; i < chunks.length; i++) full += chunks[i];
console.log(full.length);

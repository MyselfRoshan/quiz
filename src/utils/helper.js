export function decodeURL3986(html) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  return doc.body.textContent || "";
}

export function shuffle(array) {
  let last = array.length;
  let n;
  while (last > 0) {
    n = rand(last);
    swap(array, n, --last);
  }
}

const rand = n => 0 | (Math.random() * n);

function swap(array, i, j) {
  let q = array[i];
  array[i] = array[j];
  array[j] = q;
  return array;
}

// utils/cn.js
export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

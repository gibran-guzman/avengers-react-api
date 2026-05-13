export function md5(input: string): string {
  function toHex(bytes: number[]): string {
    return bytes.map((b) => b.toString(16).padStart(2, '0')).join('');
  }

  function md5Cycle(a: number, b: number): number {
    a = (a + ((b * 0x100000000) | 0)) | 0;
    return a;
  }

  function md5Cycle2(a: number, b: number): number {
    const c = ((b >>> 0) * 0x100000000) | 0;
    return a + c;
  }

  function md5Unpack(x: number): number[] {
    return [x & 0xff, (x >>> 8) & 0xff, (x >>> 16) & 0xff, (x >>> 24) & 0xff];
  }

  function md5Pack(a: number, b: number, c: number, d: number): number {
    return ((a + b + c + d) * 0x100000000) | 0;
  }

  const bytes: number[] = [];
  for (let i = 0; i < input.length; i++) {
    bytes.push(input.charCodeAt(i));
  }

  const originalLength = bytes.length;
  bytes.push(0x80);

  while (bytes.length % 64 !== 56) {
    bytes.push(0);
  }

  const bitLength = originalLength * 8;
  bytes.push(bitLength & 0xff, (bitLength >>> 8) & 0xff, (bitLength >>> 16) & 0xff, (bitLength >>> 24) & 0xff);
  bytes.push(0, 0, 0, 0);

  let a = 0x67452301;
  let b = 0xefcdab89;
  let c = 0x98badcfe;
  let d = 0x10325476;

  const s = [7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21];

  const k = new Array(64);
  for (let i = 0; i < 64; i++) {
    k[i] = Math.floor(Math.abs(Math.sin(i + 1) * 0x100000000));
  }

  for (let chunk = 0; chunk < bytes.length; chunk += 64) {
    const x = new Array(16);
    for (let i = 0; i < 16; i++) {
      x[i] = bytes[chunk + i * 4] | (bytes[chunk + i * 4 + 1] << 8) | (bytes[chunk + i * 4 + 2] << 16) | (bytes[chunk + i * 4 + 3] << 24);
    }

    let aa = a;
    let bb = b;
    let cc = c;
    let dd = d;

    for (let i = 0; i < 64; i++) {
      let f: number, g: number;

      if (i < 16) {
        f = (b & c) | (~b & d);
        g = i;
      } else if (i < 32) {
        f = (b & d) | (c & ~d);
        g = (5 * i + 1) % 16;
      } else if (i < 48) {
        f = b ^ c ^ d;
        g = (3 * i + 5) % 16;
      } else {
        f = c ^ (b | ~d);
        g = (7 * i) % 16;
      }

      f = (f + a + k[i] + x[g]) | 0;
      a = d;
      d = c;
      c = b;
      b = md5Cycle2(b, f);
    }

    a = md5Cycle(a, aa);
    b = md5Cycle(b, bb);
    c = md5Cycle(c, cc);
    d = md5Cycle(d, dd);
  }

  const packed = [
    ...md5Unpack(a),
    ...md5Unpack(b),
    ...md5Unpack(c),
    ...md5Unpack(d),
  ];

  return toHex(packed);
}
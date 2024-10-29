import { randomBytes } from 'crypto';

const secretKey = randomBytes(64).toString('hex');
console.log(secretKey);

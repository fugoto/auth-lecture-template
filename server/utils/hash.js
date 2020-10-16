const bcrypt = require('bcrypt');
const chalk = require('chalk');

// Given an input, it can generate a different output.
// The output needs to be consistently generated - given the same input, you produce the same output - PURITY.
// Given a we always produce b, given b, we always produce c

// Hash Collision - when two inputs generate the same output - this is NOT GOOD

const createSalt = () => new Promise((res, rej) => {
  bcrypt.genSalt(10, (err, salt) => {
    if (err) rej(err);
    else res(salt);
  });
});

const createHash = (arbString, salt) => new Promise((res, rej) => {
  bcrypt.hash(arbString, salt, (err, hash) => {
    if (err) rej(err);
    else res(hash);
  });
});

const hash = async (arbString) => {
  try {
    const salt = await createSalt();
    const hashedString = await createHash(arbString, salt);

    return hashedString;
  } catch (e) {
    console.log(chalk.red(`Failed to salt and hash password.`));
    throw e;
  }
}

module.exports = hash;

import bcrypt from 'bcrypt';
const saltRound = 10;

export const encryptField = (field) => {
  return bcrypt.hashSync(String(field), saltRound);
};

export const decryptField = (field, hashedPassword) => {
  return bcrypt.compareSync(String(field), hashedPassword);
};

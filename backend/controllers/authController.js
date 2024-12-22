const bcrypt = require('bcrypt');

const ADMIN_EMAIL = 'admin@gmail.com';
const ADMIN_PASSWORD_HASH = bcrypt.hashSync('admin', 10);

exports.login = (req, res) => {
  const { email, password } = req.body;

  if (email === ADMIN_EMAIL && bcrypt.compareSync(password, ADMIN_PASSWORD_HASH)) {
    return res.status(200).json({ message: 'Login successful' });
  }
  return res.status(401).json({ message: 'Invalid credentials' });
};

// @desc            Register a new user
// @route           POST /api/auth/signup
// @access          Public
export const userSignUp = async (req, res) => {
  res.json({
    data: "You hit the userSignUp endpoint",
  });
};

// @desc            Authenticate user && get token
// @route           POST /api/auth/login
// @access          Public
export const userLogin = async (req, res) => {
  res.json({
    data: "You hit the userLogin endpoint",
  });
};

// @desc            Logout user && clear cookie
// @route           POST /api/auth/logout
// @access          Private
export const userLogout = async (req, res) => {
  res.json({
    data: "You hit the userLogout endpoint",
  });
};

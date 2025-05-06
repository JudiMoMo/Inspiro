// middleware/setUploadUsername.js
export function setUploadUsername(req, res, next) {
    // Check session or body
    if (req.session?.user?.username) {
      req.uploadUsername = req.session.user.username;
    } else if (req.body?.username) {
      req.uploadUsername = req.body.username;
    } else {
      req.uploadUsername = 'unknown';
    }
    next();
  }
  
const config = require('../../common/config/env.config');
const ADMIN_PERMISSION = config.permissionLevels.ADMIN;

exports.minimumPermissionLevelRequired = (required_permission_level) => {
    return (req, res, next) => {
        let user_permission_level = parseInt(req.jwt.permissionLevel);
        let userId = req.jwt.userId;
        if (user_permission_level >= required_permission_level) {
            return next();
        } else {
            return res.status(403).send();
        }
    };
};

exports.onlySameUserOrAdminCanDoThisAction = (req, res, next) => {
    let user_permission_level = parseInt(req.jwt.permissionLevel);
    let userId = req.jwt.userId;
    //TODO
    //UNSURE ABOUT THIS, userId of requester should be contained in JWT, so comparison to request param "userId" seems redundant?
    //Might require a new export to be used in different scenario?
    if (req.jwt.userId) {
        return next();
    } else {
        if (user_permission_level & ADMIN_PERMISSION) {
            return next();
        } else {
            return res.status(403).send();
        }
    }
};


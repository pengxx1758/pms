/* md5加密 */
const crypto = require('crypto');

var lockAPI = {
    /* 普通MD5加密 */
    md5: function(content){
        if(typeof content !== "string"){
            return
        }
        const md5 = crypto.createHash('md5');
        return md5.update(content).digest('hex');
    },

    /* 加盐加密 */
    saltPassFunc:function(originalStr,salt){
        const lockContent = originalStr+ ':' +salt;
        return this.md5(lockContent); 
    },

    /* 6位随机数盐 */
    getRandomSalt:function(){
        const randomSalt = Math.random().toString().slice(2,8);
        return randomSalt;
    }
}

module.exports = lockAPI;

const crypto = require('crypto');
const config = require('config');
const Enc_Key = config.get('ENCRYPTION_KEY');
const IV_len = 16;

module.exports.encrypt = (text) =>{
    let iv = crypto.randomBytes(IV_len);
    let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(Enc_Key), iv);
    let encryption = cipher.update(text);
    encryption = Buffer.concat([encryption,cipher.final()]);
    return iv.toString("hex")+":"+encryption.toString("hex");
};
module.exports.decrypt=(text)=>{
    let splitText = text.split(":");
    let iv = Buffer.from(splitText.shift(),"hex");
    let encryption = Buffer.from(splitText.join(":"),"hex");
    let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(Enc_Key), iv);
    let decrypted = decipher.update(encryption);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
	return decrypted.toString();
};

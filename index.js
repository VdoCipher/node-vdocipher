import request from 'request';
import crypto from 'crypto';

/**
 * VdoCipher API
 */
class VdoCipher {
	/**
	 * configures the API instance
	 * @param {string} key Your API Secret key from dashboard
	 */
	constructor(key) {
		this.secret_key = key;
	}
	/**
	 * obtain the OTP
	 * @param {string} videoId alphanumeric id of your vdocipher video
	 * @param {function} callback A function which will be called with
	 * response
	 */
	getOtp(videoId, callback) {
		let apiUrl = 'https://api.vdocipher.com/v2/';

		request.post({
			url: apiUrl + 'otp',
			qs: {
				video: videoId,
			},
			form: {
				clientSecretKey: this.secret_key,
			},
		}, function(error, response, body) {
			if (error) {
				callback(response.statusCode);
				return false;
			}
			if (response.statusCode !== 200) {
				callback(response.statusCode);
				return false;
			}
			callback(null, JSON.parse(body));
		});
	}

	/**
	 * get signature for auth video playback
	 * @param {string} playbackInfo base64 encoding of a json string with info
	 * about the time expiry and media info and other DRM data
	 * @return {string} signature created using the secret key
	 */
	getSignaure(playbackInfo) {
		return crypto.createHmac('sha256', this.secret_key)
				.update(playbackInfo)
				.digest('hex');
	}
}

module.exports = VdoCipher;

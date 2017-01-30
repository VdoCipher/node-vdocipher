import request from 'request';
import crypto from 'crypto';

/**
 * VdoCipher API
 * Nodejs module for vdocipher API to obtain token for authenticated playback
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
	 * @param {Object} options extra options such as forcedBitrate and watermark
	 * @param {function} callback A function which will be called with
	 * response
	 */
	getOtp(videoId, options, callback) {
		let apiUrl = 'https://api.vdocipher.com/v2/';
		options = options || {};
		options.clientSecretKey = this.secret_key,

		request.post({
			url: apiUrl + 'otp',
			qs: {
				video: videoId,
			},
			form: options,
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

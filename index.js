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
	 * @param {VdoCipher~getOtpCallback} callback which will be called with otp
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
				callback(error);
				return false;
			}
			if (response.statusCode !== 200) {
				callback(new Error(body));
				return false;
			}
			callback(null, JSON.parse(body));
		});
	}

	/**
	 * This callback is used to retrieve the otp
	 * @callback VdoCipher~getOtpCallback
	 * @param {Error} error Should be null for success, check `error.message` for
	 * detail
	 * @param {Object} response The otp json container
	 * @param {string} response.otp the 64 character otp
	 */

	/**
	 * get signature for auth video playback
	 * @param {Object} playbackInfo base64 encoding of a json string with info
	 * about the time expiry and media info and other DRM data
	 * @param {string} playbackInfo.video 32-char video id
	 * @param {integer} playbackInfo.expiry the unix timestamp time in seconds
	 * @param {string} playbackInfo.ipgeorules ip/geo ruleset as a json string
	 * as defined in
	 * https://www.vdocipher.com/blog/2017/01/set-ip-geo-restriction-videos-via-api-vdocipher-drm/
	 * @param {string} playbackInfo.user user information as a structured json
	 * @param {string} playbackInfo.extra extra information as a json string
	 * @param {string} playbackInfo.watermark watermark preset indentifier
	 * @return {string} signature created using the secret key
	 */
	getSignaure(playbackInfo) {
		return crypto.createHmac('sha256', this.secret_key)
				.update(playbackInfo)
				.digest('hex');
	}
}

module.exports = VdoCipher;

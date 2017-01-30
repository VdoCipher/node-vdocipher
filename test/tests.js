require('./env/test.js');

const chai = require('chai');
const expect = chai.expect;
const VdoCipher = require('../lib/vdocipher.js');

const SECRET_KEY = process.env.API_SECRET;

describe('video', () => {
	it('obtain otp', (done) => {
		const v = new VdoCipher(SECRET_KEY);
		const options = {
			annotate: JSON.stringify([
				{
					text: 'Hello world',
					type: 'rtext',
					alpha: 0.8,
					color: 0xFF0000,
					interval: 1000,
				},
			]),
		};
		v.getOtp(
			process.env.VIDEOID,
			options,
			function(error, data) {
				console.log(error, data);
				expect(error).to.be.null;
				expect(data).to.not.be.null;
				expect(data).to.not.be.a('string');
				expect(data).to.be.a('object');
				expect(data.otp).to.have.lengthOf(64);
				done();
			}
		);
	});
	it('create signed auth key', (done) => {
		const v = new VdoCipher(SECRET_KEY);
		const mediaInfo = new Buffer(JSON.stringify({
			videoId: process.env.VIDEOID,
		})).toString('base64');
		sign = v.getSignaure(mediaInfo);
		expect(sign).to.not.be.null;
		expect(sign).to.be.a('string');
		expect(sign).to.have.lengthOf(64);
		console.log({
			playbackInfo: mediaInfo,
			signature: sign,
		});
		done();
	});
});

<a name="VdoCipher"></a>

## VdoCipher
VdoCipher API
Nodejs module for vdocipher API to obtain token for authenticated playback

**Kind**: global class  

* [VdoCipher](#VdoCipher)
    * [new VdoCipher(key)](#new_VdoCipher_new)
    * [.getOtp(videoId, options, callback)](#VdoCipher+getOtp)
    * [.getSignaure(playbackInfo)](#VdoCipher+getSignaure) ⇒ <code>string</code>

<a name="new_VdoCipher_new"></a>

### new VdoCipher(key)
configures the API instance


| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Your API Secret key from dashboard |

<a name="VdoCipher+getOtp"></a>

### vdoCipher.getOtp(videoId, options, callback)
obtain the OTP

**Kind**: instance method of <code>[VdoCipher](#VdoCipher)</code>  

| Param | Type | Description |
| --- | --- | --- |
| videoId | <code>string</code> | alphanumeric id of your vdocipher video |
| options | <code>Object</code> | extra options such as forcedBitrate and watermark |
| callback | <code>function</code> | A function which will be called with response |

<a name="VdoCipher+getSignaure"></a>

### vdoCipher.getSignaure(playbackInfo) ⇒ <code>string</code>
get signature for auth video playback

**Kind**: instance method of <code>[VdoCipher](#VdoCipher)</code>  
**Returns**: <code>string</code> - signature created using the secret key  

| Param | Type | Description |
| --- | --- | --- |
| playbackInfo | <code>string</code> | base64 encoding of a json string with info about the time expiry and media info and other DRM data |


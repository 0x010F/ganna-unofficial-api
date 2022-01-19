## Gaana Reverse Engineering
---

### Fetching auth token

__Endpoint__ : https://gaana.com/api/verifyToken

__Headers__ : No Restrictions

__Payload__ : 

```typescript
  /*
    token: can be empty string as checked in incognito mode their server will send back a token with device id
  */
  token: string?;
```

__Response__:

```typescript
  deviceid: string;
  token: string;
```


### Track Details

__Endpoint__: https://gaana.com/apiv2?seokey=\<seokey>\&type=songDetail

__Headers__: No Restrictions

__Payload__: 

```typescript
  /*
    seokey: can be parsed from the url of a track
    Eg: https://gaana.com/song/[dont-wake-me-up-314] -> seokey

    NOTE: URL will work for song links copied of mobile devices
 
    type: will be always songDetail
  */
  seokey: string;  
  type: string;
```

__response__: refer __"*samples/track-deatil-sample.json*"__




### Music Streaming

__Stream Endpoint__ : https://apiv2.gaana.com/track/stream

__Headers__ : No Restrictions

__Payload__ : 

```typescript
  ht: string;
  ps: string;
  quality: string;
  track_id: string;
  request_type: string;
```

__Response__:

```typescript
  stream_path: string;
  status: number;
  stream_server: string;
  track_format: string;
  content_source: number;
  bit_rate: string;
  protocol: string;
  request_type: string;
  is_preroll: boolean;
  message?: any;
  user_token_status: string;
  premium_content: string;
  parental_warning: string;
  preview_url?: any;
  is_premium: number;
```

__Method to construct stream payload__ :

```javascript
  function(e, t) {
    try {
        var n = t.deviceId 
          , r = t.track_id + "|" + n + "|03:40:31 sec" 
          , a = c.a.enc.Utf8.parse(r);
        r = (r = c.a.MD5(a).toString()) + n.slice(3, 9) + "=";
        var o = "https:" == window.location.protocol
          , i = {
            ps: t.deviceId,
            ht: r,
            request_type: "web",
            track_id: t.track_id,
            quality: t.quality ? t.quality : "high",
            st: "hls",
            ssl: o
        };
        return v("POST", e, i, t.deviceType)
    } catch (e) {
        console.log(e, "exception from api.js")
    }
  },
```

- Params 
  - __deviceId__ : Found in response of __*verifyToken*__ API 
  - __trackId__ : present in response of __*TrackDetails*__ API

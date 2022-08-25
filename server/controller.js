const { google } = require('googleapis')
const HttpsProxyAgent = require('https-proxy-agent')
const config = require('./config')
const MAX_COMMENTS = config.maxComments;
const DEFAULT_MAX_COMMENTS = config.defaultMaxComments;
const GOOGLE_KEY = config.googleKey;

// // local vpn proxy
// if (config.isDev) {
//   google.options({
//     agent: new HttpsProxyAgent('http://127.0.0.1:1080')
//   })
// }

// googleapis init
const service = google.youtube({
  version: 'v3',
});


// get youtube video info
const getYtVideoInfo = async (req, res, next) => {
  const { videoId = '' } = req.query;
  let data = null;

  if (!videoId) {
    res.send({ code: 0, data: null, msg: 'YouTube videoId required' })
    return;
  }

  let response = await service.videos.list({
    "part": [
      "snippet",
      "statistics",
    ],
    "id": videoId,
    "key": GOOGLE_KEY,
  });


  try {
    const { snippet, statistics } = response.data.items[0] || {};
    const { title, description, publishedAt, channelTitle, thumbnails } = snippet || {};
    const { commentCount, viewCount, likeCount } = statistics || {};
    const videoThumbnail = thumbnails && thumbnails.high && thumbnails.high.url;

    data = {
      title,
      description,
      publishedAt,
      commentCount,
      viewCount,
      likeCount,
      channelTitle,
      videoThumbnail,
    }
  } catch (error) { }

  if (data && data.title) {
    res.send({ code: 1, data, msg: null })
  } else {
    res.send({ code: 0, data: null, msg: 'Get YouTube info failed!' })
  }
}

// get youtube comments
const getYtComments = async (req, res, next) => {
  let { videoId, order = 'time', maxResults } = req.query;
  maxResults = Number(maxResults) || DEFAULT_MAX_COMMENTS;

  if (!videoId) {
    res.send({ code: 0, data: null, msg: 'Video id is required!' });
    return;
  }

  maxResults = maxResults > MAX_COMMENTS ? MAX_COMMENTS : maxResults;

  let data = await _getYtComments({ videoId, order, maxResults });
  if (data) {
    res.send({ code: 1, data, msg: null })
  } else {
    res.send({ code: 0, data: null, msg: 'Get YouTube comments failed!' })
  }
}


const _getYtComments = async ({ videoId = '', order = 'time', maxResults = DEFAULT_MAX_COMMENTS, nextPageToken = '', result = [] }) => {
  let res = await service.commentThreads.list({
    "part": [
      "snippet",
      "replies",
    ],
    "maxResults": maxResults,
    "videoId": videoId,
    "key": GOOGLE_KEY,
    "pageToken": nextPageToken,
    "order": order,
  });

  result = [...result, ...res.data.items];

  if (res.data && res.data.nextPageToken && result.length > 0 && result.length < maxResults) {
    return await _getYtComments({ videoId, order, maxResults, nextPageToken: res.data.nextPageToken, result })
  } else {
    return _simplifyComments(result);
  }
}

const _simplifyComments = (data = []) => {
  return data.map((item) => {
    let {
      id,
      replies,
      snippet: { totalReplyCount, topLevelComment },
    } = item || {};
    let { snippet: { authorChannelUrl, authorDisplayName, likeCount, publishedAt, textDisplay } } = topLevelComment || {}
    replies = replies && replies.comments ? _simplifyReplyComments(replies.comments) : null;
    const replyCount = replies ? replies.length : 0;

    return {
      id,
      replies,
      replyCount,
      totalReplyCount,
      authorChannelUrl,
      authorDisplayName,
      likeCount,
      publishedAt,
      textDisplay,
    }
  })
}

const _simplifyReplyComments = (data = []) => {
  return data.map((item) => {
    let {
      parentId,
      authorChannelUrl,
      authorDisplayName,
      likeCount,
      publishedAt,
      textDisplay,
    } = item.snippet || {};

    return {
      parentId,
      authorChannelUrl,
      authorDisplayName,
      likeCount,
      publishedAt,
      textDisplay,
    }
  })
}

module.exports = {
  getYtVideoInfo,
  getYtComments,
}
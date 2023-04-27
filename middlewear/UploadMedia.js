/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
/* eslint-disable consistent-return */
const aws = require('aws-sdk');

const cloudfrontUrl = process.env.CLOUDFRONT_URL;
const awsBucket = process.env.AWS_BUCKET;

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'us-east-1',
  Bucket: awsBucket,
});
const fs = require('fs');
const path = require('path');

const rekognition = new aws.Rekognition({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'us-east-1',
});
const download = require('image-downloader');
const User = require('../schemas/UserSchema');

const checkContent = async (e, userid) => {
  const { Body, ContentType, Key } = e;

  let fileType = '';
  if (ContentType.includes('video')) {
    fileType = 'video';
  } else if (ContentType.includes('image')) {
    fileType = 'image';
  } else if (ContentType.includes('audio')) {
    fileType = 'audio';
  }

  let rekOptions;
  let valid = false;

  if (fileType === 'video') {
    rekOptions = {
      Video: {
        S3Object: {
          Bucket: awsBucket,
          Name: Key,
        },
      },
      NotificationChannel: {
        RoleArn: process.env.REKOGNITION_ROLE_ARN,
        SNSTopicArn: process.env.REKOGNITION_TOPIC_ARN,
      },
    };
  } else if (fileType === 'audio') {
    rekOptions = {
      Audio: {
        S3Object: {
          Bucket: awsBucket,
          Name: Key,
        },
      },
    };
  } else if (fileType === 'image') {
    rekOptions = {
      Image: {
        S3Object: {
          Bucket: awsBucket,
          Name: Key,
        },
      },
    };
  }

  // Image
  if (fileType === 'image') {
    const detect = rekognition.detectModerationLabels(rekOptions).promise();
    const moderationLabels = [
      'Hate Symbols',
      'Gambling',
      'Alcohol',
      'Drugs',
      'Tabacco',
      'Rude Gestures',
      'Visually Disturbing',
      'Violence',
      'Suggestive',
      'Explicit Nudity',
    ];
    await detect
      .then((res) => {
        const moderationLabelsReceived = res.ModerationLabels;

        if (moderationLabelsReceived.length === 0) {
          valid = true;
        } else {
          for (let i = 0; i < moderationLabelsReceived.length; i++) {
            const label = moderationLabelsReceived[i];
            if (moderationLabels.includes(label)) {
              valid = false;
            } else {
              valid = true;
            }
          }
        }
      })
      .catch((err) => console.log(err));
  }

  // Video
  if (fileType === 'video') {
    valid = true;
    const detect = rekognition.startContentModeration(rekOptions).promise();

    await detect
      .then(async (res) => {
        const { JobId } = res;

        User.findByIdAndUpdate(userid, {
          'media.introductionVideoJobId': JobId,
        }).catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }

  return { valid };
};

const uploadMedia = async (file, userid) => {
  let valid = false;
  let location = null;

  const fileRanNum = Math.floor(Math.random() * 1000000);

  const key = `users/${userid}/media/${fileRanNum.toString()}${
    file.originalname
  }`;

  // const key = `users/${userid}/${Math.floor(
  //   Math.random() * 1000000
  // ).toString()}${file.originalname}`;
  const { mimetype } = file;

  const params = {
    Body: file.buffer,
    ContentType: file.mimetype,
    Key: key,
    Bucket: awsBucket,
    ACL: 'public-read',
  };

  try {
    const upload = await s3.upload(params).promise();
    const fullUrl = cloudfrontUrl + key;
    location = fullUrl;
  } catch (err) {
    console.log(err);
  }

  // AWS Recognition
  const contentCheck = await checkContent(params, userid);
  if (contentCheck.valid === true) {
    valid = true;
  }

  return { valid, location };
};

module.exports = {
  uploadMedia,
};

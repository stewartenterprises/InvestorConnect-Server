const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    account: {
      email: {
        type: String,
        default: '',
      },
      password: {
        type: String,
        default: '',
      },
      firstName: {
        type: String,
        default: '',
      },
      lastName: {
        type: String,
        default: '',
      },
      phoneNumber: {
        type: String,
        default: '',
      },
      isAdmin: {
        type: Boolean,
        default: false,
      },
      assistant: {
        type: Boolean,
        default: false,
      },
      support: {
        type: Boolean,
        default: false,
      },
      isBanned: {
        type: Boolean,
        default: false,
      },
      flagged: {
        type: Boolean,
        default: false,
      },
      isDemo: {
        type: Boolean,
        default: false,
      },
      premium: {
        type: Boolean,
        default: false,
      },
      vip: {
        type: Boolean,
        default: false,
      },
      partner: {
        type: Boolean,
        default: false,
      },
      boosted: {
        type: Boolean,
        default: false,
      },
      onboarded: {
        type: Boolean,
        default: false,
      },
      verified: {
        type: Boolean,
        default: false,
      },
      uuid: {
        type: String,
        default: '',
      },
      freeTrial: {
        type: Boolean,
        default: false,
      },
      hubspotId: {
        type: String,
        default: '',
      },
    },
    answers: {
      answerA: {
        answered: {
          type: Boolean,
          default: false,
        },
        question: {
          type: String,
          default: '',
        },
        questionId: {
          type: Number,
        },
        answer: {
          type: String,
          default: '',
        },
        audio: {
          type: String,
          default: '',
        },
        video: {
          type: String,
          default: '',
        },
      },
      answerB: {
        answered: {
          type: Boolean,
          default: false,
        },
        question: {
          type: String,
          default: '',
        },
        questionId: {
          type: Number,
        },
        answer: {
          type: String,
          default: '',
        },
        audio: {
          type: String,
          default: '',
        },
        video: {
          type: String,
          default: '',
        },
      },
      answerC: {
        answered: {
          type: Boolean,
          default: false,
        },
        question: {
          type: String,
          default: '',
        },
        questionId: {
          type: Number,
        },
        answer: {
          type: String,
          default: '',
        },
        audio: {
          type: String,
          default: '',
        },
        video: {
          type: String,
          default: '',
        },
      },
      answerD: {
        answered: {
          type: Boolean,
          default: false,
        },
        question: {
          type: String,
          default: '',
        },
        questionId: {
          type: Number,
        },
        answer: {
          type: String,
          default: '',
        },
        audio: {
          type: String,
          default: '',
        },
        video: {
          type: String,
          default: '',
        },
      },
      answerE: {
        answered: {
          type: Boolean,
          default: false,
        },
        question: {
          type: String,
          default: '',
        },
        questionId: {
          type: Number,
        },
        answer: {
          type: String,
          default: '',
        },
        audio: {
          type: String,
          default: '',
        },
        video: {
          type: String,
          default: '',
        },
      },
      answerF: {
        answered: {
          type: Boolean,
          default: false,
        },
        question: {
          type: String,
          default: '',
        },
        questionId: {
          type: Number,
        },
        answer: {
          type: String,
          default: '',
        },
        audio: {
          type: String,
          default: '',
        },
        video: {
          type: String,
          default: '',
        },
      },
    },
    captions: {
      captionOne: {
        type: String,
        default: '',
      },
      captionTwo: {
        type: String,
        default: '',
      },
      captionThree: {
        type: String,
        default: '',
      },
      captionFour: {
        type: String,
        default: '',
      },
      captionFive: {
        type: String,
        default: '',
      },
      captionSix: {
        type: String,
        default: '',
      },
      videoCaptionOne: {
        type: String,
        default: '',
      },
      videoCaptionTwo: {
        type: String,
        default: '',
      },
      videoCaptionThree: {
        type: String,
        default: '',
      },
      videoCaptionFour: {
        type: String,
        default: '',
      },
      videoCaptionFive: {
        type: String,
        default: '',
      },
      videoCaptionSix: {
        type: String,
        default: '',
      },
    },
    descriptions: {
      headline: {
        type: String,
        default: '',
      },
      aboutMe: {
        type: String,
        default: '',
      },
      lookingFor: {
        type: String,
        default: '',
      },
    },
    audioCaptions: {
      captionOne: {
        type: String,
        default: '',
      },
      captionTwo: {
        type: String,
        default: '',
      },
      captionThree: {
        type: String,
        default: '',
      },
      captionFour: {
        type: String,
        default: '',
      },
      captionFive: {
        type: String,
        default: '',
      },
      captionSix: {
        type: String,
        default: '',
      },
    },
    socials: {
      apple: {
        connected: {
          type: Boolean,
          default: false,
        },
        token: {
          type: String,
          default: '',
        },
        userId: {
          type: String,
          default: '',
        },
        deviceId: {
          type: String,
          default: '',
        },
      },
      google: {
        connected: {
          type: Boolean,
          default: false,
        },
        token: {
          type: String,
          default: '',
        },
        userId: {
          type: String,
          default: '',
        },
        deviceId: {
          type: String,
          default: '',
        },
      },
      facebook: {
        connected: {
          type: Boolean,
          default: false,
        },
        token: {
          type: String,
          default: '',
        },
        userId: {
          type: String,
          default: '',
        },
        deviceId: {
          type: String,
          default: '',
        },
      },
      instagram: {
        connected: {
          type: Boolean,
          default: false,
        },
        token: {
          type: String,
          default: '',
        },
        tokenType: {
          type: String,
          default: '',
        },
        userId: {
          type: String,
          default: '',
        },
        deviceId: {
          type: String,
          default: '',
        },
        username: {
          type: String,
          default: '',
        },
        expiresDate: {
          type: Date,
          default: null,
        },
        refreshDate: {
          type: Date,
          default: null,
        },
      },
      snapchat: {
        connected: {
          type: Boolean,
          default: false,
        },
        token: {
          type: String,
          default: '',
        },
        tokenType: {
          type: String,
          default: '',
        },
        userId: {
          type: String,
          default: '',
        },
        deviceId: {
          type: String,
          default: '',
        },
        username: {
          type: String,
          default: '',
        },
        expiresDate: {
          type: Date,
          default: null,
        },
        refreshDate: {
          type: Date,
          default: null,
        },
      },
    },
    tutorials: {
      tutorialA: {
        type: Boolean,
        default: false,
      },
      tutorialB: {
        type: Boolean,
        default: false,
      },
      tutorialC: {
        type: Boolean,
        default: false,
      },
      tutorialD: {
        type: Boolean,
        default: false,
      },
      swipeTutorial: {
        type: Boolean,
        default: false,
      },
    },
    settings: {
      profilePaused: {
        type: Boolean,
        default: false,
      },
      accountDeleted: {
        type: Boolean,
        default: false,
      },
      pushNotifications: {
        type: Array,
        default: [
          'New Profile Views',
          'New Likes',
          'New Matches',
          'New Messages',
          'Promotions',
          'Announcements',
        ],
      },
      emailNotifications: {
        type: Array,
        default: [
          'New Profile Views',
          'New Likes',
          'New Matches',
          'New Messages',
          'Promotions',
          'Announcements',
        ],
      },
      smsNotifications: {
        type: Array,
        default: [
          'New Likes',
          'New Matches',
          'New Messages',
          'Promotions',
          'Announcements',
        ],
      },
      adminMode: {
        type: Boolean,
        default: false,
      },
    },
    filters: {
      location: {
        type: {
          type: String,
          enum: ['Point'],
          default: 'Point',
        },
        coordinates: {
          type: [Number],
          default: [-79, 43],
        },
      },
      locationString: {
        type: String,
        default: '',
      },
      sortBy: {
        type: String,
        default: 'Recommended',
      },
      perPageCount: {
        type: Number,
        default: 30,
      },
      gridType: {
        type: String,
        default: 'Grid',
      },
      onlineNow: {
        type: Boolean,
        default: false,
      },
      recentlyActive: {
        type: Boolean,
        default: false,
      },
      verified: {
        type: Boolean,
        default: false,
      },
      newUser: {
        type: Boolean,
        default: false,
      },
      topRated: {
        type: Boolean,
        default: false,
      },
      matched: {
        type: Boolean,
        default: false,
      },
      distance: {
        type: Number,
        default: 100,
      },
      distanceExpanded: {
        type: Boolean,
        default: true,
      },
      introductionVideo: {
        type: Boolean,
        default: false,
      },
      gender: {
        type: String,
        default: '',
      },
      ageRange: {
        type: [Number],
        default: [],
      },
      height: {
        type: [Number],
        default: [],
      },
      ethnicity: {
        type: Array,
        default: [],
      },
      familyPlans: {
        type: Array,
        default: [],
      },
      politics: {
        type: Array,
        default: [],
      },
      educationLevel: {
        type: Array,
        default: [],
      },
      children: {
        type: Array,
        default: [],
      },
      religion: {
        type: Array,
        default: [],
      },
      drinking: {
        type: Array,
        default: [],
      },
      smoking: {
        type: Array,
        default: [],
      },
      cannabis: {
        type: Array,
        default: [],
      },
      drugs: {
        type: Array,
        default: [],
      },
      traits: {
        type: Array,
        default: [],
      },
      interests: {
        type: Array,
        default: [],
      },
      // Deal Breakers
      dealBreakers: {
        distance: {
          type: Boolean,
          default: false,
        },
        age: {
          type: Boolean,
          default: false,
        },
        height: {
          type: Boolean,
          default: false,
        },
        ethnicity: {
          type: Boolean,
          default: false,
        },
        familyPlans: {
          type: Boolean,
          default: false,
        },
        children: {
          type: Boolean,
          default: false,
        },
        politics: {
          type: Boolean,
          default: false,
        },
        educationLevel: {
          type: Boolean,
          default: false,
        },
        religion: {
          type: Boolean,
          default: false,
        },
        drinking: {
          type: Boolean,
          default: false,
        },
        smoking: {
          type: Boolean,
          default: false,
        },
        cannabis: {
          type: Boolean,
          default: false,
        },
        drugs: {
          type: Boolean,
          default: false,
        },
      },
      // Community Filters
      communityFilters: {
        excludeViewed: {
          type: Boolean,
          default: false,
        },
        excludeMatches: {
          type: Boolean,
          default: false,
        },
        excludeLikes: {
          type: Boolean,
          default: false,
        },
      },
    },
    locations: {
      currentLocation: {
        type: {
          type: String,
          enum: ['Point'],
          default: 'Point',
        },
        coordinates: {
          type: [Number],
          default: [-79, 43],
        },
      },
      currentLocationObject: {},
      currentLocationDisplayName: {
        type: String,
        default: '',
      },
      locationData: {
        country: {
          type: String,
          default: '',
        },
        countryCode: {
          type: String,
          default: '',
        },
        city: {
          type: String,
          default: '',
        },
        state: {
          type: String,
          default: '',
        },
        neighborhood: {
          type: String,
          default: '',
        },
      },
    },
    personal: {
      birthday: {
        type: Date,
        default: null,
      },
      zodiak: {
        type: String,
        default: '',
      },
      ageChanged: {
        type: Boolean,
        default: false,
      },
      gender: {
        type: String,
        default: '',
      },
      socials: {
        instagram: {
          type: String,
          default: '',
        },
        tiktok: {
          type: String,
          default: '',
        },
        facebook: {
          type: String,
          default: '',
        },
        youtube: {
          type: String,
          default: '',
        },
        twitter: {
          type: String,
          default: '',
        },
        snapchat: {
          type: String,
          default: '',
        },
      },
      aboutMe: {
        type: String,
        default: '',
      },
      lookingFor: {
        type: String,
        default: '',
      },
      languages: [{ Type: String, default: [] }],
    },
    family: {
      children: {
        type: String,
        default: '',
      },
      familyPlans: {
        type: String,
        default: '',
      },
      siblings: {
        type: String,
        default: '',
      },
      motherAlive: {
        type: Boolean,
      },
      fatherAlive: {
        type: Boolean,
      },
    },
    lifestyle: {
      politics: {
        type: String,
        default: '',
      },
      religion: {
        type: String,
        default: '',
      },
      drinking: {
        type: String,
        default: '',
      },
      smoking: {
        type: String,
        default: '',
      },
      cannabis: {
        type: String,
        default: '',
      },
      drugs: {
        type: String,
        default: '',
      },
      sexual: {
        type: String,
        default: '',
      },
      diet: {
        type: String,
        default: '',
      },
      exercise: {
        type: String,
        default: '',
      },
      pets: {
        type: String,
        default: '',
      },
    },
    physicals: {
      height: {
        type: String,
        default: '',
      },
      hairColor: {
        type: String,
        default: '',
      },
      eyeColor: {
        type: String,
        default: '',
      },
      ethnicity: {
        type: String,
        default: '',
      },
      bodyType: {
        type: String,
        default: '',
      },
      bodyWeight: {
        lbs: {
          Type: Number,
          default: 0,
        },
        stone: {
          Type: Number,
          default: 0,
        },
      },
      bodyFatPercentage: {},
      breastSize: {},
      bicepsize: {},
      eyeSight: {},
      tatoos: {},
    },
    personality: {
      traits: {
        type: Array,
        default: [],
      },
      sliders: {},
      mbti: {
        type: String,
        default: '',
      },
    },
    career: {
      employed: {
        type: Boolean,
      },
      field: {
        type: String,
        default: '',
      },
      jobTitle: {
        type: String,
        default: '',
      },
      company: {
        type: String,
        default: '',
      },
      annualSalary: {},
      jobHistory: {},
      businessOwner: {},
    },
    skills: {},
    financial: {
      netWorth: {},
      investments: {},
      homeOwnership: {},
      debts: {},
      liabilities: {},
    },
    intelligence: {},
    interests: {
      type: Array,
      default: [],
    },
    education: {
      institution: {
        type: String,
        default: '',
      },
      educationLevel: {
        type: String,
        default: '',
      },
      student: {
        type: Boolean,
      },
    },
    introductions: {
      video: {
        type: Boolean,
        default: false,
      },
      videoStatus: {
        type: String,
        default: '',
      },
      audio: {
        type: Boolean,
        default: false,
      },
      audioStatus: {
        type: String,
        default: '',
      },
      videoUrl: {
        type: String,
        default: '',
      },
      audioUrl: {
        type: String,
        default: '',
      },
      text: {
        type: String,
        default: '',
      },
    },
    media: {
      lastUpdated: {
        type: Date,
        default: null,
      },
      profileMedia: {
        public: [{ type: String, default: null }],
        publicLength: {
          type: Number,
          default: 0,
        },
        private: [{ type: String, default: null }],
      },
      mainImage: {
        type: String,
        default: '',
      },
      instagramMedia: {
        type: Array,
        default: [],
      },
      facebookMedia: {
        type: Array,
        default: [],
      },
      profileVideos: {
        public: [{ type: String, default: null }],
        private: [{ type: String, default: null }],
      },
      introductionVideo: {
        type: String,
        default: '',
      },
      hasIntroductionVideo: {
        type: Boolean,
        default: false,
      },
      introductionVideoJobId: {
        type: String,
        default: '',
      },
      gridCover: {
        type: String,
        default: null,
      },
      converted: {
        type: Boolean,
        default: false,
      },
    },
    verification: {
      status: {
        type: String,
        default: '',
      },
      creditCard: {
        type: Boolean,
        default: false,
      },
      id: {
        type: Boolean,
        default: false,
      },
      video: {
        type: Boolean,
        default: false,
      },
      phoneNumber: {
        type: Boolean,
        default: false,
      },
      email: {
        type: Boolean,
        default: false,
      },
    },
    causes: {
      complimentary: {
        type: String,
        default: '',
      },
      mentalHealth: {
        status: {
          type: Boolean,
          default: false,
        },
        tier: {
          type: String,
          default: '',
        },
      },
      climateChange: {
        status: {
          type: Boolean,
          default: false,
        },
        tier: {
          type: String,
          default: '',
        },
      },
      worldPoverty: {
        status: {
          type: Boolean,
          default: false,
        },
        tier: {
          type: String,
          default: '',
        },
      },
      genderEquality: {
        status: {
          type: Boolean,
          default: false,
        },
        tier: {
          type: String,
          default: '',
        },
      },
    },
    activity: {
      lastActive: {
        type: Date,
        default: null,
      },
      lastMediaUpdate: {
        type: Date,
        default: null,
      },
      boostStartDate: {
        type: Date,
        default: null,
      },
      lastMostCompatibleRefresh: {
        type: Date,
        default: null,
      },
    },
    storage: {
      freeMessagesSent: {
        type: Number,
        default: 0,
      },
      claimedFreeCredits: {
        type: Boolean,
        default: false,
      },
      paymentIntentId: {
        type: String,
        default: '',
      },
      login: {
        verificationCode: {
          type: Number,
          default: null,
        },
        expirationDate: {
          type: Date,
          default: null,
        },
      },
      notificationTokens: {
        type: Array,
        default: [],
      },
      mostCompatibleIds: {
        type: Array,
        default: [],
      },
      demoUserIds: {
        type: Array,
        default: [],
      },
      freeCallUsed: {
        type: Boolean,
        default: false,
      },
      claimedFreeTrial: {
        type: Boolean,
        default: false,
      },
      convertedFromCloudinary: {
        type: Boolean,
        default: false,
      },
      liked: {
        type: Array,
        default: [],
      },
      likedBy: {
        type: Array,
        default: [],
      },
      viewed: {
        type: Array,
        default: [],
      },
      viewedBy: {
        type: Array,
        default: [],
      },
      disliked: {
        type: Array,
        default: [],
      },
      dislikedBy: {
        type: Array,
        default: [],
      },
      matched: {
        type: Array,
        default: [],
      },
      blocked: {
        type: Array,
        default: [],
      },
      bookmarked: {
        type: Array,
        default: [],
      },
      unlockedConversations: {
        type: Array,
        default: [],
      },
      unlockedCalling: {
        type: Array,
        default: [],
      },
      unlockedPrivatePhotos: {
        type: Array,
        default: [],
      },
      unlockedPrivateVideos: {
        type: Array,
        default: [],
      },
      resetPasswordToken: {
        type: String,
        default: '',
      },
    },
    analytics: {
      messages: {
        sent: {
          type: Number,
          default: 0,
        },
        received: {
          type: Number,
          default: 0,
        },
      },
      calls: {
        audio: {
          type: Number,
          default: 0,
        },
        video: {
          type: Number,
          default: 0,
        },
      },
      profileMatches: {
        type: Number,
        default: 0,
      },
      profileForceMatches: {
        sent: {
          type: Number,
          default: 0,
        },
        received: {
          type: Number,
          default: 0,
        },
      },
      profileViews: {
        sent: {
          type: Number,
          default: 0,
        },
        received: {
          type: Number,
          default: 0,
        },
      },
      profileLikes: {
        sent: {
          type: Number,
          default: 0,
        },
        received: {
          type: Number,
          default: 0,
        },
      },
      profileDislikes: {
        sent: {
          type: Number,
          default: 0,
        },
        received: {
          type: Number,
          default: 0,
        },
      },
      profileBlocks: {
        sent: {
          type: Number,
          default: 0,
        },
        received: {
          type: Number,
          default: 0,
        },
      },
      profileScore: {
        type: Number,
        default: 0,
      },
      adminScore: {
        type: Number,
        default: 50,
      },
      affiliate: {
        referrals: {
          type: Number,
          default: 0,
        },
        gifts: {
          roses: {
            sent: {
              type: Number,
              default: 0,
            },
            received: {
              type: Number,
              default: 0,
            },
          },
          gemstone: {
            sent: {
              type: Number,
              default: 0,
            },
            received: {
              type: Number,
              default: 0,
            },
          },
          diamondRing: {
            sent: {
              type: Number,
              default: 0,
            },
            received: {
              type: Number,
              default: 0,
            },
          },
          goldBar: {
            sent: {
              type: Number,
              default: 0,
            },
            received: {
              type: Number,
              default: 0,
            },
          },
        },
      },
    },
    discovery: {
      visable: {
        type: Boolean,
        default: false,
      },
      profileBoosted: {
        status: {
          type: Boolean,
          default: false,
        },
        startDate: {
          type: Date,
          default: null,
        },
        endDate: {
          type: Date,
          default: null,
        },
      },
      profileRatios: {
        likesReceivedToViewsReceived: {
          type: Number,
          default: 0,
        },
        viewsReceivedToTimeSinceCreation: {
          type: Number,
          default: 0,
        },
        dislikesReceivedToViewsReceived: {
          type: Number,
          default: 0,
        },
      },
      profileScore: {
        type: Number,
        default: 0,
      },
      profileScorePercentile: {
        type: Number,
        default: 0,
      },
      profileCompletedPercentage: {
        type: Number,
        default: 0,
      },
      adminRank: {
        type: Number,
        default: 0,
      },
    },
    admin: {
      removalCount: {
        type: Number,
        default: 0,
      },
      reviewed: {
        type: Boolean,
        default: false,
      },
      ipAddresses: {
        type: Array,
        default: [],
      },
    },
    device: {
      platform: {
        type: String,
        default: '',
      },
    },
    affiliate: {
      link: {
        type: String,
        default: '',
      },
      profileLink: {
        type: String,
        default: '',
      },
      referred: {
        type: Boolean,
        default: false,
      },
      referredBy: {
        type: String,
        default: '',
      },
      balance: {
        type: Number,
        default: 0,
      },
      earnings: {
        lifetime: {
          type: Number,
          default: 0,
        },
        monthly: {
          type: Number,
          default: 0,
        },
        daily: {
          type: Number,
          default: 0,
        },
        annually: {
          type: Number,
          default: 0,
        },
        lifetimeGiftEarnings: {
          type: Number,
          default: 0,
        },
        lifetimeGiftsReceived: {
          type: Number,
          default: 0,
        },
      },
      tasks: {
        inviteContacts: {
          type: Boolean,
          default: false,
        },
        shareOnSocial: {
          type: Boolean,
          default: false,
        },
        leaveReview: {
          type: Boolean,
          default: false,
        },
        promoVideo: {
          type: Boolean,
          default: false,
        },
        followRose: {
          type: Boolean,
          default: false,
        },
      },
      withdrawl: {
        default: {
          type: String,
          default: '',
        },
        PayPal: {
          type: String,
          default: '',
        },
        Bitcoin: {
          type: String,
          default: '',
        },
        Ethereum: {
          type: String,
          default: '',
        },
        CashApp: {
          type: String,
          default: '',
        },
        Venmo: {
          type: String,
          default: '',
        },
        BankTransfer: {
          name: {
            type: String,
            default: '',
          },
          address: {
            type: String,
            default: '',
          },
          accountNumber: {
            type: String,
            default: '',
          },
          routingNumber: {
            type: String,
            default: '',
          },
        },
      },
    },
    assistant: {
      subscriptionActive: {
        type: Boolean,
        default: false,
      },
      assistantUuid: {
        type: String,
        default: '',
      },
      assistantName: {
        type: String,
        default: '',
      },
    },
    mailchimp: {
      id: {
        type: String,
        default: '',
      },
      email_address: {
        type: String,
        default: '',
      },
      unique_email_id: {
        type: String,
        default: '',
      },
      contact_id: {
        type: String,
        default: '',
      },
      full_name: {
        type: String,
        default: '',
      },
      web_id: {
        type: Number,
      },
      status: {
        type: String,
        default: '',
      },
      tags: {
        type: Array,
        default: [],
      },
      merge_fields: {
        FNAME: {
          type: String,
          default: '',
        },
        LNAME: {
          type: String,
          default: '',
        },
        ADDRESS: {
          type: String,
          default: '',
        },
        PHONE: {
          type: String,
          default: '',
        },
        BIRTHDAY: {
          type: String,
          default: '',
        },
        PREMIUM: {
          type: String,
          default: '',
        },
        GENDER: {
          type: String,
          default: '',
        },
        ZODIAK: {
          type: String,
          default: '',
        },
        VERIFIED: {
          type: String,
          default: '',
        },
        ONBOARDED: {
          type: String,
          default: '',
        },
      },
    },
    inventory: {
      instantMatch: {
        type: Number,
        default: 1,
      },
      boost: {
        type: Number,
        default: 0,
      },
      credits: {
        type: Number,
        default: 0,
      },
    },
    payments: {
      paymentInfrastructure: {
        stripe: {
          type: Boolean,
          default: false,
        },
        apple: {
          type: Boolean,
          default: false,
        },
      },
      checkoutId: {
        type: String,
        default: '',
      },
      completedCheckoutId: {
        type: String,
        default: '',
      },
      customerId: {
        type: String,
        default: '',
      },
      subscriptionId: {
        type: String,
        default: '',
      },
      subscriptionProductId: {
        type: String,
        default: '',
      },
      subscriptionPriceId: {
        type: String,
        default: '',
      },
      subscriptionStatus: {
        type: String,
        default: '',
      },
      cancelPeriodEnd: {
        type: Boolean,
        default: false,
      },
      paymentMethods: {
        type: Array,
        default: [],
      },
    },
    live: {
      online: {
        type: Boolean,
        default: false,
      },
    },
  },
  { timestamps: true }
);

userSchema.index({
  'locations.currentLocation': '2dsphere',
});

userSchema.index({
  'filters.location': '2dsphere',
});

module.exports = mongoose.model('User', userSchema);

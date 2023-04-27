const moment = require('moment/moment');
const { heights } = require('./Constants');

const getQueueFilters = async (user, expanded) => {
  // Pass in the user object to get the filters
  // Pass boolean with true to get expanded filters to do a more broad search
  if (!user) return null;

  //   User Info
  const { liked, likedBy, disliked, dislikedBy, matched, blocked, blockedBy } =
    user.storage;
  let userFilters = user.filters;

  // Queue Filter Requirements

  // Exclude Blocked IDs
  // Exclude Blocked By IDs
  // Excluse Matched IDs
  // Exclude Liked IDs
  // Exclude Disliked IDs

  // Mandatory Filters
  // Gender
  // Looking For

  // Additional Filters

  //  If ExpandedSearch is true, use the mandatory filters only to get more broader search results

  // Step 1: Create an array of all the IDs to exclude
  let excludeIds = [];
  excludeIds.push(user._id);

  // Exclude Blocked Users
  if (blocked && blocked.length > 0) {
    for (let i = 0; i < blocked.length; i++) {
      const id = blocked[i];
      excludeIds.push(id);
    }
  }
  // Exclude Blocked By Users
  if (blockedBy && blockedBy.length > 0) {
    for (let i = 0; i < blockedBy.length; i++) {
      const id = blockedBy[i];
      excludeIds.push(id);
    }
  }
  // Exclude Matches
  if (matched && matched.length > 0) {
    for (let i = 0; i < matched.length; i++) {
      const id = matched[i];
      excludeIds.push(id);
    }
  }
  // Exclude Liked Users
  if (liked && liked.length > 0) {
    for (let i = 0; i < liked.length; i++) {
      const id = liked[i];
      excludeIds.push(id);
    }
  }
  // Exclude Disliked Users
  if (disliked && disliked.length > 0) {
    for (let i = 0; i < disliked.length; i++) {
      const id = disliked[i];
      excludeIds.push(id);
    }
  }

  //  Step 2: Set the required filters

  // Gender Filter - Who You Are Looking For
  // Filter Options - Men, Women, Everyone
  // Schema Options - Man, Woman, Other
  let genderFilters = [];
  if (userFilters.gender === 'Everyone') {
    genderFilters = ['Man', 'Woman', 'Other'];
  }
  if (userFilters.gender === 'Men') {
    genderFilters = ['Man'];
  }
  if (userFilters.gender === 'Women') {
    genderFilters = ['Woman'];
  }

  // Looking For Gender Filter - Show People Who are looking to meet your gender
  // If your gender is Man, find people with filter options as "Men"
  const myGender = user.personal.gender;
  let lookingForFilter = [];
  if (myGender === 'Man') {
    lookingForFilter = ['Men', 'Everyone'];
  }
  if (myGender === 'Woman') {
    lookingForFilter = ['Women', 'Everyone'];
  }
  if (myGender === 'Other') {
    lookingForFilter = ['Everyone'];
  }

  //   Location Filter
  let includeLocationFilter = false;
  const myCoordinates = user.locations.currentLocation.coordinates;
  let maxDistance = parseInt(userFilters.distance);
  maxDistance *= 1609;

  // Age Filter
  // Filter Options - Ages 18 - 80
  // Schema Options - Based on Birthdate Min and Max Dates
  let includeAgeFilter = false;
  const minAge = userFilters.ageRange[0];
  const maxAge = userFilters.ageRange[1];
  const minAgeDate = moment().subtract(minAge, 'years').toDate();
  const maxAgeDate = moment().subtract(maxAge, 'years').toDate();
  if (userFilters?.ageRange?.length > 0) {
    includeAgeFilter = true;
  }

  // Ethnicity Filter
  // Filter Options - American Indian, Black/African Descent, East Asian, Hispanic/Latino, Middle Eastern, Pacific Islander, South Asian, White/Caucasian, Other, Open to All
  // Schema Options
  let includeEthnicityFilter = false;
  const ethnicityFilter = userFilters.ethnicity;
  let ethnicitySearchFilter = [];
  if (ethnicityFilter.length > 8) {
    ethnicitySearchFilter = [
      'American Indian',
      'Black/African Descent',
      'East Asian',
      'Hispanic/Latino',
      'Middle Eastern',
      'Pacific Islander',
      'South Asian',
      'White/Caucasian',
      'Other',
      '',
    ];
  } else {
    if (ethnicityFilter.includes('American Indian')) {
      ethnicitySearchFilter.push('American Indian');
    }
    if (ethnicityFilter.includes('Black/African Descent')) {
      ethnicitySearchFilter.push('Black/African Descent');
    }
    if (ethnicityFilter.includes('East Asian')) {
      ethnicitySearchFilter.push('East Asian');
    }
    if (ethnicityFilter.includes('Hispanic/Latino')) {
      ethnicitySearchFilter.push('Hispanic/Latino');
    }
    if (ethnicityFilter.includes('Middle Eastern')) {
      ethnicitySearchFilter.push('Middle Eastern');
    }
    if (ethnicityFilter.includes('Pacific Islander')) {
      ethnicitySearchFilter.push('Pacific Islander');
    }
    if (ethnicityFilter.includes('South Asian')) {
      ethnicitySearchFilter.push('South Asian');
    }
    if (ethnicityFilter.includes('White/Caucasian')) {
      ethnicitySearchFilter.push('White/Caucasian');
    }
    if (ethnicityFilter.includes('Other')) {
      ethnicitySearchFilter.push('Other');
    }
  }
  if (ethnicityFilter.length > 0) {
    includeEthnicityFilter = true;
  }

  //  Religion Filter
  let includeReligionFilter = false;
  const religionFilter = userFilters.religion;
  let religionSearchFilter = [];
  if (religionFilter.length > 9) {
    religionSearchFilter = [
      'Buddhist',
      'Catholic',
      'Christian',
      'Hindu',
      'Jewish',
      'Muslim',
      'Spiritual',
      'Agnostic',
      'Atheist',
      'Other',
      '',
    ];
  } else {
    if (religionFilter.includes('Buddhist')) {
      religionSearchFilter.push('Buddhist');
    }
    if (religionFilter.includes('Catholic')) {
      religionSearchFilter.push('Catholic');
    }
    if (religionFilter.includes('Christian')) {
      religionSearchFilter.push('Christian');
    }
    if (religionFilter.includes('Hindu')) {
      religionSearchFilter.push('Hindu');
    }
    if (religionFilter.includes('Jewish')) {
      religionSearchFilter.push('Jewish');
    }
    if (religionFilter.includes('Muslim')) {
      religionSearchFilter.push('Muslim');
    }
    if (religionFilter.includes('Spiritual')) {
      religionSearchFilter.push('Spiritual');
    }
    if (religionFilter.includes('Agnostic')) {
      religionSearchFilter.push('Agnostic');
    }
    if (religionFilter.includes('Atheist')) {
      religionSearchFilter.push('Atheist');
    }
    if (religionFilter.includes('Other')) {
      religionSearchFilter.push('Other');
    }
  }
  if (religionFilter.length > 0) {
    includeReligionFilter = true;
  }

  // Height Filter
  let includeHeightFilter = false;
  const heightFilter = [];
  const minHeightIndex = userFilters.height[0];
  const maxHeightIndex = userFilters.height[1];
  for (let i = 0; i < heights.length; i++) {
    // If i is greater than or equal to minHeightIndex and less than maxheight index push
    if (i >= minHeightIndex && i <= maxHeightIndex) {
      heightFilter.push(heights[i]);
    }
  }
  if (heightFilter.length > 0) {
    includeHeightFilter = true;
  }

  //   Children Filter
  let includeChildrenFilter = false;
  let childrenFilter = [];
  if (
    userFilters.children.includes("Doesn't have children") &&
    userFilters.children.includes('Has children')
  ) {
    childrenFilter = ["Don't have children", 'Have children', ''];
  } else if (userFilters.children.includes("Doesn't have children")) {
    childrenFilter.push("Don't have children");
  } else if (userFilters.children.includes('Has children')) {
    childrenFilter.push('Have children');
  }
  if (userFilters.children.length > 0) {
    includeChildrenFilter = true;
  }

  //   Family Plans Filter
  let familyPlansFilter = [];
  let includeFamilyPlansFilter = false;
  if (
    userFilters.familyPlans.includes("Doesn't want children") &&
    userFilters.familyPlans.includes('Wants children') &&
    userFilters.familyPlans.includes('Might want children')
  ) {
    familyPlansFilter = [
      "Don't want children",
      'Want children',
      'Open to children',
      '',
    ];
  } else {
    if (userFilters.familyPlans.includes("Doesn't want children")) {
      familyPlansFilter.push("Don't want children");
    }
    if (userFilters.familyPlans.includes('Wants children')) {
      familyPlansFilter.push('Want children');
    }
    if (userFilters.familyPlans.includes('Might want children')) {
      familyPlansFilter.push('Open to children');
    }
  }
  if (userFilters.familyPlans.length > 0) {
    includeFamilyPlansFilter = true;
  }

  //   Education Level Filter
  let educationLevelFilter = [];
  let includeEducationLevelFilter = false;
  if (
    userFilters.educationLevel.includes('High school') &&
    userFilters.educationLevel.includes('Undergraduate') &&
    userFilters.educationLevel.includes('Post-Graduate')
  ) {
    educationLevelFilter = [
      'High school',
      'Undergraduate',
      'Post-Graduate',
      '',
    ];
  } else {
    if (userFilters.educationLevel.includes('High school')) {
      educationLevelFilter.push('High school');
    }
    if (userFilters.educationLevel.includes('Undergraduate')) {
      educationLevelFilter.push('Undergraduate');
    }
    if (userFilters.educationLevel.includes('Post-Graduate')) {
      educationLevelFilter.push('Post-Graduate');
    }
  }
  if (userFilters.educationLevel.length > 0) {
    includeEducationLevelFilter = true;
  }

  //  Setting Politics Filter
  let includePoliticsFilter = false;
  let politicsFilter = [];
  if (
    userFilters.politics.includes('Liberal') &&
    userFilters.politics.includes('Moderate') &&
    userFilters.politics.includes('Conservative') &&
    userFilters.politics.includes('Other')
  ) {
    politicsFilter = ['Liberal', 'Moderate', 'Conservative', 'Other', ''];
  } else {
    if (userFilters.politics.includes('Liberal')) {
      politicsFilter.push('Liberal');
    }
    if (userFilters.politics.includes('Moderate')) {
      politicsFilter.push('Moderate');
    }
    if (userFilters.politics.includes('Conservative')) {
      politicsFilter.push('Conservative');
    }
    if (userFilters.politics.includes('Other')) {
      politicsFilter.push('Other');
    }
  }
  if (userFilters.politics.length > 0) {
    includePoliticsFilter = true;
  }

  //  Setting Drinking Filter
  let includeDrinkingFilter = false;
  let drinkingFilter = [];
  if (
    userFilters.drinking.includes('Yes') &&
    userFilters.drinking.includes('No') &&
    userFilters.drinking.includes('Sometimes')
  ) {
    drinkingFilter = ['Yes', 'No', 'Sometimes', ''];
  } else {
    if (userFilters.drinking.includes('Yes')) {
      drinkingFilter.push('Yes');
    }
    if (userFilters.drinking.includes('No')) {
      drinkingFilter.push('No');
    }
    if (userFilters.drinking.includes('Sometimes')) {
      drinkingFilter.push('Sometimes');
    }
  }
  if (userFilters.drinking.length > 0) {
    includeDrinkingFilter = true;
  }

  //  Setting Smoking Filter
  let includeSmokingFilter = false;
  let smokingFilter = [];
  if (
    userFilters.smoking.includes('Yes') &&
    userFilters.smoking.includes('No') &&
    userFilters.smoking.includes('Sometimes')
  ) {
    smokingFilter = ['Yes', 'No', 'Sometimes', ''];
  } else {
    if (userFilters.smoking.includes('Yes')) {
      smokingFilter.push('Yes');
    }
    if (userFilters.smoking.includes('No')) {
      smokingFilter.push('No');
    }
    if (userFilters.smoking.includes('Sometimes')) {
      smokingFilter.push('Sometimes');
    }
  }
  if (userFilters.smoking.length > 0) {
    includeSmokingFilter = true;
  }

  //  Setting Cannabis Filter
  let includeCannabisFilter = false;
  let cannabisFilter = [];
  if (
    userFilters.cannabis.includes('Yes') &&
    userFilters.cannabis.includes('No') &&
    userFilters.cannabis.includes('Sometimes')
  ) {
    cannabisFilter = ['Yes', 'No', 'Sometimes', ''];
  } else {
    if (userFilters.cannabis.includes('Yes')) {
      cannabisFilter.push('Yes');
    }
    if (userFilters.cannabis.includes('No')) {
      cannabisFilter.push('No');
    }
    if (userFilters.cannabis.includes('Sometimes')) {
      cannabisFilter.push('Sometimes');
    }
  }
  if (userFilters.cannabis.length > 0) {
    includeCannabisFilter = true;
  }

  //  Setting Drugs Filter
  let includeDrugsFilter = false;
  let drugsFilter = [];
  if (
    userFilters.drugs.includes('Yes') &&
    userFilters.drugs.includes('No') &&
    userFilters.drugs.includes('Sometimes')
  ) {
    drugsFilter = ['Yes', 'No', 'Sometimes', ''];
  } else {
    if (userFilters.drugs.includes('Yes')) {
      drugsFilter.push('Yes');
    }
    if (userFilters.drugs.includes('No')) {
      drugsFilter.push('No');
    }
    if (userFilters.drugs.includes('Sometimes')) {
      drugsFilter.push('Sometimes');
    }
  }
  if (userFilters.drugs.length > 0) {
    includeDrugsFilter = true;
  }

  // Step 3: Set the Filters Object
  let filters = {
    _id: { $nin: excludeIds },
    // Account Filters
    'account.flagged': false,
    'account.isBanned': false,
    'settings.accountDeleted': false,
    'settings.profilePaused': false,
    // Attribute Filters
    'personal.gender': { $in: genderFilters },
    'filters.gender': { $in: lookingForFilter },
    'media.mainImage': { $exists: true },
  };

  if (includeAgeFilter) {
    filters['personal.birthday'] = { $lte: minAgeDate, $gte: maxAgeDate };
  }

  if (includeEthnicityFilter) {
    filters['physicals.ethnicity'] = { $in: ethnicitySearchFilter };
  }
  if (includeHeightFilter) {
    filters['physicals.height'] = { $in: heightFilter };
  }
  if (includeReligionFilter) {
    filters['lifestyle.religion'] = { $in: religionSearchFilter };
  }
  if (includePoliticsFilter) {
    filters['lifestyle.politics'] = { $in: politicsFilter };
  }
  if (includeDrinkingFilter) {
    filters['lifestyle.drinking'] = { $in: drinkingFilter };
  }
  if (includeSmokingFilter) {
    filters['lifestyle.smoking'] = { $in: smokingFilter };
  }
  if (includeCannabisFilter) {
    filters['lifestyle.cannabis'] = { $in: cannabisFilter };
  }
  if (includeDrugsFilter) {
    filters['lifestyle.drugs'] = { $in: drugsFilter };
  }
  if (includeChildrenFilter) {
    filters['family.children'] = { $in: childrenFilter };
  }
  if (includeFamilyPlansFilter) {
    filters['family.familyPlans'] = { $in: familyPlansFilter };
  }
  if (includeEducationLevelFilter) {
    filters['education.educationLevel'] = { $in: educationLevelFilter };
  }

  if (expanded) {
    filters = {
      _id: { $nin: excludeIds },
      // Account Filters
      'account.flagged': false,
      'account.isBanned': false,
      'settings.accountDeleted': false,
      'settings.profilePaused': false,
      // Attribute Filters
      'personal.gender': { $in: genderFilters },
      'filters.gender': { $in: lookingForFilter },
      'media.mainImage': { $exists: true },
    };
  }
  return filters;
};

const getRecentlyActiveFilters = async (user, expanded) => {
  // Pass in the user object to get the filters
  // Pass boolean with true to get expanded filters to do a more broad search
  if (!user) return null;

  //   User Info
  const { liked, likedBy, disliked, dislikedBy, matched, blocked, blockedBy } =
    user.storage;
  let userFilters = user.filters;

  // Queue Filter Requirements

  // Exclude Blocked IDs
  // Exclude Blocked By IDs
  // Excluse Matched IDs
  // Exclude Liked IDs
  // Exclude Disliked IDs

  // Mandatory Filters
  // Gender
  // Looking For

  // Additional Filters

  //  If ExpandedSearch is true, use the mandatory filters only to get more broader search results

  // Step 1: Create an array of all the IDs to exclude
  let excludeIds = [];
  excludeIds.push(user._id);

  // Exclude Blocked Users
  if (blocked && blocked.length > 0) {
    for (let i = 0; i < blocked.length; i++) {
      const id = blocked[i];
      excludeIds.push(id);
    }
  }
  // Exclude Blocked By Users
  if (blockedBy && blockedBy.length > 0) {
    for (let i = 0; i < blockedBy.length; i++) {
      const id = blockedBy[i];
      excludeIds.push(id);
    }
  }
  // Exclude Matches
  if (matched && matched.length > 0) {
    for (let i = 0; i < matched.length; i++) {
      const id = matched[i];
      excludeIds.push(id);
    }
  }
  // Exclude Liked Users
  if (liked && liked.length > 0) {
    for (let i = 0; i < liked.length; i++) {
      const id = liked[i];
      excludeIds.push(id);
    }
  }
  // Exclude Disliked Users
  if (disliked && disliked.length > 0) {
    for (let i = 0; i < disliked.length; i++) {
      const id = disliked[i];
      excludeIds.push(id);
    }
  }

  //  Step 2: Set the required filters

  // Gender Filter - Who You Are Looking For
  // Filter Options - Men, Women, Everyone
  // Schema Options - Man, Woman, Other
  let genderFilters = [];
  if (userFilters.gender === 'Everyone') {
    genderFilters = ['Man', 'Woman', 'Other'];
  }
  if (userFilters.gender === 'Men') {
    genderFilters = ['Man'];
  }
  if (userFilters.gender === 'Women') {
    genderFilters = ['Woman'];
  }

  // Looking For Gender Filter - Show People Who are looking to meet your gender
  // If your gender is Man, find people with filter options as "Men"
  const myGender = user.personal.gender;
  let lookingForFilter = [];
  if (myGender === 'Man') {
    lookingForFilter = ['Men', 'Everyone'];
  }
  if (myGender === 'Woman') {
    lookingForFilter = ['Women', 'Everyone'];
  }
  if (myGender === 'Other') {
    lookingForFilter = ['Everyone'];
  }

  //   Location Filter
  let includeLocationFilter = false;
  const myCoordinates = user.locations.currentLocation.coordinates;
  let maxDistance = parseInt(userFilters.distance);
  maxDistance *= 1609;

  // Age Filter
  // Filter Options - Ages 18 - 80
  // Schema Options - Based on Birthdate Min and Max Dates
  let includeAgeFilter = false;
  const minAge = userFilters.ageRange[0];
  const maxAge = userFilters.ageRange[1];
  const minAgeDate = moment().subtract(minAge, 'years').toDate();
  const maxAgeDate = moment().subtract(maxAge, 'years').toDate();
  if (userFilters?.ageRange?.length > 0) {
    includeAgeFilter = true;
  }

  // Ethnicity Filter
  // Filter Options - American Indian, Black/African Descent, East Asian, Hispanic/Latino, Middle Eastern, Pacific Islander, South Asian, White/Caucasian, Other, Open to All
  // Schema Options
  let includeEthnicityFilter = false;
  const ethnicityFilter = userFilters.ethnicity;
  let ethnicitySearchFilter = [];
  if (ethnicityFilter.length > 8) {
    ethnicitySearchFilter = [
      'American Indian',
      'Black/African Descent',
      'East Asian',
      'Hispanic/Latino',
      'Middle Eastern',
      'Pacific Islander',
      'South Asian',
      'White/Caucasian',
      'Other',
      '',
    ];
  } else {
    if (ethnicityFilter.includes('American Indian')) {
      ethnicitySearchFilter.push('American Indian');
    }
    if (ethnicityFilter.includes('Black/African Descent')) {
      ethnicitySearchFilter.push('Black/African Descent');
    }
    if (ethnicityFilter.includes('East Asian')) {
      ethnicitySearchFilter.push('East Asian');
    }
    if (ethnicityFilter.includes('Hispanic/Latino')) {
      ethnicitySearchFilter.push('Hispanic/Latino');
    }
    if (ethnicityFilter.includes('Middle Eastern')) {
      ethnicitySearchFilter.push('Middle Eastern');
    }
    if (ethnicityFilter.includes('Pacific Islander')) {
      ethnicitySearchFilter.push('Pacific Islander');
    }
    if (ethnicityFilter.includes('South Asian')) {
      ethnicitySearchFilter.push('South Asian');
    }
    if (ethnicityFilter.includes('White/Caucasian')) {
      ethnicitySearchFilter.push('White/Caucasian');
    }
    if (ethnicityFilter.includes('Other')) {
      ethnicitySearchFilter.push('Other');
    }
  }
  if (ethnicityFilter.length > 0) {
    includeEthnicityFilter = true;
  }

  //  Religion Filter
  let includeReligionFilter = false;
  const religionFilter = userFilters.religion;
  let religionSearchFilter = [];
  if (religionFilter.length > 9) {
    religionSearchFilter = [
      'Buddhist',
      'Catholic',
      'Christian',
      'Hindu',
      'Jewish',
      'Muslim',
      'Spiritual',
      'Agnostic',
      'Atheist',
      'Other',
      '',
    ];
  } else {
    if (religionFilter.includes('Buddhist')) {
      religionSearchFilter.push('Buddhist');
    }
    if (religionFilter.includes('Catholic')) {
      religionSearchFilter.push('Catholic');
    }
    if (religionFilter.includes('Christian')) {
      religionSearchFilter.push('Christian');
    }
    if (religionFilter.includes('Hindu')) {
      religionSearchFilter.push('Hindu');
    }
    if (religionFilter.includes('Jewish')) {
      religionSearchFilter.push('Jewish');
    }
    if (religionFilter.includes('Muslim')) {
      religionSearchFilter.push('Muslim');
    }
    if (religionFilter.includes('Spiritual')) {
      religionSearchFilter.push('Spiritual');
    }
    if (religionFilter.includes('Agnostic')) {
      religionSearchFilter.push('Agnostic');
    }
    if (religionFilter.includes('Atheist')) {
      religionSearchFilter.push('Atheist');
    }
    if (religionFilter.includes('Other')) {
      religionSearchFilter.push('Other');
    }
  }
  if (religionFilter.length > 0) {
    includeReligionFilter = true;
  }

  // Height Filter
  let includeHeightFilter = false;
  const heightFilter = [];
  const minHeightIndex = userFilters.height[0];
  const maxHeightIndex = userFilters.height[1];
  for (let i = 0; i < heights.length; i++) {
    // If i is greater than or equal to minHeightIndex and less than maxheight index push
    if (i >= minHeightIndex && i <= maxHeightIndex) {
      heightFilter.push(heights[i]);
    }
  }
  if (heightFilter.length > 0) {
    includeHeightFilter = true;
  }

  //   Children Filter
  let includeChildrenFilter = false;
  let childrenFilter = [];
  if (
    userFilters.children.includes("Doesn't have children") &&
    userFilters.children.includes('Has children')
  ) {
    childrenFilter = ["Don't have children", 'Have children', ''];
  } else if (userFilters.children.includes("Doesn't have children")) {
    childrenFilter.push("Don't have children");
  } else if (userFilters.children.includes('Has children')) {
    childrenFilter.push('Have children');
  }
  if (userFilters.children.length > 0) {
    includeChildrenFilter = true;
  }

  //   Family Plans Filter
  let familyPlansFilter = [];
  let includeFamilyPlansFilter = false;
  if (
    userFilters.familyPlans.includes("Doesn't want children") &&
    userFilters.familyPlans.includes('Wants children') &&
    userFilters.familyPlans.includes('Might want children')
  ) {
    familyPlansFilter = [
      "Don't want children",
      'Want children',
      'Open to children',
      '',
    ];
  } else {
    if (userFilters.familyPlans.includes("Doesn't want children")) {
      familyPlansFilter.push("Don't want children");
    }
    if (userFilters.familyPlans.includes('Wants children')) {
      familyPlansFilter.push('Want children');
    }
    if (userFilters.familyPlans.includes('Might want children')) {
      familyPlansFilter.push('Open to children');
    }
  }
  if (userFilters.familyPlans.length > 0) {
    includeFamilyPlansFilter = true;
  }

  //   Education Level Filter
  let educationLevelFilter = [];
  let includeEducationLevelFilter = false;
  if (
    userFilters.educationLevel.includes('High school') &&
    userFilters.educationLevel.includes('Undergraduate') &&
    userFilters.educationLevel.includes('Post-Graduate')
  ) {
    educationLevelFilter = [
      'High school',
      'Undergraduate',
      'Post-Graduate',
      '',
    ];
  } else {
    if (userFilters.educationLevel.includes('High school')) {
      educationLevelFilter.push('High school');
    }
    if (userFilters.educationLevel.includes('Undergraduate')) {
      educationLevelFilter.push('Undergraduate');
    }
    if (userFilters.educationLevel.includes('Post-Graduate')) {
      educationLevelFilter.push('Post-Graduate');
    }
  }
  if (userFilters.educationLevel.length > 0) {
    includeEducationLevelFilter = true;
  }

  //  Setting Politics Filter
  let includePoliticsFilter = false;
  let politicsFilter = [];
  if (
    userFilters.politics.includes('Liberal') &&
    userFilters.politics.includes('Moderate') &&
    userFilters.politics.includes('Conservative') &&
    userFilters.politics.includes('Other')
  ) {
    politicsFilter = ['Liberal', 'Moderate', 'Conservative', 'Other', ''];
  } else {
    if (userFilters.politics.includes('Liberal')) {
      politicsFilter.push('Liberal');
    }
    if (userFilters.politics.includes('Moderate')) {
      politicsFilter.push('Moderate');
    }
    if (userFilters.politics.includes('Conservative')) {
      politicsFilter.push('Conservative');
    }
    if (userFilters.politics.includes('Other')) {
      politicsFilter.push('Other');
    }
  }
  if (userFilters.politics.length > 0) {
    includePoliticsFilter = true;
  }

  //  Setting Drinking Filter
  let includeDrinkingFilter = false;
  let drinkingFilter = [];
  if (
    userFilters.drinking.includes('Yes') &&
    userFilters.drinking.includes('No') &&
    userFilters.drinking.includes('Sometimes')
  ) {
    drinkingFilter = ['Yes', 'No', 'Sometimes', ''];
  } else {
    if (userFilters.drinking.includes('Yes')) {
      drinkingFilter.push('Yes');
    }
    if (userFilters.drinking.includes('No')) {
      drinkingFilter.push('No');
    }
    if (userFilters.drinking.includes('Sometimes')) {
      drinkingFilter.push('Sometimes');
    }
  }
  if (userFilters.drinking.length > 0) {
    includeDrinkingFilter = true;
  }

  //  Setting Smoking Filter
  let includeSmokingFilter = false;
  let smokingFilter = [];
  if (
    userFilters.smoking.includes('Yes') &&
    userFilters.smoking.includes('No') &&
    userFilters.smoking.includes('Sometimes')
  ) {
    smokingFilter = ['Yes', 'No', 'Sometimes', ''];
  } else {
    if (userFilters.smoking.includes('Yes')) {
      smokingFilter.push('Yes');
    }
    if (userFilters.smoking.includes('No')) {
      smokingFilter.push('No');
    }
    if (userFilters.smoking.includes('Sometimes')) {
      smokingFilter.push('Sometimes');
    }
  }
  if (userFilters.smoking.length > 0) {
    includeSmokingFilter = true;
  }

  //  Setting Cannabis Filter
  let includeCannabisFilter = false;
  let cannabisFilter = [];
  if (
    userFilters.cannabis.includes('Yes') &&
    userFilters.cannabis.includes('No') &&
    userFilters.cannabis.includes('Sometimes')
  ) {
    cannabisFilter = ['Yes', 'No', 'Sometimes', ''];
  } else {
    if (userFilters.cannabis.includes('Yes')) {
      cannabisFilter.push('Yes');
    }
    if (userFilters.cannabis.includes('No')) {
      cannabisFilter.push('No');
    }
    if (userFilters.cannabis.includes('Sometimes')) {
      cannabisFilter.push('Sometimes');
    }
  }
  if (userFilters.cannabis.length > 0) {
    includeCannabisFilter = true;
  }

  //  Setting Drugs Filter
  let includeDrugsFilter = false;
  let drugsFilter = [];
  if (
    userFilters.drugs.includes('Yes') &&
    userFilters.drugs.includes('No') &&
    userFilters.drugs.includes('Sometimes')
  ) {
    drugsFilter = ['Yes', 'No', 'Sometimes', ''];
  } else {
    if (userFilters.drugs.includes('Yes')) {
      drugsFilter.push('Yes');
    }
    if (userFilters.drugs.includes('No')) {
      drugsFilter.push('No');
    }
    if (userFilters.drugs.includes('Sometimes')) {
      drugsFilter.push('Sometimes');
    }
  }
  if (userFilters.drugs.length > 0) {
    includeDrugsFilter = true;
  }

  // Step 3: Set the Filters Object
  let filters = {
    _id: { $nin: excludeIds },
    // Account Filters
    'account.flagged': false,
    'account.isBanned': false,
    'settings.accountDeleted': false,
    'settings.profilePaused': false,
    // Attribute Filters
    'personal.gender': { $in: genderFilters },
    'filters.gender': { $in: lookingForFilter },
    'media.mainImage': { $exists: true },
  };

  if (includeAgeFilter) {
    filters['personal.birthday'] = { $lte: minAgeDate, $gte: maxAgeDate };
  }

  if (includeEthnicityFilter) {
    filters['physicals.ethnicity'] = { $in: ethnicitySearchFilter };
  }
  if (includeHeightFilter) {
    filters['physicals.height'] = { $in: heightFilter };
  }
  if (includeReligionFilter) {
    filters['lifestyle.religion'] = { $in: religionSearchFilter };
  }
  if (includePoliticsFilter) {
    filters['lifestyle.politics'] = { $in: politicsFilter };
  }
  if (includeDrinkingFilter) {
    filters['lifestyle.drinking'] = { $in: drinkingFilter };
  }
  if (includeSmokingFilter) {
    filters['lifestyle.smoking'] = { $in: smokingFilter };
  }
  if (includeCannabisFilter) {
    filters['lifestyle.cannabis'] = { $in: cannabisFilter };
  }
  if (includeDrugsFilter) {
    filters['lifestyle.drugs'] = { $in: drugsFilter };
  }
  if (includeChildrenFilter) {
    filters['family.children'] = { $in: childrenFilter };
  }
  if (includeFamilyPlansFilter) {
    filters['family.familyPlans'] = { $in: familyPlansFilter };
  }
  if (includeEducationLevelFilter) {
    filters['education.educationLevel'] = { $in: educationLevelFilter };
  }

  if (expanded) {
    filters = {
      _id: { $nin: excludeIds },
      // Account Filters
      'account.flagged': false,
      'account.isBanned': false,
      'settings.accountDeleted': false,
      'settings.profilePaused': false,
      // Attribute Filters
      'personal.gender': { $in: genderFilters },
      'filters.gender': { $in: lookingForFilter },
      'media.mainImage': { $exists: true },
    };
  }
  return filters;
};

const getTopPicksFilters = async (user, expanded) => {
  // Pass in the user object to get the filters
  // Pass boolean with true to get expanded filters to do a more broad search
  if (!user) return null;

  //   User Info
  const { liked, likedBy, disliked, dislikedBy, matched, blocked, blockedBy } =
    user.storage;
  let userFilters = user.filters;

  // Queue Filter Requirements

  // Exclude Blocked IDs
  // Exclude Blocked By IDs
  // Excluse Matched IDs
  // Exclude Liked IDs
  // Exclude Disliked IDs

  // Mandatory Filters
  // Gender
  // Looking For

  // Additional Filters

  //  If ExpandedSearch is true, use the mandatory filters only to get more broader search results

  // Step 1: Create an array of all the IDs to exclude
  let excludeIds = [];
  excludeIds.push(user._id);

  // Exclude Blocked Users
  if (blocked && blocked.length > 0) {
    for (let i = 0; i < blocked.length; i++) {
      const id = blocked[i];
      excludeIds.push(id);
    }
  }
  // Exclude Blocked By Users
  if (blockedBy && blockedBy.length > 0) {
    for (let i = 0; i < blockedBy.length; i++) {
      const id = blockedBy[i];
      excludeIds.push(id);
    }
  }
  // Exclude Matches
  if (matched && matched.length > 0) {
    for (let i = 0; i < matched.length; i++) {
      const id = matched[i];
      excludeIds.push(id);
    }
  }
  // Exclude Liked Users
  if (liked && liked.length > 0) {
    for (let i = 0; i < liked.length; i++) {
      const id = liked[i];
      excludeIds.push(id);
    }
  }
  // Exclude Disliked Users
  if (disliked && disliked.length > 0) {
    for (let i = 0; i < disliked.length; i++) {
      const id = disliked[i];
      excludeIds.push(id);
    }
  }

  //  Step 2: Set the required filters

  // Gender Filter - Who You Are Looking For
  // Filter Options - Men, Women, Everyone
  // Schema Options - Man, Woman, Other
  let genderFilters = [];
  if (userFilters.gender === 'Everyone') {
    genderFilters = ['Man', 'Woman', 'Other'];
  }
  if (userFilters.gender === 'Men') {
    genderFilters = ['Man'];
  }
  if (userFilters.gender === 'Women') {
    genderFilters = ['Woman'];
  }

  // Looking For Gender Filter - Show People Who are looking to meet your gender
  // If your gender is Man, find people with filter options as "Men"
  const myGender = user.personal.gender;
  let lookingForFilter = [];
  if (myGender === 'Man') {
    lookingForFilter = ['Men', 'Everyone'];
  }
  if (myGender === 'Woman') {
    lookingForFilter = ['Women', 'Everyone'];
  }
  if (myGender === 'Other') {
    lookingForFilter = ['Everyone'];
  }

  //   Location Filter
  let includeLocationFilter = false;
  const myCoordinates = user.locations.currentLocation.coordinates;
  let maxDistance = parseInt(userFilters.distance);
  maxDistance *= 1609;

  // Age Filter
  // Filter Options - Ages 18 - 80
  // Schema Options - Based on Birthdate Min and Max Dates
  let includeAgeFilter = false;
  const minAge = userFilters.ageRange[0];
  const maxAge = userFilters.ageRange[1];
  const minAgeDate = moment().subtract(minAge, 'years').toDate();
  const maxAgeDate = moment().subtract(maxAge, 'years').toDate();
  if (userFilters?.ageRange?.length > 0) {
    includeAgeFilter = true;
  }

  // Ethnicity Filter
  // Filter Options - American Indian, Black/African Descent, East Asian, Hispanic/Latino, Middle Eastern, Pacific Islander, South Asian, White/Caucasian, Other, Open to All
  // Schema Options
  let includeEthnicityFilter = false;
  const ethnicityFilter = userFilters.ethnicity;
  let ethnicitySearchFilter = [];
  if (ethnicityFilter.length > 8) {
    ethnicitySearchFilter = [
      'American Indian',
      'Black/African Descent',
      'East Asian',
      'Hispanic/Latino',
      'Middle Eastern',
      'Pacific Islander',
      'South Asian',
      'White/Caucasian',
      'Other',
      '',
    ];
  } else {
    if (ethnicityFilter.includes('American Indian')) {
      ethnicitySearchFilter.push('American Indian');
    }
    if (ethnicityFilter.includes('Black/African Descent')) {
      ethnicitySearchFilter.push('Black/African Descent');
    }
    if (ethnicityFilter.includes('East Asian')) {
      ethnicitySearchFilter.push('East Asian');
    }
    if (ethnicityFilter.includes('Hispanic/Latino')) {
      ethnicitySearchFilter.push('Hispanic/Latino');
    }
    if (ethnicityFilter.includes('Middle Eastern')) {
      ethnicitySearchFilter.push('Middle Eastern');
    }
    if (ethnicityFilter.includes('Pacific Islander')) {
      ethnicitySearchFilter.push('Pacific Islander');
    }
    if (ethnicityFilter.includes('South Asian')) {
      ethnicitySearchFilter.push('South Asian');
    }
    if (ethnicityFilter.includes('White/Caucasian')) {
      ethnicitySearchFilter.push('White/Caucasian');
    }
    if (ethnicityFilter.includes('Other')) {
      ethnicitySearchFilter.push('Other');
    }
  }
  if (ethnicityFilter.length > 0) {
    includeEthnicityFilter = true;
  }

  //  Religion Filter
  let includeReligionFilter = false;
  const religionFilter = userFilters.religion;
  let religionSearchFilter = [];
  if (religionFilter.length > 9) {
    religionSearchFilter = [
      'Buddhist',
      'Catholic',
      'Christian',
      'Hindu',
      'Jewish',
      'Muslim',
      'Spiritual',
      'Agnostic',
      'Atheist',
      'Other',
      '',
    ];
  } else {
    if (religionFilter.includes('Buddhist')) {
      religionSearchFilter.push('Buddhist');
    }
    if (religionFilter.includes('Catholic')) {
      religionSearchFilter.push('Catholic');
    }
    if (religionFilter.includes('Christian')) {
      religionSearchFilter.push('Christian');
    }
    if (religionFilter.includes('Hindu')) {
      religionSearchFilter.push('Hindu');
    }
    if (religionFilter.includes('Jewish')) {
      religionSearchFilter.push('Jewish');
    }
    if (religionFilter.includes('Muslim')) {
      religionSearchFilter.push('Muslim');
    }
    if (religionFilter.includes('Spiritual')) {
      religionSearchFilter.push('Spiritual');
    }
    if (religionFilter.includes('Agnostic')) {
      religionSearchFilter.push('Agnostic');
    }
    if (religionFilter.includes('Atheist')) {
      religionSearchFilter.push('Atheist');
    }
    if (religionFilter.includes('Other')) {
      religionSearchFilter.push('Other');
    }
  }
  if (religionFilter.length > 0) {
    includeReligionFilter = true;
  }

  // Height Filter
  let includeHeightFilter = false;
  const heightFilter = [];
  const minHeightIndex = userFilters.height[0];
  const maxHeightIndex = userFilters.height[1];
  for (let i = 0; i < heights.length; i++) {
    // If i is greater than or equal to minHeightIndex and less than maxheight index push
    if (i >= minHeightIndex && i <= maxHeightIndex) {
      heightFilter.push(heights[i]);
    }
  }
  if (heightFilter.length > 0) {
    includeHeightFilter = true;
  }

  //   Children Filter
  let includeChildrenFilter = false;
  let childrenFilter = [];
  if (
    userFilters.children.includes("Doesn't have children") &&
    userFilters.children.includes('Has children')
  ) {
    childrenFilter = ["Don't have children", 'Have children', ''];
  } else if (userFilters.children.includes("Doesn't have children")) {
    childrenFilter.push("Don't have children");
  } else if (userFilters.children.includes('Has children')) {
    childrenFilter.push('Have children');
  }
  if (userFilters.children.length > 0) {
    includeChildrenFilter = true;
  }

  //   Family Plans Filter
  let familyPlansFilter = [];
  let includeFamilyPlansFilter = false;
  if (
    userFilters.familyPlans.includes("Doesn't want children") &&
    userFilters.familyPlans.includes('Wants children') &&
    userFilters.familyPlans.includes('Might want children')
  ) {
    familyPlansFilter = [
      "Don't want children",
      'Want children',
      'Open to children',
      '',
    ];
  } else {
    if (userFilters.familyPlans.includes("Doesn't want children")) {
      familyPlansFilter.push("Don't want children");
    }
    if (userFilters.familyPlans.includes('Wants children')) {
      familyPlansFilter.push('Want children');
    }
    if (userFilters.familyPlans.includes('Might want children')) {
      familyPlansFilter.push('Open to children');
    }
  }
  if (userFilters.familyPlans.length > 0) {
    includeFamilyPlansFilter = true;
  }

  //   Education Level Filter
  let educationLevelFilter = [];
  let includeEducationLevelFilter = false;
  if (
    userFilters.educationLevel.includes('High school') &&
    userFilters.educationLevel.includes('Undergraduate') &&
    userFilters.educationLevel.includes('Post-Graduate')
  ) {
    educationLevelFilter = [
      'High school',
      'Undergraduate',
      'Post-Graduate',
      '',
    ];
  } else {
    if (userFilters.educationLevel.includes('High school')) {
      educationLevelFilter.push('High school');
    }
    if (userFilters.educationLevel.includes('Undergraduate')) {
      educationLevelFilter.push('Undergraduate');
    }
    if (userFilters.educationLevel.includes('Post-Graduate')) {
      educationLevelFilter.push('Post-Graduate');
    }
  }
  if (userFilters.educationLevel.length > 0) {
    includeEducationLevelFilter = true;
  }

  //  Setting Politics Filter
  let includePoliticsFilter = false;
  let politicsFilter = [];
  if (
    userFilters.politics.includes('Liberal') &&
    userFilters.politics.includes('Moderate') &&
    userFilters.politics.includes('Conservative') &&
    userFilters.politics.includes('Other')
  ) {
    politicsFilter = ['Liberal', 'Moderate', 'Conservative', 'Other', ''];
  } else {
    if (userFilters.politics.includes('Liberal')) {
      politicsFilter.push('Liberal');
    }
    if (userFilters.politics.includes('Moderate')) {
      politicsFilter.push('Moderate');
    }
    if (userFilters.politics.includes('Conservative')) {
      politicsFilter.push('Conservative');
    }
    if (userFilters.politics.includes('Other')) {
      politicsFilter.push('Other');
    }
  }
  if (userFilters.politics.length > 0) {
    includePoliticsFilter = true;
  }

  //  Setting Drinking Filter
  let includeDrinkingFilter = false;
  let drinkingFilter = [];
  if (
    userFilters.drinking.includes('Yes') &&
    userFilters.drinking.includes('No') &&
    userFilters.drinking.includes('Sometimes')
  ) {
    drinkingFilter = ['Yes', 'No', 'Sometimes', ''];
  } else {
    if (userFilters.drinking.includes('Yes')) {
      drinkingFilter.push('Yes');
    }
    if (userFilters.drinking.includes('No')) {
      drinkingFilter.push('No');
    }
    if (userFilters.drinking.includes('Sometimes')) {
      drinkingFilter.push('Sometimes');
    }
  }
  if (userFilters.drinking.length > 0) {
    includeDrinkingFilter = true;
  }

  //  Setting Smoking Filter
  let includeSmokingFilter = false;
  let smokingFilter = [];
  if (
    userFilters.smoking.includes('Yes') &&
    userFilters.smoking.includes('No') &&
    userFilters.smoking.includes('Sometimes')
  ) {
    smokingFilter = ['Yes', 'No', 'Sometimes', ''];
  } else {
    if (userFilters.smoking.includes('Yes')) {
      smokingFilter.push('Yes');
    }
    if (userFilters.smoking.includes('No')) {
      smokingFilter.push('No');
    }
    if (userFilters.smoking.includes('Sometimes')) {
      smokingFilter.push('Sometimes');
    }
  }
  if (userFilters.smoking.length > 0) {
    includeSmokingFilter = true;
  }

  //  Setting Cannabis Filter
  let includeCannabisFilter = false;
  let cannabisFilter = [];
  if (
    userFilters.cannabis.includes('Yes') &&
    userFilters.cannabis.includes('No') &&
    userFilters.cannabis.includes('Sometimes')
  ) {
    cannabisFilter = ['Yes', 'No', 'Sometimes', ''];
  } else {
    if (userFilters.cannabis.includes('Yes')) {
      cannabisFilter.push('Yes');
    }
    if (userFilters.cannabis.includes('No')) {
      cannabisFilter.push('No');
    }
    if (userFilters.cannabis.includes('Sometimes')) {
      cannabisFilter.push('Sometimes');
    }
  }
  if (userFilters.cannabis.length > 0) {
    includeCannabisFilter = true;
  }

  //  Setting Drugs Filter
  let includeDrugsFilter = false;
  let drugsFilter = [];
  if (
    userFilters.drugs.includes('Yes') &&
    userFilters.drugs.includes('No') &&
    userFilters.drugs.includes('Sometimes')
  ) {
    drugsFilter = ['Yes', 'No', 'Sometimes', ''];
  } else {
    if (userFilters.drugs.includes('Yes')) {
      drugsFilter.push('Yes');
    }
    if (userFilters.drugs.includes('No')) {
      drugsFilter.push('No');
    }
    if (userFilters.drugs.includes('Sometimes')) {
      drugsFilter.push('Sometimes');
    }
  }
  if (userFilters.drugs.length > 0) {
    includeDrugsFilter = true;
  }

  // Step 3: Set the Filters Object
  let filters = {
    _id: { $nin: excludeIds },
    // Account Filters
    'account.flagged': false,
    'account.isBanned': false,
    'settings.accountDeleted': false,
    'settings.profilePaused': false,
    // Attribute Filters
    'personal.gender': { $in: genderFilters },
    'filters.gender': { $in: lookingForFilter },
    'media.mainImage': { $exists: true },
  };

  if (includeAgeFilter) {
    filters['personal.birthday'] = { $lte: minAgeDate, $gte: maxAgeDate };
  }

  if (includeEthnicityFilter) {
    filters['physicals.ethnicity'] = { $in: ethnicitySearchFilter };
  }
  if (includeHeightFilter) {
    filters['physicals.height'] = { $in: heightFilter };
  }
  if (includeReligionFilter) {
    filters['lifestyle.religion'] = { $in: religionSearchFilter };
  }
  if (includePoliticsFilter) {
    filters['lifestyle.politics'] = { $in: politicsFilter };
  }
  if (includeDrinkingFilter) {
    filters['lifestyle.drinking'] = { $in: drinkingFilter };
  }
  if (includeSmokingFilter) {
    filters['lifestyle.smoking'] = { $in: smokingFilter };
  }
  if (includeCannabisFilter) {
    filters['lifestyle.cannabis'] = { $in: cannabisFilter };
  }
  if (includeDrugsFilter) {
    filters['lifestyle.drugs'] = { $in: drugsFilter };
  }
  if (includeChildrenFilter) {
    filters['family.children'] = { $in: childrenFilter };
  }
  if (includeFamilyPlansFilter) {
    filters['family.familyPlans'] = { $in: familyPlansFilter };
  }
  if (includeEducationLevelFilter) {
    filters['education.educationLevel'] = { $in: educationLevelFilter };
  }

  if (expanded) {
    filters = {
      _id: { $nin: excludeIds },
      // Account Filters
      'account.flagged': false,
      'account.isBanned': false,
      'settings.accountDeleted': false,
      'settings.profilePaused': false,
      // Attribute Filters
      'personal.gender': { $in: genderFilters },
      'filters.gender': { $in: lookingForFilter },
      'media.mainImage': { $exists: true },
    };
  }
  return filters;
};

const getMatchesFilters = async (user) => {
  if (!user) return null;

  //   User Info
  const { liked, likedBy, disliked, dislikedBy, matched, blocked, blockedBy } =
    user.storage;

  let includeIds = [];

  for (let i = 0; i < matched.length; i++) {
    if (!blocked?.includes(matched[i]) && !blockedBy?.includes(matched[i])) {
      includeIds.push(matched[i]);
    }
  }

  includeIds.reverse();

  let filters = {
    _id: { $in: includeIds },
    'account.flagged': false,
    'account.isBanned': false,
    'settings.accountDeleted': false,
    'settings.profilePaused': false,
  };

  return filters;
};

const getFavoritesFilters = async (user) => {
  if (!user) return null;

  //   User Info
  const { liked, likedBy, disliked, dislikedBy, matched, blocked, blockedBy } =
    user.storage;

  let includeIds = [];

  for (let i = 0; i < liked.length; i++) {
    if (!blocked?.includes(liked[i]) && !blockedBy?.includes(liked[i])) {
      includeIds.push(liked[i]);
    }
  }

  includeIds.reverse();

  let filters = {
    _id: { $in: includeIds },
    'account.flagged': false,
    'account.isBanned': false,
    'settings.accountDeleted': false,
    'settings.profilePaused': false,
  };

  return filters;
};

const getFavoritedByFilters = async (user) => {
  if (!user) return null;

  //   User Info
  const { liked, likedBy, disliked, dislikedBy, matched, blocked, blockedBy } =
    user.storage;

  let includeIds = [];

  for (let i = 0; i < likedBy.length; i++) {
    if (!blocked?.includes(likedBy[i]) && !blockedBy?.includes(likedBy[i])) {
      includeIds.push(likedBy[i]);
    }
  }

  includeIds.reverse();

  let filters = {
    _id: { $in: includeIds },
    'account.flagged': false,
    'account.isBanned': false,
    'settings.accountDeleted': false,
    'settings.profilePaused': false,
  };

  return filters;
};

const getViewsFilters = async (user) => {
  if (!user) return null;

  //   User Info
  const {
    liked,
    likedBy,
    disliked,
    dislikedBy,
    matched,
    blocked,
    blockedBy,
    viewed,
    viewedBy,
  } = user.storage;

  let includeIds = [];

  for (let i = 0; i < viewed.length; i++) {
    if (!blocked?.includes(viewed[i]) && !blockedBy?.includes(viewed[i])) {
      includeIds.push(viewed[i]);
    }
  }

  includeIds.reverse();

  let filters = {
    _id: { $in: includeIds },
    'account.flagged': false,
    'account.isBanned': false,
    'settings.accountDeleted': false,
    'settings.profilePaused': false,
  };

  return filters;
};

const getViewedByFilters = async (user) => {
  if (!user) return null;

  //   User Info
  const {
    liked,
    likedBy,
    disliked,
    dislikedBy,
    matched,
    blocked,
    blockedBy,
    viewed,
    viewedBy,
  } = user.storage;

  let includeIds = [];

  for (let i = 0; i < viewedBy.length; i++) {
    if (!blocked?.includes(viewedBy[i]) && !blockedBy?.includes(viewedBy[i])) {
      includeIds.push(viewedBy[i]);
    }
  }

  includeIds.reverse();

  let filters = {
    _id: { $in: includeIds },
    'account.flagged': false,
    'account.isBanned': false,
    'settings.accountDeleted': false,
    'settings.profilePaused': false,
  };

  return filters;
};

module.exports = {
  getQueueFilters,
  getTopPicksFilters,
  getMatchesFilters,
  getFavoritesFilters,
  getFavoritedByFilters,
  getViewsFilters,
  getViewedByFilters,
  getRecentlyActiveFilters,
};

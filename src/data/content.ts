// ═══ DATA ═══
// Reusable content for the Job Search mini class
const jobSearchData = {
  title: "Job Search, Résumé Tips & Networking Strategies",
  who: "John Ekins",
  desc: "Get help with your job search, résumé writing, and professional networking. Whether you're just starting out or looking for a change, come get practical career guidance.",
};

export type Booth = {
  title: string;
  subtitle?: string;
  who: string;
  desc: string;
};

export type ClassItem = {
  title: string;
  schedule: string;
  location: string;
  who: string;
  desc: string;
  subtitle?: string;
  useSharedModal?: boolean;
};

export type CategoryKey = "temple" | "missionary" | "rising" | "selfreliance";

export const catColors: Record<CategoryKey, string> = {
  temple: "var(--cat-temple)",
  missionary: "var(--cat-missionary)",
  rising: "var(--cat-rising)",
  selfreliance: "var(--cat-selfreliance)",
};

export const catLabels: Record<CategoryKey, string> = {
  temple: "Temple & Family History",
  missionary: "Missionary Work",
  rising: "Rising Generation",
  selfreliance: "Self-Reliance",
};

export const booths: Record<CategoryKey, Booth[]> = {
  temple: [
    {
      title: "FamilySearch: Ordinances Ready",
      subtitle: "Canyon Creek Youth",
      who: "Canyon Creek Youth",
      desc: "Get quick, guided help to identify temple-ready ancestors. Youth will demonstrate on computers how to find family names that can be taken to the temple. Pick up a handy step-by-step card to take home.",
    },
    {
      title: "Preparing Children for the Temple",
      who: "North Fork Ward Families",
      desc: "Discover ideas to get the entire family excited about temple and family history work. Families with children and teenagers share hands-on ideas including temple visits, FHE lessons, discussing the five covenants, drawing pictures, FamilySearch activities, fan charts, and more.",
    },
    {
      title: "Family History Q&A + RootsTech Highlights",
      who: "Robert & Sandra Myers",
      desc: "Get your family history questions answered, receive personalized guidance, and be inspired with highlights, tools, and topics from RootsTech. Discover new resources and potential links for your own research.",
    },
    {
      title: "Photo Scanning Station",
      who: "Aspen Ward",
      desc: 'Bring your treasured family photos and digitize them on the spot. We\'ll help you turn printed pictures into high-quality digital files so they can be preserved, shared with family, and saved for generations to come.<br><br>Note: <u>Please bring a USB thumb drive (memory stick) to take your images home.</u>',
    },
    {
      title: "Preserving Family Memories",
      who: "Ponderosa Ward",
      desc: "Learn simple, effective ways to record and preserve family stories on video. Watch real examples of youth interviewing grandparents and other relatives, and pick up practical tips you can use right away. You'll also see how to upload memories to FamilySearch and how to organize your family's digital photos, videos, and documents so they're easy to find and share.",
    },
    {
      title: "Family Recipes",
      who: "Newdale Ward",
      desc: "Share and preserve traditional family recipes as fun family history traditions. Bring a favorite recipe to share, and take home new ideas for keeping food traditions alive across generations.",
    },
  ],
  missionary: [
    {
      title: "Returned Missionary Q&A",
      who: "Heritage Park, Grand Teton, & Canyon Creek",
      desc: "Ask questions about missionary life: expectations, preparation, conversation starters, simple invitations, testimony tips, and social opportunities. Place a pin on a large world map where you served or where you'd like to serve. Discover fun, practical ways to share the gospel and prepare for a mission.",
    },
    {
      title: "Senior Missionary Booth",
      who: "Garth & Ruth Miller, Joseph & Debra Cherrington, Bryce & Sherry Holman",
      desc: "Explore what senior missions look like and what to expect. Learn about local vs. away-from-home opportunities, types of assignments, timelines, finances, housing, health considerations, and steps to apply. Hear from senior returned missionaries and find a mission option that fits your season of life.",
    },
    {
      title: "Sharing the Gospel on Social Media",
      who: "Teton Island & Newdale",
      desc: "Learn simple, natural ways to share your testimony through social media. Get ideas for posts, stories, and comments. Choose one small action for the week — share a verse, invite someone, post an inspirational thought, or leave an encouraging comment.",
    },
    {
      title: "Sharing the Gospel in the Community",
      who: "North Fork, South Fork, & Teton Rivers",
      desc: "Learn practical ways to implement missionary work into everyday life. Discover natural opportunities to share the light of Christ with friends, neighbors, and your community.",
    },
    {
      title: "Family Missionary Plan",
      who: "Moody Creek Ward Families",
      desc: "Families with teenagers and small children share realistic, everyday ways they make missionary work part of family life. Focus on simple ideas that don't require extra time but help children and youth develop a missionary mindset.",
    },
    {
      title: "JustServe Booth",
      who: "Rozan & Jerry Miller",
      desc: '<p><strong><a href="https://www.justserve.org" target="_blank" rel="noopener noreferrer">JustServe</a></strong> is a community service platform sponsored by The Church of Jesus Christ of Latter-day Saints that connects volunteers with meaningful service opportunities in their community. At this booth, discover local projects you can join\u200A\u2014\u200Aand participate in one right here:</p><div style="margin-top:16px"><img src="/Reaching_Higher_along_the_Covenant_Path/images/bagsoflove.gif" alt="Bags of Love comfort kit items" class="modal-feature-img-float" /><p><strong>\u201CBags of Love\u201D Service Project</strong> \u2014 A \u201CBag of Love\u201D is a comfort kit for children and youth facing a crisis\u200A\u2014\u200Awhether a parent has been hospitalized, arrested, or the family has become homeless. It can also bring hope to a young person who has run away or is struggling emotionally. Each bag is a simple reminder that someone cares and they are not alone.</p></div><p style="margin-top:14px"><strong>How to Participate</strong> \u2014 Purchase items in advance and prepare a bag. Drop it off at your ward building and place it in the box in the hallway near the door that is marked \u201CBags of Love\u201D or bring it to the booth on the day of the conference.</p><p style="margin-top:10px">Everything needs to fit in a 2 to 2.5 gallon Ziploc bag.</p><p style="margin-top:14px"><strong>Younger Children:</strong></p><ul style="margin:8px 0 0 18px;line-height:1.7"><li>Soft lap blanket (can be slightly used &amp; clean)</li><li>Stuffed animal (can be slightly used &amp; clean)</li><li>Coloring book and colored pencils (crayons will melt)</li><li>Small boxed puzzle or board puzzle that fits in the bag</li><li>Hairbrush/comb</li><li>Small shampoo</li><li>Individually wrapped toothbrush and toothpaste</li><li>Individually wrapped chapstick</li><li>Individually wrapped snacks\u200A\u2014\u200Acrackers, cookies, fruit snacks, etc.</li></ul><p style="margin-top:14px"><strong>Older Children:</strong></p><ul style="margin:8px 0 0 18px;line-height:1.7"><li>Soft lap blanket (can be slightly used &amp; clean)</li><li>Stuffed animal (can be slightly used &amp; clean)</li><li>Puzzle book, small tablet, pencil or pen</li><li>Reading book (can be slightly used)</li><li>Hairbrush/comb</li><li>Small shampoo</li><li>Individually wrapped toothbrush and toothpaste</li><li>Individually wrapped chapstick</li><li>Individually wrapped snacks\u200A\u2014\u200Acrackers, cookies, fruit snacks, etc.</li></ul><p style="margin-top:14px">Feel free to make bags specific for boys or girls, but please label them as such. <u>Please feel free to add or take away\u200A\u2014\u200Anot all bags need to be the same.</u> Use wisdom in preparing them.</p>',
    },
  ],
  rising: [
    {
      title: "Primary Activities Corner",
      who: "Teton Rivers, Teton Island & Heritage Park Wards",
      desc: "Bring your little ones to the Primary room for a child-friendly space filled with hands-on crafts and activities centered on temples, prophets, covenants, scripture stories, and missionary work.",
    },
    {
      title: "Strengthening Gospel Study in the Home",
      who: "Sugar Ward",
      desc: "Discover practical ways to build consistent, meaningful gospel study at home — especially with small children. Share what works, learn new ideas, and take home a simple guide to help your family grow in the gospel.",
    },
    {
      title: "Institute Booth",
      who: "Institute Representatives",
      desc: "Build faith. Find friends. Live the gospel. Learn what Institute offers young adults, why it matters, and how to join. Institute classes are available for all young adults ages 18–30.",
    },
  ],
  selfreliance: [
    {
      title: "Addiction Recovery & Mental Health",
      who: "Madalyn Hunt",
      desc: 'Pick up helpful handouts with trusted resources, local support services, and clear "who to contact" information for addiction recovery and mental health support. Learn what programs are available and how to access help for yourself or someone you love.',
    },
    {
      title: "Life Skills: Personal Finances & Emotional Resilience",
      who: "Johnathan & Keli Huskinson",
      desc: "Explore tools and resources for managing personal finances and building emotional resilience. Discover practical strategies to strengthen temporal and spiritual self-reliance, personally and as a family.",
    },
    {
      title: "Are You Ready for the First 96 Hours?<br><span class=\"title-sub\">Building Your Emergency Kit</span>",
      who: "Stake Emergency Committee",
      desc: "Learn what belongs in a 96-hour emergency kit and why the first four days matter most. See a fully assembled kit, pick up a checklist, and get practical tips on building or updating your own — one step at a time.",
    },
    {
      title: "Does Your Family Have a Plan?<br><span class=\"title-sub\">Family Emergency Preparedness</span>",
      who: "Stake Emergency Committee",
      desc: "When an emergency hits, will your family know what to do and where to go? Learn how to create a simple family emergency plan — including communication, meeting points, and what to prepare now so you're not scrambling later.",
    },
    {
      title: "How Can I Help?<br><span class=\"title-sub\">Volunteering in a Crisis</span>",
      who: "Stake Emergency Committee",
      desc: "When disaster strikes, organized volunteers make all the difference. Learn how the Church and community coordinate emergency response, what roles are needed, and how you can sign up to serve — before or after an emergency happens.",
    },
  ],
};

export const classes: ClassItem[] = [
  {
    title: "President Edwin Wells",
    schedule: "Every 20 min",
    location: "Chapel",
    who: "Stake President - Edwin Wells",
    desc: "Join President Wells for a brief, uplifting message about walking the covenant path. Sessions repeat every 20 minutes throughout the morning.",
  },
  {
    title: "President Kristin Galbraith<br><span class=\"title-sub\"><em>Teaching within the Home</em></span>",
    schedule: "Every 20 min",
    location: "High Council Room",
    who: "Stake Relief Society President - Kristin Galbraith",
    desc: "Discover meaningful ways to teach the gospel within your home. Share ideas and learn from others about creating a home centered on Christ.",
  },
  {
    title: "Take Charge of Technology",
    schedule: "Hourly",
    location: "Relief Society Room",
    who: "YSAs & Jason Flaig",
    desc: "Get help with technology challenges. Young adults offer hands-on assistance with phones, apps, FamilySearch, and other digital tools. Come with your questions and devices!",
  },
  {
    title: "Use AI to Bring Your Ancestors to Life",
    subtitle: "Learn their stories\u2014they are with you amid challenge and strife.",
    schedule: "Every 20 minutes",
    location: "Young Women's Room",
    who: "Sicily Clark",
    desc: '<div class="modal-image-row"><img src="/Reaching_Higher_along_the_Covenant_Path/images/couple.JPG" alt="Ancestors photograph" class="modal-feature-img" /><p>Step into a powerful, hands-on workshop where technology meets legacy. In this inspiring class, you\u2019ll learn how to use AI tools to transform still photographs of your ancestors into living, moving story moments. We\u2019ll guide you step-by-step in bringing faces from the past to life\u2014allowing you to see expressions, movement, and personality in a way that feels deeply personal and unforgettable.</p></div><p style="margin-top:14px">This isn\u2019t just about animation; it\u2019s about connection. It\u2019s about honoring sacrifice, strengthening identity, and helping families feel the presence of those who came before them. Come discover how AI can be used for the highest good\u2014to preserve stories, spark emotion, and bridge generations.</p><a href="https://youtu.be/Ve4pYvrI5UU?si=4R8eAsq4G7po11Id" target="_blank" rel="noopener noreferrer" class="yt-card"><span class="yt-icon"><svg viewBox="0 0 24 24" width="40" height="40"><rect width="24" height="24" rx="4" fill="#FF0000"/><polygon points="10,7.5 16,12 10,16.5" fill="#fff"/></svg></span><span class="yt-card-text"><span class="yt-card-label">WATCH ON YOUTUBE</span><span class="yt-card-title">Ancestors Brought to Life</span><span class="yt-card-sub">Sicily Clark &middot; Full presentation</span></span><span class="yt-card-arrow">&rsaquo;</span></a>',
  },
  {
    title: "Did I Remember Everything?<br><span class=\"title-sub\"><em>Organizing Vital Documents</em></span>",
    schedule: "Every 20 min",
    location: "Room 9",
    who: "Ninette Galbraith",
    desc: "Learn practical strategies to organize your family's vital documents. Get tips on what to keep, how to store it, and how to be prepared for the unexpected.",
  },
  {
    title: "Family History Q&A",
    schedule: "All morning",
    location: "Rooms 6 & 7",
    who: "Michelle Nelson, Jacob Jashinsky, & Larry Lovell",
    desc: "Drop in anytime to ask your family history questions. Get one-on-one guidance and support from experienced family history consultants.",
  },
  {
    title: "The Teton Dam Disaster",
    subtitle: "What happened, what was learned, and inspiring stories",
    schedule: "All morning",
    location: "Priesthood Room",
    who: "John Galbraith",
    desc: "Explore the history of the Teton Dam disaster — what happened, what was learned, and the inspiring stories of community resilience and faith that followed.",
  },
  {
    ...jobSearchData,
    schedule: "All morning",
    location: "Room 2",
    useSharedModal: true,
  },
];

export const categories: {
  key: CategoryKey;
  emoji: string;
  label: string;
  quote: string;
}[] = [
  {
    key: "temple",
    emoji: "\u{1F3DB}\uFE0F",
    label: "Temple & Family History",
    quote: "\u201CAnytime we do anything that helps anyone \u2014 on either side of the veil \u2014 to make and keep their covenants with God, we are helping to gather Israel.\u201D \u2014 President Russell M. Nelson",
  },
  {
    key: "missionary",
    emoji: "\u{1F30D}",
    label: "Missionary Work",
    quote: "\u201CNever give up an opportunity to testify of Christ.\u201D \u2014 President Bonnie H. Cordon",
  },
  {
    key: "rising",
    emoji: "\u{1F331}",
    label: "Rising Generation",
    quote: "\u201CWhat will matter most is what they learn from [you] about who they really are and what they can really become.\u201D \u2014 President Henry B. Eyring",
  },
  {
    key: "selfreliance",
    emoji: "\u{1F4AA}",
    label: "Self-Reliance",
    quote: "Practical tools and support for life\u2019s real challenges",
  },
];

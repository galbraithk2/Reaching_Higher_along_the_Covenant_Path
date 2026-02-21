// ═══ DATA ═══
// Shared entry — edit once, updates both Self-Reliance booth and Mini Classes card
const jobSearchData = {
  title: "Job Search, Résumé & Networking",
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
  temple: "var(--temple)",
  missionary: "var(--missionary)",
  rising: "var(--rising)",
  selfreliance: "var(--selfreliance)",
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
      who: "Jerry & Rozan Miller",
      desc: "Participate in a service project, learn about service needs in your community, and sign up for service opportunities through JustServe. Find meaningful ways to serve those around you.",
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
    jobSearchData,
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
    title: "President Kristin Galbraith<br>Teaching within the Home",
    schedule: "Every 20 min",
    location: "High Council Room",
    who: "Stake Relief Society President - Kristin Galbraith",
    desc: "Discover meaningful ways to teach the gospel within your home. Share ideas and learn from others about creating a home centered on Christ.",
  },
  {
    title: "Take Charge of Technology",
    schedule: "Hourly",
    location: "RS Room",
    who: "YSAs & Jason Flaig",
    desc: "Get help with technology challenges. Young adults offer hands-on assistance with phones, apps, FamilySearch, and other digital tools. Come with your questions and devices!",
  },
  {
    title: "Use AI to Bring Your Ancestors to Life",
    subtitle: "Learn their stories\u2014they are with you amid challenge and strife.",
    schedule: "All morning",
    location: "Young Women\u2019s Room",
    who: "Sicily Clark",
    desc: '<div class="modal-image-row"><img src="/images/couple.JPG" alt="Ancestors photograph" class="modal-feature-img" /><p>Step into a powerful, hands-on workshop where technology meets legacy. In this inspiring class, you\u2019ll learn how to use AI tools to transform still photographs of your ancestors into living, moving story moments. We\u2019ll guide you step-by-step in bringing faces from the past to life\u2014allowing you to see expressions, movement, and personality in a way that feels deeply personal and unforgettable.</p></div><p style="margin-top:14px">This isn\u2019t just about animation; it\u2019s about connection. It\u2019s about honoring sacrifice, strengthening identity, and helping families feel the presence of those who came before them. Come discover how AI can be used for the highest good\u2014to preserve stories, spark emotion, and bridge generations.</p><a href="https://youtu.be/Ve4pYvrI5UU?si=4R8eAsq4G7po11Id" target="_blank" rel="noopener noreferrer" class="yt-card"><span class="yt-icon"><svg viewBox="0 0 24 24" width="40" height="40"><rect width="24" height="24" rx="4" fill="#FF0000"/><polygon points="10,7.5 16,12 10,16.5" fill="#fff"/></svg></span><span class="yt-card-text"><span class="yt-card-label">WATCH ON YOUTUBE</span><span class="yt-card-title">Ancestors Brought to Life</span><span class="yt-card-sub">Sicily Clark &middot; Full presentation</span></span><span class="yt-card-arrow">&rsaquo;</span></a>',
  },
  {
    title: "Organizing Vital Documents",
    schedule: "Every 20 min",
    location: "YW Room",
    who: "Chantal Cobia",
    desc: "Learn practical strategies to organize your family's vital documents. Get tips on what to keep, how to store it, and how to be prepared for the unexpected.",
  },
  {
    title: "Family History Q&A",
    schedule: "All morning",
    location: "Room TBD",
    who: "Michelle Nelson, Jacob Jashinsky, & Larry Lovell",
    desc: "Drop in anytime to ask your family history questions. Get one-on-one guidance and support from experienced family history consultants.",
  },
  {
    title: "The Teton Dam Disaster",
    schedule: "All morning",
    location: "Priesthood Room",
    who: "John Galbraith",
    desc: "Explore the history of the Teton Dam disaster — what happened, what was learned, and the inspiring stories of community resilience and faith that followed.",
  },
  {
    ...jobSearchData,
    schedule: "All morning",
    location: "Room TBD",
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

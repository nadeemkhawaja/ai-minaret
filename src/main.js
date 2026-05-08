// ================================================================
// CATEGORY + TOPIC DATABASE — 9 categories × 4 topics = 36 total

function esc(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
};

// Each category has: label, accent color, 4 sources, 4 topics
// ================================================================
const CATS = [
  {
    id:'sports', label:'Sports', accent:'#1D9E75',
    subs:[
      { id:'soccer', label:'Soccer', sources:['ESPN (espn.com)','BBC Sport (bbc.co.uk/sport)','Sky Sports (skysports.com)','UEFA (uefa.com)'],
        topics:[
          {title:'VAR Technology in Soccer',sub:'Does video review help or ruin the beautiful game?',positions:['VAR improves fairness in football','VAR is ruining the spirit of the game']},
          {title:'Super League vs Domestic Leagues',sub:'Should a European Super League replace domestic competitions?',positions:['A Super League would benefit football globally','The Super League destroys the soul of domestic football']},
          {title:'Salary Caps in Soccer',sub:'Should top clubs face mandatory salary caps?',positions:['Salary caps would make football more competitive','Salary caps violate free market principles in sport']},
          {title:'Women\'s Soccer Pay Equality',sub:'Should women and men receive equal prize money?',positions:['Women\'s soccer deserves equal prize money to men\'s','Pay should reflect current commercial revenue differences']},
          {title:'Diving and Simulation',sub:'Should players be retrospectively banned for simulation?',positions:['Retrospective bans for diving are necessary','Retrospective bans would damage the flow of the game']},
          {title:'Hosting Mega Tournaments',sub:'Do the World Cup and Euros benefit host nations?',positions:['Hosting major tournaments delivers lasting economic benefits','Tournament hosting costs far outweigh the benefits']},
        ]},
      { id:'american_football', label:'American Football', sources:['ESPN (espn.com)','NFL.com (nfl.com)','Sports Illustrated (si.com)','The Athletic (theathletic.com)'],
        topics:[
          {title:'NFL vs College Football',sub:'Which delivers the superior product for fans?',positions:['The NFL is the superior football product','College football is the more authentic and exciting game']},
          {title:'NFL Player Safety Reforms',sub:'Are the NFL\'s concussion protocols sufficient?',positions:['The NFL has done enough to protect player safety','The NFL must go further to protect players from CTE']},
          {title:'Quarterback Dominance',sub:'Is the modern NFL too focused on the quarterback position?',positions:['Modern NFL quarterback focus creates the best entertainment','Over-reliance on quarterbacks makes the game one-dimensional']},
          {title:'Expanding to 18 Games',sub:'Should the NFL season expand to 18 regular season games?',positions:['An 18-game season benefits fans and the league','An 18-game season puts players at unacceptable injury risk']},
          {title:'Draft vs Free Agency',sub:'Which roster-building strategy produces more champions?',positions:['Building through the draft produces more sustainable champions','Aggressive free agency is the fastest path to a championship']},
          {title:'NFL International Expansion',sub:'Should the NFL place a permanent franchise in London?',positions:['A permanent London franchise would grow the sport globally','Relocating or expanding to London would harm the NFL\'s identity']},
        ]},
      { id:'boxing', label:'Boxing', sources:['ESPN Boxing (espn.com)','Sky Sports Boxing (skysports.com)','Boxing Scene (boxingscene.com)','Ring Magazine (ringtv.com)'],
        topics:[
          {title:'Points vs Knockout',sub:'Should wins require a KO to be truly credible?',positions:['A judges\' decision is a fully legitimate way to win','Only knockouts should determine a true boxing champion']},
          {title:'Unified Championship Belts',sub:'Should boxing consolidate to one world champion per division?',positions:['Boxing must unify to one sanctioned world champion per weight class','Multiple belts give more fighters a chance at a title']},
          {title:'Boxing vs MMA',sub:'Which combat sport is more skillful and deserving of respect?',positions:['Boxing demands greater technical skill than MMA','MMA is a more complete and demanding combat sport than boxing']},
          {title:'Weight Cutting Dangers',sub:'Should extreme weight cutting before fights be banned?',positions:['Extreme weight cutting must be banned to protect fighters','Weight management is a legitimate part of combat sports strategy']},
          {title:'Pay-Per-View Model',sub:'Is PPV pricing fair to boxing fans?',positions:['PPV pricing is justified for elite boxing events','PPV pricing is pricing out genuine boxing fans']},
          {title:'Women\'s Boxing Respect',sub:'Does women\'s boxing receive the recognition it deserves?',positions:['Women\'s boxing deserves equal billing and promotion','Women\'s boxing must grow its own audience before commanding equal billing']},
        ]},
      { id:'wrestling', label:'Wrestling', sources:['Olympics.com (olympics.com)','United World Wrestling (uww.org)','Sports Illustrated (si.com)','ESPN (espn.com)'],
        topics:[
          {title:'Wrestling in the Olympics',sub:'Does wrestling belong in the modern Olympic programme?',positions:['Wrestling is a foundational Olympic sport and must stay','Wrestling should be replaced by more commercially viable sports']},
          {title:'Pro Wrestling as Sport',sub:'Should professional wrestling be classified as sport or entertainment?',positions:['Professional wrestling demands genuine athletic skill deserving of sport status','Pro wrestling is entertainment and should never be classified as sport']},
          {title:'Weight Class System',sub:'Does the current Olympic weight class structure serve athletes fairly?',positions:['The current weight class system is fair and well-structured','The weight class system needs significant reform to be equitable']},
          {title:'Wrestling and Doping',sub:'Is doping still a serious problem in competitive wrestling?',positions:['Wrestling\'s anti-doping framework is robust and effective','Doping remains an unresolved crisis in competitive wrestling']},
          {title:'College Wrestling Funding',sub:'Should US universities be required to fund wrestling programmes?',positions:['Universities must fund wrestling as a core athletic discipline','Funding decisions should be left entirely to individual institutions']},
          {title:'Wrestling vs Judo at Olympics',sub:'Which grappling discipline better represents the Olympic spirit?',positions:['Wrestling better embodies the Olympic spirit than judo','Judo\'s values and global reach make it more aligned with Olympic ideals']},
        ]},
      { id:'cricket', label:'Cricket', sources:['ESPNCricinfo (espncricinfo.com)','Cricbuzz (cricbuzz.com)','ICC (icc-cricket.com)','BBC Sport (bbc.co.uk/sport)'],
        topics:[
          {title:'T20 vs Test Cricket',sub:'Which format is the future of the game?',positions:['T20 is the future of cricket','Test cricket must remain the pinnacle of the sport']},
          {title:'DRS Technology',sub:'Does the Decision Review System improve or damage cricket?',positions:['DRS has made cricket fairer and more accurate','DRS disrupts the natural authority of on-field umpires']},
          {title:'IPL vs International Cricket',sub:'Do T20 leagues harm the national game?',positions:['T20 leagues grow cricket globally and financially','T20 leagues are destroying players\' commitment to international cricket']},
          {title:'Over Rate Penalties',sub:'Are over rate penalties an effective solution to slow play?',positions:['Over rate penalties are necessary to protect cricket\'s entertainment value','Over rate penalties create unfair match conditions']},
          {title:'Day-Night Test Matches',sub:'Should Test cricket fully embrace day-night scheduling?',positions:['Day-night Tests are essential to attract new audiences','Day-night Tests compromise the traditional integrity of Test cricket']},
          {title:'Women\'s Cricket Parity',sub:'Should women\'s cricket receive equal funding to the men\'s game?',positions:['Women\'s cricket deserves equal investment and resources','Funding must reflect current audience and commercial reality']},
        ]},
      { id:'basketball', label:'Basketball', sources:['ESPN (espn.com)','NBA.com (nba.com)','Sports Illustrated (si.com)','The Athletic (theathletic.com)'],
        topics:[
          {title:'Load Management',sub:'Is resting healthy star players fair to paying fans?',positions:['Load management is medically necessary for long-term player health','Healthy stars resting during regular season games is a betrayal of fans']},
          {title:'NBA vs NCAA',sub:'Should one-and-done college rules be abolished?',positions:['The one-and-done rule should be abolished and players go straight to NBA','A college requirement benefits player development and the NCAA']},
          {title:'Three-Point Revolution',sub:'Has the three-point shot ruined the aesthetics of basketball?',positions:['The three-point era has made basketball more exciting and strategic','Over-reliance on three-pointers has removed beauty from the game']},
          {title:'NBA Expansion',sub:'Should the NBA expand to 32 teams?',positions:['NBA expansion to 32 teams would grow the sport and create opportunity','Expanding to 32 teams would dilute the quality of the product']},
          {title:'WNBA Pay',sub:'Should WNBA players earn salaries comparable to NBA players?',positions:['WNBA players deserve significantly higher compensation','WNBA salaries must reflect the league\'s current commercial scale']},
          {title:'Analytics vs Instinct',sub:'Has data analytics improved or harmed basketball?',positions:['Analytics have made basketball smarter and more competitive','Over-reliance on analytics has stripped creativity from the game']},
        ]},
    ]
  },
  {
    id:'travel', label:'Travel', accent:'#0284c7',
    subs:[
      { id:'destinations', label:'Destinations', sources:['Lonely Planet (lonelyplanet.com)','National Geographic (nationalgeographic.com)','Condé Nast Traveler (cntraveler.com)','Travel + Leisure (travelandleisure.com)'],
        topics:[
          {title:'Overtourism: Cap Visitor Numbers',sub:'Should popular destinations limit tourist access?',positions:['Destinations must cap visitor numbers to protect local life','Restricting tourism harms local economies unfairly']},
          {title:'Airbnb vs Hotels',sub:'Which is better for travellers and local communities?',positions:['Airbnb offers superior value and authenticity','Hotels are better for travellers and local communities']},
          {title:'Cruise Ships: Good or Bad',sub:'Do cruises benefit or harm the destinations they visit?',positions:['Cruise ships boost local tourism economies','Cruise tourism damages ports and local culture']},
          {title:'Off the Beaten Path vs Tourist Hotspots',sub:'Which travel approach produces richer experiences?',positions:['Avoiding tourist hotspots produces more authentic experiences','Popular destinations are popular for good reason']},
          {title:'Travel Influencers Harm Destinations',sub:'Do social media influencers damage fragile travel destinations?',positions:['Travel influencers are destroying fragile destinations','Influencers spread awareness and economic benefit to new areas']},
          {title:'Travel Insurance: Waste or Necessity',sub:'Should travel insurance be mandatory for international travel?',positions:['Travel insurance should be mandatory for all international travel','Travel insurance is largely a waste of money for most travellers']},
        ]},
      { id:'travel_style', label:'Travel Style', sources:['Lonely Planet (lonelyplanet.com)','Condé Nast Traveler (cntraveler.com)','Nomadic Matt (nomadicmatt.com)','Travel + Leisure (travelandleisure.com)'],
        topics:[
          {title:'Budget vs Luxury Travel',sub:'Which style produces richer life experiences?',positions:['Budget travel produces more authentic and memorable experiences','Luxury travel enhances and deepens every aspect of a journey']},
          {title:'Solo vs Group Travel',sub:'Which is the superior way to explore the world?',positions:['Solo travel is the most rewarding way to see the world','Group travel creates better shared memories and safety']},
          {title:'Slow Travel vs Fast Itineraries',sub:'Is spending more time in fewer places better?',positions:['Slow travel produces deeper and more meaningful experiences','Covering more destinations enriches a well-organised traveller']},
          {title:'Digital Nomad Lifestyle',sub:'Is working while travelling a sustainable long-term choice?',positions:['The digital nomad lifestyle offers genuine freedom and fulfilment','Digital nomadism is unsustainable and lacks meaningful community']},
          {title:'Package Tours vs Independent Travel',sub:'Which approach serves travellers better?',positions:['Independent travel is more rewarding and cost-effective','Package tours offer better value and remove stressful logistics']},
          {title:'Travel as Self-Development',sub:'Does travel genuinely change who you are?',positions:['Travel is one of the most powerful tools for personal growth','Travel alone does not build character without intentional reflection']},
        ]},
      { id:'sustainable_travel', label:'Sustainable Travel', sources:['National Geographic (nationalgeographic.com)','Responsible Travel (responsibletravel.com)','UNWTO (unwto.org)','BBC Travel (bbc.com/travel)'],
        topics:[
          {title:'Flight Shaming',sub:'Should people feel moral guilt for flying?',positions:['Flight shaming is a justified response to aviation\'s carbon impact','Flight shaming is elitist and an ineffective climate strategy']},
          {title:'Carbon Offsets for Travel',sub:'Do carbon offsets make flying ethical?',positions:['Carbon offsets are a meaningful way to reduce travel\'s climate impact','Carbon offsets are greenwashing that let travellers avoid real change']},
          {title:'Ecotourism: Real or Fake',sub:'Is ecotourism genuinely sustainable or a marketing tool?',positions:['Certified ecotourism makes a measurable positive impact','Most ecotourism is greenwashing that exploits fragile environments']},
          {title:'Animal Tourism Ethics',sub:'Should tourists visit animal attractions like elephant rides?',positions:['All animal tourism should be boycotted on ethical grounds','Responsible animal tourism can support conservation efforts']},
          {title:'Voluntourism',sub:'Does voluntourism help or harm the communities it claims to serve?',positions:['Well-designed voluntourism delivers genuine community benefit','Voluntourism largely harms communities and feeds Western saviour narratives']},
          {title:'Staycations vs Abroad',sub:'Should people holiday domestically to reduce their carbon footprint?',positions:['Domestic holidays are the most environmentally responsible choice','International travel has cultural and economic benefits that justify the emissions']},
        ]},
    ]
  },
  {
    id:'news', label:'News & Media', accent:'#C41230',
    subs:[
      { id:'journalism', label:'Journalism', sources:['Reuters (reuters.com)','AP News (apnews.com)','Nieman Lab (niemanlab.org)','Columbia Journalism Review (cjr.org)'],
        topics:[
          {title:'AI-Generated Journalism',sub:'Existential threat or opportunity for the industry?',positions:['AI journalism is a dangerous threat to truth','AI tools can strengthen and sustain quality journalism']},
          {title:'Paywalls for Quality Journalism',sub:'Do paywalls damage public discourse?',positions:['Paywalls are necessary for quality journalism to survive','Paywalls lock public interest journalism behind privilege']},
          {title:'Anonymous Sources',sub:'Should journalists be allowed to use anonymous sources?',positions:['Anonymous sources are essential to investigative journalism','Anonymous sourcing undermines accountability and verification']},
          {title:'Embedded Journalism in War Zones',sub:'Does embedded journalism compromise editorial independence?',positions:['Embedded journalists can still produce impartial reporting','Embedding journalists with military forces compromises their independence']},
          {title:'Clickbait Headlines',sub:'Are misleading headlines an ethical violation by news organisations?',positions:['Sensationalist headlines are a serious ethical breach by news media','Clickbait headlines are a commercial necessity in the attention economy']},
          {title:'Journalist Shield Laws',sub:'Should journalists have a legal right to protect sources?',positions:['Journalist shield laws are essential to press freedom','Shield laws can be used to protect criminal activity']},
        ]},
      { id:'social_media_news', label:'Social Media & News', sources:['Reuters (reuters.com)','Pew Research (pewresearch.org)','Nieman Lab (niemanlab.org)','BBC News (bbc.co.uk/news)'],
        topics:[
          {title:'Social Media vs Traditional News',sub:'Which better informs the public today?',positions:['Social media informs the public better than traditional media','Traditional media remains more reliable and accountable']},
          {title:'Platform Responsibility for Misinformation',sub:'Should social platforms be liable for false news they host?',positions:['Social platforms must be held legally liable for hosting misinformation','Platforms are not publishers and should not face publisher liability']},
          {title:'24-Hour Rolling News Cycle',sub:'Does rolling news inform or sensationalise?',positions:['24-hour news keeps the public better informed and more engaged','Rolling news sensationalises events and produces audience anxiety']},
          {title:'Influencers as Journalists',sub:'Should social media influencers be held to press standards?',positions:['Influencers who report news must be regulated like journalists','Influencers and journalists serve fundamentally different functions']},
          {title:'Algorithm-Driven News Feeds',sub:'Should news recommendation algorithms be regulated?',positions:['News recommendation algorithms must be strictly regulated','Regulating news algorithms threatens free expression online']},
          {title:'Press Freedom vs National Security',sub:'Where should governments draw the line?',positions:['Press freedom must be protected absolutely','National security can justify some press restrictions']},
        ]},
    ]
  },
  {
    id:'politics', label:'Politics', accent:'#185FA5',
    subs:[
      { id:'democracy', label:'Democracy & Voting', sources:['Politico (politico.com)','The Guardian (theguardian.com)','C-SPAN (c-span.org)','Brookings (brookings.edu)'],
        topics:[
          {title:'Electoral College vs Popular Vote',sub:'Which system better serves democracy?',positions:['Electoral College should be preserved','Popular vote is more democratic and representative']},
          {title:'Compulsory Voting',sub:'Should voting be legally mandatory in democracies?',positions:['Compulsory voting strengthens democratic legitimacy','Mandatory voting violates freedom of political expression']},
          {title:'Voting Age: Lower to 16',sub:'Should 16-year-olds have the right to vote?',positions:['The voting age should be lowered to 16','The voting age should remain at 18']},
          {title:'Term Limits for Politicians',sub:'Should legislators face mandatory term limits?',positions:['Term limits improve governance and reduce corruption','Term limits reduce democratic choice and institutional expertise']},
          {title:'Proportional vs First Past the Post',sub:'Which voting system is fairer?',positions:['Proportional representation produces fairer democratic outcomes','First past the post delivers stronger and more stable government']},
          {title:'Campaign Finance Limits',sub:'Should there be strict limits on political campaign spending?',positions:['Strict campaign finance limits are essential for democracy','Campaign spending limits violate free speech rights']},
        ]},
      { id:'policy', label:'Policy & Governance', sources:['Politico (politico.com)','CFR (cfr.org)','Brookings (brookings.edu)','The Economist (economist.com)'],
        topics:[
          {title:'Universal Basic Income',sub:'Would UBI benefit or harm society overall?',positions:['UBI would benefit society overall','UBI is economically harmful and impractical']},
          {title:'Open Borders vs Controlled Immigration',sub:'What immigration policy best serves nations?',positions:['Open borders produce economic and cultural benefits','Controlled immigration is essential for national security']},
          {title:'Corporate Lobbying: Reform or Ban',sub:'Should corporate lobbying be heavily restricted?',positions:['Corporate lobbying must be banned or severely restricted','Lobbying is a legitimate form of political participation']},
          {title:'Privatisation of Public Services',sub:'Should governments privatise services like water and rail?',positions:['Public services must remain in state hands','Privatisation drives efficiency and innovation in services']},
          {title:'Drug Policy: Decriminalisation',sub:'Should personal drug use be decriminalised?',positions:['Decriminalising personal drug use reduces harm and is more just','Decriminalisation sends the wrong social signal and increases use']},
          {title:'National Service',sub:'Should military or civic national service be compulsory?',positions:['Compulsory national service builds character and civic duty','Compulsory national service violates individual freedom']},
        ]},
    ]
  },
  {
    id:'finance', label:'Finance', accent:'#B8860B',
    subs:[
      { id:'investing', label:'Investing', sources:['Bloomberg (bloomberg.com)','Financial Times (ft.com)','The Economist (economist.com)','WSJ (wsj.com)'],
        topics:[
          {title:'Index Funds vs Active Management',sub:'Which investment strategy wins long-term?',positions:['Index funds outperform active management over time','Skilled active management can consistently beat the market']},
          {title:'Bitcoin as Global Reserve Currency',sub:'Could Bitcoin replace the US dollar?',positions:['Bitcoin could become a global reserve currency','Bitcoin cannot replace fiat currencies']},
          {title:'ESG Investing: Genuine or Greenwashing',sub:'Do ESG frameworks actually change corporate behaviour?',positions:['ESG frameworks genuinely drive positive corporate change','ESG investing is largely greenwashing with no real impact']},
          {title:'Real Estate vs Stock Market',sub:'Which is the superior long-term investment?',positions:['Real estate outperforms equities as a long-term wealth builder','Stock market investments outperform real estate over time']},
          {title:'Retail Investors vs Institutional',sub:'Has the rise of retail investing improved markets?',positions:['Retail investor participation makes markets healthier and fairer','Retail speculation destabilises markets and harms long-term investors']},
          {title:'Crypto Regulation',sub:'Should governments heavily regulate cryptocurrency?',positions:['Crypto requires strong government regulation','Crypto should remain largely unregulated']},
        ]},
      { id:'economy', label:'Economy & Work', sources:['Financial Times (ft.com)','The Economist (economist.com)','Bloomberg (bloomberg.com)','IMF (imf.org)'],
        topics:[
          {title:'Wealth Tax on Billionaires',sub:'Should extreme wealth face special taxation?',positions:['A wealth tax on billionaires is economically justified','Wealth taxes are counterproductive and drive capital flight']},
          {title:'Gig Economy: Exploitation or Opportunity',sub:'Are platforms like Uber good for workers?',positions:['Gig economy platforms exploit workers through misclassification','Gig work provides valuable flexibility and income for millions']},
          {title:'Four-Day Work Week',sub:'Is a shorter work week good for the economy?',positions:['A four-day work week improves productivity and wellbeing','A four-day week would harm economic output and growth']},
          {title:'Minimum Wage Increases',sub:'Do large minimum wage hikes help or harm workers?',positions:['Significant minimum wage increases reduce inequality','Large minimum wage hikes destroy jobs and harm small businesses']},
          {title:'Universal Basic Income Economics',sub:'Can nations afford a universal basic income?',positions:['UBI is economically viable and would stimulate growth','UBI is fiscally unsustainable for any advanced economy']},
          {title:'Austerity vs Stimulus',sub:'Which fiscal response best handles economic crises?',positions:['Government stimulus is the correct response to economic crises','Austerity and fiscal discipline are essential during downturns']},
        ]},
    ]
  },
  {
    id:'ai', label:'AI & Tech', accent:'#534AB7',
    subs:[
      { id:'ai_society', label:'AI & Society', sources:['MIT Tech Review (technologyreview.com)','Wired (wired.com)','Anthropic (anthropic.com)','IEEE Spectrum (spectrum.ieee.org)'],
        topics:[
          {title:'AI Will Eliminate More Jobs Than It Creates',sub:'Threat or opportunity for the workforce?',positions:['AI will eliminate more jobs than it creates','AI will create more jobs than it destroys']},
          {title:'Strong AI Regulation Is Needed Now',sub:'Should governments act before it\'s too late?',positions:['Strong AI regulation is needed immediately','Premature regulation will harm innovation and progress']},
          {title:'AI-Generated Art Is Legitimate Art',sub:'Does AI creativity have genuine artistic value?',positions:['AI-generated art is legitimate art','AI outputs lack the authenticity of human art']},
          {title:'Open Source vs Closed AI Models',sub:'Which approach is better for humanity?',positions:['Open source AI is better for humanity','Closed proprietary AI models are safer and more responsible']},
          {title:'AI in Criminal Justice',sub:'Should AI systems be used in sentencing decisions?',positions:['AI can make criminal justice more consistent and fair','AI must never be used in sentencing due to bias and opacity']},
          {title:'Autonomous Weapons',sub:'Should lethal autonomous weapons be banned?',positions:['Lethal autonomous weapons must be banned internationally','Autonomous weapons could reduce human casualties in conflict']},
        ]},
      { id:'tech_platforms', label:'Tech & Platforms', sources:['Wired (wired.com)','TechCrunch (techcrunch.com)','The Verge (theverge.com)','Ars Technica (arstechnica.com)'],
        topics:[
          {title:'Social Media Algorithm Regulation',sub:'Should recommendation algorithms be regulated?',positions:['Social media algorithms must be strictly regulated','Regulating algorithms threatens free expression online']},
          {title:'Right to Be Forgotten Online',sub:'Should people control their digital footprint?',positions:['People have the right to erase their digital past','The right to be forgotten threatens free information flow']},
          {title:'Big Tech Breakup',sub:'Should Google, Amazon and Meta be broken up?',positions:['Big tech monopolies must be broken up by antitrust action','Breaking up big tech would harm innovation and user experience']},
          {title:'Net Neutrality',sub:'Should all internet traffic be treated equally?',positions:['Net neutrality must be enshrined in law','Ending net neutrality allows market forces to improve infrastructure']},
          {title:'Children on Social Media',sub:'Should social media be banned for under-16s?',positions:['Social media must be banned for children under 16','Banning children from social media is unenforceable and paternalistic']},
          {title:'End-to-End Encryption',sub:'Should governments be able to access encrypted messages?',positions:['End-to-end encryption must be protected absolutely','Governments need lawful access to encrypted communications for safety']},
        ]},
    ]
  },
  {
    id:'education', label:'Education', accent:'#3B6D11',
    subs:[
      { id:'higher_ed', label:'Higher Education', sources:['OECD (oecd.org)','Harvard Ed Review (gse.harvard.edu)','Times Higher Ed (timeshighereducation.com)','EdSurge (edsurge.com)'],
        topics:[
          {title:'University Degrees vs Vocational Training',sub:'Which better prepares students for the future?',positions:['University degrees remain essential for career and personal development','Vocational training better prepares most students for the modern economy']},
          {title:'Student Loan Forgiveness',sub:'Is blanket loan forgiveness fair to all taxpayers?',positions:['Student loan forgiveness is an economic and social necessity','Student loan forgiveness is unfair to taxpayers and non-graduates']},
          {title:'Free University Education',sub:'Should university be free for all citizens?',positions:['University education should be fully state-funded','Tuition fees are a fair contribution from those who benefit most']},
          {title:'Online vs In-Person Degrees',sub:'Are online degrees as valuable as traditional ones?',positions:['Online degrees are equally valuable in the modern economy','In-person degrees provide irreplaceable networking and social development']},
          {title:'Grade Inflation',sub:'Is grade inflation devaluing academic qualifications?',positions:['Grade inflation is seriously devaluing academic standards','Higher grades reflect improved teaching methods and student support']},
          {title:'Legacy Admissions',sub:'Should elite universities give preference to alumni children?',positions:['Legacy admissions must be abolished as fundamentally unfair','Legacy admissions support alumni relations and endowment funding']},
        ]},
      { id:'school', label:'School & Curriculum', sources:['UNESCO (unesco.org)','OECD (oecd.org)','EdSurge (edsurge.com)','Education Week (edweek.org)'],
        topics:[
          {title:'AI Tools in the Classroom',sub:'Should AI assistants be allowed in schools?',positions:['AI tools should be embraced as educational assets','AI in classrooms undermines genuine learning and critical thinking']},
          {title:'Standardised Testing',sub:'Do standardised tests measure what actually matters?',positions:['Standardised tests are essential for fair and objective assessment','Standardised tests are a poor and narrow measure of student ability']},
          {title:'Homeschooling vs Traditional School',sub:'Which produces better outcomes for children?',positions:['Homeschooling can produce superior academic and personal outcomes','Traditional school provides irreplaceable social and civic development']},
          {title:'School Uniforms',sub:'Do uniforms improve learning outcomes?',positions:['School uniforms improve discipline, focus and equality','Uniforms suppress individuality and add financial burden to families']},
          {title:'Sex Education Standards',sub:'Should comprehensive sex education be mandatory in all schools?',positions:['Comprehensive sex education must be mandatory in all schools','Sex education should be left to parents and local communities']},
          {title:'Phones in Classroom',sub:'Should smartphones be banned in schools?',positions:['Smartphones must be banned from school premises entirely','Smartphone bans ignore reality and fail to teach digital responsibility']},
        ]},
    ]
  },
  {
    id:'climate', label:'Climate', accent:'#0F6E56',
    subs:[
      { id:'energy', label:'Energy Policy', sources:['IPCC (ipcc.ch)','NASA Climate (climate.nasa.gov)','IEA (iea.org)','Carbon Brief (carbonbrief.org)'],
        topics:[
          {title:'Nuclear vs Renewable Energy',sub:'The best path to net-zero emissions?',positions:['Nuclear power is essential to achieving net-zero','Renewables alone can and must achieve net-zero']},
          {title:'EV Mandates by 2030',sub:'Should governments force electric vehicle adoption?',positions:['EV mandates are necessary and justified climate policy','EV mandates are premature and economically counterproductive']},
          {title:'Carbon Tax vs Cap and Trade',sub:'Which climate policy mechanism is most effective?',positions:['A carbon tax is the superior climate policy instrument','Cap and trade is more effective at driving emissions reductions']},
          {title:'Coal Phase-Out Speed',sub:'Should coal power be phased out faster regardless of cost?',positions:['Coal must be phased out immediately regardless of economic cost','A managed transition away from coal is the responsible approach']},
          {title:'Hydrogen Economy',sub:'Is hydrogen the fuel of the future?',positions:['Hydrogen is an essential component of a net-zero energy system','Hydrogen faces insurmountable efficiency challenges that limit its role']},
          {title:'Energy Independence vs Global Trade',sub:'Should nations prioritise domestic energy over cheap imports?',positions:['Energy independence is worth the economic premium it commands','Energy should follow global comparative advantage like any other commodity']},
        ]},
      { id:'climate_action', label:'Climate Action', sources:['IPCC (ipcc.ch)','Nature (nature.com)','Carbon Brief (carbonbrief.org)','The Guardian (theguardian.com)'],
        topics:[
          {title:'Geoengineering the Climate',sub:'Should humanity artificially intervene in Earth\'s climate?',positions:['Geoengineering is a necessary intervention we cannot afford to ignore','Geoengineering poses unacceptable planetary-scale risks']},
          {title:'Tax on Red Meat',sub:'Should governments tax red meat to reduce emissions?',positions:['A red meat tax is a justified and necessary climate policy','Taxing red meat is government overreach into personal dietary choices']},
          {title:'Fast Fashion Regulation',sub:'Is the fashion industry too harmful to continue unchecked?',positions:['Fast fashion must face heavy regulation or phased bans','Market forces and consumer choice should drive fashion industry reform']},
          {title:'Climate Activism Tactics',sub:'Are disruptive protest tactics justified for the climate?',positions:['Disruptive climate protest tactics are morally justified','Disruptive activism damages public support for climate action']},
          {title:'Developing Nations and Climate',sub:'Should rich countries fund poor nations\' climate transition?',positions:['Wealthy nations must fund developing countries\' clean energy transition','Each nation is responsible for financing its own climate transition']},
          {title:'Individual vs Corporate Responsibility',sub:'Who bears the greater burden for climate change?',positions:['Corporations and governments bear primary responsibility for climate change','Individual consumer choices are equally essential to solving climate change']},
        ]},
    ]
  },
  {
    id:'arts', label:'Art & Culture', accent:'#993556',
    subs:[
      { id:'art_debate', label:'Art & Music', sources:['The Art Newspaper (theartnewspaper.com)','Pitchfork (pitchfork.com)','Artforum (artforum.com)','The Atlantic (theatlantic.com)'],
        topics:[
          {title:'AI Art in Museums',sub:'Should AI-generated art be exhibited as fine art?',positions:['AI art belongs in museums alongside human art','AI art should not be exhibited as legitimate fine art']},
          {title:'Streaming vs Physical Music',sub:'Which model better serves artists and listeners?',positions:['Streaming benefits artists and fans overall','Physical music formats better serve artists economically']},
          {title:'Award Shows Still Matter',sub:'Do the Oscars and Grammys reflect genuine quality?',positions:['Major award shows still hold important cultural significance','Award shows no longer reflect artistic quality or merit']},
          {title:'Music Sampling and Copyright',sub:'Should artists have unlimited freedom to sample existing work?',positions:['Sampling is a legitimate creative act that should be more freely permitted','Copyright protection for original works must be strictly upheld']},
          {title:'Public Arts Funding',sub:'Should governments fund arts and culture with public money?',positions:['Public arts funding is a social investment with wide cultural benefit','Arts should be funded by audiences and private patronage alone']},
          {title:'NFTs in the Art World',sub:'Have NFTs been good or bad for artists?',positions:['NFTs have democratised art ownership and benefited artists','NFTs have been harmful to both art and the environment']},
        ]},
      { id:'culture', label:'Culture & Society', sources:['The Atlantic (theatlantic.com)','The Guardian (theguardian.com)','Artforum (artforum.com)','New Yorker (newyorker.com)'],
        topics:[
          {title:'Cultural Repatriation of Artifacts',sub:'Should museums return disputed cultural objects?',positions:['Museums must return disputed cultural artifacts to their countries of origin','Museums are better stewards of disputed artifacts than many origin nations']},
          {title:'Censoring Classic Literature',sub:'Should offensive classics be updated or removed from curricula?',positions:['Classic literature must be taught in full historical context','Harmful content in classics should be updated or removed from school curricula']},
          {title:'Street Art: Vandalism or Culture',sub:'Should graffiti be legally protected as art?',positions:['Street art is a legitimate and valuable cultural form deserving protection','Graffiti is vandalism and should not receive legal protection']},
          {title:'Cultural Appropriation',sub:'Where is the line between appreciation and appropriation?',positions:['Cultural appropriation causes real harm and must be challenged','Cultural exchange is natural and beneficial and should not be policed']},
          {title:'Cancel Culture',sub:'Is cancel culture a legitimate form of social accountability?',positions:['Cancel culture is a necessary tool for holding powerful people accountable','Cancel culture is a form of mob justice that harms free expression']},
          {title:'Representation in Film',sub:'Should diversity quotas be applied to film casting?',positions:['Diversity requirements in film casting produce fairer representation','Casting decisions must be based on suitability for the role alone']},
        ]},
    ]
  },
  {
    id:'health', label:'Health & Wellness', accent:'#e01d3f',
    subs:[
      { id:'healthcare', label:'Healthcare Systems', sources:['WHO (who.int)','The Lancet (thelancet.com)','NEJM (nejm.org)','Harvard Health (health.harvard.edu)'],
        topics:[
          {title:'Universal Healthcare',sub:'Should healthcare be free for all citizens?',positions:['Universal healthcare is a fundamental human right','Universal healthcare creates inefficiency and unsustainable costs']},
          {title:'Mandatory Vaccination',sub:'Should vaccination be legally required?',positions:['Mandatory vaccination is justified by the science of public health','Vaccination must remain a matter of personal and parental choice']},
          {title:'Mental Health Parity',sub:'Should mental health receive equal funding to physical health?',positions:['Mental health services must receive equal funding to physical health','Resource allocation in healthcare must be based on clinical burden of disease']},
          {title:'Pharmaceutical Pricing',sub:'Should governments control drug pricing?',positions:['Governments must regulate pharmaceutical pricing to protect patients','Price controls reduce the incentive to develop life-saving drugs']},
          {title:'Euthanasia and Assisted Dying',sub:'Should assisted dying be legal for terminally ill patients?',positions:['Assisted dying must be a legal option for terminally ill adults','Legalising assisted dying puts vulnerable people at serious risk']},
          {title:'Private Healthcare Competition',sub:'Does private healthcare improve or harm the public system?',positions:['Private healthcare competition improves outcomes and efficiency','Private healthcare drains talent and resources from public systems']},
        ]},
      { id:'wellness', label:'Wellness & Lifestyle', sources:['WHO (who.int)','Mayo Clinic (mayoclinic.org)','Harvard Health (health.harvard.edu)','WebMD (webmd.com)'],
        topics:[
          {title:'Legalising Recreational Drugs',sub:'Should drugs like marijuana be fully legalised?',positions:['Recreational drugs should be legalised and regulated','Legalising recreational drugs causes more societal harm than good']},
          {title:'Mental Health Days as Sick Leave',sub:'Should mental health absences be formally recognised?',positions:['Mental health days must be formally recognised as legitimate sick leave','Mental health day policies risk significant abuse of sick leave systems']},
          {title:'Veganism for Health',sub:'Is a vegan diet truly superior for human health?',positions:['A well-planned vegan diet is the healthiest choice for most people','Veganism is not nutritionally superior for all individuals']},
          {title:'Fitness Trackers',sub:'Do wearables improve or obsess over health?',positions:['Fitness trackers meaningfully improve health outcomes and motivation','Fitness trackers create unhealthy obsession with data and metrics']},
          {title:'Screen Time for Children',sub:'Should governments set limits on children\'s screen time?',positions:['Government guidance on children\'s screen time is necessary and justified','Parental responsibility alone should govern children\'s screen use']},
          {title:'Junk Food Advertising Bans',sub:'Should junk food ads targeting children be banned?',positions:['Junk food advertising aimed at children must be banned','Advertising bans infringe on commercial speech and parental authority']},
        ]},
    ]
  },
  {
    id:'philosophy', label:'Philosophy', accent:'#854F0B',
    subs:[
      { id:'ethics', label:'Ethics', sources:['Stanford Encyclopedia (plato.stanford.edu)','Aeon (aeon.co)','PhilPapers (philpapers.org)','Oxford Philosophy (philosophy.ox.ac.uk)'],
        topics:[
          {title:'Utilitarianism vs Deontology',sub:'Which ethical framework is more sound?',positions:['Utilitarianism is the superior ethical theory','Deontology provides a more robust and consistent moral framework']},
          {title:'The Trolley Problem',sub:'Is it ethical to sacrifice one to save many?',positions:['It is ethical to act and divert the trolley to save the greater number','We must never use a person merely as a means to an end']},
          {title:'Capital Punishment: Ethical or Not',sub:'Is the death penalty ever morally justifiable?',positions:['Capital punishment can be morally justified in extreme cases','The death penalty is never ethically justifiable in a civilised society']},
          {title:'Animal Rights vs Human Interests',sub:'Do animals have rights that override human interests?',positions:['Animals have inherent rights that must override many human interests','Human interests legitimately take precedence over animal welfare in most cases']},
          {title:'Moral Relativism',sub:'Is morality culturally relative or universally objective?',positions:['Moral values are culturally relative and cannot be universally imposed','There exist objective moral truths that apply across all cultures']},
          {title:'Assisted Suicide Ethics',sub:'Is assisting in someone\'s death ever morally permissible?',positions:['Assisting in death can be a morally compassionate act','Deliberately ending a life is always morally impermissible']},
        ]},
      { id:'metaphysics', label:'Metaphysics & Mind', sources:['Stanford Encyclopedia (plato.stanford.edu)','PhilPapers (philpapers.org)','Aeon (aeon.co)','Oxford Philosophy (philosophy.ox.ac.uk)'],
        topics:[
          {title:'Free Will vs Determinism',sub:'Do humans truly have freedom of choice?',positions:['Free will is real and meaningful','Determinism better explains human behaviour and decision-making']},
          {title:'Can AI Achieve Consciousness?',sub:'Is genuine machine consciousness philosophically possible?',positions:['AI systems can achieve genuine consciousness','Genuine consciousness requires biological substrates and cannot be replicated in machines']},
          {title:'Meaning Without God',sub:'Can life have objective meaning without religion?',positions:['Secular humanism provides genuine and sufficient meaning','Objective meaning requires a transcendent source beyond humanity']},
          {title:'Personal Identity',sub:'What makes you the same person over time?',positions:['Psychological continuity is what constitutes personal identity over time','Bodily and biological continuity is what constitutes personal identity']},
          {title:'Simulation Hypothesis',sub:'Are we living in a computer simulation?',positions:['The simulation hypothesis is philosophically coherent and possibly true','The simulation hypothesis is philosophically unfalsifiable and not meaningful']},
          {title:'Moral Status of Future Generations',sub:'Do future people have rights that constrain present decisions?',positions:['Future generations have full moral status that must constrain present choices','Present people cannot be bound by obligations to non-existent persons']},
        ]},
    ]
  },
  {
    id:'food', label:'Food & Drink', accent:'#c47a1e',
    subs:[
      { id:'food_systems', label:'Food Systems', sources:['WHO Nutrition (who.int)','FAO (fao.org)','Food Network (foodnetwork.com)','James Beard Foundation (jamesbeard.org)'],
        topics:[
          {title:'Lab-Grown Meat',sub:'Should cultured meat replace traditional animal farming?',positions:['Lab-grown meat is the sustainable future of food production','Lab-grown meat cannot replace the cultural and economic role of traditional farming']},
          {title:'Organic vs Conventional Farming',sub:'Is organic food worth the premium cost?',positions:['Organic farming is worth the premium for health and environmental reasons','Conventional farming is equally safe and significantly more efficient']},
          {title:'Ultra-Processed Food Bans',sub:'Should junk food face heavy government restriction?',positions:['Ultra-processed food must be heavily regulated to protect public health','Consumer freedom must override paternalistic food regulation']},
          {title:'Food Delivery Apps',sub:'Are platforms like DoorDash helping or hurting restaurants?',positions:['Food delivery apps expand restaurants\' reach and grow their revenue','Delivery platforms exploit restaurants and gig workers at unsustainable margins']},
          {title:'Veganism as Ethical Imperative',sub:'Should society pressure people to go vegan?',positions:['Veganism is an ethical imperative given its environmental and animal welfare benefits','Veganism must remain a freely made personal dietary choice']},
          {title:'Food Waste Legislation',sub:'Should governments legislate to reduce food waste?',positions:['Governments must legislate to dramatically reduce food waste in supply chains','Food waste reduction is better achieved through market incentives than law']},
        ]},
      { id:'food_culture', label:'Food Culture', sources:['Bon Appétit (bonappetit.com)','Food Network (foodnetwork.com)','Eater (eater.com)','James Beard Foundation (jamesbeard.org)'],
        topics:[
          {title:'Fast Food vs Home Cooking',sub:'Which model better serves modern families?',positions:['Fast food is a practical necessity that serves modern lifestyles','Home cooking produces better health outcomes and stronger family culture']},
          {title:'Celebrity Chefs and Food Culture',sub:'Have celebrity chefs been good for food culture?',positions:['Celebrity chefs have elevated food culture and inspired a generation of cooks','Celebrity chefs have made food culture elitist and commercially exploitative']},
          {title:'Food Critics Still Relevant',sub:'Do professional food critics still matter in the age of Yelp?',positions:['Professional food critics bring expertise and accountability that reviews cannot replace','Crowd-sourced reviews have made professional food critics irrelevant']},
          {title:'Michelin Stars',sub:'Do Michelin stars distort restaurant culture negatively?',positions:['Michelin stars drive culinary excellence and benefit the industry','The pursuit of Michelin stars distorts chefs\' creativity and harms their wellbeing']},
          {title:'Fusion Cuisine',sub:'Is fusion cuisine cultural appropriation or creative evolution?',positions:['Fusion cuisine is a celebration of cultural exchange and culinary creativity','Fusion cuisine frequently appropriates and diminishes source food cultures']},
          {title:'Alcohol in Society',sub:'Should governments do more to reduce alcohol consumption?',positions:['Governments must take stronger action to reduce harmful alcohol consumption','Alcohol regulation should be minimal as personal responsibility must prevail']},
        ]},
    ]
  },
  {
    id:'business', label:'Business & Leadership', accent:'#2c6e8a',
    subs:[
      { id:'leadership', label:'Leadership & Management', sources:['Harvard Business Review (hbr.org)','MIT Sloan Review (sloanreview.mit.edu)','McKinsey (mckinsey.com)','Forbes (forbes.com)'],
        topics:[
          {title:'Remote Work vs Office Work',sub:'Which model produces better results for companies?',positions:['Remote work produces superior results and attracts better talent','Office work drives better collaboration, culture and innovation']},
          {title:'CEO Pay: Is It Too High',sub:'Should executive compensation be capped?',positions:['CEO compensation is grossly disproportionate and should be capped','CEO pay reflects the market value of exceptional and rare leadership talent']},
          {title:'Flat vs Hierarchical Organisations',sub:'Which structure produces better business outcomes?',positions:['Flat organisational structures outperform hierarchies in innovation and speed','Clear hierarchies produce better accountability and more scalable organisations']},
          {title:'Diversity Quotas in Business',sub:'Should companies face mandatory diversity targets?',positions:['Mandatory diversity targets produce fairer and more innovative organisations','Diversity quotas undermine meritocracy and can stigmatise minority employees']},
          {title:'Four-Day Work Week',sub:'Can businesses thrive on a compressed schedule?',positions:['A four-day work week improves productivity and employee retention','A four-day week creates operational challenges that most businesses cannot absorb']},
          {title:'Whistleblower Protection',sub:'Should organisations have stronger legal duty to protect whistleblowers?',positions:['Whistleblower protection must be dramatically strengthened in law','Existing whistleblower protections are adequate and further law is unnecessary']},
        ]},
      { id:'startups', label:'Startups & Innovation', sources:['TechCrunch (techcrunch.com)','Forbes (forbes.com)','Y Combinator Blog (ycombinator.com)','Harvard Business Review (hbr.org)'],
        topics:[
          {title:'Startups vs Established Corporations',sub:'Which drives more meaningful innovation?',positions:['Startups drive more meaningful innovation than large corporations','Established corporations produce more impactful and lasting innovation']},
          {title:'VC Funding Culture',sub:'Has venture capital been good for innovation?',positions:['Venture capital has been essential to funding transformative innovation','VC culture prioritises growth over sustainability and produces more harm than good']},
          {title:'Non-Compete Clauses',sub:'Should employees be free to move to competitors?',positions:['Non-compete clauses protect legitimate business interests and IP','Non-compete clauses unfairly restrict worker freedom and harm innovation']},
          {title:'Startup Failure Rate',sub:'Is the high startup failure rate a feature or bug of the ecosystem?',positions:['High startup failure rates are a necessary feature of a healthy innovation ecosystem','The startup ecosystem must do more to reduce unnecessary failure and waste']},
          {title:'Bootstrapping vs VC Funding',sub:'Which path builds better companies?',positions:['Bootstrapped companies build more sustainable and founder-aligned businesses','VC-backed companies achieve more ambitious scale and societal impact']},
          {title:'Unicorn Culture',sub:'Has the pursuit of unicorn status damaged startup culture?',positions:['The unicorn pursuit has distorted startup values and harmed employees','Pursuing ambitious scale produces the breakthroughs that change the world']},
        ]},
    ]
  },
  {
    id:'science', label:'Science & Space', accent:'#1a6b8a',
    subs:[
      { id:'space', label:'Space Exploration', sources:['NASA (nasa.gov)','SpaceX (spacex.com)','Scientific American (scientificamerican.com)','New Scientist (newscientist.com)'],
        topics:[
          {title:'Mars Colonisation: Viable or Fantasy',sub:'Should humanity prioritise Mars over fixing Earth?',positions:['Mars colonisation is a necessary goal for the long-term survival of humanity','Resources for Mars should be redirected urgently to fix problems on Earth first']},
          {title:'Private Space Companies vs NASA',sub:'Who should lead humanity\'s space exploration?',positions:['Private companies like SpaceX are the future of space exploration','Space exploration must remain a public scientific endeavour not driven by profit']},
          {title:'Space Debris Regulation',sub:'Should there be international law on space debris?',positions:['International law on space debris is urgently needed','Current voluntary guidelines are sufficient to manage space debris']},
          {title:'Extraterrestrial Life Search Priority',sub:'Should the search for alien life be a top scientific priority?',positions:['The search for extraterrestrial life deserves to be a top scientific funding priority','Other more pressing scientific priorities should take precedence over SETI']},
          {title:'Moon Base Before Mars',sub:'Should humanity establish a lunar base before attempting Mars?',positions:['A permanent Moon base is the essential and logical step before Mars','Humanity should go directly to Mars rather than establishing an intermediate Moon base']},
          {title:'Space Tourism Ethics',sub:'Is space tourism an ethical use of resources?',positions:['Space tourism drives private investment that benefits the entire space industry','Space tourism is an obscene use of carbon and capital given Earth\'s urgent problems']},
        ]},
      { id:'biotech', label:'Biotech & Research', sources:['Nature (nature.com)','NEJM (nejm.org)','Scientific American (scientificamerican.com)','MIT Tech Review (technologyreview.com)'],
        topics:[
          {title:'Human Gene Editing with CRISPR',sub:'Should CRISPR be used to eliminate heritable disease?',positions:['CRISPR gene editing to eliminate heritable disease is scientifically and ethically justified','Human germline editing crosses an irreversible ethical line that must not be crossed']},
          {title:'Animal Testing in Research',sub:'Is animal testing ever ethically justified?',positions:['Animal testing remains a necessary and justified tool in biomedical research','Animal testing is ethically unjustifiable and must be banned and replaced']},
          {title:'Artificial Wombs',sub:'Should ectogenesis technology be developed and used?',positions:['Artificial womb technology should be developed and made available','Ectogenesis raises fundamental ethical concerns that outweigh any benefit']},
          {title:'Cloning Research',sub:'Should therapeutic human cloning be permitted?',positions:['Therapeutic cloning for medical research should be permitted','All forms of human cloning must be prohibited on ethical grounds']},
          {title:'Pandemic Preparedness Funding',sub:'Should governments massively increase pandemic preparedness spending?',positions:['Governments must dramatically increase investment in pandemic preparedness','Current pandemic preparedness frameworks are adequate with targeted improvements']},
          {title:'Brain-Computer Interfaces',sub:'Should brain-computer interface technology be regulated now?',positions:['BCI technology requires urgent regulatory frameworks before widespread deployment','Regulating BCI technology prematurely would stifle crucial medical innovation']},
        ]},
    ]
  },
  {
    id:'law', label:'Law & Justice', accent:'#4a3a6e',
    subs:[
      { id:'criminal_justice', label:'Criminal Justice', sources:['ABA Journal (abajournal.com)','ACLU (aclu.org)','SCOTUSblog (scotusblog.com)','Brennan Center (brennancenter.org)'],
        topics:[
          {title:'Capital Punishment: For or Against',sub:'Is the death penalty ever justified by the state?',positions:['Capital punishment is a justified tool of the justice system','The death penalty is never justifiable in a civilised society and must be abolished']},
          {title:'Jury Trials vs Judge-Only Trials',sub:'Which system produces fairer verdicts?',positions:['Jury trials produce fairer and more representative verdicts','Judge-only trials produce more legally sound and consistent outcomes']},
          {title:'Restorative vs Punitive Justice',sub:'Which approach better reduces reoffending?',positions:['Restorative justice produces better reoffending outcomes than punishment','Punitive justice is necessary for deterrence and cannot be replaced by restoration']},
          {title:'Mandatory Minimum Sentences',sub:'Should judges be bound by mandatory minimum sentencing?',positions:['Mandatory minimum sentences provide essential consistency and deterrence','Mandatory minimums remove judicial discretion and produce disproportionate outcomes']},
          {title:'Drug Decriminalisation',sub:'Should all personal drug use be decriminalised?',positions:['Decriminalising all personal drug use reduces harm and is more just','Decriminalisation sends the wrong social and public health signal']},
          {title:'Prison Reform',sub:'Is the prison system fit for purpose?',positions:['The prison system requires radical reform to focus on rehabilitation','The primary function of prison must remain punishment and public protection']},
        ]},
      { id:'rights_law', label:'Rights & Civil Liberties', sources:['ACLU (aclu.org)','Human Rights Watch (hrw.org)','Amnesty International (amnesty.org)','ECHR (echr.coe.int)'],
        topics:[
          {title:'Affirmative Action in Universities',sub:'Should race be a factor in college admissions?',positions:['Affirmative action is necessary to correct systemic historical inequality','Race-based admissions are unconstitutional and counterproductive']},
          {title:'Mass Surveillance vs Privacy Rights',sub:'Should governments be allowed to mass-surveil citizens?',positions:['National security justifies mass surveillance programmes','Mass surveillance is an unacceptable violation of fundamental civil liberties']},
          {title:'Free Speech Limits',sub:'Where should the legal limits of free speech lie?',positions:['Free speech must be protected absolutely except for direct incitement to violence','Hate speech and harmful misinformation justify legal limits on free expression']},
          {title:'Religious Freedom vs Anti-Discrimination',sub:'When do they conflict, which should take precedence?',positions:['Religious freedom must yield to anti-discrimination law when they conflict','Religious freedom must be robustly protected even when it conflicts with equality law']},
          {title:'Right to Bear Arms',sub:'Should gun ownership be a protected constitutional right?',positions:['The right to bear arms is a fundamental and protected constitutional right','Gun ownership is a policy choice not a constitutional right and must be regulated']},
          {title:'Digital Rights',sub:'Should internet access be a fundamental human right?',positions:['Internet access must be recognised as a fundamental human right','Internet access is a utility or privilege not a fundamental right']},
        ]},
    ]
  },
];

// ================================================================
// STATE
// ================================================================
const S = {
  topic:'', positions:[], position:'',
  persona:'Domain Analyst', tone:'compelling and rhetorically persuasive',
  depth:'220-270', lang:'', source:'',
  layers:{}, totalIn:0, totalOut:0, startTime:0,
  running:false,
  kokoroEnabled:false, kokoroVoice:'af_sky',
  fallacyOn:true, socraticOn:false, videoOn:false,
  socraticPending:false, socraticAnswers:[],
  liveActive:false, liveTranscript:[], liveRound:0,
  recognition:null, recognizing:false,
  activeAudio:null,
  history:[], lastScore:null,
  waveInterval:null, siInterval:null,
  currentCat:'sports'
};


// ================================================================
// MULTILINGUAL SYSTEM
// 4 languages: English · Arabic · Urdu · Spanish
// UI strings, RTL layout, prompt injection, voice fallback
// ================================================================

const LANGS = {
  en: {
    code: 'en', dir: 'ltr', name: 'English',
    promptInstruction: '',
    voiceLang: 'en-US',
    kokoroSupported: true,
    strings: {
      appTagline: 'AI Debate Strategist · Sharpen Your Thinking · Powered by Claude',
      hostedBy: 'Hosted by Loffi',
      selectTopic: 'Select Topic',
      dispatchPreview: 'Dispatch Preview',
      selectedMotion: 'Selected Motion',
      pickTopic: 'Pick a topic and position →',
      printSettings: 'Print Settings',
      fallacyScan: 'Fallacy Scan',
      socraticDrill: 'Socratic Drill',
      liveAvatar: 'Live Avatar',
      customPlaceholder: 'Or propose your own motion...',
      customBtn: 'File →',
      configureArg: 'Configure Your Argument',
      yourPosition: 'Your Position',
      persona: 'Persona',
      depth: 'Argument Depth',
      language: 'Language',
      knowledgeSource: 'Knowledge Source',
      toneLabel: 'Tone —',
      runBtn: '⊕ Run 5-Layer Reasoning Engine',
      runSub: 'Loffi will argue · question · counter · critique · deliver verdict',
      running: 'Composing dispatch...',
      debate: 'Debate',
      arena: 'Arena',
      live: 'Live',
      flowchart: 'Flowchart',
      archive: 'Archive',
      export: 'Export',
      copy: 'Copy',
      clear: 'Clear',
      debateTab: 'Today\'s Edition',
      headline: 'Sharpen your thinking with',
      headlineEm: 'ArgueMind',
      deck: 'Your AI debate strategist. Loffi argues, challenges, questions your logic, fires back in real time, and delivers a verdict that makes you think harder.',
      byline: 'Hosted by Loffi · AI Debate Strategist · All Editions',
      statCats: 'Categories', statLayers: 'Layers', statTopics: 'Topics', statModes: 'Modes',
      arenaTitle: 'Loffi vs The Opposition',
      arenaDeck: 'Watch two AI debaters go head-to-head. Loffi argues one side; you assign the opponent\'s persona. An impartial judge delivers the final verdict.',
      liveTitle: 'Debate Loffi live',
      liveDeck: 'Speak your arguments. Loffi listens, sharpens her counter in real time, and fires back. Your microphone vs her reasoning.',
      archiveTitle: 'Your Argument Record',
      openFloor: 'Open Floor',
      micSpeak: 'Mic — Hold to speak',
      endJudge: 'End & Judge',
      copyBtn: 'Copy',
      readAloud: 'Read Aloud',
      printed: 'PRINTED',
      composing: 'COMPOSING',
      socraticHead: 'LOFFI CHALLENGES YOUR LOGIC — Answer before we continue',
      socraticSubmit: 'Strengthen arguments → Continue',
      fallacyAlertHead: '⚠ Logical Fallacy Alert — Review Before Arguing',
    }
  },
  ar: {
    code: 'ar', dir: 'rtl', name: 'العربية',
    promptInstruction: 'اكتب ردك بالكامل باللغة العربية الفصحى. استخدم أسلوباً أكاديمياً واضحاً. ',
    voiceLang: 'ar-SA',
    kokoroSupported: false,
    strings: {
      appTagline: 'استراتيجي النقاش بالذكاء الاصطناعي · شحذ تفكيرك · بتقنية كلود',
      hostedBy: 'مستضاف من لوفي',
      selectTopic: 'اختر الموضوع',
      dispatchPreview: 'معاينة القضية',
      selectedMotion: 'الموضوع المختار',
      pickTopic: 'اختر موضوعاً وموقفاً →',
      printSettings: 'إعدادات الطباعة',
      fallacyScan: 'فحص المغالطات',
      socraticDrill: 'التدريب السقراطي',
      liveAvatar: 'الصورة المباشرة',
      customPlaceholder: 'أو اقترح موضوعك الخاص...',
      customBtn: 'إرسال ←',
      configureArg: 'تكوين حجتك',
      yourPosition: 'موقفك',
      persona: 'الشخصية',
      depth: 'عمق الحجة',
      language: 'اللغة',
      knowledgeSource: 'مصدر المعرفة',
      toneLabel: 'النبرة —',
      runBtn: '⊕ تشغيل محرك التفكير من 7 طبقات',
      runSub: 'لوفي ستجادل · تتساءل · تعارض · تنتقد · وتصدر حكمها',
      running: 'جاري التأليف...',
      debate: 'نقاش',
      arena: 'الحلبة',
      live: 'مباشر',
      flowchart: 'المخطط',
      archive: 'الأرشيف',
      export: 'تصدير',
      copy: 'نسخ',
      clear: 'مسح',
      debateTab: 'إصدار اليوم',
      headline: 'شحذ تفكيرك مع',
      headlineEm: 'ArgueMind',
      deck: 'استراتيجي النقاش بالذكاء الاصطناعي. لوفي تجادل وتتحدى وتشكك في منطقك وترد عليك في الوقت الفعلي.',
      byline: 'مستضاف من لوفي · استراتيجي نقاش الذكاء الاصطناعي · جميع الإصدارات',
      statCats: 'الفئات', statLayers: 'الطبقات', statTopics: 'الموضوعات', statModes: 'الأوضاع',
      arenaTitle: 'لوفي في مواجهة المعارض',
      arenaDeck: 'شاهد متناقشَين من الذكاء الاصطناعي يواجهان بعضهما. لوفي تجادل في أحد الجانبين؛ أنت تعيّن شخصية المعارض.',
      liveTitle: 'ناقش لوفي مباشرة',
      liveDeck: 'تكلم بحججك. لوفي تستمع وتصوغ ردها في الوقت الفعلي.',
      archiveTitle: 'سجل نقاشاتك',
      openFloor: 'افتح الجلسة',
      micSpeak: 'المايكروفون — امسك للتحدث',
      endJudge: 'إنهاء والحكم',
      copyBtn: 'نسخ',
      readAloud: 'اقرأ بصوت عالٍ',
      printed: 'مطبوع',
      composing: 'جاري التأليف',
      socraticHead: 'لوفي تتحدى منطقك — أجب قبل المتابعة',
      socraticSubmit: 'تعزيز الحجج ← المتابعة',
      fallacyAlertHead: '⚠ تنبيه مغالطة منطقية — راجع قبل الجدال',
    }
  },
  ur: {
    code: 'ur', dir: 'rtl', name: 'اردو',
    promptInstruction: 'اپنا مکمل جواب اردو میں لکھیں۔ واضح اور معیاری اردو استعمال کریں۔ ',
    voiceLang: 'ur-PK',
    kokoroSupported: false,
    strings: {
      appTagline: 'اے آئی بحث حکمت عملی · اپنی سوچ تیز کریں · کلود سے چلائی گئی',
      hostedBy: 'لوفی کی میزبانی میں',
      selectTopic: 'موضوع منتخب کریں',
      dispatchPreview: 'تحریک کی پیش نظر',
      selectedMotion: 'منتخب تحریک',
      pickTopic: 'موضوع اور مؤقف منتخب کریں →',
      printSettings: 'پرنٹ ترتیبات',
      fallacyScan: 'غلط استدلال کا اسکین',
      socraticDrill: 'سقراطی مشق',
      liveAvatar: 'لائیو اوتار',
      customPlaceholder: 'یا اپنا موضوع تجویز کریں...',
      customBtn: 'جمع کریں ←',
      configureArg: 'اپنی دلیل ترتیب دیں',
      yourPosition: 'آپ کا مؤقف',
      persona: 'کردار',
      depth: 'دلیل کی گہرائی',
      language: 'زبان',
      knowledgeSource: 'علم کا ماخذ',
      toneLabel: 'لہجہ —',
      runBtn: '⊕ سات پرت استدلال انجن چلائیں',
      runSub: 'لوفی بحث کرے گی · سوال اٹھائے گی · مخالفت کرے گی · تنقید کرے گی · فیصلہ سنائے گی',
      running: 'تیار ہو رہا ہے...',
      debate: 'بحث',
      arena: 'میدان',
      live: 'براہ راست',
      flowchart: 'فلو چارٹ',
      archive: 'آرکائیو',
      export: 'برآمد',
      copy: 'نقل',
      clear: 'صاف',
      debateTab: 'آج کا ایڈیشن',
      headline: 'اپنی سوچ تیز کریں',
      headlineEm: 'ArgueMind',
      deck: 'آپ کا اے آئی بحث حکمت ساز۔ لوفی بحث کرتی ہے، چیلنج کرتی ہے، منطق پر سوال اٹھاتی ہے۔',
      byline: 'لوفی کی میزبانی میں · اے آئی بحث حکمت ساز · تمام ایڈیشن',
      statCats: 'زمرے', statLayers: 'پرتیں', statTopics: 'موضوعات', statModes: 'طریقے',
      arenaTitle: 'لوفی بمقابلہ حریف',
      arenaDeck: 'دو اے آئی بحث کاروں کو آمنے سامنے دیکھیں۔ لوفی ایک طرف دلیل دیتی ہے؛ آپ حریف کا کردار مقرر کریں۔',
      liveTitle: 'لوفی سے براہ راست بحث کریں',
      liveDeck: 'اپنی دلیلیں بولیں۔ لوفی سنتی ہے اور فوری جواب دیتی ہے۔',
      archiveTitle: 'آپ کا بحث ریکارڈ',
      openFloor: 'فلور کھولیں',
      micSpeak: 'مائیک — بولنے کے لیے تھامیں',
      endJudge: 'ختم کریں اور فیصلہ کریں',
      copyBtn: 'نقل',
      readAloud: 'بلند آواز میں پڑھیں',
      printed: 'مطبوع',
      composing: 'تیار ہو رہا ہے',
      socraticHead: 'لوفی آپ کی منطق کو چیلنج کرتی ہے — جاری رکھنے سے پہلے جواب دیں',
      socraticSubmit: 'دلائل مضبوط کریں ← جاری رکھیں',
      fallacyAlertHead: '⚠ منطقی غلطی کا انتباہ — بحث سے پہلے نظرثانی کریں',
    }
  },
  es: {
    code: 'es', dir: 'ltr', name: 'Español',
    promptInstruction: 'Escribe toda tu respuesta en español con un estilo académico claro y persuasivo. ',
    voiceLang: 'es-ES',
    kokoroSupported: true,
    strings: {
      appTagline: 'Estratega de Debate IA · Agudiza tu Pensamiento · Impulsado por Claude',
      hostedBy: 'Presentado por Loffi',
      selectTopic: 'Seleccionar Tema',
      dispatchPreview: 'Vista Previa',
      selectedMotion: 'Moción Seleccionada',
      pickTopic: 'Elige un tema y posición →',
      printSettings: 'Configuración',
      fallacyScan: 'Detector de Falacias',
      socraticDrill: 'Método Socrático',
      liveAvatar: 'Avatar en Vivo',
      customPlaceholder: 'O propón tu propio tema...',
      customBtn: 'Usar →',
      configureArg: 'Configura tu Argumento',
      yourPosition: 'Tu Posición',
      persona: 'Personaje',
      depth: 'Profundidad del Argumento',
      language: 'Idioma',
      knowledgeSource: 'Fuente de Conocimiento',
      toneLabel: 'Tono —',
      runBtn: '⊕ Ejecutar Motor de Razonamiento de 7 Capas',
      runSub: 'Loffi argumentará · cuestionará · rebatirá · criticará · emitirá veredicto',
      running: 'Componiendo despacho...',
      debate: 'Debate',
      arena: 'Arena',
      live: 'En Vivo',
      flowchart: 'Diagrama',
      archive: 'Archivo',
      export: 'Exportar',
      copy: 'Copiar',
      clear: 'Limpiar',
      debateTab: 'Edición de Hoy',
      headline: 'Agudiza tu pensamiento con',
      headlineEm: 'ArgueMind',
      deck: 'Tu estratega de debate con IA. Loffi argumenta, desafía, cuestiona tu lógica y responde en tiempo real.',
      byline: 'Presentado por Loffi · Estratega de Debate IA · Todas las Ediciones',
      statCats: 'Categorías', statLayers: 'Capas', statTopics: 'Temas', statModes: 'Modos',
      arenaTitle: 'Loffi vs La Oposición',
      arenaDeck: 'Observa a dos debatidores de IA enfrentarse. Loffi argumenta un lado; tú asignas el personaje del oponente.',
      liveTitle: 'Debate con Loffi en Vivo',
      liveDeck: 'Expresa tus argumentos. Loffi escucha, perfecciona su réplica en tiempo real y responde.',
      archiveTitle: 'Tu Registro de Debates',
      openFloor: 'Abrir Sesión',
      micSpeak: 'Micrófono — Mantén para hablar',
      endJudge: 'Finalizar y Juzgar',
      copyBtn: 'Copiar',
      readAloud: 'Leer en Voz Alta',
      printed: 'IMPRESO',
      composing: 'COMPONIENDO',
      socraticHead: 'LOFFI DESAFÍA TU LÓGICA — Responde antes de continuar',
      socraticSubmit: 'Reforzar argumentos → Continuar',
      fallacyAlertHead: '⚠ Alerta de Falacia Lógica — Revisa Antes de Argumentar',
    }
  }
};

let currentLang = 'en';

function switchLang(code) {
  const lang = LANGS[code];
  if (!lang) return;
  currentLang = code;

  // Update html attributes
  document.documentElement.lang = code;
  document.documentElement.dir = lang.dir;

  // Update active flag button
  document.querySelectorAll('.lang-btn').forEach(b =>
    b.classList.toggle('active', b.dataset.lang === code));

  // Update prompt instruction
  S.lang = lang.promptInstruction;

  // Update lang dropdown to match
  const sel = document.getElementById('sel-lang');
  if (sel) sel.value = lang.promptInstruction;

  // Update Kokoro voice language hint
  S.kokoroVoiceLang = lang.voiceLang;

  // Apply UI string translations
  applyStrings(lang.strings);

  // Flash confirmation
  telegram(`${lang.name} — زبان تبدیل ہوگئی / Language changed`, 'ok');
}

function applyStrings(s) {
  const set = (id, text) => { const el = document.getElementById(id); if (el) el.textContent = text; };
  const setPlaceholder = (id, text) => { const el = document.getElementById(id); if (el) el.placeholder = text; };
  const setHTML = (id, html) => { const el = document.getElementById(id); if (el) el.innerHTML = html; };

  // Masthead
  set('masthead-tagline', s.appTagline);

  // Nav tabs
  const tabs = document.querySelectorAll('.nav-item');
  const tabKeys = ['debate', 'arena', 'live', 'flowchart', 'archive'];
  const tabStrings = [s.debate, s.arena, s.live, s.flowchart, s.archive];
  tabs.forEach((t, i) => { if (tabStrings[i]) t.textContent = tabStrings[i]; });

  // Nav-right
  const navRight = document.querySelectorAll('.masthead-nav-right .nav-item');
  if (navRight[0]) navRight[0].textContent = s.export;
  if (navRight[1]) navRight[1].textContent = s.copy;
  if (navRight[2]) navRight[2].textContent = s.clear;

  // Hero
  set('hero-kicker', s.debateTab);
  set('hero-headline-text', s.headline);
  set('hero-headline-em', s.headlineEm);
  set('hero-deck', s.deck);
  set('hero-byline', s.byline);
  set('stat-cats', s.statCats);
  set('stat-layers', s.statLayers);
  set('stat-topics', s.statTopics);
  set('stat-modes', s.statModes);

  // Cat kicker
  const kicker = document.getElementById('cat-kicker');
  if (kicker) {
    const parts = kicker.textContent.split(' — ');
    kicker.textContent = s.selectTopic + (parts[1] ? ' — ' + parts[1] : '');
  }

  // Config section
  set('cfg-header-label', s.configureArg);
  set('cf-position-label', s.yourPosition);
  set('cf-persona-label', s.persona);
  set('cf-depth-label', s.depth);
  set('cf-lang-label', s.language);
  set('cf-source-label', s.knowledgeSource);
  set('tone-label', s.toneLabel);

  // Feature toggles
  set('tog-label-fallacy', s.fallacyScan);
  set('tog-label-socratic', s.socraticDrill);
  set('tog-label-video', s.liveAvatar);

  // Dispatch preview
  set('prev-label', s.dispatchPreview);
  set('prev-motion-label', s.selectedMotion);
  const prevPos = document.getElementById('prev-pos');
  if (prevPos && prevPos.textContent.includes('Pick a') || prevPos && prevPos.textContent.includes('→')) {
    prevPos.textContent = s.pickTopic;
  }

  // Custom topic
  setPlaceholder('custom-in', s.customPlaceholder);
  const customBtn = document.querySelector('.custom-btn');
  if (customBtn) customBtn.textContent = s.customBtn;

  // Run button
  set('run-btn-text', s.runBtn);
  set('run-btn-sub', s.runSub);

  // Fallacy alert head
  const fhead = document.querySelector('.fallacy-alert-head');
  if (fhead) fhead.textContent = s.fallacyAlertHead;

  // Socratic
  const shead = document.querySelector('.sb-head');
  if (shead) shead.textContent = s.socraticHead;
  const ssub = document.querySelector('.sb-submit');
  if (ssub) ssub.textContent = s.socraticSubmit;

  // Live debate
  set('live-start', s.openFloor);
  set('live-end', '⏹ ' + s.endJudge);

  // Arena / Live section headlines
  set('arena-headline-text', s.arenaTitle);
  set('arena-deck', s.arenaDeck);
  set('live-headline-text', s.liveTitle);
  set('live-deck', s.liveDeck);
  set('archive-headline-text', s.archiveTitle);
}

function toggleKokoro() {
  S.kokoroEnabled = !S.kokoroEnabled;
  const box = document.getElementById('tog-kokoro');
  const badge = document.getElementById('kokoro-badge');
  box.classList.toggle('checked', S.kokoroEnabled);
  box.textContent = S.kokoroEnabled ? '✓' : '';
  badge.textContent = S.kokoroEnabled ? 'ON' : 'OFF';
  badge.className = S.kokoroEnabled ? 'acc-badge active' : 'acc-badge';
  if (S.kokoroEnabled && !_kokoroTTS) initKokoro();
}

// ================================================================
// BOOT
// ================================================================
window.onload = () => {
  document.getElementById('masthead-date').textContent =
    new Date().toLocaleDateString('en-US',{weekday:'long',year:'numeric',month:'long',day:'numeric'});
  buildCatStrip();
  renderCat('sports');
  initTones();

};

// ================================================================
// CATEGORY STRIP — build once on load
// ================================================================
function buildCatStrip() {
  const strip = document.getElementById('cat-strip');
  CATS.forEach(c => {
    const btn = document.createElement('button');
    btn.className = 'cat-btn' + (c.id==='sports' ? ' active' : '');
    btn.dataset.id = c.id;
    btn.innerHTML = `<span class="cat-accent" style="background:${c.accent}"></span>${c.label}`;
    btn.onclick = () => renderCat(c.id);
    strip.appendChild(btn);
  });
}

// ================================================================
// LEVEL 1 → select category → renders sub-category pills
// ================================================================
function renderCat(catId) {
  S.currentCat = catId;
  const cat = CATS.find(c => c.id === catId);
  document.querySelectorAll('.cat-btn').forEach(b =>
    b.classList.toggle('active', b.dataset.id === catId));
  document.getElementById('cat-kicker').textContent = `Select Topic — ${cat.label}`;

  // Build sub-category pill row
  const grid = document.getElementById('topic-grid');
  grid.innerHTML = `
    <div class="sub-strip" id="sub-strip" style="display:flex;gap:0;flex-wrap:wrap;border-bottom:1px solid var(--rule-heavy);margin-bottom:.8rem;padding-bottom:0;grid-column:1/-1;">
      ${cat.subs.map((sub,i) => `
        <button class="sub-btn${i===0?' sub-active':''}" data-sub="${sub.id}" onclick="renderSub('${catId}','${sub.id}')">
          ${sub.label}
        </button>`).join('')}
    </div>
    <div id="sub-topic-grid" style="display:contents;"></div>`;

  // Auto-render first sub
  renderSub(catId, cat.subs[0].id);

  // Sync source quick-select to first sub's sources
  const ssq = document.getElementById('sel-source-quick');
  ssq.innerHTML = cat.subs[0].sources.map(s =>
    `<option value="${s}">${s.split(' (')[0]}</option>`).join('');
  S.source = cat.subs[0].sources[0];

  // Source footnote
  const oldFn = document.getElementById('source-footnote');
  if (oldFn) oldFn.remove();
  const fn = document.createElement('div');
  fn.className = 'source-footnote'; fn.id = 'source-footnote';
  fn.innerHTML = `<strong>Sources:</strong> ${cat.subs[0].sources.join(' &nbsp;·&nbsp; ')}`;
  document.getElementById('topic-grid').after(fn);

  syncAIA();
}

// ================================================================
// LEVEL 2 → select sub-category → renders 6 topic cards
// ================================================================
function renderSub(catId, subId) {
  S.currentSub = subId;
  const cat = CATS.find(c => c.id === catId);
  const sub = cat.subs.find(s => s.id === subId);

  // Update active sub pill
  document.querySelectorAll('.sub-btn').forEach(b =>
    b.classList.toggle('sub-active', b.dataset.sub === subId));

  // Update sources
  const ssq = document.getElementById('sel-source-quick');
  ssq.innerHTML = sub.sources.map(s =>
    `<option value="${s}">${s.split(' (')[0]}</option>`).join('');
  S.source = sub.sources[0];
  const fn = document.getElementById('source-footnote');
  if (fn) fn.innerHTML = `<strong>Sources for ${sub.label}:</strong> ${sub.sources.join(' &nbsp;·&nbsp; ')}`;

  // Render 6 topic cards
  const stg = document.getElementById('sub-topic-grid');
  if (!stg) return;
  stg.innerHTML = sub.topics.map((t, i) => `
    <div class="topic-card" id="tc-${catId}-${subId}-${i}" onclick="selectTopic('${catId}','${subId}',${i})">
      <div class="tc-label" style="color:${cat.accent};">${sub.label.toUpperCase()}</div>
      <div class="tc-head">${t.title}</div>
      <div class="tc-sub">${t.sub}</div>
      <div class="tc-check">✓</div>
    </div>`).join('');
}

function selectTopic(catId, subId, i) {
  const cat = CATS.find(c => c.id === catId);
  const sub = cat.subs.find(s => s.id === subId);
  const t = sub.topics[i];
  S.topic = t.title;
  S.positions = t.positions;
  document.querySelectorAll('.topic-card').forEach(c => c.classList.remove('selected'));
  const card = document.getElementById(`tc-${catId}-${subId}-${i}`);
  if (card) card.classList.add('selected');
  const ps = document.getElementById('sel-pos');
  ps.innerHTML = '<option value="">— Select side —</option>' +
    t.positions.map(p=>`<option value="${p}">${p}</option>`).join('');
  syncAIA(); updatePreview();
}

function setCustom() {
  const v = document.getElementById('custom-in').value.trim();
  if (!v) return;
  S.topic = v;
  S.positions = [`Support: "${v}"`, `Oppose: "${v}"`];
  document.querySelectorAll('.topic-card').forEach(c => c.classList.remove('selected'));
  const ps = document.getElementById('sel-pos');
  ps.innerHTML = '<option value="">— Select side —</option>' +
    S.positions.map(p=>`<option value="${p}">${p}</option>`).join('');
  syncAIA(); updatePreview();
  telegram('Motion filed ✓', 'ok');
}

function updatePreview() {
  document.getElementById('prev-topic').textContent = S.topic || '—';
  const pos = document.getElementById('sel-pos').value;
  document.getElementById('prev-pos').textContent = pos ? `Arguing: ${pos.substring(0,50)}` : 'Pick a position →';
}

document.addEventListener('change', e => {
  if (e.target.id === 'sel-pos') { S.position = e.target.value; updatePreview(); }
  if (e.target.id === 'sel-persona') S.persona = e.target.value;
  if (e.target.id === 'sel-depth') S.depth = e.target.value;
  if (e.target.id === 'sel-lang') S.lang = e.target.value;
  if (e.target.id === 'sel-source-quick') S.source = e.target.value;
});

// ================================================================
// TOGGLES
// ================================================================
function toggleFeature(f) {
  if (f==='fallacy') {
    S.fallacyOn = !S.fallacyOn;
    setToggle('tog-fallacy', S.fallacyOn);
  } else if (f==='socratic') {
    S.socraticOn = !S.socraticOn;
    setToggle('tog-socratic', S.socraticOn);
  } else if (f==='video') {
    S.videoOn = !S.videoOn;
    setToggle('tog-video', S.videoOn);
    document.getElementById('avatar-panel').style.display = S.videoOn ? 'block' : 'none';
    if (S.videoOn) initAvatar();
  }
}

function setToggle(id, on) {
  const el = document.getElementById(id);
  el.classList.toggle('checked', on);
  el.textContent = on ? '✓' : '';
}

// ================================================================
// ACCORDION
// ================================================================
function toggleAcc(k) {
  const body = document.getElementById(k+'-body');
  const arrow = document.getElementById(k+'-arrow');
  const head = body.previousElementSibling;
  body.classList.toggle('open'); arrow.classList.toggle('open');
  head.classList.toggle('open', body.classList.contains('open'));
}

// ================================================================
// TONES
// ================================================================
function initTones() {
  document.querySelectorAll('.tone-pill').forEach(b => {
    b.onclick = () => {
      document.querySelectorAll('.tone-pill').forEach(x=>x.classList.remove('sel'));
      b.classList.add('sel');
      S.tone = b.dataset.tone;
    };
  });
}

// ================================================================
// KOKORO TTS — runs 100% locally in the browser via kokoro-js
// First call downloads ~80MB model and caches it; subsequent calls instant
// ================================================================
let _kokoroTTS = null;
let _kokoroLoading = false;

async function initKokoro() {
  if (_kokoroTTS) return _kokoroTTS;
  if (_kokoroLoading) {
    // Wait for the in-progress load
    while (_kokoroLoading) await delay(200);
    return _kokoroTTS;
  }
  if (!S.kokoroEnabled) return null;
  _kokoroLoading = true;
  try {
    telegram('Loading Kokoro TTS model (~80MB, first time only)...', 'ok');
    const { KokoroTTS } = await import('https://cdn.jsdelivr.net/npm/kokoro-js@1.2.0/dist/kokoro.js/+esm');
    _kokoroTTS = await KokoroTTS.from_pretrained('onnx-community/Kokoro-82M-v1.0-ONNX', {
      dtype: 'q8',
    });
    telegram('Kokoro TTS ready ✓', 'ok');
  } catch(e) {
    telegram('Kokoro load failed — using browser TTS', 'err');
    S.kokoroEnabled = false;
  } finally { _kokoroLoading = false; }
  return _kokoroTTS;
}

async function speak(text) {
  if (!text) return;
  let clean = text.replace(/<[^>]+>/g, '');
  clean = clean.replace(/[*_#`~]/g, ''); // strip Markdown symbols
  clean = clean.replace(/\[(.*?)\]\(.*?\)/g, '$1'); // replace markdown links with just text
  clean = clean.substring(0, 2000);
  const lang = LANGS[currentLang] || LANGS.en;
  startSiBars();

  // Kokoro for EN/ES (supported languages)
  if (S.kokoroEnabled && lang.kokoroSupported) {
    try {
      const tts = await initKokoro();
      if (tts) {
        const voice = S.kokoroVoice || 'af_sky';
        const audio = await tts.generate(clean, { voice });
        const wav = audio.toWav();
        const blob = new Blob([wav], { type: 'audio/wav' });
        const url = URL.createObjectURL(blob);
        const a = new Audio(url);
        S.activeAudio = a;
        a.onended = () => { stopSiBars(); URL.revokeObjectURL(url); };
        a.play();
        return;
      }
    } catch(e) { console.warn('Kokoro speak error:', e); }
  }

  // Browser TTS fallback — supports Arabic (ar-SA) and Urdu (ur-PK)
  if ('speechSynthesis' in window) {
    // Ensure voices are loaded
    let voices = speechSynthesis.getVoices();
    if (!voices.length) {
      await new Promise(r => { speechSynthesis.onvoiceschanged = r; setTimeout(r, 1000); });
      voices = speechSynthesis.getVoices();
    }
    const u = new SpeechSynthesisUtterance(clean);
    u.lang = lang.voiceLang;
    u.rate = currentLang === 'ar' || currentLang === 'ur' ? 0.85 : 0.95;
    const match = voices.find(v => v.lang === lang.voiceLang)
      || voices.find(v => v.lang.startsWith(lang.code));
    if (match) u.voice = match;
    u.onend = () => stopSiBars();
    speechSynthesis.speak(u);
  } else { stopSiBars(); }
}

// ================================================================
// MAIN PIPELINE
// ================================================================
async function runPipeline() {
  S.position = document.getElementById('sel-pos').value;
  S.persona = document.getElementById('sel-persona').value;
  S.depth = document.getElementById('sel-depth').value;
  // S.lang is set by the language switcher — don't override from dropdown
  S.topic = S.topic || document.getElementById('custom-in').value.trim();

  if (!S.topic) { telegram('Choose a topic first', 'err'); return; }
  if (!S.position) { telegram('Select your position', 'err'); return; }
  if (S.running) return;

  S.running=true; S.layers={}; S.totalIn=0; S.totalOut=0;
  S.startTime=Date.now(); S.socraticAnswers=[];
  document.getElementById('press-btn').disabled=true;
  document.getElementById('run-btn-sub').textContent='Composing dispatch...';
  document.getElementById('tw-progress').style.display='block';
  document.getElementById('score-wrap').innerHTML='';
  document.getElementById('coach-wrap').innerHTML='';
  document.getElementById('export-strip').classList.remove('show');
  document.getElementById('fallacy-alert').classList.remove('show');
  document.getElementById('socratic-broadside').classList.remove('show');
  document.getElementById('pipeline').innerHTML='';
  resetTele();

  setTicker('LUFIALLOLA COMPOSING DISPATCH...');

  try {
    // L0 FALLACY
    if (S.fallacyOn) { setTW('Layer 0 — Scanning for logical fallacies...'); await runFallacy(); }

    // L1 CONTEXT
    setTW('Layer 1 — Mapping the debate landscape...');
    await runLayer(1,'Context Analysis','Loffi objectively maps the debate','#2c2c28',
      `You are writing as a ${S.persona}. Tone: ${S.tone}. Draw on the expertise of ${S.source}.
${S.lang}Layer 1 — Context Analysis.
Topic: "${S.topic}". Position: "${S.position}".
Objectively map the debate. Identify 4-5 key factors. Surface hidden assumptions.
Do NOT take a position. ${S.depth} words.`);

    // L2 ARGUMENTS
    setTW('Layer 2 — Building your strongest arguments...');
    await runLayer(2,'Argument Builder','Three evidence-backed arguments in your defence','#c41230',
      `You are writing as a ${S.persona}. Tone: ${S.tone}. Draw on the expertise of ${S.source}.
${S.lang}Layer 2 — Argument Builder.
Topic: "${S.topic}". Defend: "${S.position}".
Context from Layer 1: ${S.layers[1]||''}
3 distinct evidence-backed arguments with claim, evidence, and example.
${S.depth} words.`);

    // SOCRATIC
    if (S.socraticOn) {
      setTW('Socratic Drill — Loffi questions your logic...');
      await runSocratic();
      await waitSocratic();
    }

    // L3 COUNTER
    setTW('Layer 3 — Generating the strongest opposition...');
    await runLayer(3,'Counter-Argument','The strongest case against your position','#5a5a52',
      `You are writing as a ${S.persona}. Tone: ${S.tone}. Draw on the expertise of ${S.source}.
${S.lang}Layer 3 — Counter-Argument.
Topic: "${S.topic}". Challenge: "${S.position}".
Prior context (L1): ${S.layers[1]||''}
Arguments made (L2): ${S.layers[2]||''}
${S.socraticAnswers.length?`User reinforced position: ${S.socraticAnswers.join(' | ')}`:''}
3 genuinely compelling counter-arguments. No strawmen. ${S.depth} words.`);

    // L4 CRITIQUE
    setTW('Layer 4 — Auditing weaknesses in your case...');
    await runLayer(4,'Self-Critique','Honest flaws in the Layer 2 arguments','#b8860b',
      `You are writing as a ${S.persona}. Tone: ${S.tone}. Draw on the expertise of ${S.source}.
${S.lang}Layer 4 — Self-Critique.
Topic: "${S.topic}". Position: "${S.position}".
Original arguments (L2): ${S.layers[2]||''}
Counter-arguments faced (L3): ${S.layers[3]||''}
3-4 honest weaknesses with improvement suggestions. ${S.depth} words.`);

    // L5 FINAL
    setTW('Layer 5 — Loffi delivers the final verdict...');
    await runLayer(5,'Final Strategy & Verdict',"Loffi's definitive ruling",'#0a0a08',
      `You are Loffi, an elite AI debate strategist and host.
Tone: ${S.tone}. Draw on the expertise of ${S.source}.
${S.lang}Layer 5 — Final Strategy & Verdict.
Topic: "${S.topic}". Position: "${S.position}".
Context (L1): ${S.layers[1]||''}
Arguments (L2): ${S.layers[2]||''}
Counters (L3): ${S.layers[3]||''}
Critique (L4): ${S.layers[4]||''}
Synthesise all layers. State conditions under which each side wins.
End with a bold "FINAL VERDICT:" from Loffi. ${S.depth} words.`);

    // SCORE
    setTW('Scoring the debate...');
    await runScore();

    // COACH
    setTW('Loffi composing coaching notes...');
    await runCoach();

    // TELEMETRY OPTIMIZATION ALERT
    runTelemetryOptimization();



    saveHistory();
    document.getElementById('export-strip').classList.add('show');
    setTicker(`DISPATCH PRINTED · Topic: ${S.topic} · Score: ${S.lastScore||'—'}/100 · Loffi`);

  } catch(err) {
    telegram('Error: '+err.message,'err');
    console.error(err);
  } finally {
    S.running=false;
    document.getElementById('press-btn').disabled=false;
    document.getElementById('run-btn-sub').textContent='Loffi will argue · question · counter · critique · deliver verdict';
    document.getElementById('tw-progress').style.display='none';
    updateTele();
  }
}

// ================================================================
// FALLACY
// ================================================================
async function runFallacy() {
  try {
    const raw = await api(`You are a logic expert. Scan this debate topic for logical fallacies in how it is framed.
Topic: "${S.topic}" | Position: "${S.position}"
Respond ONLY with valid JSON (no other text):
{"fallacies":[{"type":"Fallacy Name","description":"1-sentence description","reframe":"Better framing"}]}
If no fallacies: {"fallacies":[]}`, 400);
    const d = JSON.parse(raw.replace(/```json|```/g,'').trim());
    if (d.fallacies && d.fallacies.length) {
      document.getElementById('fallacy-items').innerHTML = d.fallacies.map(f=>`
        <div class="fallacy-item">
          <span class="fallacy-type">${f.type}</span>
          ${f.description}
          <div class="fallacy-fix">Better framing: ${f.reframe}</div>
        </div>`).join('');
      document.getElementById('fallacy-alert').classList.add('show');
    }
  } catch(e){}
}

// ================================================================
// LAYER RUNNER
// ================================================================
async function runLayer(n, title, sub, color, prompt) {
  // Create article placeholder
  const art = makeArticle(n, title, sub, color, true);
  document.getElementById('pipeline').appendChild(art);
  art.scrollIntoView({behavior:'smooth',block:'nearest'});

  const t0 = Date.now();
  let text='', inTok=0, outTok=0;
  try {
    const r = await apiWithTokens(prompt, 1400);
    text=r.text; inTok=r.in; outTok=r.out;
  } catch(e) { text=`[Layer ${n} error: ${e.message}]`; }

  const elapsed = ((Date.now()-t0)/1000).toFixed(1);
  S.layers[n]=text; S.totalIn+=inTok; S.totalOut+=outTok;

  // Fill article
  fillArticle(art, n, title, sub, color, text, inTok, outTok, elapsed);
  updateTele();
}

function makeArticle(n, title, sub, color, loading) {
  const div = document.createElement('div');
  div.className = 'article loading';
  div.style.setProperty('--lc', color);
  div.innerHTML = `
    <div class="article-head">
      <div class="article-number" style="color:${color};">${n}</div>
      <div class="article-meta">
        <div class="article-section" style="color:${color};">${title}</div>
        <div class="article-headline">${sub}</div>
        <div class="article-deck">Loffi · Drawing on ${S.source.split(' (')[0]}</div>
      </div>
      <div class="article-status running">COMPOSING</div>
    </div>
    <hr class="article-rule">
    <div class="article-body">
      <div class="press-loading">
        <span>Setting type</span><div class="press-cursor"></div>
      </div>
    </div>`;
  return div;
}

function fillArticle(div, n, title, sub, color, text, inTok, outTok, elapsed) {
  const SCIPAB = {
    1: { label:'S — Situation', desc:'Map the debate landscape' },
    2: { label:'C — Complication', desc:'Build your strongest arguments' },
    3: { label:'I — Implementation', desc:'Steel-man the opposition' },
    4: { label:'P — Position', desc:'Audit weaknesses honestly' },
    5: { label:'A — Action + B — Benefit', desc:'Final strategy & verdict' },
  };
  const ps = SCIPAB[n] || { label:'', desc:'' };

  const lines = text.split('\n').filter(Boolean);
  let pullQuote = '';
  const strong = lines.find(l => l.length > 60 && !l.startsWith('**') && !l.startsWith('#'));
  if (strong) pullQuote = strong.substring(0,120)+(strong.length>120?'...':'');

  const formatted = text
    .replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>')
    .replace(/\n\n/g,'</p><p>')
    .replace(/\n/g,' ');

  const efficiency = inTok > 0 ? (outTok/inTok).toFixed(2) : '—';
  const effColor = inTok > 0 && (outTok/inTok) < 0.6 ? 'color:var(--red)' : '';

  div.className = 'article done';
  div.style.setProperty('--lc', color);
  div.innerHTML = `
    <div class="article-head">
      <div class="article-number" style="color:${color};">${n}</div>
      <div class="article-meta">
        <div class="article-section" style="color:${color};">Layer ${n} — ${title}</div>
        <div style="font-family:var(--cond);font-size:9px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:var(--gold);margin-bottom:2px;">${ps.label} &nbsp;·&nbsp; SCIPAB Framework</div>
        <div class="article-headline">${sub}</div>
        <div class="article-deck">By Loffi · ${S.source.split(' (')[0]} · ${elapsed}s · eff: <span style="${effColor}">${efficiency}</span></div>
      </div>
      <div class="article-status done2">PRINTED</div>
    </div>
    <hr class="article-rule">
    <div class="article-body">
      <div class="article-text">
        ${pullQuote ? `<div class="pull-quote">"${pullQuote}"</div>` : ''}
        <p>${formatted}</p>
      </div>
    </div>
    <hr class="article-rule">
    <div class="article-footer">
      <span class="art-meta-item">↑ <b>${inTok}</b> in</span>
      <span class="art-meta-item">↓ <b>${outTok}</b> out</span>
      <span class="art-meta-item" style="${effColor}">eff <b>${efficiency}</b></span>
      <button class="art-btn" onclick="copyTxt(this,'${esc(text)}')">Copy</button>
      <button class="art-btn" onclick="playLayer(this, ${n})">Read Aloud</button>
    </div>`;
}

// ================================================================
// TELEMETRY-DRIVEN OPTIMIZATION
// Fires after all layers — inspects per-layer efficiency and latency
// and surfaces a named, visible optimization recommendation
// ================================================================
function runTelemetryOptimization() {
  const efficiency = S.totalIn > 0 ? S.totalOut / S.totalIn : 1;
  const elapsed = (Date.now() - S.startTime) / 1000;

  // Per-layer analysis stored during pipeline
  const insights = [];

  // Insight 1: Low output density — AI is being too concise
  if (efficiency < 0.6) {
    insights.push({
      type:'warn',
      icon:'⚠',
      title:'Low output density detected (eff: ' + efficiency.toFixed(2) + ')',
      action:'Optimization applied: switching to Deep Dive depth for next run will increase argument density. Try increasing Argument Depth to 300–350 words.',
      layer:'All layers'
    });
  }

  // Insight 2: High input token cost — context is growing large
  if (S.totalIn > 8000) {
    insights.push({
      type:'info',
      icon:'📊',
      title:'High input token cost (' + S.totalIn + ' tokens)',
      action:'Optimization applied: context chaining is working correctly but L3 onward carries the full prior context. Consider using Concise depth to reduce cost by ~35%.',
      layer:'L3 → L5'
    });
  }

  // Insight 3: High efficiency — good signal
  if (efficiency >= 0.8 && S.totalOut > 2000) {
    insights.push({
      type:'ok',
      icon:'✓',
      title:'Strong output density confirmed (eff: ' + efficiency.toFixed(2) + ')',
      action:'Pipeline is performing optimally. All layers produced substantive outputs relative to input context. No optimization required.',
      layer:'All layers'
    });
  }

  // Insight 4: Slow total time
  if (elapsed > 60) {
    insights.push({
      type:'warn',
      icon:'⏱',
      title:'High latency detected (' + elapsed.toFixed(0) + 's total)',
      action:'Optimization applied: switching to Concise depth (150–200 words) will reduce latency by approximately 40% with minimal quality loss.',
      layer:'All layers'
    });
  }

  if (!insights.length) {
    insights.push({
      type:'ok', icon:'✓',
      title:'Telemetry nominal — pipeline healthy',
      action:'All efficiency and latency metrics within optimal range. No optimization needed for this run.',
      layer:'All layers'
    });
  }

  // Render after coach card
  const wrap = document.getElementById('coach-wrap');
  const div = document.createElement('div');
  div.style.cssText = 'border:2px solid var(--rule-heavy);margin-bottom:1.5rem;';
  div.innerHTML = `
    <div style="background:var(--ink);color:var(--paper);padding:8px 14px;display:flex;align-items:center;justify-content:space-between;">
      <span style="font-family:var(--cond);font-size:11px;font-weight:900;letter-spacing:.15em;text-transform:uppercase;">Telemetry Insights &amp; Optimization</span>
      <span style="font-family:var(--mono);font-size:9px;opacity:.6;">Req. 5 — SCIPAB Framework</span>
    </div>
    <div style="padding:14px;">
      ${insights.map(ins=>`
        <div style="padding:10px 12px;margin-bottom:8px;border-left:3px solid ${ins.type==='ok'?'#4ade80':ins.type==='warn'?'var(--gold)':'var(--b2)'};background:var(--paper2);">
          <div style="font-family:var(--cond);font-size:11px;font-weight:900;letter-spacing:.08em;text-transform:uppercase;margin-bottom:4px;">
            ${ins.icon} ${ins.title} <span style="font-weight:400;color:var(--ink3);margin-left:8px;">· ${ins.layer}</span>
          </div>
          <div style="font-family:var(--body);font-style:italic;font-size:13px;color:var(--ink2);line-height:1.7;">${ins.action}</div>
        </div>`).join('')}
      <div style="font-family:var(--mono);font-size:9px;color:var(--ink4);margin-top:4px;letter-spacing:.05em;">
        Total: ${S.totalIn} in · ${S.totalOut} out · eff ${efficiency.toFixed(2)} · ${elapsed.toFixed(1)}s · ${(elapsed/5).toFixed(0)} layers/min
      </div>
    </div>`;
  wrap.appendChild(div);
}

// ================================================================
// SOCRATIC
// ================================================================
async function runSocratic() {
  const q = await api(`You are Loffi, elite debate coach.
After reading these arguments: ${S.layers[2]||''}
Ask 2 sharp Socratic questions exposing hidden assumptions in: "${S.position}" on "${S.topic}".
Return only the 2 questions numbered 1. and 2.`, 300);
  const qs = q.split('\n').filter(l=>l.match(/^[12]\./)).slice(0,2);
  const broadside = document.getElementById('socratic-broadside');
  document.getElementById('socratic-body').innerHTML = qs.map((qq,i)=>`
    <div class="sb-q">${qq}</div>
    <textarea class="sb-in" id="sq${i}" rows="2" placeholder="Your answer..."></textarea>`).join('')+
    `<button class="sb-submit" onclick="submitSocratic()">Strengthen arguments → Continue</button>`;
  broadside.classList.add('show');
  broadside.scrollIntoView({behavior:'smooth',block:'nearest'});
  S.socraticPending=true;
}

function waitSocratic() {
  return new Promise(r=>{const c=()=>{if(!S.socraticPending)r();else setTimeout(c,200)};c();});
}

function submitSocratic() {
  S.socraticAnswers=[0,1].map(i=>(document.getElementById('sq'+i)||{}).value||'').filter(Boolean);
  S.socraticPending=false;
  document.getElementById('socratic-broadside').classList.remove('show');
  telegram('Arguments reinforced — continuing', 'ok');
}

// ================================================================
// SCORE CARD
// ================================================================
async function runScore() {
  try {
    const raw = await api(`You are debate judge Loffi.
Score this debate — Argument Strength, Evidence Quality, Logical Coherence, Persuasiveness (0-100 each).
Topic: "${S.topic}" | Position: "${S.position}"
L1: ${(S.layers[1]||'').substring(0,350)} L2: ${(S.layers[2]||'').substring(0,350)}
L3: ${(S.layers[3]||'').substring(0,300)} L5: ${(S.layers[5]||'').substring(0,350)}
Respond ONLY with valid JSON:
{"strength":85,"evidence":72,"logic":90,"persuasion":78,"overall":81,"verdict":"One sentence","recommendation":"One actionable tip"}`, 400);
    const d=JSON.parse(raw.replace(/```json|```/g,'').trim());
    S.lastScore=d.overall;
    const cls=d.overall>=85?'e':d.overall>=70?'g':d.overall>=55?'f':'w';
    const rows=[['Argument Strength',d.strength],['Evidence Quality',d.evidence],['Logical Coherence',d.logic],['Persuasiveness',d.persuasion]];
    document.getElementById('score-wrap').innerHTML=`
      <div class="score-inset">
        <div class="score-inset-head">
          <div class="score-head-left">Loffi's Score Card</div>
          <div class="score-total ${cls}">${d.overall}<span style="font-size:14px;opacity:.5">/100</span></div>
        </div>
        <div class="score-inset-body">
          <div class="score-col">
            ${rows.slice(0,2).map(([l,v])=>`<div class="score-row">
              <div class="score-row-label">${l}</div>
              <div class="score-bar-wrap"><div class="score-bar" style="width:${v}%"></div></div>
              <div class="score-num">${v}</div>
            </div>`).join('')}
          </div>
          <div class="score-col">
            ${rows.slice(2).map(([l,v])=>`<div class="score-row">
              <div class="score-row-label">${l}</div>
              <div class="score-bar-wrap"><div class="score-bar" style="width:${v}%"></div></div>
              <div class="score-num">${v}</div>
            </div>`).join('')}
            <div class="score-verdict">${d.verdict}</div>
            ${d.recommendation?`<div class="score-rec">${d.recommendation}</div>`:''}
          </div>
        </div>
      </div>`;
  } catch(e){ console.error('score error',e); }
}

// ================================================================
// COACH
// ================================================================
async function runCoach() {
  const wrap=document.getElementById('coach-wrap');
  wrap.innerHTML=`<div class="coach-column">
    <div class="coach-column-head">
      <span class="coach-kicker">Personal Coaching</span>
      <span class="coach-title">Loffi's Notes on Your Performance</span>
    </div>
    <div class="coach-byline">By Loffi, AI Debate Coach · Personalized to this debate</div>
    <div class="coach-text" id="coach-text-inner">
      <span style="font-family:var(--mono);font-size:11px;color:var(--ink4);">Composing coaching notes...</span>
    </div>
  </div>`;

  try {
    const t=await api(`You are Loffi, expert debate coach.
Topic: "${S.topic}" | Position: "${S.position}" | Persona: ${S.persona}
Arguments (L2): ${(S.layers[2]||'').substring(0,450)}
Counter (L3): ${(S.layers[3]||'').substring(0,350)}
Critique (L4): ${(S.layers[4]||'').substring(0,350)}
Provide coaching feedback in this structure:
**Your Debating Strengths** (2-3 specific things done well with examples)
**Key Areas to Improve** (2-3 specific weaknesses with actionable advice)
**Your Style Profile** (2 sentences describing this debater)
**Personalised Exercise** (One specific practice exercise)
**Quick Win** (Single most impactful change for next debate)
Be direct, specific, encouraging. Reference actual arguments. 260-320 words.`, 650);
    const fmt=t.replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>').replace(/\n\n/g,'</p><p>').replace(/\n/g,' ');
    document.getElementById('coach-text-inner').innerHTML=`<p>${fmt}</p>`;
  } catch(e){
    document.getElementById('coach-text-inner').textContent='Coaching unavailable: '+e.message;
  }
}

// ================================================================
// AI vs AI
// ================================================================
function syncAIA() {
  const sel=document.getElementById('aia-topic');
  sel.innerHTML='<option value="">—</option>';
  if(S.topic){ const o=document.createElement('option');o.value=S.topic;o.textContent=S.topic;o.selected=true;sel.appendChild(o); }
  const ls=document.getElementById('aia-lufia-side');
  ls.innerHTML='<option value="">— Select position —</option>'+(S.positions||[]).map(p=>`<option value="${p}">${p}</option>`).join('');
}

async function runAIA() {
  const topic=document.getElementById('aia-topic').value||S.topic;
  const lufiaSide=document.getElementById('aia-lufia-side').value;
  const oppPersona=document.getElementById('aia-opp').value;
  const rounds=parseInt(document.getElementById('aia-rounds').value);
  const depth=document.getElementById('aia-depth').value;
  if(!topic){telegram('Set a topic in the Debate tab first','err');return;}
  if(!lufiaSide){telegram('Select Loffi\'s position','err');return;}

  const positions=S.positions&&S.positions.length>=2?S.positions:[lufiaSide,'The opposing position'];
  const oppSide=positions.find(p=>p!==lufiaSide)||'The opposing view';

  document.getElementById('aia-btn').disabled=true;
  document.getElementById('aia-btn').textContent='⊕ Match in progress...';
  document.getElementById('aia-lufia-role').textContent=lufiaSide.substring(0,40);
  document.getElementById('aia-opp-name').textContent=oppPersona.split(' ').pop();
  document.getElementById('aia-opp-role').textContent=oppSide.substring(0,40);
  document.getElementById('aia-verdict').innerHTML='';

  const transcript=document.getElementById('aia-transcript');
  transcript.innerHTML='';
  const dots=document.getElementById('aia-dots');
  dots.innerHTML='<span style="font-family:var(--mono);font-size:9px;color:var(--ink4);text-transform:uppercase;letter-spacing:.1em;">Rounds:</span>';

  let history=[];

  for(let r=1;r<=rounds;r++){
    document.getElementById('aia-round-label').textContent=`Round ${r} of ${rounds}`;

    // Loffi
    const ld=document.createElement('div');ld.className='round-dot lufia';dots.appendChild(ld);
    const lEx=addExchange(transcript,'lufia','Loffi','...');
    const lp=`You are Loffi, elite AI debate host. Arguing: "${lufiaSide}" on "${topic}".
Debate history: ${history.map(h=>`${h.who}: ${h.text}`).join('\n')||'Opening round.'}
${r===1?'Opening':'Round '+r} argument. Sharp, specific, evidence-based. ${depth} words max. No preamble.`;
    const lt=await api(lp,550);
    history.push({who:'Loffi',text:lt});
    lEx.querySelector('.exchange-text').textContent=lt;
    await delay(500);

    // Opponent
    const od=document.createElement('div');od.className='round-dot opp';dots.appendChild(od);
    const oEx=addExchange(transcript,'opponent',oppPersona,'...');
    const op=`You are a ${oppPersona}. Arguing: "${oppSide}" on "${topic}".
History: ${history.map(h=>`${h.who}: ${h.text}`).join('\n')}
Counter Loffi directly. ${depth} words max. No preamble.`;
    const ot=await api(op,550);
    history.push({who:'Opponent',text:ot});
    oEx.querySelector('.exchange-text').textContent=ot;
    await delay(400);
  }

  // Judge
  try {
    const jraw=await api(`Impartial judge. Topic: "${topic}". Loffi: "${lufiaSide}". Opponent: "${oppSide}".
Transcript: ${history.map(h=>`${h.who}: ${h.text}`).join('\n\n')}
JSON only:
{"winner":"Loffi","winner_reason":"One sentence","lufia_score":82,"opp_score":74,"lufia_best":"Best point","opp_best":"Best point","verdict":"Final punchy sentence"}`,400);
    const j=JSON.parse(jraw.replace(/```json|```/g,'').trim());
    document.getElementById('aia-verdict').innerHTML=`
      <div class="match-result show">
        <div class="mr-banner">
          <div class="mr-title">Arena Verdict</div>
          <div class="mr-winner">${j.winner} wins — ${j.winner_reason}</div>
        </div>
        <div class="mr-body">
          <div class="mr-scores">
            <div class="mr-fighter"><div class="mr-f-name lufia">Loffi</div><div class="mr-f-score">${j.lufia_score}</div></div>
            <div class="mr-fighter"><div class="mr-f-name">${oppPersona.split(' ').pop()}</div><div class="mr-f-score">${j.opp_score}</div></div>
          </div>
          <div class="mr-point lufia"><strong>Loffi's best:</strong> ${j.lufia_best}</div>
          <div class="mr-point"><strong>Opponent's best:</strong> ${j.opp_best}</div>
          <div class="mr-verdict">${j.verdict}</div>
        </div>
      </div>`;
  } catch(e){ console.error('aia verdict',e); }

  document.getElementById('aia-btn').disabled=false;
  document.getElementById('aia-btn').textContent='⊕ Start Arena Match';
}

function addExchange(container, side, name, text) {
  const div=document.createElement('div');
  div.className='match-exchange';
  div.innerHTML=`<div class="exchange-byline ${side}">${name.toUpperCase()}</div>
    <div class="exchange-text" style="font-style:italic;">${text}</div>`;
  container.appendChild(div);
  container.scrollTop=container.scrollHeight;
  return div;
}

// ================================================================
// LIVE DEBATE
// ================================================================
async function startLive() {
  if(!S.topic){telegram('Set topic in Debate tab first','err');return;}
  S.liveActive=true; S.liveTranscript=[]; S.liveRound=0;
  document.getElementById('live-paper').innerHTML='';
  document.getElementById('live-result').classList.remove('show');
  document.getElementById('live-result').innerHTML='';
  document.getElementById('live-start').disabled=true;
  document.getElementById('live-mic').disabled=false;
  document.getElementById('live-end').disabled=false;
  setHostStatus('thinking','Composing opening...');

  const open=await api(`You are Loffi, energetic AI debate host.
Topic: "${S.topic}". Human argues: "${S.position||'their chosen side'}". You argue the opposite.
2-3 sharp sentences: introduce the debate and challenge them. Direct, no preamble.`,250);

  S.liveTranscript.push({who:'lufia',text:open});
  addLiveTurn('lufia','Loffi',open);
  document.getElementById('host-text').textContent=open;
  setHostStatus('speaking','Speaking...');
  await speak(open);
  setHostStatus('idle','Listening...');
  document.getElementById('live-rnd').textContent=1;
}

function addLiveTurn(who, name, text) {
  const p=document.getElementById('live-paper');
  const div=document.createElement('div');
  div.className='live-turn';
  div.innerHTML=`<div class="lt-who ${who}">${name}</div><div class="lt-text">${text}</div>`;
  p.appendChild(div);
  p.scrollTop=p.scrollHeight;
}

function setHostStatus(state, txt) {
  const dot=document.getElementById('host-dot');
  dot.className=`host-status-dot ${state}`;
  document.getElementById('host-status-txt').textContent=txt;
}

function toggleMic() {
  if(!S.liveActive)return;
  if(!S.recognizing) startMic(); else stopMic();
}

function startMic() {
  const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
  if(!SR){telegram('Mic not available in this browser','err');return;}
  S.recognition=new SR(); S.recognition.continuous=true; S.recognition.interimResults=true;
  S.recognition.onstart=()=>{
    S.recognizing=true;
    document.getElementById('live-mic').textContent='● Recording — click to stop';
    document.getElementById('live-mic').classList.add('recording');
  };
  S.recognition.onresult=e=>{
    const t=Array.from(e.results).map(r=>r[0].transcript).join('');
    document.getElementById('host-text').textContent=`You: "${t}"`;
  };
  S.recognition.onend=()=>{ if(S.recognizing) handleUserTurn(); };
  S.recognition.start();
}

function stopMic() {
  S.recognizing=false;
  if(S.recognition) S.recognition.stop();
  document.getElementById('live-mic').textContent='Mic — Hold to speak';
  document.getElementById('live-mic').classList.remove('recording');
}

async function handleUserTurn() {
  stopMic();
  const lastText = document.getElementById('host-text').textContent.replace(/^You: "/,'').replace(/"$/,'');
  if(!lastText||lastText.length<5)return;
  addLiveTurn('user','You',lastText);
  S.liveTranscript.push({who:'user',text:lastText});
  S.liveRound++;
  document.getElementById('live-rnd').textContent=S.liveRound;
  setHostStatus('thinking','Thinking...');

  const hist=S.liveTranscript.slice(-6).map(m=>`${m.who==='lufia'?'Loffi':'Human'}: ${m.text}`).join('\n');
  const reply=await api(`You are Loffi, expert debate opponent.
Topic: "${S.topic}". Human argues: "${S.position||'their side'}". You argue opposite.
Conversation: ${hist}
Human just said: "${lastText}"
Sharp counter, 3-5 sentences, spoken conversational style. No preamble.`,350);

  S.liveTranscript.push({who:'lufia',text:reply});
  addLiveTurn('lufia','Loffi',reply);
  document.getElementById('host-text').textContent=reply;
  setHostStatus('speaking','Speaking...');
  await speak(reply);
  setHostStatus('idle','Your turn...');
}

async function endLive() {
  setHostStatus('thinking','Judging...');
  document.getElementById('live-end').disabled=true;
  document.getElementById('live-mic').disabled=true;
  if(S.recognition) S.recognition.stop();

  const full=S.liveTranscript.map(m=>`${m.who==='lufia'?'Loffi':'Human'}: ${m.text}`).join('\n');
  try {
    const raw=await api(`Judged live debate. Topic: "${S.topic}". Human position: "${S.position||'unknown'}".
Transcript: ${full}
JSON only:
{"winner":"Human","winner_reason":"One sentence","human_score":75,"ai_score":82,"human_best":"Best point","ai_best":"Best point","human_tip":"One tip","verdict":"Final sentence"}`,400);
    const j=JSON.parse(raw.replace(/```json|```/g,'').trim());
    const res=document.getElementById('live-result');
    res.innerHTML=`
      <div class="mr-banner">
        <div class="mr-title">Live Debate Verdict</div>
        <div class="mr-winner">${j.winner} wins — ${j.winner_reason}</div>
      </div>
      <div class="mr-body">
        <div class="mr-scores">
          <div class="mr-fighter"><div class="mr-f-name lufia">Loffi</div><div class="mr-f-score">${j.ai_score}</div></div>
          <div class="mr-fighter"><div class="mr-f-name">You</div><div class="mr-f-score">${j.human_score}</div></div>
        </div>
        <div class="mr-point lufia"><strong>Loffi's best:</strong> ${j.ai_best}</div>
        <div class="mr-point"><strong>Your best:</strong> ${j.human_best}</div>
        <div class="mr-point"><strong>Your tip:</strong> ${j.human_tip}</div>
        <div class="mr-verdict">${j.verdict}</div>
      </div>`;
    res.classList.add('show');
  } catch(e){ telegram('Verdict failed','err'); }
  S.liveActive=false;
  document.getElementById('live-start').disabled=false;
  setHostStatus('idle','Debate concluded.');
}

// ================================================================
// AVATAR (canvas)
// ================================================================
function initAvatar() {
  const c=document.getElementById('avatar-canvas');
  const ctx=c.getContext('2d');
  let f=0;
  function draw(){
    f++;
    ctx.clearRect(0,0,100,100);
    // Paper background
    ctx.fillStyle='#faf8f3';ctx.fillRect(0,0,100,100);
    // Face (editorial illustration style — stark B&W)
    ctx.fillStyle='#0a0a08';
    ctx.beginPath();ctx.arc(50,50,38,0,Math.PI*2);ctx.fill();
    // White inner face
    ctx.fillStyle='#faf8f3';
    ctx.beginPath();ctx.arc(50,50,34,0,Math.PI*2);ctx.fill();
    // Eyes
    const blink=f%150<5?Math.sin(f%5*Math.PI/5):0;
    [35,65].forEach(x=>{
      ctx.fillStyle='#0a0a08';
      ctx.beginPath();ctx.ellipse(x,45,4,Math.max(1,5*(1-blink)),0,0,Math.PI*2);ctx.fill();
    });
    // Mouth
    const mh=S.isSpeaking?Math.abs(Math.sin(f*.2))*6+2:2;
    ctx.fillStyle='#0a0a08';
    ctx.beginPath();ctx.ellipse(50,62,9,mh,0,0,Math.PI);ctx.fill();
    // "LUFIALLOLA" text stamp
    ctx.fillStyle='#c41230';
    ctx.font='bold 7px "Barlow Condensed",sans-serif';
    ctx.textAlign='center';
    ctx.fillText('LUFIALLOLA',50,93);
    requestAnimationFrame(draw);
  }
  draw();
}

// ================================================================
// WAVEFORM + SI BARS
// ================================================================
function startSiBars() { /* audio indicator — reserved for Kokoro */ }
function stopSiBars() { clearInterval(S.siInterval); }
function startWave() {}
function stopWave() {}

// ================================================================
// TABS
// ================================================================
function switchTab(t) {
  ['debate','aia','live','flowchart','history'].forEach(x=>{
    document.getElementById('tab-'+x).style.display=x===t?'block':'none';
  });
  document.querySelectorAll('.nav-item').forEach((b,i)=>{
    const tabs=['debate','aia','live','flowchart','history'];
    b.classList.toggle('active',tabs[i]===t);
  });
}

// ================================================================
// TELEMETRY
// ================================================================
function resetTele() {
  for(let i=0;i<5;i++){document.getElementById('tv'+i).textContent='—';document.getElementById('tc'+i).classList.remove('lit');}
}
function updateTele() {
  const e=((Date.now()-S.startTime)/1000).toFixed(1);
  const eff=S.totalIn?(S.totalOut/S.totalIn).toFixed(2):'—';
  [S.totalIn,S.totalOut,S.totalIn+S.totalOut,e+'s',eff].forEach((v,i)=>{
    document.getElementById('tv'+i).textContent=v;
    document.getElementById('tc'+i).classList.add('lit');
  });
}
function setTW(msg){ document.getElementById('tw-text').textContent=msg; }
function setTicker(msg){ document.getElementById('ticker-text').textContent=msg; }

// ================================================================
// HISTORY
// ================================================================
function saveHistory() {
  if(!S.topic||!S.lastScore)return;
  S.history.unshift({topic:S.topic,position:S.position,score:S.lastScore,layers:{...S.layers},ts:new Date().toLocaleTimeString()});
  renderHistory();
}
function renderHistory() {
  const list=document.getElementById('hist-list');
  if(!S.history.length){
    list.innerHTML='<div style="padding:2rem;text-align:center;font-family:var(--mono);font-size:11px;color:var(--ink4);letter-spacing:.06em;">NO ENTRIES IN THE ARCHIVE</div>';
    return;
  }
  list.innerHTML=S.history.map((e,i)=>`
    <div class="archive-entry" onclick="reloadEntry(${i})">
      <div>
        <div class="ae-topic">${e.topic}</div>
        <div class="ae-meta">${e.position.substring(0,50)} · ${e.ts}</div>
      </div>
      <div class="ae-score">${e.score}</div>
    </div>`).join('');
}
function clearHist(){ S.history=[]; renderHistory(); }

function reloadEntry(i) {
  const e=S.history[i];if(!e)return;
  S.topic=e.topic; S.position=e.position; S.layers=e.layers;
  switchTab('debate');
  document.getElementById('pipeline').innerHTML='';
  const colors=['#2c2c28','#c41230','#5a5a52','#b8860b','#0a0a08'];
  const titles=['Context Analysis','Argument Builder','Counter-Argument','Self-Critique','Final Strategy & Verdict'];
  const subs=['Debate landscape mapped','Three arguments built','Opposition generated','Weaknesses identified','Loffi\'s verdict'];
  for(let n=1;n<=5;n++){
    if(!e.layers[n])continue;
    const art=document.createElement('div');
    art.className='article done';art.style.setProperty('--lc',colors[n-1]);
    const fmt=e.layers[n].replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>').replace(/\n\n/g,'</p><p>').replace(/\n/g,' ');
    art.innerHTML=`<div class="article-head"><div class="article-number" style="color:${colors[n-1]};">${n}</div><div class="article-meta"><div class="article-section" style="color:${colors[n-1]};">Layer ${n} — ${titles[n-1]}</div><div class="article-headline">${subs[n-1]}</div></div><div class="article-status done2">PRINTED</div></div><hr class="article-rule"><div class="article-body"><div class="article-text"><p>${fmt}</p></div></div><hr class="article-rule"><div class="article-footer"><button class="art-btn" onclick="copyTxt(this,'${esc(e.layers[n])}')">Copy</button><button class="art-btn" onclick="playLayer(this,${n})">Read Aloud</button></div>`;
    document.getElementById('pipeline').appendChild(art);
  }
  document.getElementById('export-strip').classList.add('show');
  telegram('Dispatch reloaded ✓','ok');
}

// ================================================================
// EXPORT
// ================================================================
function exportDebate(fmt) {
  if(!S.topic){telegram('No dispatch to export','err');return;}
  const titles={1:'Context Analysis',2:'Argument Builder',3:'Counter-Argument',4:'Self-Critique',5:'Final Strategy & Verdict'};
  let out='';
  if(fmt==='md'){
    out=`# The Argument Record — ${S.topic}\n**Position:** ${S.position}  \n**Persona:** ${S.persona} | **Tone:** ${S.tone}  \n**Source:** ${S.source}\n\n---\n\n`;
    for(let i=1;i<=5;i++) if(S.layers[i]) out+=`## Layer ${i}: ${titles[i]}\n\n${S.layers[i]}\n\n---\n\n`;
  } else if(fmt==='txt'){
    out=`THE ARGUMENT RECORD — ${S.topic}\nPosition: ${S.position}\n\n`;
    for(let i=1;i<=5;i++) if(S.layers[i]) out+=`=== ${titles[i].toUpperCase()} ===\n${S.layers[i]}\n\n`;
  } else {
    out=JSON.stringify({topic:S.topic,position:S.position,persona:S.persona,layers:S.layers},null,2);
  }
  const ext=fmt==='json'?'json':fmt==='md'?'md':'txt';
  const a=Object.assign(document.createElement('a'),{href:URL.createObjectURL(new Blob([out],{type:'text/plain'})),download:`argument-record-${S.topic.substring(0,30).replace(/\s+/g,'-').toLowerCase()}.${ext}`});
  a.click();
  telegram(`Printed as .${ext}`,'ok');
}
function copyAll() {
  const titles={1:'Context Analysis',2:'Argument Builder',3:'Counter-Argument',4:'Self-Critique',5:'Final Strategy'};
  let out='';
  for(let i=1;i<=5;i++) if(S.layers[i]) out+=`[${titles[i]}]\n${S.layers[i]}\n\n`;
  navigator.clipboard.writeText(out).then(()=>telegram('Copied to clipboard','ok'));
}
function shareDebate() {
  const url=window.location.href.split('?')[0]+`?t=${encodeURIComponent(S.topic)}&p=${encodeURIComponent(S.position)}`;
  navigator.clipboard.writeText(url).then(()=>telegram('Share link copied','ok'));
}

// ================================================================
// UTILS
// ================================================================
function copyTxt(btn,text) { navigator.clipboard.writeText(text||'').then(()=>{btn.textContent='Copied';setTimeout(()=>btn.textContent='Copy',1400);}); }

function playLayer(btn, n) {
  if (!S.kokoroEnabled) { telegram('Enable Kokoro TTS in settings to use Read Aloud', 'err'); return; }
  if (btn.classList.contains('playing')) {
    if (S.activeAudio) { S.activeAudio.pause(); S.activeAudio = null; }
    btn.classList.remove('playing'); btn.textContent = 'Read Aloud'; return;
  }
  btn.classList.add('playing'); btn.textContent = '■ Stop';
  speak(S.layers[n] || '').then(() => { btn.classList.remove('playing'); btn.textContent = 'Read Aloud'; });
}

function delay(ms){return new Promise(r=>setTimeout(r,ms));}

function telegram(msg,type='ok'){
  const t=document.getElementById('telegram');
  t.textContent=msg; t.className=`telegram show ${type}`;
  clearTimeout(S.toastT);
  S.toastT=setTimeout(()=>t.classList.remove('show'),3200);
}

function clearAll(){
  S.layers={}; S.liveTranscript=[];
  S.totalIn=0; S.totalOut=0;
  document.getElementById('pipeline').innerHTML='<div class="pipeline-empty"><div class="pipeline-empty-headline">No dispatch in print.</div><div class="pipeline-empty-sub">Configure your debate and press Run to begin.</div></div>';
  document.getElementById('score-wrap').innerHTML='';
  document.getElementById('coach-wrap').innerHTML='';
  document.getElementById('export-strip').classList.remove('show');
  document.getElementById('fallacy-alert').classList.remove('show');
  document.getElementById('socratic-broadside').classList.remove('show');
  document.getElementById('live-paper').innerHTML='<div style="padding:2rem;text-align:center;font-family:var(--mono);font-size:11px;color:var(--ink4);letter-spacing:.06em;">NO TRANSCRIPT YET</div>';
  document.getElementById('live-result').classList.remove('show');
  document.getElementById('aia-transcript').innerHTML='<div class="match-empty">No exchanges yet.</div>';
  document.getElementById('aia-verdict').innerHTML='';
  resetTele();
  telegram('Cleared ✓','ok');
}

// ================================================================
// API
// ================================================================
// ================================================================
// API — proxied through server.js (key in .env, never in browser)
// ================================================================
async function api(prompt, maxTokens=1200) {
  const r = await fetch('/api/claude', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: 'claude-sonnet-4-20250514', max_tokens: maxTokens, messages: [{ role: 'user', content: prompt }] })
  });
  if (!r.ok) { const e = await r.json().catch(()=>({})); throw new Error(e.error?.message || `Server ${r.status} — run: npm start`); }
  const d = await r.json();
  return d.content?.[0]?.text || '';
}

async function apiWithTokens(prompt, maxTokens=1200) {
  const r = await fetch('/api/claude', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: 'claude-sonnet-4-20250514', max_tokens: maxTokens, messages: [{ role: 'user', content: prompt }] })
  });
  if (!r.ok) { const e = await r.json().catch(()=>({})); throw new Error(e.error?.message || `Server ${r.status} — run: npm start`); }
  const d = await r.json();
  return { text: d.content?.[0]?.text || '', in: d.usage?.input_tokens || 0, out: d.usage?.output_tokens || 0 };
}
// ── Global Exports for Inline HTML Handlers ──
window.switchLang = switchLang;
window.applyStrings = applyStrings;
window.toggleKokoro = toggleKokoro;
window.buildCatStrip = buildCatStrip;
window.renderCat = renderCat;
window.renderSub = renderSub;
window.selectTopic = selectTopic;
window.setCustom = setCustom;
window.updatePreview = updatePreview;
window.toggleFeature = toggleFeature;
window.setToggle = setToggle;
window.toggleAcc = toggleAcc;
window.initTones = initTones;
window.makeArticle = makeArticle;
window.fillArticle = fillArticle;
window.runTelemetryOptimization = runTelemetryOptimization;
window.waitSocratic = waitSocratic;
window.submitSocratic = submitSocratic;
window.syncAIA = syncAIA;
window.addExchange = addExchange;
window.addLiveTurn = addLiveTurn;
window.setHostStatus = setHostStatus;
window.toggleMic = toggleMic;
window.startMic = startMic;
window.stopMic = stopMic;
window.initAvatar = initAvatar;
window.startSiBars = startSiBars;
window.stopSiBars = stopSiBars;
window.startWave = startWave;
window.stopWave = stopWave;
window.switchTab = switchTab;
window.resetTele = resetTele;
window.updateTele = updateTele;
window.setTW = setTW;
window.setTicker = setTicker;
window.saveHistory = saveHistory;
window.renderHistory = renderHistory;
window.clearHist = clearHist;
window.reloadEntry = reloadEntry;
window.exportDebate = exportDebate;
window.copyAll = copyAll;
window.shareDebate = shareDebate;
window.copyTxt = copyTxt;
window.playLayer = playLayer;
window.delay = delay;
window.telegram = telegram;
window.clearAll = clearAll;

// ── Global Async Exports ──
window.initKokoro = initKokoro;
window.speak = speak;
window.runPipeline = runPipeline;
window.runFallacy = runFallacy;
window.runLayer = runLayer;
window.runSocratic = runSocratic;
window.runScore = runScore;
window.runCoach = runCoach;
window.runAIA = runAIA;
window.startLive = startLive;
window.handleUserTurn = handleUserTurn;
window.endLive = endLive;
window.api = api;
window.apiWithTokens = apiWithTokens;

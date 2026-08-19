import 'dotenv/config';
import dns from 'dns';
import mongoose from 'mongoose';
import { connectDB } from '../config/db.js';
import Character from '../models/Character.js';
import TitanKin from '../models/TitanKin.js';

dns.setServers(['8.8.8.8', '1.1.1.1']);

const characters = [

  // ============================================================
  // MAIN CHARACTERS — SURVEY CORPS
  // ============================================================
  {
    name: 'Eren Yeager', slug: 'eren-yeager',
    title: 'Protagonist — Holder of the Attack, Founding & War Hammer Titans',
    order: 'Vanguard', rank: 'Scout / Founding Titan Holder',
    wallTier: 'Outer', status: 'KIA', age: 19, heightCm: 183,
    portraitColor: '#3D5A6C',
    portraitUrl: '/portraits/eren-yeager.png', featured: true,
    shortBio: 'The boy who swore to destroy all Titans after watching his mother get eaten — and became something far more terrifying than any Titan himself.',
    fullBio: 'Eren Yeager grew up in Shiganshina. When the Colossal Titan broke the wall in Year 845, he watched his mother Carla get eaten. That rage defined his life. He carried the Attack Titan and Founding Titan injected by his father Grisha. Over years of war he evolved from an idealistic boy into the architect of the Rumbling — destroying 80% of the outside world. He was ultimately decapitated by Mikasa, the person he loved most. Experience: 9 years as soldier and Titan shifter.',
    abilities: ['Attack Titan', 'Founding Titan (Rumbling / Titan control)', 'War Hammer Titan (hardening constructs)', 'Accelerated healing', 'Future memories'],
    storyArcs: [
      { arcSlug: 'fall-of-shiganshina', arcTitle: 'Fall of Shiganshina', summary: 'Watches his mother die; swears to exterminate all Titans.', order: 1 },
      { arcSlug: 'battle-of-trost', arcTitle: 'Battle of Trost', summary: 'First Titan transformation; seals Trost\'s hole with a boulder.', order: 2 },
      { arcSlug: 'return-to-shiganshina', arcTitle: 'Return to Shiganshina', summary: 'Discovers his father\'s basement; learns the truth of the outside world.', order: 3 },
      { arcSlug: 'marley-arc', arcTitle: 'Marley Arc', summary: 'Infiltrates Marley undercover; attacks Liberio killing Willy Tybur; gains War Hammer Titan.', order: 4 },
      { arcSlug: 'the-rumbling', arcTitle: 'The Rumbling', summary: 'Unleashes Wall Titans on the world; killed by Mikasa in the final battle.', order: 5 },
    ],
    relationships: [
      { characterSlug: 'mikasa-ackerman', relation: 'Childhood friend / love interest' },
      { characterSlug: 'armin-arlert', relation: 'Best friend' },
      { characterSlug: 'zeke-yeager', relation: 'Half-brother' },
      { characterSlug: 'grisha-yeager', relation: 'Father' },
    ],
  },
  {
    name: 'Mikasa Ackerman', slug: 'mikasa-ackerman',
    title: 'Humanity\'s Strongest Female Soldier',
    order: 'Vanguard', rank: 'Scout Corporal',
    wallTier: 'Inner', status: 'Active', age: 19, heightCm: 170,
    portraitColor: '#8B2635',
    portraitUrl: '/portraits/mikasa-ackerman.png', featured: true,
    shortBio: 'Eren\'s adoptive sister and elite swordswoman — an Ackerman who devoted her life to protecting Eren, only to be the one who ends it.',
    fullBio: 'Mikasa Ackerman was born to an Ackerman father and Hizuru-clan mother. After her parents were murdered, Eren Yeager saved her and the Yeager family adopted her. She graduated top of the 104th Training Corps. Her Ackerman bloodline grants superhuman strength, speed, and reflexes. She was the finest ODM combatant in the Corps. In the final battle, she decapitated Eren — freeing the world. She returned to Shiganshina, lived a long life visiting Eren\'s grave, dying around Year 915. Experience: 7 years in the military.',
    abilities: ['Ackerman power (superhuman strength, speed, reflexes)', 'Exceptional ODM skills', 'Master swordswoman', 'Peak physical conditioning'],
    storyArcs: [
      { arcSlug: 'fall-of-shiganshina', arcTitle: 'Fall of Shiganshina', summary: 'Escapes with Eren and Armin; joins the military to stay by Eren\'s side.', order: 1 },
      { arcSlug: 'female-titan-arc', arcTitle: 'Female Titan Arc', summary: 'Fights Annie Leonhart; helps rescue Eren from the Female Titan.', order: 2 },
      { arcSlug: 'the-rumbling', arcTitle: 'The Rumbling', summary: 'Decapitates Eren to stop the Rumbling; cradles his severed head.', order: 3 },
    ],
    relationships: [
      { characterSlug: 'eren-yeager', relation: 'Adoptive brother / love interest' },
      { characterSlug: 'armin-arlert', relation: 'Close friend and squadmate' },
      { characterSlug: 'levi-ackerman', relation: 'Distant Ackerman relative' },
    ],
  },
  {
    name: 'Armin Arlert', slug: 'armin-arlert',
    title: 'Eren\'s Childhood Friend — Holder of the Colossal Titan',
    order: 'Vanguard', rank: 'Scout Commander',
    wallTier: 'Outer', status: 'Active', age: 19, heightCm: 163,
    portraitColor: '#C9A24B',
    portraitUrl: '/portraits/armin-arlert.png', featured: true,
    shortBio: 'The strategist whose brilliant mind saved humanity more than once — and whose Colossal Titan ended the Marleyan navy.',
    fullBio: 'Armin Arlert grew up with Eren and Mikasa in Shiganshina. He had no physical gifts but his tactical mind was unmatched. Mortally wounded at Shiganshina, Levi used Titan serum to transform him into a Pure Titan who ate Bertholdt Hoover, inheriting the Colossal Titan. He destroyed the Marleyan navy at Liberio. In the final battle he dueled Eren before Mikasa delivered the killing blow. He became a Marleyan ambassador and declared himself responsible for Eren\'s death to protect Mikasa. Experience: 7 years in the military.',
    abilities: ['Colossal Titan (massive explosion + steam)', 'Strategic genius', 'Diplomatic intelligence', 'Tactical planning'],
    storyArcs: [
      { arcSlug: 'battle-of-trost', arcTitle: 'Battle of Trost', summary: 'Devises the plan to use Eren\'s Titan to seal the wall.', order: 1 },
      { arcSlug: 'return-to-shiganshina', arcTitle: 'Return to Shiganshina', summary: 'Mortally wounded; saved with Titan serum; inherits Colossal Titan by eating Bertholdt.', order: 2 },
      { arcSlug: 'marley-arc', arcTitle: 'Marley Arc', summary: 'Destroys Marleyan naval fleet at Liberio as the Colossal Titan.', order: 3 },
      { arcSlug: 'the-rumbling', arcTitle: 'The Rumbling', summary: 'Duels Eren in final battle; declares he killed Eren to protect Mikasa.', order: 4 },
    ],
    relationships: [
      { characterSlug: 'eren-yeager', relation: 'Best friend' },
      { characterSlug: 'mikasa-ackerman', relation: 'Close friend and squadmate' },
    ],
  },
  {
    name: 'Levi Ackerman', slug: 'levi-ackerman',
    title: 'Humanity\'s Strongest Soldier',
    order: 'Vanguard', rank: 'Captain',
    wallTier: 'Inner', status: 'Active', age: 34, heightCm: 160,
    portraitColor: '#1A1D24',
    portraitUrl: '/portraits/levi-ackerman.png', featured: true,
    shortBio: 'The deadliest human alive — a street criminal turned captain who killed more Titans than anyone in history.',
    fullBio: 'Levi Ackerman was born to Kuchel Ackerman in the underground city. Raised by his uncle Kenny after his mother\'s death, he became a criminal before joining the Survey Corps. His Ackerman bloodline grants superhuman combat ability. He commands with brutal efficiency. He survived Zeke\'s thunder spear explosion (losing fingers and an eye) and ultimately killed Zeke in the final battle, severing Eren\'s control over the Wall Titans. He settled in Marley after the war. Experience: over 15 years in Survey Corps.',
    abilities: ['Ackerman powers (unmatched combat ability)', 'Dual blade mastery', 'Unmatched ODM gear skill', 'Tactical squad leadership'],
    storyArcs: [
      { arcSlug: 'female-titan-arc', arcTitle: 'Female Titan Arc', summary: 'Single-handedly defeats Annie as the Female Titan.', order: 1 },
      { arcSlug: 'uprising', arcTitle: 'Uprising', summary: 'Battles Kenny Ackerman; chooses to save Armin with the Titan serum at Shiganshina.', order: 2 },
      { arcSlug: 'the-rumbling', arcTitle: 'The Rumbling', summary: 'Kills Zeke Yeager, severing Eren\'s control; survives the final battle.', order: 3 },
    ],
    relationships: [
      { characterSlug: 'mikasa-ackerman', relation: 'Distant Ackerman relative' },
      { characterSlug: 'kenny-ackerman', relation: 'Nephew — raised by Kenny' },
      { characterSlug: 'zeke-yeager', relation: 'Killed in final battle' },
      { characterSlug: 'erwin-smith', relation: 'Trusted commander and closest friend' },
    ],
  },

  // ============================================================
  // SURVEY CORPS
  // ============================================================
  {
    name: 'Erwin Smith', slug: 'erwin-smith',
    title: 'Former Commander of the Survey Corps',
    order: 'Vanguard', rank: 'Commander', wallTier: 'Inner', status: 'KIA', age: 39, heightCm: 188,
    portraitColor: '#C9A24B',
    portraitUrl: '/portraits/erwin-smith.png', featured: false,
    shortBio: 'The visionary commander who sacrificed everything — including his own arm and finally his life — to find the truth about the world.',
    fullBio: 'Erwin Smith led the Survey Corps with a singular obsession: discovering the truth about the outside world. At the Battle of Shiganshina, with his right arm lost to a Titan bite, he led a suicidal cavalry charge into Zeke\'s Beast Titan barrage — buying Levi the opening to defeat Zeke. Mortally wounded, he died before regaining consciousness. Levi chose to use the Titan serum on Armin instead. Experience: more than 20 years in military leadership.',
    abilities: ['Strategic mastermind', 'Charismatic leadership', 'Political intelligence', 'Tactical genius'],
    storyArcs: [
      { arcSlug: 'uprising', arcTitle: 'Uprising', summary: 'Orchestrates the military coup; places Historia on the throne.', order: 1 },
      { arcSlug: 'return-to-shiganshina', arcTitle: 'Return to Shiganshina', summary: 'Leads suicidal cavalry charge; dies from wounds.', order: 2 },
    ],
    relationships: [{ characterSlug: 'levi-ackerman', relation: 'Trusted captain and closest friend' }],
  },
  {
    name: 'Hange Zoë', slug: 'hange-zoe',
    title: 'Survey Corps Commander / Titan Researcher',
    order: 'Vanguard', rank: 'Commander', wallTier: 'Inner', status: 'KIA', age: 35, heightCm: 170,
    portraitColor: '#3D5A6C',
    portraitUrl: '/portraits/hange-zoe.png', featured: false,
    shortBio: 'Eccentric genius who turned Titan research into science — and died holding back Wall Titans alone to buy the alliance time.',
    fullBio: 'Hange Zoë served as section leader of the Survey Corps under Erwin Smith, later becoming Commander. Their obsession with Titans led to groundbreaking research. They developed Thunder Spears and wall-mounted Titan execution devices. In the final arc, Hange sacrificed themselves to hold back Wall Titans alone, buying the alliance time to repair the flying boat — dying in a blaze of Titan steam. Experience: over 15 years in the Survey Corps.',
    abilities: ['Titan biology expertise', 'Thunder Spear inventor', 'Tactical genius', 'ODM gear combat'],
    storyArcs: [
      { arcSlug: 'clash-of-titans', arcTitle: 'Clash of the Titans', summary: 'Investigates Titans inside Wall Rose; interrogates Minister Nick.', order: 1 },
      { arcSlug: 'the-rumbling', arcTitle: 'The Rumbling', summary: 'Sacrifices themselves holding back Wall Titans to save the alliance.', order: 2 },
    ],
    relationships: [{ characterSlug: 'levi-ackerman', relation: 'Closest colleague and friend' }],
  },
  {
    name: 'Jean Kirstein', slug: 'jean-kirstein',
    title: 'Skilled Leader of the New Generation',
    order: 'Vanguard', rank: 'Scout', wallTier: 'Mid', status: 'Active', age: 19, heightCm: 175,
    portraitColor: '#3D5A6C',
    portraitUrl: '/portraits/jean-kirstein.png', featured: false,
    shortBio: 'The cynical realist who wanted a safe life in the Military Police — and became one of the best leaders the Survey Corps ever produced.',
    fullBio: 'Jean Kirstein joined training wanting nothing more than a safe posting inside Wall Sheena. The death of his friend Marco Brott changed him permanently. He joined the Survey Corps, became a natural leader, and grew into one of its finest soldiers. After the war he became a Marleyan ambassador. Experience: 7 years in the military.',
    abilities: ['ODM gear combat', 'Natural leadership', 'Tactical instincts', 'Hand-to-hand combat'],
    storyArcs: [
      { arcSlug: 'battle-of-trost', arcTitle: 'Battle of Trost', summary: 'Steps up as a leader after Marco\'s death; joins Survey Corps instead of MP.', order: 1 },
      { arcSlug: 'the-rumbling', arcTitle: 'The Rumbling', summary: 'Fights alongside the alliance to stop Eren; survives as Marleyan ambassador.', order: 2 },
    ],
    relationships: [{ characterSlug: 'eren-yeager', relation: 'Rival turned trusted squadmate' }],
  },
  {
    name: 'Sasha Braus', slug: 'sasha-braus',
    title: 'Potato Girl — Scout Soldier',
    order: 'Vanguard', rank: 'Scout', wallTier: 'Outer', status: 'KIA', age: 19, heightCm: 168,
    portraitColor: '#C9A24B',
    portraitUrl: '/portraits/sasha-braus.png', featured: false,
    shortBio: 'The warm-hearted hunter known as "Potato Girl" — shot dead by Gabi on the airship returning from Liberio.',
    fullBio: 'Sasha Braus came from a hunting village and brought hunter\'s instincts to ODM combat no drill instructor could teach. Beloved by the entire 104th Corps for her warmth and appetite. During the Liberio raid she fought brilliantly. On the airship retreat, Gabi Braun shot her with a rifle. She died asking for meat. Her death shattered Connie and Jean. Experience: 7 years in the military.',
    abilities: ['Expert marksmanship', 'Hunter instincts', 'ODM gear agility', 'Forest survival skills'],
    storyArcs: [
      { arcSlug: 'clash-of-titans', arcTitle: 'Clash of the Titans', summary: 'Rescues a village girl from a Titan alone, armed with only a bow.', order: 1 },
      { arcSlug: 'marley-arc', arcTitle: 'Marley Arc', summary: 'Killed by Gabi Braun on the airship returning from Liberio.', order: 2 },
    ],
    relationships: [{ characterSlug: 'connie-springer', relation: 'Closest friend in the 104th' }],
  },
  {
    name: 'Connie Springer', slug: 'connie-springer',
    title: 'Loyal Member of the Survey Corps',
    order: 'Vanguard', rank: 'Scout', wallTier: 'Outer', status: 'Active', age: 19, heightCm: 158,
    portraitColor: '#3D5A6C',
    portraitUrl: '/portraits/connie-springer.png', featured: false,
    shortBio: 'A cheerful, loyal soldier from Ragako village — whose entire hometown was turned into Pure Titans by the Beast Titan.',
    fullBio: 'Connie Springer grew up in Ragako. He graduated in the lower tier of the 104th Corps but his loyalty made him a valued Scout. The most devastating moment of his life came when he discovered the Pure Titans inside Wall Rose were transformed residents of his own village — including his mother. He continued fighting and became a Marleyan ambassador after the war. Experience: 7 years in the military.',
    abilities: ['ODM gear combat', 'High mobility', 'Agility', 'Teamwork'],
    storyArcs: [
      { arcSlug: 'clash-of-titans', arcTitle: 'Clash of the Titans', summary: 'Discovers Titans inside Wall Rose are people of Ragako, including his mother.', order: 1 },
    ],
    relationships: [{ characterSlug: 'sasha-braus', relation: 'Closest friend in the 104th' }],
  },
  {
    name: 'Historia Reiss', slug: 'historia-reiss',
    title: 'Queen of Paradis Island',
    order: 'Vanguard', rank: 'Queen / Former Scout', wallTier: 'Inner', status: 'Active', age: 19, heightCm: 157,
    portraitColor: '#C9A24B',
    portraitUrl: '/portraits/historia-reiss.png', featured: false,
    shortBio: 'An illegitimate royal daughter who hid as "Krista Lenz" and became Queen after helping overthrow the corrupt puppet monarchy.',
    fullBio: 'Historia Reiss was the illegitimate daughter of Rod Reiss, the true king of the Walls. She lived under the false name "Krista Lenz." After joining the 104th Corps, her true identity surfaced. When Rod Reiss tried to use her to inherit the Founding Titan she refused — and personally killed her titan-transformed father. She was crowned Queen of Paradis, opened orphanages, and gave birth to the first child of Ymir\'s bloodline free of Titan influence. Experience: 7 years in the military.',
    abilities: ['Royal bloodline (Founding Titan lineage)', 'Combat trained', 'Political leadership', 'Inspiring presence'],
    storyArcs: [
      { arcSlug: 'uprising', arcTitle: 'Uprising', summary: 'Kills her titan-transformed father Rod Reiss; is crowned Queen of Paradis.', order: 1 },
    ],
    relationships: [{ characterSlug: 'eren-yeager', relation: 'Ally; her royal bloodline was key to Eren\'s plan' }],
  },

  // ============================================================
  // MARLEY WARRIORS
  // ============================================================
  {
    name: 'Reiner Braun', slug: 'reiner-braun',
    title: 'Armored Titan Holder — Destroyed Wall Maria',
    order: 'Ironwatch', rank: 'Warrior / Sergeant', wallTier: 'Beyond the Walls', status: 'Active', age: 21, heightCm: 185,
    portraitColor: '#8B2635',
    portraitUrl: '/portraits/reiner-braun.png', featured: false,
    shortBio: 'The Marleyan Warrior who infiltrated the Walls as a comrade — while secretly carrying the Armored Titan meant to destroy humanity.',
    fullBio: 'Reiner Braun volunteered for the Warrior program to earn citizenship for his family. Inheriting the Armored Titan at age 10, he was sent to Paradis undercover. Years alongside the 104th Corps genuinely changed him — his mind fractured under guilt, creating a split personality. He broke Wall Maria as the Armored Titan. He survived the Battle of Shiganshina and ultimately joined the alliance to stop Eren\'s Rumbling. Experience: more than 10 years as a Warrior.',
    abilities: ['Armored Titan (near-impenetrable hardened skin)', 'Superhuman Titan combat', 'Military combat training', 'Endurance under extreme trauma'],
    storyArcs: [
      { arcSlug: 'fall-of-shiganshina', arcTitle: 'Fall of Shiganshina', summary: 'Breaks Wall Maria as the Armored Titan.', order: 1 },
      { arcSlug: 'clash-of-titans', arcTitle: 'Clash of the Titans', summary: 'Reveals himself as the Armored Titan; abducts Eren.', order: 2 },
      { arcSlug: 'the-rumbling', arcTitle: 'The Rumbling', summary: 'Joins the alliance to stop Eren; fights in the final battle.', order: 3 },
    ],
    relationships: [
      { characterSlug: 'gabi-braun', relation: 'Cousin' },
      { characterSlug: 'eren-yeager', relation: 'Former comrade / enemy / uneasy ally' },
    ],
  },
  {
    name: 'Annie Leonhart', slug: 'annie-leonhart',
    title: 'Female Titan Holder — Marleyan Spy in Paradis',
    order: 'Ironwatch', rank: 'Warrior', wallTier: 'Beyond the Walls', status: 'Active', age: 20, heightCm: 153,
    portraitColor: '#8B2635',
    portraitUrl: '/portraits/annie-leonhart.png', featured: false,
    shortBio: 'A cold, precise Marleyan Warrior who infiltrated the 104th Corps — and spent years sealed in crystal until the Rumbling undid her hardening.',
    fullBio: 'Annie Leonhart trained with her father for the Warrior program from childhood. She was selected as Female Titan holder and sent to Paradis undercover. Her martial arts were unmatched — she ranked 4th in the 104th Corps. After her identity was exposed she sealed herself in a crystal cocoon. When Eren\'s Founding Titan undid all hardening her crystal broke and she emerged, joining the alliance. She survived the final battle. Experience: around 8 years as a warrior.',
    abilities: ['Female Titan (crystal hardening, Titan attraction cry)', 'Master martial arts combatant', 'Expert ODM gear user', 'Selective body hardening'],
    storyArcs: [
      { arcSlug: 'female-titan-arc', arcTitle: 'Female Titan Arc', summary: 'Massacres Survey Corps during 57th Expedition; captured in Stohess; crystallizes herself.', order: 1 },
      { arcSlug: 'the-rumbling', arcTitle: 'The Rumbling', summary: 'Crystal broken by Eren\'s power; joins the alliance to stop him.', order: 2 },
    ],
    relationships: [{ characterSlug: 'reiner-braun', relation: 'Fellow Warrior' }],
  },
  {
    name: 'Bertholdt Hoover', slug: 'bertholdt-hoover',
    title: 'Colossal Titan Holder — Destroyed Shiganshina\'s Gate',
    order: 'Ironwatch', rank: 'Warrior', wallTier: 'Beyond the Walls', status: 'KIA', age: 17, heightCm: 192,
    portraitColor: '#1A1D24',
    portraitUrl: '/portraits/bertholdt-hoover.png', featured: false,
    shortBio: 'The quiet, towering Warrior who broke the gate of Shiganshina as the Colossal Titan — triggering the tragedy that drove the entire story.',
    fullBio: 'Bertholdt Hoover was selected as the Colossal Titan holder for Marley\'s Warrior program. Gentle and reserved in human form, he was the one who began everything — his transformation broke Shiganshina\'s gate in Year 845, letting the Pure Titans pour in and killing Eren\'s mother. He maintained his cover in the 104th Training Corps for years. He was mortally wounded at the Battle of Shiganshina and eaten by Armin Arlert, who inherited the Colossal Titan. Experience: around 5 years as a warrior.',
    abilities: ['Colossal Titan (60-meter form, explosive transformation, steam emission)', 'ODM gear combat', 'Stealth and long-term infiltration'],
    storyArcs: [
      { arcSlug: 'fall-of-shiganshina', arcTitle: 'Fall of Shiganshina', summary: 'Destroys Shiganshina\'s gate as the Colossal Titan, triggering the invasion.', order: 1 },
      { arcSlug: 'return-to-shiganshina', arcTitle: 'Return to Shiganshina', summary: 'Killed and eaten by Armin; Colossal Titan power passes to Armin.', order: 2 },
    ],
    relationships: [{ characterSlug: 'reiner-braun', relation: 'Fellow Warrior and closest friend' }],
  },
  {
    name: 'Zeke Yeager', slug: 'zeke-yeager',
    title: 'Beast Titan Holder — Marley\'s War Chief',
    order: 'Ironwatch', rank: 'War Chief of the Warriors', wallTier: 'Beyond the Walls', status: 'KIA', age: 29, heightCm: 183,
    portraitColor: '#3D5A6C',
    portraitUrl: '/portraits/zeke-yeager.png', featured: true,
    shortBio: 'Eren\'s half-brother and Marley\'s most powerful Warrior — who secretly planned to sterilize all Eldians while manipulating both sides of the war.',
    fullBio: 'Zeke Yeager was born to Grisha Yeager and Dina Fritz. He eventually betrayed his parents to protect himself. He inherited the Beast Titan and became Marley\'s War Chief. His royal blood was crucial to Eren\'s plan. Eren ultimately betrayed him, using his royal blood to access the Founder for the Rumbling instead. Levi killed Zeke in the final battle, severing Eren\'s control over the Wall Titans. Experience: around 17 years as a Warrior.',
    abilities: ['Beast Titan (ape form, precise throwing, Pure Titan control via scream)', 'Royal Eldian blood', 'Strategic intelligence', 'Spinal fluid transformation power'],
    storyArcs: [
      { arcSlug: 'clash-of-titans', arcTitle: 'Clash of the Titans', summary: 'Commands Pure Titans inside Wall Rose; kills Mike Zacharias.', order: 1 },
      { arcSlug: 'return-to-shiganshina', arcTitle: 'Return to Shiganshina', summary: 'Nearly wipes out Survey Corps with barrage throws; defeated by Levi.', order: 2 },
      { arcSlug: 'the-rumbling', arcTitle: 'The Rumbling', summary: 'Manipulated by Eren into giving him Founding Titan access; killed by Levi.', order: 3 },
    ],
    relationships: [
      { characterSlug: 'eren-yeager', relation: 'Half-brother' },
      { characterSlug: 'grisha-yeager', relation: 'Father (betrayed to Marley)' },
      { characterSlug: 'levi-ackerman', relation: 'Killed by Levi in the final battle' },
    ],
  },
  {
    name: 'Pieck Finger', slug: 'pieck-finger',
    title: 'Cart Titan Holder — One of Marley\'s Smartest Warriors',
    order: 'Ironwatch', rank: 'Warrior', wallTier: 'Beyond the Walls', status: 'Active', age: 21, heightCm: 157,
    portraitColor: '#3D5A6C',
    portraitUrl: '/portraits/pieck-finger.png', featured: false,
    shortBio: 'The Cart Titan holder whose quadrupedal form served as a battlefield supply platform — and whose sharp intelligence made her Marley\'s most reliable Warrior.',
    fullBio: 'Pieck Finger was selected as Cart Titan holder for the Warrior program and fought in Marley\'s wars against the Mid-East Alliance. Her Cart Titan remains in Titan form for months at a time. She rescued multiple Warriors during Shiganshina. After the war she joined the alliance to stop the Rumbling and became a Marleyan ambassador. Experience: around 10 years as a Warrior.',
    abilities: ['Cart Titan (high endurance, quadrupedal, artillery platform)', 'Extended Titan shifts', 'Exceptional intelligence', 'Battlefield logistics'],
    storyArcs: [
      { arcSlug: 'return-to-shiganshina', arcTitle: 'Return to Shiganshina', summary: 'Rescues Reiner and Zeke from certain death after the battle.', order: 1 },
      { arcSlug: 'the-rumbling', arcTitle: 'The Rumbling', summary: 'Joins the alliance to stop Eren; survives as a Marleyan ambassador.', order: 2 },
    ],
    relationships: [{ characterSlug: 'reiner-braun', relation: 'Fellow Warrior' }],
  },
  {
    name: 'Porco Galliard', slug: 'porco-galliard',
    title: 'Jaw Titan Holder — Marcel\'s Younger Brother',
    order: 'Ironwatch', rank: 'Warrior', wallTier: 'Beyond the Walls', status: 'KIA', age: 22, heightCm: 172,
    portraitColor: '#8B2635',
    portraitUrl: '/portraits/porco-galliard.png', featured: false,
    shortBio: 'Marcel Galliard\'s younger brother — who inherited the Jaw Titan after Ymir was taken back to Marley and died sacrificing himself at Shiganshina.',
    fullBio: 'Porco Galliard inherited the Jaw Titan from Ymir after she was brought back to Marley and devoured. He resented that his brother Marcel had passed the Jaw Titan to Reiner during the Paradis mission and carried anger over Marcel\'s death. He fought in the Liberio battle and died at Shiganshina, sacrificing himself to save Reiner. His Jaw Titan was then passed to Falco Grice. Experience: around 10 years as a Warrior.',
    abilities: ['Jaw Titan (speed and crystal-crushing claws/jaws)', 'Expert Titan combat', 'Aggressive fighting style'],
    storyArcs: [
      { arcSlug: 'marley-arc', arcTitle: 'Marley Arc', summary: 'His Jaw Titan jaw is used by Eren to crack the War Hammer Titan\'s crystal.', order: 1 },
      { arcSlug: 'return-to-shiganshina', arcTitle: 'Return to Shiganshina', summary: 'Sacrifices himself to save Reiner; Falco Grice inherits the Jaw Titan.', order: 2 },
    ],
    relationships: [{ characterSlug: 'reiner-braun', relation: 'Fellow Warrior' }],
  },
  {
    name: 'Falco Grice', slug: 'falco-grice',
    title: 'Jaw Titan Holder — Kind-Hearted Warrior Candidate',
    order: 'Ironwatch', rank: 'Warrior Candidate', wallTier: 'Beyond the Walls', status: 'Active', age: 12, heightCm: 145,
    portraitColor: '#C9A24B',
    portraitUrl: '/portraits/falco-grice.png', featured: false,
    shortBio: 'A kind-hearted Warrior candidate who inherited the Jaw Titan with unique Beast Titan traits — manifesting a winged form no previous holder possessed.',
    fullBio: 'Falco Grice was a Warrior candidate in Marley with no ambition for power — he mainly wanted to inherit the Armored Titan to spare Gabi its curse. He was unknowingly used by Eren to smuggle letters. After ingesting Zeke\'s spinal fluid during the Shiganshina battle, he was transformed into a Pure Titan and accidentally ate Porco Galliard, inheriting the Jaw Titan. His form uniquely developed wings — possibly a sign Titan powers are still evolving. Experience: warrior candidate.',
    abilities: ['Jaw Titan with Beast Titan traits', 'Winged Jaw Titan form (unique)', 'Crystal-crushing jaw and claws', 'High agility'],
    storyArcs: [
      { arcSlug: 'marley-arc', arcTitle: 'Marley Arc', summary: 'Unknowingly used by Eren to deliver letters; later transforms and eats Porco, inheriting the Jaw Titan.', order: 1 },
    ],
    relationships: [{ characterSlug: 'gabi-braun', relation: 'Close friend and fellow candidate' }],
  },
  {
    name: 'Gabi Braun', slug: 'gabi-braun',
    title: 'Reiner\'s Cousin — Elite Warrior Candidate',
    order: 'Ironwatch', rank: 'Warrior Candidate', wallTier: 'Beyond the Walls', status: 'Active', age: 12, heightCm: 145,
    portraitColor: '#8B2635',
    portraitUrl: '/portraits/gabi-braun.png', featured: false,
    shortBio: 'A fiercely patriotic Marleyan warrior candidate who shot Sasha Braus dead — and whose worldview was dismantled by the reality she found inside Paradis.',
    fullBio: 'Gabi Braun was Reiner\'s younger cousin and the most talented warrior candidate of her generation. She was raised to believe Paradis Eldians were devils. When Eren attacked Liberio, she pursued the Survey Corps onto their airship and shot Sasha. Inside the Walls, the reality of ordinary Eldian life forced her to confront everything she\'d been taught. She fought in the final battle to stop the Rumbling — having completely reversed her worldview. Experience: warrior candidate with excellent shooting skills.',
    abilities: ['Excellent marksmanship', 'Close-quarters combat', 'Anti-Titan improvised tactics', 'Agility'],
    storyArcs: [
      { arcSlug: 'marley-arc', arcTitle: 'Marley Arc', summary: 'Kills Sasha on the airship; is captured alongside Falco.', order: 1 },
      { arcSlug: 'the-rumbling', arcTitle: 'The Rumbling', summary: 'Joins the alliance; shoots Eren\'s head from the Founding Titan\'s neck.', order: 2 },
    ],
    relationships: [
      { characterSlug: 'reiner-braun', relation: 'Cousin' },
      { characterSlug: 'falco-grice', relation: 'Close friend and fellow candidate' },
    ],
  },

  // ============================================================
  // ACKERMAN FAMILY
  // ============================================================
  {
    name: 'Kenny Ackerman', slug: 'kenny-ackerman',
    title: 'Kenny the Ripper — Captain of the Interior Military Police',
    order: 'Cinder Corps', rank: 'Captain', wallTier: 'Inner', status: 'KIA', age: 40, heightCm: 185,
    portraitColor: '#1A1D24',
    portraitUrl: '/portraits/kenny-ackerman.png', featured: false,
    shortBio: 'A notorious serial killer known as "Kenny the Ripper" — and Levi\'s uncle who died passing him a vial of Titan serum.',
    fullBio: 'Kenny Ackerman was a feared criminal and legendary figure in the underbelly of Wall Sheena. He befriended Uri Reiss and became the Reiss family\'s personal enforcer. He adopted his nephew Levi from the underground and trained him before abandoning him. During the Uprising arc he led the Interior Squad against Levi\'s scouts. Mortally wounded by Levi, he revealed his true identity and passed Levi the Titan serum — later used to save Armin. Experience: over 20 years as an assassin.',
    abilities: ['Ackerman powers (enhanced combat)', 'Expert marksmanship (rare firearm skills)', 'Master close-quarters combatant', 'Tactical intelligence'],
    storyArcs: [
      { arcSlug: 'uprising', arcTitle: 'Uprising', summary: 'Hunts Levi\'s squad; mortally wounded by Levi; gives him the Titan serum before dying.', order: 1 },
    ],
    relationships: [{ characterSlug: 'levi-ackerman', relation: 'Nephew — the man who raised Levi' }],
  },
  {
    name: 'Kuchel Ackerman', slug: 'kuchel-ackerman',
    title: 'Levi\'s Mother — Ackerman Bloodline',
    order: 'Civilian', rank: 'Civilian', wallTier: 'Inner', status: 'KIA', age: 0, heightCm: 0,
    portraitColor: '#8B2635', featured: false,
    shortBio: 'Levi\'s mother who lived and died in the underground city beneath Wall Sheena, leaving her son to be raised by his uncle Kenny.',
    fullBio: 'Kuchel Ackerman was Kenny Ackerman\'s younger sister who lived in the underground city beneath Wall Sheena. She worked in a brothel and died there, leaving behind her young son Levi. Kenny discovered her death when he returned to the underground, and adopted Levi — raising him for years before eventually abandoning him to make his own way. Kuchel\'s Ackerman bloodline was passed to Levi.',
    abilities: ['Ackerman bloodline (passed to Levi)'],
    storyArcs: [],
    relationships: [
      { characterSlug: 'levi-ackerman', relation: 'Son' },
      { characterSlug: 'kenny-ackerman', relation: 'Brother' },
    ],
  },

  // ============================================================
  // IMPORTANT ROYAL FAMILY MEMBERS
  // ============================================================
  {
    name: 'Grisha Yeager', slug: 'grisha-yeager',
    title: 'Eren\'s Father — Holder of the Attack & Founding Titans',
    order: 'Civilian', rank: 'Doctor / Titan Holder', wallTier: 'Outer', status: 'KIA', age: 39, heightCm: 175,
    portraitColor: '#C9A24B',
    portraitUrl: '/portraits/grisha-yeager.png', featured: false,
    shortBio: 'Eren\'s father — a Marleyan-born Eldian restorationist who carried the Attack Titan to Paradis and passed it to his son the night Wall Maria fell.',
    fullBio: 'Grisha Yeager was born in the Liberio internment zone. After his sister Fay was killed by Marleyan guards he joined the Eldian Restorationist movement. The Marleyans turned all members into Pure Titans except Grisha, who was spared by the secret Attack Titan holder Kruger, who then passed Grisha the power. Grisha built a new life on Paradis — marrying Carla, fathering Eren — while secretly planning to claim the Founding Titan. The night Wall Maria fell, Grisha attacked the Reiss chapel, took the Founding Titan, then injected Eren with Titan serum. Eren ate Grisha, inheriting both Titans. Experience: doctor and Titan shifter for 13 years.',
    abilities: ['Attack Titan', 'Founding Titan (briefly)', 'Medical expertise', 'Eldian restorationist knowledge'],
    storyArcs: [
      { arcSlug: 'fall-of-shiganshina', arcTitle: 'Fall of Shiganshina', summary: 'Steals Founding Titan from Reiss family; injects Eren with Titan serum; eaten by Eren.', order: 1 },
    ],
    relationships: [
      { characterSlug: 'eren-yeager', relation: 'Son' },
      { characterSlug: 'zeke-yeager', relation: 'Son (from first marriage to Dina Fritz)' },
    ],
  },
  {
    name: 'Carla Yeager', slug: 'carla-yeager',
    title: 'Eren\'s Mother',
    order: 'Civilian', rank: 'Civilian', wallTier: 'Outer', status: 'KIA', age: 36, heightCm: 165,
    portraitColor: '#C9A24B',
    portraitUrl: '/portraits/carla-yeager.png', featured: false,
    shortBio: 'Eren\'s mother — a loving civilian whose death when the Colossal Titan broke Wall Maria set the entire story in motion.',
    fullBio: 'Carla Yeager was Eren\'s mother and Grisha\'s second wife, living a simple life in the Shiganshina district. She was trapped in the rubble of their home when the Colossal Titan broke the wall, and was eaten by a Pure Titan — later revealed to be the transformed Dina Fritz, Grisha\'s first wife. Her death in front of Eren\'s eyes was the defining trauma that drove the entire story. She had no combat abilities. Experience: civilian.',
    abilities: ['None — civilian'],
    storyArcs: [
      { arcSlug: 'fall-of-shiganshina', arcTitle: 'Fall of Shiganshina', summary: 'Eaten by the Pure Titan Dina Fritz in front of Eren; her death sets the entire story in motion.', order: 1 },
    ],
    relationships: [
      { characterSlug: 'eren-yeager', relation: 'Son' },
      { characterSlug: 'grisha-yeager', relation: 'Husband' },
    ],
  },
  {
    name: 'Rod Reiss', slug: 'rod-reiss',
    title: 'True King of the Walls — Historia\'s Father',
    order: 'Civilian', rank: 'True King / Head of Reiss Family', wallTier: 'Inner', status: 'KIA', age: 45, heightCm: 178,
    portraitColor: '#1A1D24',
    portraitUrl: '/portraits/rod-reiss.png', featured: false,
    shortBio: 'The true king behind the puppet throne — who became an enormous mindless Titan in a desperate attempt to regain the Founding Titan from Eren.',
    fullBio: 'Rod Reiss was the true ruler of the Walls, operating behind the scenes as the head of the Reiss family while a puppet king sat on the public throne. He was the father of Frieda Reiss (the previous Founding Titan holder) and Historia\'s biological father. After Grisha Yeager killed the Reiss family, Rod survived and spent years trying to reclaim the Founding Titan. He drank Titan spinal fluid meant for Historia and became an enormous, crawling abnormal Titan. He was killed by Historia using Thunder Spears before he could reach Trost. Experience: approximately 40-50 years as leader of the Reiss family.',
    abilities: ['Abnormal Titan transformation (enormous size)', 'Royal blood lineage', 'Political manipulation'],
    storyArcs: [
      { arcSlug: 'uprising', arcTitle: 'Uprising', summary: 'Drinks Titan serum; becomes enormous abnormal Titan; killed by Historia with Thunder Spears.', order: 1 },
    ],
    relationships: [{ characterSlug: 'historia-reiss', relation: 'Biological father' }],
  },
  {
    name: 'Frieda Reiss', slug: 'frieda-reiss',
    title: 'Previous Holder of the Founding Titan',
    order: 'Civilian', rank: 'Founding Titan Holder', wallTier: 'Inner', status: 'KIA', age: 18, heightCm: 163,
    portraitColor: '#C9A24B',
    portraitUrl: '/portraits/frieda-reiss.png', featured: false,
    shortBio: 'Historia\'s half-sister and the previous holder of the Founding Titan — whose pacifist will embedded by Karl Fritz prevented her from using its full power.',
    fullBio: 'Frieda Reiss was the daughter of Rod Reiss and holder of the Founding Titan before Eren. She met with Historia secretly throughout her childhood, forming a bond she later erased from Historia\'s memories using the Founding Titan\'s power. Like all royal Founding Titan holders after Karl Fritz, she carried his vow of pacifism embedded in her will — which prevented her from using the Titan\'s full powers. She was killed and eaten by Grisha Yeager, who used his Attack Titan form to defeat her despite the power difference.',
    abilities: ['Founding Titan powers (restricted by Karl Fritz\'s vow)', 'Memory erasure', 'Titan control (suppressed)'],
    storyArcs: [
      { arcSlug: 'uprising', arcTitle: 'Uprising', summary: 'Killed and eaten by Grisha Yeager, who inherits the Founding Titan.', order: 1 },
    ],
    relationships: [{ characterSlug: 'historia-reiss', relation: 'Half-sister' }],
  },

  // ============================================================
  // OTHER IMPORTANT CHARACTERS
  // ============================================================
  {
    name: 'Floch Forster', slug: 'floch-forster',
    title: 'Leader of the Yeagerists',
    order: 'Vanguard', rank: 'Scout / Yeagerist Leader', wallTier: 'Inner', status: 'KIA', age: 20, heightCm: 170,
    portraitColor: '#8B2635',
    portraitUrl: '/portraits/floch-forster.png', featured: false,
    shortBio: 'A survivor of the Battle of Shiganshina who became the fanatical leader of the Yeagerist movement — and died stopping the alliance\'s flying boat.',
    fullBio: 'Floch Forster was one of the few survivors of the Battle of Shiganshina. That experience, along with Erwin\'s death and the choice to save Armin instead, transformed him into a zealot. He became the leader of the Yeagerists — the Paradis faction devoted to Eren\'s Rumbling plan. He assassinated Zackly and led the Yeagerists\' seizure of the military. He was killed by Mikasa while trying to destroy the flying boat the alliance needed to pursue Eren. Experience: approximately 20 years. Abilities: leadership, strategy.',
    abilities: ['Leadership', 'Yeagerist political strategy', 'ODM gear combat', 'Firearms'],
    storyArcs: [
      { arcSlug: 'marley-arc', arcTitle: 'Marley Arc', summary: 'Leads the Yeagerists\' military coup on Paradis.', order: 1 },
      { arcSlug: 'the-rumbling', arcTitle: 'The Rumbling', summary: 'Tries to destroy the alliance\'s flying boat; killed by Mikasa.', order: 2 },
    ],
    relationships: [{ characterSlug: 'eren-yeager', relation: 'Fanatical follower' }],
  },
  {
    name: 'Dot Pixis', slug: 'dot-pixis',
    title: 'Commander of the Southern Garrison Corps',
    order: 'Ironwatch', rank: 'Garrison Commander', wallTier: 'Mid', status: 'KIA', age: 60, heightCm: 180,
    portraitColor: '#C9A24B',
    portraitUrl: '/portraits/dot-pixis.png', featured: false,
    shortBio: 'A veteran Garrison commander who decided to trust Eren\'s Titan power — and later became a Titan himself when Zeke unleashed his spinal fluid.',
    fullBio: 'Dot Pixis was the respected commander of the Southern Garrison Corps who made the pivotal decision to trust Eren and use his Titan power to seal the breach at Trost. He later participated in Erwin\'s military coup, helping place Historia on the throne. In the final arc, he was among those who had unknowingly consumed Zeke\'s spinal-fluid-laced wine and was transformed into a Pure Titan during Zeke\'s roar. He was killed in Titan form. Experience: over 60 years — veteran commander.',
    abilities: ['Leadership', 'Tactical strategy', 'Veteran combat experience'],
    storyArcs: [
      { arcSlug: 'battle-of-trost', arcTitle: 'Battle of Trost', summary: 'Authorizes use of Eren\'s Titan power to seal the wall; humanity\'s first victory.', order: 1 },
    ],
    relationships: [],
  },
  {
    name: 'Keith Shadis', slug: 'keith-shadis',
    title: 'Former Survey Corps Commander / Training Instructor',
    order: 'Vanguard', rank: 'Training Instructor', wallTier: 'Mid', status: 'KIA', age: 50, heightCm: 188,
    portraitColor: '#1A1D24',
    portraitUrl: '/portraits/keith-shadis.png', featured: false,
    shortBio: 'Former Survey Corps commander and the brutal instructor who trained the 104th Training Corps — including Eren, Mikasa, and Armin.',
    fullBio: 'Keith Shadis served as Survey Corps commander before Erwin Smith, leading many failed expeditions outside the walls. Plagued by his own sense of inadequacy, he stepped down and became the head instructor of the Training Corps — channeling his failures into forging better soldiers. He had an unexplained past connection to Grisha Yeager and knew more about Eren\'s origins than he revealed. He was killed by Yeagerist soldiers while sabotaging their efforts to help the Rumbling. Experience: approximately 50 years. Abilities: training, swordsmanship, former commander.',
    abilities: ['Military leadership', 'Training expertise', 'Swordsmanship', 'Former commander-level tactical knowledge'],
    storyArcs: [
      { arcSlug: 'battle-of-trost', arcTitle: 'Battle of Trost', summary: 'Trains the 104th Corps; watches his students go off to war.', order: 1 },
    ],
    relationships: [{ characterSlug: 'eren-yeager', relation: 'Student (trained him in 104th Corps)' }],
  },
  {
    name: 'Dina Fritz', slug: 'dina-fritz',
    title: 'Grisha\'s First Wife — Pure Titan Who Ate Carla Yeager',
    order: 'Civilian', rank: 'Eldian Restorationist / Pure Titan', wallTier: 'Beyond the Walls', status: 'KIA', age: 0, heightCm: 0,
    portraitColor: '#8B2635',
    portraitUrl: '/portraits/dina-fritz.png', featured: false,
    shortBio: 'Grisha\'s first wife and last royal Eldian outside the walls — transformed into the "Smiling Titan" that ate Carla Yeager in front of Eren.',
    fullBio: 'Dina Fritz was the last royal-blooded Eldian living outside the Walls and Grisha Yeager\'s first wife, together leading the Eldian Restorationist movement. When the movement was exposed, all members were transformed into Pure Titans on Paradis island. Dina became the distinctive "Smiling Titan" — the Pure Titan that ate Carla Yeager in front of Eren. Years later, Eren accidentally used the Founding Titan\'s coordinate ability (triggered by Dina\'s royal blood) to direct the other Pure Titans to devour her, avenging his mother. Abilities: royal blood lineage.',
    abilities: ['Royal blood lineage (Founding Titan lineage)', 'Pure Titan form (Smiling Titan)'],
    storyArcs: [
      { arcSlug: 'fall-of-shiganshina', arcTitle: 'Fall of Shiganshina', summary: 'As the Smiling Titan, eats Carla Yeager in front of Eren.', order: 1 },
      { arcSlug: 'clash-of-titans', arcTitle: 'Clash of the Titans', summary: 'Eren accidentally uses Founding Titan coordinate to command Titans to devour her.', order: 2 },
    ],
    relationships: [
      { characterSlug: 'grisha-yeager', relation: 'First wife' },
      { characterSlug: 'zeke-yeager', relation: 'Son' },
    ],
  },
  {
    name: 'Mike Zacharias', slug: 'mike-zacharias',
    title: 'Humanity\'s Second Strongest Soldier',
    order: 'Vanguard', rank: 'Section Commander', wallTier: 'Mid', status: 'KIA', age: 40, heightCm: 193,
    portraitColor: '#3D5A6C',
    portraitUrl: '/portraits/mike-zacharias.png', featured: false,
    shortBio: 'Humanity\'s second strongest soldier after Levi — killed by Zeke\'s Beast Titan after being stripped of his ODM gear and left to be devoured by Pure Titans.',
    fullBio: 'Mike Zacharias was the Survey Corps\' section commander and widely regarded as humanity\'s second strongest soldier after Levi. He had the unusual habit of smelling people rather than shaking hands and was known for his immense combat ability. He was the first character in the series to encounter Zeke\'s Beast Titan — who stole his ODM gear, briefly interrogated him, then left him to be devoured by Pure Titans. His death signaled the Beast Titan\'s intelligence. Age: approximately 40.',
    abilities: ['Elite ODM gear combat', 'Superhuman physical strength', 'Exceptional battlefield leadership'],
    storyArcs: [
      { arcSlug: 'clash-of-titans', arcTitle: 'Clash of the Titans', summary: 'Encounters the Beast Titan; ODM gear stolen; devoured by Pure Titans.', order: 1 },
    ],
    relationships: [],
  },
  {
    name: 'Marco Bott', slug: 'marco-bott',
    title: 'Member of the 104th Training Corps',
    order: 'Vanguard', rank: 'Scout (deceased)', wallTier: 'Mid', status: 'KIA', age: 15, heightCm: 178,
    portraitColor: '#C9A24B',
    portraitUrl: '/portraits/marco-bott.png', featured: false,
    shortBio: 'A kind-hearted member of the 104th who overheard Reiner and Bertholdt\'s secret — and was murdered and fed to a Titan to silence him.',
    fullBio: 'Marco Bott was one of the most promising members of the 104th Training Corps, graduating 7th in his class. Kind, perceptive, and a natural leader, he was one of Jean\'s closest friends and recognized Jean\'s leadership potential before Jean did. He overheard Reiner and Bertholdt conspiring about their true identities. Annie, Reiner, and Bertholdt stripped him of his ODM gear and left him to be eaten by a Titan to protect their cover. His death haunted Jean throughout the entire series. Age: 15 at death.',
    abilities: ['ODM gear combat', 'Natural leadership', 'Perceptive intelligence'],
    storyArcs: [
      { arcSlug: 'battle-of-trost', arcTitle: 'Battle of Trost', summary: 'Overhears Reiner and Bertholdt\'s secret; murdered by Annie, Reiner, and Bertholdt to silence him.', order: 1 },
    ],
    relationships: [{ characterSlug: 'jean-kirstein', relation: 'Closest friend' }],
  },
  {
    name: 'Petra Ral', slug: 'petra-ral',
    title: 'Member of the Special Operations Squad',
    order: 'Vanguard', rank: 'Scout — Special Operations', wallTier: 'Mid', status: 'KIA', age: 15, heightCm: 158,
    portraitColor: '#8B2635',
    portraitUrl: '/portraits/petra-ral.png', featured: false,
    shortBio: 'One of Levi\'s hand-picked Special Operations Squad members — killed by Annie as the Female Titan during the 57th Expedition.',
    fullBio: 'Petra Ral was one of the four members personally selected by Levi for his Special Operations Squad, alongside Eld Jinn, Oluo Bozado, and Gunther Schultz. She was skilled, warm-hearted, and deeply loyal to Levi. The entire squad — except Levi — was killed by Annie Leonhart as the Female Titan during the 57th Expedition outside the walls. Her death, along with her squadmates, was one of the Survey Corps\' most devastating losses. Age: 15 at death.',
    abilities: ['ODM gear combat', 'Close-quarters combat', 'Special operations skills'],
    storyArcs: [
      { arcSlug: 'female-titan-arc', arcTitle: 'Female Titan Arc', summary: 'Killed by Annie as the Female Titan during the 57th Expedition.', order: 1 },
    ],
    relationships: [{ characterSlug: 'levi-ackerman', relation: 'Squad leader' }],
  },
  {
    name: 'Tom Ksaver', slug: 'tom-ksaver',
    title: 'Previous Beast Titan Holder — Zeke\'s Mentor',
    order: 'Ironwatch', rank: 'Former Warrior', wallTier: 'Beyond the Walls', status: 'KIA', age: 20, heightCm: 175,
    portraitColor: '#3D5A6C',
    portraitUrl: '/portraits/tom-ksaver.png', featured: false,
    shortBio: 'The previous Beast Titan holder who mentored Zeke Yeager and shared his dream of using the Founder\'s power to sterilize all Eldians.',
    fullBio: 'Tom Ksaver held the Beast Titan before Zeke Yeager and served as Zeke\'s mentor and closest companion during the latter\'s early years as a Warrior. Ksaver lost his own family as collateral damage of the Warrior program and developed the plan to use the Founding Titan\'s power to sterilize all Eldians — ending the cycle of Titan inheritance and violence peacefully. He shared this plan with Zeke, who adopted it as his own mission. Ksaver died of his 13-year Titan curse and passed the Beast Titan to Zeke. Age: approximately 20 at death.',
    abilities: ['Beast Titan (previous holder)', 'Scientific intelligence', 'Strategic planning'],
    storyArcs: [],
    relationships: [{ characterSlug: 'zeke-yeager', relation: 'Mentor / father figure' }],
  },
  {
    name: 'Marcel Galliard', slug: 'marcel-galliard',
    title: 'Original Jaw Titan Holder — Porco\'s Older Brother',
    order: 'Ironwatch', rank: 'Warrior (deceased)', wallTier: 'Beyond the Walls', status: 'KIA', age: 0, heightCm: 0,
    portraitColor: '#C9A24B',
    portraitUrl: '/portraits/marcel-galliard.png', featured: false,
    shortBio: 'Porco\'s older brother and original Jaw Titan holder — eaten by the Pure Titan Ymir before the Warriors even reached the Walls.',
    fullBio: 'Marcel Galliard was the original Jaw Titan holder sent on the mission to Paradis alongside Reiner, Annie, and Bertholdt. He was the group\'s natural leader and arguably its most capable member. Before the Warriors even reached the Walls, he was attacked and eaten by the Pure Titan who had once been the girl named Ymir — who then inherited his Jaw Titan power and regained human form. His death forced the remaining Warriors to continue the mission without their leader. Age: approximately 13 at death (Titan\'s curse).',
    abilities: ['Jaw Titan (original holder)', 'Warrior-level combat training', 'Team leadership'],
    storyArcs: [
      { arcSlug: 'fall-of-shiganshina', arcTitle: 'Fall of Shiganshina', summary: 'Eaten by Pure Titan Ymir before reaching the Walls; Ymir inherits the Jaw Titan.', order: 1 },
    ],
    relationships: [{ characterSlug: 'porco-galliard', relation: 'Younger brother' }],
  },
];

const titans = [
  // ============================================================
  // THE NINE TITANS
  // ============================================================
  {
    name: 'The Founding Titan',
    slug: 'founding-titan', classification: 'Sealed God', heightMeters: 200, threatLevel: 10,
    firstSighting: 'Year 0 — Ymir Fritz / Over 2,000 years old',
    portraitColor: '#8B2635',
    portraitUrl: '/portraits/founding-titan.png', featured: true,
    shortBio: 'The most powerful of the Nine — capable of controlling all Titans, altering Eldian biology and memory, and commanding the millions of Colossal Titans sealed within the Walls.',
    fullBio: 'The Founding Titan is the original power of the Nine, descended from Ymir Fritz. When wielded by royal blood its powers are nearly limitless: alter memories and bodies of all Eldians, control all Pure Titans, create Titan powers, and command the Wall Titans. Karl Fritz deliberately suppressed these powers in royal heirs with a pacifist vow. Eren circumvented this by making contact with Zeke (royal blood) and freed Ymir from the Paths, gaining full access — triggering the Rumbling. Current holder: Eren Yeager. Age: over 2,000 years old.',
    abilities: ['Control all Titans and Eldian biology', 'Alter memories of all Subjects of Ymir', 'Wall Titan command (The Rumbling)', 'Access to the Paths dimension', 'Biological alteration of Eldian race'],
    weakness: 'Requires royal blood or contact with it; destroyed when Mikasa kills Eren',
    storyArcs: [
      { arcSlug: 'uprising', arcTitle: 'Uprising', summary: 'Eren accidentally activates it via contact with Dina Fritz\'s Titan (royal blood).', order: 1 },
      { arcSlug: 'the-rumbling', arcTitle: 'The Rumbling', summary: 'Fully activated by Eren using Zeke\'s royal blood; triggers the Rumbling.', order: 2 },
    ],
    boundCharacterSlug: 'eren-yeager',
  },
  {
    name: 'The Attack Titan',
    slug: 'attack-titan', classification: 'Apex', heightMeters: 15, threatLevel: 9,
    firstSighting: 'Year 850 — Battle of Trost',
    portraitColor: '#1A1D24',
    portraitUrl: '/portraits/attack-titan.png', featured: true,
    shortBio: 'The Titan that always fights for freedom — with the unique ability to see the memories of future inheritors, making its holder capable of shaping history.',
    fullBio: 'The Attack Titan uniquely always fights for freedom regardless of its holder, and grants the ability to see memories of future inheritors — seeing forward in time. This power was key to Eren\'s plan; he saw the Rumbling\'s path laid out in future memories long before acting on it. Passed from Kruger to Grisha Yeager to Eren. In Eren\'s hands it became the most powerful weapon in the world combined with the Founding Titan. Symbolizes freedom. Age: over 2,000 years old.',
    abilities: ['Future memory inheritance', 'Enhanced combat ability', 'Hardening (partial)', 'Freedom-oriented will across all holders'],
    weakness: 'Standard Titan nape exposure; 13-year lifespan curse',
    storyArcs: [
      { arcSlug: 'battle-of-trost', arcTitle: 'Battle of Trost', summary: 'Eren\'s first transformation; attacks other Titans instinctively; seals the wall.', order: 1 },
      { arcSlug: 'the-rumbling', arcTitle: 'The Rumbling', summary: 'Merged with the Founding Titan in a colossal form during the final battle.', order: 2 },
    ],
    boundCharacterSlug: 'eren-yeager',
  },
  {
    name: 'The Colossal Titan',
    slug: 'colossal-titan', classification: 'Apex', heightMeters: 60, threatLevel: 10,
    firstSighting: 'Year 845 — Fall of Shiganshina',
    portraitColor: '#8B2635',
    portraitUrl: '/portraits/colossal-titan.png', featured: true,
    shortBio: 'The 60-meter steam-wreathed colossus that broke Wall Maria — and whose explosive power later destroyed the Marleyan naval fleet at Liberio.',
    fullBio: 'The Colossal Titan stands 60 meters tall and generates enormous explosions and scalding steam by controlling the rate of muscle evaporation. First wielded by Bertholdt Hoover who breached Shiganshina in Year 845. Bertholdt was killed and eaten by Armin Arlert at Shiganshina, who then used it to destroy the Marleyan fleet at Liberio in a single catastrophic explosion. Approximately 60 meters tall. Age: over 2,000 years old.',
    abilities: ['60-meter height', 'Explosive transformation (city-level blast)', 'Scalding steam emission', 'Wall-scale destructive force'],
    weakness: 'Nape exposure during transformation; steam depletion shrinks the body over time',
    storyArcs: [
      { arcSlug: 'fall-of-shiganshina', arcTitle: 'Fall of Shiganshina', summary: 'Breaks Shiganshina\'s gate; triggers the invasion of Wall Maria.', order: 1 },
      { arcSlug: 'marley-arc', arcTitle: 'Marley Arc', summary: 'Armin destroys the Marleyan navy at Liberio.', order: 2 },
    ],
    boundCharacterSlug: 'armin-arlert',
  },
  {
    name: 'The Armored Titan',
    slug: 'armored-titan', classification: 'Apex', heightMeters: 15, threatLevel: 9,
    firstSighting: 'Year 845 — Fall of Shiganshina',
    portraitColor: '#3D5A6C',
    portraitUrl: '/portraits/armored-titan.png', featured: true,
    shortBio: 'A 15-meter Titan encased in near-impenetrable hardened plates — capable of breaking through reinforced walls at a full sprint. Specializes in defense.',
    fullBio: 'The Armored Titan\'s entire body is covered in hardened crystalline plates that can withstand ODM blade strikes, cannon fire, and most weapons. Wielded by Reiner Braun, it broke Wall Maria by charging the gate at full speed. Badly damaged by Hange\'s Thunder Spears at Shiganshina. When Eren used the Founding Titan to undo all hardening, the Armored Titan\'s plates were stripped — though it retained significant combat power. Specializes in defense. Age: over 2,000 years old.',
    abilities: ['Full-body hardened plating', 'Wall-charging force', 'Sustained combat endurance', 'Nape protection plating'],
    weakness: 'Joints between plates; Thunder Spears bypass plating; hardening removed by Founding Titan',
    storyArcs: [
      { arcSlug: 'fall-of-shiganshina', arcTitle: 'Fall of Shiganshina', summary: 'Reiner breaks Wall Maria by charging the inner gate.', order: 1 },
      { arcSlug: 'return-to-shiganshina', arcTitle: 'Return to Shiganshina', summary: 'Defeated by Thunder Spears; plating lost when Founding Titan undoes hardening.', order: 2 },
    ],
    boundCharacterSlug: 'reiner-braun',
  },
  {
    name: 'The Female Titan',
    slug: 'female-titan', classification: 'Apex', heightMeters: 14, threatLevel: 8,
    firstSighting: 'Year 850 — 57th Expedition',
    portraitColor: '#8B2635',
    portraitUrl: '/portraits/female-titan.png', featured: true,
    shortBio: 'One of the most adaptable Titans — with selective hardening, ability to attract Pure Titans by crying, and a crystal cocoon that made its holder seemingly impossible to capture.',
    fullBio: 'The Female Titan can selectively harden any body part, attract Pure Titans with a distinctive cry, and encase its holder in a near-indestructible crystal cocoon. Wielded by Annie Leonhart, she massacred the Survey Corps during the 57th Expedition. Exposed in Stohess, she crystallized herself. Her crystal remained intact for years until Eren\'s Founding Titan undid all hardening, breaking Annie free. One of the most versatile Titans. Age: over 2,000 years old.',
    abilities: ['Selective body hardening', 'Pure Titan attraction cry', 'Crystal cocoon self-encasing', 'Martial arts mastery in Titan form'],
    weakness: 'Nape; hardening exhaustion; crystal cocoon can be broken by Jaw Titan jaws; Thunder Spears',
    storyArcs: [
      { arcSlug: 'female-titan-arc', arcTitle: 'Female Titan Arc', summary: 'Massacres Survey Corps during 57th Expedition; captured in Stohess; crystallizes.', order: 1 },
      { arcSlug: 'the-rumbling', arcTitle: 'The Rumbling', summary: 'Crystal broken by Eren\'s power; Annie joins the alliance.', order: 2 },
    ],
    boundCharacterSlug: 'annie-leonhart',
  },
  {
    name: 'The Beast Titan',
    slug: 'beast-titan', classification: 'Apex', heightMeters: 17, threatLevel: 9,
    firstSighting: 'Year 850 — Clash of the Titans',
    portraitColor: '#3D5A6C',
    portraitUrl: '/portraits/beast-titan.png', featured: true,
    shortBio: 'A towering ape-like Titan capable of speech and throwing projectiles with sniper precision — and controlling Pure Titans via a royal-blood scream.',
    fullBio: 'The Beast Titan stands roughly 17 meters in an ape-like form with thick fur. Held by Zeke Yeager, it spoke intelligibly, commanded Pure Titans through screaming (due to Zeke\'s royal blood), and threw boulders with devastating precision — wiping out the Survey Corps cavalry at Shiganshina. Zeke was killed by Levi Ackerman during the Rumbling, severing Eren\'s control. Zeke\'s form resembles an ape. Age: over 2,000 years old.',
    abilities: ['Speech capability', 'Boulder throwing (sniper-level precision)', 'Pure Titan command via royal blood scream', 'Thick fur resistance'],
    weakness: 'Nape during throw follow-through; specifically countered by Levi Ackerman',
    storyArcs: [
      { arcSlug: 'clash-of-titans', arcTitle: 'Clash of the Titans', summary: 'Kills Mike Zacharias; commands Pure Titans inside Wall Rose.', order: 1 },
      { arcSlug: 'return-to-shiganshina', arcTitle: 'Return to Shiganshina', summary: 'Destroys Survey Corps cavalry with barrage throws; defeated by Levi.', order: 2 },
    ],
    boundCharacterSlug: 'zeke-yeager',
  },
  {
    name: 'The Jaw Titan',
    slug: 'jaw-titan', classification: 'Apex', heightMeters: 5, threatLevel: 7,
    firstSighting: 'Year 845 — Paradis Island (Marcel Galliard)',
    portraitColor: '#C9A24B',
    portraitUrl: '/portraits/jaw-titan.png', featured: false,
    shortBio: 'The fastest of the Nine and the smallest — with jaws and claws capable of crushing hardened Titan crystal that no other power can breach.',
    fullBio: 'The Jaw Titan is notable for being only around 5 meters tall but extraordinarily fast, with jaws and claws that can crush hardened Titan crystal. Holders: Marcel Galliard (eaten by Ymir), Ymir (returned to Marley, eaten by Porco), Porco Galliard (sacrificed himself at Shiganshina), Falco Grice (current holder, developed a unique winged form suggesting Titan powers may still evolve). Small but extremely dangerous. Age: over 2,000 years old.',
    abilities: ['Exceptional speed', 'Crystal-crushing jaw and claws', 'Small agile frame (hard to target)', 'Winged flight form (Falco variant)'],
    weakness: 'Size limits damage against larger Titans; nape vulnerable despite speed',
    storyArcs: [
      { arcSlug: 'marley-arc', arcTitle: 'Marley Arc', summary: 'Porco\'s Jaw Titan jaws used by Eren to crack the War Hammer Titan\'s crystal.', order: 1 },
    ],
    boundCharacterSlug: 'falco-grice',
  },
  {
    name: 'The Cart Titan',
    slug: 'cart-titan', classification: 'Sentinel', heightMeters: 4, threatLevel: 6,
    firstSighting: 'Year 850 — Return to Shiganshina',
    portraitColor: '#3D5A6C',
    portraitUrl: '/portraits/cart-titan.png', featured: false,
    shortBio: 'A quadrupedal Titan with extraordinary endurance used as a battlefield supply and artillery platform — can remain transformed for months.',
    fullBio: 'The Cart Titan held by Pieck Finger is a four-legged, low-profile Titan with unmatched stamina — able to maintain Titan form for months at a time. Its role is logistical: carrying weapons, ammunition, and even soldiers. It rescued Reiner and Zeke from Shiganshina. Extended shifts have given Pieck the habit of walking on all fours in human form. The Cart Titan joined the final battle as part of the alliance against Eren. Can remain transformed for months. Age: over 2,000 years old.',
    abilities: ['Extended Titan shifts (months without reverting)', 'Quadrupedal speed and stability', 'Artillery and cargo platform', 'High battlefield endurance'],
    weakness: 'Low offensive combat ability; nape accessible due to quadrupedal posture',
    storyArcs: [
      { arcSlug: 'return-to-shiganshina', arcTitle: 'Return to Shiganshina', summary: 'Rescues Reiner and Zeke from certain death after the battle.', order: 1 },
    ],
    boundCharacterSlug: 'pieck-finger',
  },
  {
    name: 'The War Hammer Titan',
    slug: 'war-hammer-titan', classification: 'Apex', heightMeters: 15, threatLevel: 9,
    firstSighting: 'Year 854 — Liberio Attack',
    portraitColor: '#C9A24B',
    portraitUrl: '/portraits/war-hammer-titan.png', featured: false,
    shortBio: 'A Titan that creates any weapon or structure from hardened flesh — operated remotely from a crystal underground, making the nape seemingly unreachable.',
    fullBio: 'The War Hammer Titan was held exclusively by the Tybur family. It can generate any shape from hardened crystal — spikes, hammers, crossbow bolts, walls. Most uniquely, the holder operates it remotely from an underground crystal cocoon, meaning the manifested Titan\'s nape is empty. Lara Tybur fought Eren at Liberio with it. Eren used the Jaw Titan\'s crystal-crushing ability to break Lara\'s cocoon and devour her, adding its powers to his own. Formerly controlled by the Tybur family. Age: over 2,000 years old.',
    abilities: ['Hardening construct generation (any shape)', 'Remote operation from underground crystal cocoon', 'Near-limitless offensive architectural constructs', 'Crystal defense'],
    weakness: 'Crystal cocoon broken by Jaw Titan jaws; holder vulnerable inside',
    storyArcs: [
      { arcSlug: 'marley-arc', arcTitle: 'Marley Arc', summary: 'Lara Tybur fights Eren; Jaw Titan breaks her cocoon; Eren eats her and inherits the power.', order: 1 },
    ],
    boundCharacterSlug: null,
  },

  // ============================================================
  // OTHER TITANS (NOT PART OF THE NINE)
  // ============================================================
  {
    name: 'Pure Titan',
    slug: 'pure-titan', classification: 'Wandering', heightMeters: 10, threatLevel: 5,
    firstSighting: 'Year 743 — After the Walls were established',
    portraitColor: '#1A1D24',
    portraitUrl: '/portraits/pure-titan.png', featured: false,
    shortBio: 'Mindless horrors created from Eldians by Titan injections — driven only by instinct to consume humans, roaming outside the Walls endlessly.',
    fullBio: 'Pure Titans are Eldian humans transformed by Titan spinal fluid injection. Unlike the Nine inheritors they have no human consciousness — entirely driven by instinct to consume humans, yet cannot digest them. They vary in size from 2 to 15 meters and often have irregular, aberrant features. They do not age or require sustenance in Titan form. The only way to stop them is severing the nape. Created from Eldians by Titan injections. Mindless.',
    abilities: ['Mindless aggression toward humans', 'Regeneration (non-nape injuries)', 'Variable size (2–15m)', 'No need for sustenance or rest'],
    weakness: 'Severing the nape; killing the controlling Titan shifter; sunlight deprivation',
    storyArcs: [
      { arcSlug: 'fall-of-shiganshina', arcTitle: 'Fall of Shiganshina', summary: 'Pour through the broken gate; Carla Yeager eaten by Pure Titan Dina Fritz.', order: 1 },
    ],
    boundCharacterSlug: null,
  },
  {
    name: 'Abnormal Titan',
    slug: 'abnormal-titan', classification: 'Wandering', heightMeters: 12, threatLevel: 6,
    firstSighting: 'Early arcs — Wall Maria and Rose',
    portraitColor: '#8B2635',
    portraitUrl: '/portraits/abnormal-titan.png', featured: false,
    shortBio: 'Result of failed Titan science experiments — Abnormal Titans behave erratically and unpredictably, ignoring humans or running at full speed without warning.',
    fullBio: 'Abnormal Titans are Pure Titans that exhibit highly irregular behavior — ignoring humans completely, sprinting at full speed unpredictably, climbing walls, or targeting structures instead of people. They are the result of failed Titan science experiments or unusual transformation conditions. Their unpredictability makes them more dangerous than standard Pure Titans to experienced Survey Corps veterans who rely on behavioral patterns. Result of failed Titan science experiments.',
    abilities: ['Unpredictable behavior patterns', 'Possible full-speed sprinting', 'Wall-climbing ability', 'Ignores conventional Titan behavioral patterns'],
    weakness: 'Nape — same as all Titans; predictability once pattern is identified',
    storyArcs: [],
    boundCharacterSlug: null,
  },
  {
    name: 'Smiling Titan',
    slug: 'smiling-titan', classification: 'Wandering', heightMeters: 11, threatLevel: 6,
    firstSighting: 'Year 845 — Fall of Shiganshina',
    portraitColor: '#8B2635',
    portraitUrl: '/portraits/smiling-titan.png', featured: false,
    shortBio: 'The distinctive Pure Titan who ate Carla Yeager — later revealed to be the transformed Dina Fritz, Grisha\'s first wife and a royal-blooded Eldian.',
    fullBio: 'The Smiling Titan is a distinctive Pure Titan recognizable by its permanent disturbing smile. It ate Carla Yeager in front of Eren during the fall of Shiganshina. Years later during the Clash of the Titans arc, it appeared again near Eren\'s squad — Eren accidentally triggered the Founding Titan\'s Coordinate ability (activated by the Smiling Titan\'s royal blood) and commanded surrounding Pure Titans to devour it, avenging his mother. It was later revealed to be the transformed Dina Fritz. Special Pure Titan seen in early arcs.',
    abilities: ['Pure Titan strength', 'Royal blood (Founding Titan activator)', 'Distinctive appearance'],
    weakness: 'Nape; commanded by Eren\'s accidental Coordinate activation',
    storyArcs: [
      { arcSlug: 'fall-of-shiganshina', arcTitle: 'Fall of Shiganshina', summary: 'Eats Carla Yeager in front of Eren; the defining trauma of the series.', order: 1 },
      { arcSlug: 'clash-of-titans', arcTitle: 'Clash of the Titans', summary: 'Eren accidentally triggers the Coordinate; Smiling Titan is devoured by other Pure Titans.', order: 2 },
    ],
    boundCharacterSlug: 'dina-fritz',
  },
  {
    name: 'Wall Titan (Colossal)',
    slug: 'wall-titan', classification: 'Sealed God', heightMeters: 50, threatLevel: 10,
    firstSighting: 'Year 743 — Inside the Walls (dormant until Year 854)',
    portraitColor: '#3D5A6C',
    portraitUrl: '/portraits/wall-titan.png', featured: false,
    shortBio: 'Millions of Colossal Titans sealed inside the three Walls by Karl Fritz — the sleeping apocalypse unleashed as the Rumbling when Eren activated the Founding Titan.',
    fullBio: 'The Wall Titans are millions of Colossal Titans sealed within the walls of Paradis by Karl Fritz using the Founding Titan\'s power. Their hardened bodies form the walls themselves. They are the source of the "Rumbling" — when Eren activated the Founding Titan and freed them, they emerged and began marching toward the outside world, flattening everything in their path. Their combined destructive force wiped out 80% of the world\'s population. Millions of Colossal Titans formed the three Walls.',
    abilities: ['Colossal Titan scale destructive force (50m+)', 'Millions in number', 'Steam and explosive transformation', 'Near-unstoppable mass advance'],
    weakness: 'Severing connection to Founding Titan (achieved by killing Eren); Colossal Titan-level force',
    storyArcs: [
      { arcSlug: 'the-rumbling', arcTitle: 'The Rumbling', summary: 'Unleashed by Eren; march across the world destroying 80% of humanity outside Paradis.', order: 1 },
    ],
    boundCharacterSlug: null,
  },
];

async function seed() {
  await connectDB();
  console.log('[seed] Clearing existing collections...');
  await Character.deleteMany({});
  await TitanKin.deleteMany({});

  console.log('[seed] Inserting characters...');
  const insertedChars = await Character.insertMany(characters);
  const charSlugToId = Object.fromEntries(insertedChars.map((c) => [c.slug, c._id]));

  console.log('[seed] Inserting titans...');
  const titansToInsert = titans.map(({ boundCharacterSlug, ...t }) => ({
    ...t,
    boundCharacter: boundCharacterSlug ? charSlugToId[boundCharacterSlug] || null : null,
  }));
  const insertedTitans = await TitanKin.insertMany(titansToInsert);
  const titanSlugToId = Object.fromEntries(insertedTitans.map((t) => [t.slug, t._id]));

  // Link characters to their Titan forms
  const charTitanLinks = [
    ['eren-yeager', 'attack-titan'],
    ['armin-arlert', 'colossal-titan'],
    ['reiner-braun', 'armored-titan'],
    ['annie-leonhart', 'female-titan'],
    ['zeke-yeager', 'beast-titan'],
    ['pieck-finger', 'cart-titan'],
    ['bertholdt-hoover', 'colossal-titan'],
    ['falco-grice', 'jaw-titan'],
  ];
  for (const [charSlug, titanSlug] of charTitanLinks) {
    if (charSlugToId[charSlug] && titanSlugToId[titanSlug]) {
      await Character.findByIdAndUpdate(charSlugToId[charSlug], {
        affiliatedTitanForm: titanSlugToId[titanSlug],
      });
    }
  }

  // Link titans back to their primary bound character
  const titanCharLinks = [
    ['founding-titan', 'eren-yeager'],
    ['attack-titan', 'eren-yeager'],
    ['colossal-titan', 'armin-arlert'],
    ['armored-titan', 'reiner-braun'],
    ['female-titan', 'annie-leonhart'],
    ['beast-titan', 'zeke-yeager'],
    ['jaw-titan', 'falco-grice'],
    ['cart-titan', 'pieck-finger'],
    ['smiling-titan', 'dina-fritz'],
  ];
  for (const [titanSlug, charSlug] of titanCharLinks) {
    if (titanSlugToId[titanSlug] && charSlugToId[charSlug]) {
      await TitanKin.findByIdAndUpdate(titanSlugToId[titanSlug], {
        boundCharacter: charSlugToId[charSlug],
      });
    }
  }

  console.log(`[seed] ✓ Done. ${insertedChars.length} characters, ${insertedTitans.length} titans inserted.`);
  await mongoose.connection.close();
  process.exit(0);
}

seed().catch((err) => {
  console.error('[seed] Failed:', err);
  process.exit(1);
});

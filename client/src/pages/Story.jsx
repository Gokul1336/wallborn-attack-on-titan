import './Story.css';

const TIMELINE = [
  { year: '1003 BI', title: 'Ymir Becomes the First Titan', body: 'A slave girl named Ymir escapes her Eldian masters and falls into a pool beneath an enormous tree. A mysterious centipede-like creature bonds with her body — she becomes the first Titan, the source of all Titan power.', current: false },
  { year: '990 BI', title: 'Ymir Dies — Power Split into Nine', body: 'After 13 years serving King Fritz as weapon and concubine, Ymir dies saving him from assassination. Fritz feeds her remains to their three daughters — Rose, Maria, and Sheena. Over generations, nine distinct Titan powers emerge from her lineage.', current: false },
  { year: 'Year 743', title: 'Karl Fritz Orchestrates the Fall of the Eldian Empire', body: 'The 145th King, Karl Fritz, conspires with the Tybur family to stage the fall of his own empire. He takes the Eldians to Paradis island, creates three walls of Colossal Titans, and erases his people\'s memories — making them believe they are the last of humanity.', current: false },
  { year: 'Year 743–845', title: 'A Century Behind the Walls', body: 'Humanity lives in false peace inside the three walls: Maria, Rose, and Sheena. The Military Police, Garrison Corps, and Survey Corps are established. ODM gear is developed. The royal family secretly rules as the Reiss family behind a puppet king.', current: false },
  { year: 'Year 832', title: 'Grisha\'s Journey — The Restorationists Fall', body: 'Grisha Yeager\'s fellow Eldian Restorationists are transformed into Pure Titans on Paradis. Grisha alone is saved by Kruger — the secret Attack Titan holder — who passes him the power and sends him to Paradis to claim the Founding Titan.', current: false },
  { year: 'Year 845', title: 'Fall of Shiganshina — The Story Begins', body: 'Bertholdt Hoover transforms into the Colossal Titan and shatters Shiganshina\'s gate. Reiner Braun as the Armored Titan breaks Wall Maria. Pure Titans flood the district. Eren watches his mother Carla get eaten. Humanity retreats behind Wall Rose. Grisha injects Eren with Titan serum that night — Eren eats his father, inheriting the Attack and Founding Titans.', current: false },
  { year: 'Year 850', title: 'Victory at Trost — Humanity\'s First Win', body: 'The Warriors attack Trost district. Eren is eaten but his Titan ability activates; he seals the breach with a boulder as the Attack Titan. The 104th Training Corps joins the Survey Corps. Humanity achieves its first victory over the Titans.', current: false },
  { year: 'Year 850', title: 'The 57th Expedition — The Female Titan', body: 'Annie Leonhart attacks as the Female Titan, massacring Levi\'s Special Operations Squad. She is exposed and captured in Stohess District — but crystallizes herself in a cocoon to avoid interrogation.', current: false },
  { year: 'Year 850', title: 'Clash of the Titans — Warriors Revealed', body: 'Zeke unleashes Pure Titans inside Wall Rose. Reiner and Bertholdt reveal themselves and abduct Eren. Eren accidentally uses the Founding Titan coordinate (triggered by Dina Fritz\'s royal blood) to command Titans to devour the Smiling Titan that ate his mother.', current: false },
  { year: 'Year 850', title: 'Uprising — The Royal Secret', body: 'Erwin Smith and Dot Pixis orchestrate a military coup, placing Historia Reiss on the throne. Rod Reiss becomes a monstrous Titan and is killed by Historia herself. Levi saves the Titan serum from the dying Kenny Ackerman.', current: false },
  { year: 'Year 850', title: 'Return to Shiganshina — The Basement', body: 'A hundred soldiers ride to Shiganshina. The Warriors are defeated, but nearly all Survey Corps soldiers die — including Erwin Smith. Armin is mortally wounded, transformed into a Pure Titan, eats Bertholdt, and inherits the Colossal Titan. Eren discovers his father\'s basement — the truth of the outside world.', current: false },
  { year: 'Year 854', title: 'The Marley Arc — War Comes to Liberio', body: 'Eren infiltrates Marley undercover and attacks the Liberio internment zone during Willy Tybur\'s declaration of war. He kills Willy, gains the War Hammer Titan, and the Survey Corps destroys the Marleyan naval fleet. Sasha Braus is shot and killed on the return airship by Gabi Braun.', current: false },
  { year: 'Year 854', title: 'The Rumbling — Eren\'s Final Plan', body: 'Eren makes contact with Zeke in the Paths dimension and frees Ymir Fritz from two thousand years of servitude. He unleashes the Wall Titans — millions of Colossal Titans — on the world. 80% of humanity outside Paradis is wiped out in days.', current: true },
  { year: 'Year 854', title: 'Battle of Heaven and Earth — The End', body: 'Levi kills Zeke, severing Eren\'s control. The alliance blows Eren\'s head off of the Founding Titan. Mikasa decapitates Eren — destroying the centipede creature and ending the power of all Titans forever. Mikasa cradles Eren\'s head. Armin declares he killed Eren.', current: false },
  { year: 'Year 857+', title: 'The Cycle Continues', body: 'The former Titan shifters become Marleyan ambassadors. Mikasa returns to Shiganshina and buries Eren under the tree where they played as children. She starts a family and visits his grave until her death around Year 915. Decades later, Paradis reaches modern technology — and war comes again. The tree still stands.', current: false },
];

export default function Story() {
  return (
    <div className="container story-page">
      <span className="mono-label">DECLASSIFIED — INNER WALL ARCHIVE — PARADIS ISLAND</span>
      <h1>The Attack on Titan Chronicle</h1>
      <p className="story-page__lede">
        From the first Titan 2,000 years ago to the Rumbling that shook the world — 
        the complete timeline of humanity's war against the Titans and itself.
      </p>
      <div className="timeline">
        {TIMELINE.map((entry) => (
          <div key={entry.year} className={`timeline__entry ${entry.current ? 'timeline__entry--current' : ''}`}>
            <div className="timeline__marker">
              <span className="mono-label timeline__year">{entry.year}</span>
              <div className="timeline__dot" />
            </div>
            <div className="timeline__content">
              <h2>{entry.title}</h2>
              <p>{entry.body}</p>
              {entry.current && <span className="mono-label timeline__present">CURRENT EVENTS</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

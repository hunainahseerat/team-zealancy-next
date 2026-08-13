export default function OfficeTour() {
  return (
    <section className="section" id="office-tour">
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="label">Office Tour</span>
          <h2>
            Where it actually <em>gets made.</em>
          </h2>
        </div>
        <div className="studio">
          <div className="media reveal">
            <div className="grade g-ink"></div>
            <span className="cap">The floor</span>
          </div>
          <div className="stack">
            <div className="media reveal">
              <div className="grade g-slate"></div>
              <span className="cap">The room</span>
            </div>
            <div className="media reveal">
              <div className="grade g-plum"></div>
              <span className="cap">The team</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

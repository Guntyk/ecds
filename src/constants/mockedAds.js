const Slide1 = () => {
  return (
    <div
      style={{
        padding: '4.8rem',
        width: '588px',
        height: '330px',
        background: 'linear-gradient(90deg, #282B59 0%, #424895 100%)',
        border: '0.5px solid #DADBEA',
        borderRadius: '14px',
      }}
    >
      <h2
        style={{ fontFamily: 'Glametrix', fontSize: '72px', fontWeight: '700', lineHeight: '56px', color: '#BAE629' }}
      >
        Some kind of headline
      </h2>
      <p
        style={{
          marginTop: '16px',
          fontSize: '18px',
          fontWeight: '400',
          lineHeight: '24px',
          letterSpacing: '0.02em',
          color: '#FFFFFF',
        }}
      >
        The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words
        etc.
      </p>
    </div>
  );
};
const Slide2 = () => {
  return (
    <div
      style={{
        padding: '4.8rem',
        width: '588px',
        height: '330px',
        background: 'linear-gradient(90deg, #282B59 0%, #424895 100%)',
        border: '0.5px solid #DADBEA',
        borderRadius: '14px',
      }}
    >
      <h2
        style={{ fontFamily: 'Glametrix', fontSize: '72px', fontWeight: '700', lineHeight: '56px', color: '#BAE629' }}
      >
        New banner
      </h2>
      <p
        style={{
          marginTop: '16px',
          fontSize: '18px',
          fontWeight: '400',
          lineHeight: '24px',
          letterSpacing: '0.02em',
          color: '#FFFFFF',
        }}
      >
        Hi
      </p>
    </div>
  );
};

export const mockedAds = [Slide1, Slide2, Slide1];

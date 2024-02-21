function Spin({ isInset }: { isInset?: boolean }) {
  return (
    <div className={`spin-container ${isInset ? 'spin-container-inset' : ''}`}>
      <div className='spin'></div>
    </div>
  );
}

export default Spin;

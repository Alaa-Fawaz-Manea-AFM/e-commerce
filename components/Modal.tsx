const Modal = ({ children }: { children: React.ReactNode }) => (
  <div className="fixed bottom-0 h-screen w-full right-0 z-[1020]">
    <div className="fixed w-screen h-screen inset-0 bg-secondary bg-opacity-25" />
    <div className="mx-auto min-h-screen flex justify-center items-center">
      {children}
    </div>
  </div>
);

export default Modal;

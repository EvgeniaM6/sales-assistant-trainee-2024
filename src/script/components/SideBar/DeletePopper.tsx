function DeletePopper({ id, name, deleteChatItem, closeDeleting }: {
  id: number;
  name: string;
  deleteChatItem: (id: number) => void;
  closeDeleting: () => void;
}) {
  const deleteChat = () => {
    deleteChatItem(id);
  }

  return (
    <div className='overlay'>
      <div className='popup'>
        <div className='popup__content'>
          <div className='popup__cross'>
            <button className='popup__cross-btn' onClick={closeDeleting}>
              <span className='popup__cross-btn-img'></span>
            </button>
          </div>
          <h3>Delete chat</h3>
          <p>{`Are you sure you want to delete chat ${name}?`}</p>
          <div className='popup__btns'>
            <button className='popup__btns-btn btn-secondary' onClick={closeDeleting}>No, Keep it</button>
            <button className='popup__btns-btn btn-primary' onClick={deleteChat}>Yes, Delete it</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeletePopper;

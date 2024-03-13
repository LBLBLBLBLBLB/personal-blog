import "../App.css";
import Form from "./Form";

const Modal = ({
  isModalOpen,
  setIsModalOpen,
  createPost,
  newBlogName,
  setNewBlogName,
  newArticle,
  setNewArticle,
  newDate,
  setNewDate,
}) => {
  return (
    <>
      <div className={`modal ${isModalOpen ? "modal-active" : ""}`}>
        <Form
          createPost={createPost}
          newBlogName={newBlogName}
          setNewBlogName={setNewBlogName}
          newArticle={newArticle}
          setNewArticle={setNewArticle}
          newDate={newDate}
          setNewDate={setNewDate}
        />
        <button onClick={() => setIsModalOpen(false)}>close</button>
      </div>
    </>
  );
};

export default Modal;

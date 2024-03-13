const Form = ({
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
      <input
        value={newBlogName}
        type="text"
        placeholder="blog name"
        onChange={(event) => {
          setNewBlogName(event.target.value);
        }}
      />
      <textarea
        value={newArticle}
        placeholder="blog"
        onChange={(event) => {
          setNewArticle(event.target.value);
        }}
      />
      <input
        value={newDate}
        type="date"
        onChange={(event) => {
          setNewDate(event.target.value);
        }}
      />
      <button onClick={createPost}>Submit</button>
    </>
  );
};

export default Form;
